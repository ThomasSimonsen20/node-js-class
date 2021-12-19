import express from "express"
const router = express.Router()

import * as accountRepo from "../../database/repository/account.js"
import * as utilJwt from "../../util/jwtUtil.js"
import escape from "escape-html"
import bcrypt from "bcrypt"

const saltRounds = 12

router.post("/api/accounts/forgot-password", async (req, res) => {
    const accountsUsername = escape(req.body.accountsUsername)

    const result = await accountRepo.getAccountBasedOnName(accountsUsername)

    try {
        utilJwt.jwtForgotPassword(result[0].idaccounts, result[0].accountsEmail)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

router.put("/api/accounts/change-password-without-current-password", async (req, res) => {
    const accountID = req.session.accountID
    const newPasswordOne = escape(req.body.newPasswordOne)
    const newPasswordTwo = escape(req.body.newPasswordTwo)

    if (newPasswordOne === newPasswordTwo) {
        bcrypt.hash(newPasswordOne, saltRounds, async (err, accountsPasswordHashed) => {
            await accountRepo.updateAccountPassword(accountsPasswordHashed, accountID)
            res.sendStatus(200)
        })
    } else {
        res.sendStatus(400)
    }
})

router.put("/api/accounts/change-password", async (req, res) => {
    const currentPassword = escape(req.body.currentPassword)
    const newPasswordOne = escape(req.body.newPasswordOne)
    const newPasswordTwo = escape(req.body.newPasswordTwo)
    
    const result = await accountRepo.getAccountBasedOnName(req.session.username)

    if(result[0]) {
        bcrypt.compare(currentPassword, result[0].accountsPassword, async (err, newResult) => {
            if (newResult) {
                if (newPasswordOne === newPasswordTwo) {
                    bcrypt.hash(newPasswordOne, saltRounds, async (err, accountsPasswordHashed) => {
                        await accountRepo.updateAccountPassword(accountsPasswordHashed, result[0].idaccounts)
                        res.sendStatus(200)
                    })
                } else {
                    res.sendStatus(400)
                }
            } else {
                res.sendStatus(409)
            }
        }); 
    } else {
        res.sendStatus(404)
    }
}) 

export default router