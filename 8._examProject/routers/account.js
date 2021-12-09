import express from "express"
//import connection from "../database/conectMysql.js"
import bcrypt from "bcrypt"
import * as accountRepo from "../database/repository/account.js"

const router = express.Router()

const saltRounds = 12


router.get("/api/accounts", async (req, res) => {
    const accounts = await accountRepo.getAccounts()

    accounts ? res.send(accounts) : res.status(500)
})

router.post("/api/accounts", async (req, res) => {

    const accountsPassword = req.body.accountsPassword

    bcrypt.hash(accountsPassword, saltRounds, async (err, hash) => {

        let account = {accountsUsername: req.body.accountsUsername, accountsPassword: hash, accountsRole: req.body.accountsRole}

        const result = await accountRepo.createAccount(account)

        if(result) {
            req.session.accountID = result.insertId
            res.sendStatus(200) 
        } else {
            res.sendStatus(400)
        }
    });
})

router.post("/api/accounts/login", async (req, res) => {
    const name = req.body.accountsUsername
    const password = req.body.accountsPassword
    
    const result = await accountRepo.login(name)
    
    if(typeof result[0].accountsPassword !== 'undefined') {
        bcrypt.compare(password, result[0].accountsPassword, (err, newResult) => {
            if (newResult) {
                req.session.loggedIn = true
                req.session.accountID = result[0].idaccounts
                res.sendStatus(200)
            } else {
                res.sendStatus(400)
            }
        }); 
    } else {
        res.sendStatus(404)
    }
})

router.put("/api/accounts/role", async (req, res) => {
    const role = req.body.accountsRole
    const accountsid = req.session.accountID

    const result = await accountRepo.updateAccountRole(role, accountsid)

    result ? res.sendStatus(200) : res.sendStatus(500)
})


export default router
