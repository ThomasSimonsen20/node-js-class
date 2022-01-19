import express from "express"
const router = express.Router()

import * as accountRepo from "../../database/repository/account.js"
import * as utilJwt from "../../util/jwtUtil.js"
import escape from "escape-html"
import bcrypt from "bcrypt"

const saltRounds = 12

router.post("/api/account", async (req, res) => {

    const accountsPasswordNotHashed = escape(req.body.accountsPassword)
    const accountsPasswordTwo = escape(req.body.accountsPasswordTwo)
    const accountsUsername = escape(req.body.accountsUsername)
    const accountsRole = escape(req.body.accountsRole)
    const accountsEmail = escape(req.body.accountsEmail)

    if(accountsPasswordNotHashed !== accountsPasswordTwo) {
        return res.sendStatus(400)
    }

    const result = await accountRepo.getAccountBasedOnName(accountsUsername)

    if(result.length < 1) {
        bcrypt.hash(accountsPasswordNotHashed, saltRounds, async (err, accountsPasswordHashed) => {

            let account = {accountsUsername: accountsUsername, accountsPassword: accountsPasswordHashed, accountsRole: accountsRole, accountsEmail: accountsEmail}

            const result = await accountRepo.createAccount(account)
    
            if(result) {
                req.session.accountID = result.insertId
                req.session.accountRole =  parseInt(accountsRole)
                req.session.isVerified = 0
                req.session.loggedIn = true
                req.session.username = accountsUsername
                req.session.email = accountsEmail
    
                utilJwt.jwtConfirmEmail(result.insertId, accountsEmail)
    
                res.sendStatus(200)
            } else {
                res.sendStatus(500)
            }
        });
    } else {
        res.sendStatus(409)
    }
})

export default router