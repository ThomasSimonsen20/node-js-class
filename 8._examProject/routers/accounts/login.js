import express from "express"
const router = express.Router()

import * as accountRepo from "../../database/repository/account.js"
import escape from "escape-html"
import bcrypt from "bcrypt"

import rateLimit from "express-rate-limit"
const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "To many tries try agian in 15min" 
})

router.use("/api/accounts/login", rateLimiter)

router.post("/api/accounts/login", async (req, res) => {
    const username = escape(req.body.accountsUsername)
    const password = escape(req.body.accountsPassword)
    
    const result = await accountRepo.getAccountBasedOnName(username)

    if(result[0]) {
        bcrypt.compare(password, result[0].accountsPassword, (err, newResult) => {
            if (newResult) {
                req.session.loggedIn = true
                req.session.accountID = result[0].idaccounts
                req.session.isVerified = result[0].isVerified
                req.session.accountRole =  result[0].accountsRole
                req.session.email = result[0].accountsEmail

                if(result[0].accountsRole === 9) {
                    res.send({isAdmin: true})
                } else {
                    req.session.username = escape(req.body.accountsUsername)
                    res.send({isAdmin: false})
                }
            } else {
                res.sendStatus(400)
            }
        }); 
    } else {
        res.sendStatus(404)
    }
}) 

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

export default router