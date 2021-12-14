import dotenv from "dotenv"
dotenv.config()

import express from "express"
import bcrypt from "bcrypt"
import * as accountRepo from "../database/repository/account.js"
import * as utilJwt from "../util/jwtSign.js"
import jwt from 'jsonwebtoken';
import escape from "escape-html"

import rateLimit from "express-rate-limit"
const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "To many tries try agian in 15min" 
})

const router = express.Router()

const saltRounds = 12
let currentUsername
let currentEmail


router.get("/api/accounts", async (req, res) => {
    const accounts = await accountRepo.getAccounts()

    accounts ? res.send(accounts) : res.status(500)
})

router.get("/api/account", async (req, res) => {
    const [account] = await accountRepo.getAccount(req.session.accountID)
    account ? res.send(account) : res.status(500)
})

router.get("/api/account/username", async (req, res) => {
    res.send({accountsUsername: currentUsername})
})

router.get("/api/account/role", async (req, res) => {
    res.send({accountRole: req.session.accountRole})
})


router.post("/api/accounts", async (req, res) => {

    const accountsPasswordNotHashed = escape(req.body.accountsPassword)
    const accountsUsername = escape(req.body.accountsUsername)
    const accountsRole = escape(req.body.accountsRole)
    const accountsEmail = escape(req.body.accountsEmail)

    bcrypt.hash(accountsPasswordNotHashed, saltRounds, async (err, accountsPasswordHashed) => {

        let account = {accountsUsername: accountsUsername, accountsPassword: accountsPasswordHashed, accountsRole: accountsRole, accountsEmail: accountsEmail}

        const result = await accountRepo.createAccount(account)

        if(result) {
            req.session.accountID = result.insertId
            req.session.accountRole =  req.body.accountsRole
            req.session.isVerified = 0
            req.session.loggedIn = true
            currentUsername = accountsUsername
            currentEmail = accountsEmail

            utilJwt.jwtConfirmEmail(result.insertId, currentEmail)

            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    });
})

router.post("/api/accounts/resend-verification", async (req, res) => {
    try {
        utilJwt.jwtConfirmEmail(req.session.accountID, currentEmail)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})


router.get('/confirmation/:token', async (req, res) => {
    try {
      const result = jwt.verify(req.params.token, process.env.EMAIL_SECRET)
      await accountRepo.updateIsVerified(1, result.user)
      req.session.accountID = result.user
      req.session.loggedIn = true
    } catch (e) {
      res.sendStatus(500)
    }
  
    return res.redirect('http://localhost:8080/search-movies')
  })

router.post("/api/accounts/forgot-password", async (req, res) => {
    const accountsUsername = escape(req.body.accountsUsername)

    const result = await accountRepo.login(accountsUsername)

    try {
        utilJwt.jwtForgotPassword(result[0].idaccounts, result[0].accountsEmail)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

router.post("/api/accounts/change-password", async (req, res) => {
    const accountsUsername = escape(req.body.accountsUsername)

    const result = await accountRepo.login(accountsUsername)

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
        res.sendStatus(500)
    }
})

router.get('/changePassword/:token', async (req, res) => {
    try {
      const result = jwt.verify(req.params.token, process.env.EMAIL_SECRET)
      req.session.accountID = result.user
      req.session.passwordBeingChanged = true
      return res.redirect('http://localhost:8080/change-password')
    } catch (e) {
      res.sendStatus(500)
    }
  
    return res.redirect('http://localhost:8080/search-movies')
  })

router.put("/api/accounts/change-password", async (req, res) => {
    const currentPassword = escape(req.body.currentPassword)
    const newPasswordOne = escape(req.body.newPasswordOne)
    const newPasswordTwo = escape(req.body.newPasswordTwo)
    
    const result = await accountRepo.login(currentUsername)

    if(result[0]) {
        bcrypt.compare(currentPassword, result[0].accountsPassword, async (err, newResult) => {
            if (newResult) {
                if (newPasswordOne === newPasswordTwo) {
                    bcrypt.hash(newPasswordOne, saltRounds, async (err, accountsPasswordHashed) => {
                        await accountRepo.updateAccountPassword(accountsPasswordHashed, result[0].idaccounts)
                        res.sendStatus(200)
                    })
                } else {
                    res.sendStatus(500)
                }
            } else {
                res.sendStatus(409)
            }
        }); 
    } else {
        res.sendStatus(404)
    }
}) 
        


router.use("/api/accounts/login", rateLimiter)

router.post("/api/accounts/login", async (req, res) => {
    currentUsername = escape(req.body.accountsUsername)
    const password = escape(req.body.accountsPassword)
    
    const result = await accountRepo.login(currentUsername)

    if(result[0]) {
        bcrypt.compare(password, result[0].accountsPassword, (err, newResult) => {
            if (newResult) {
                req.session.loggedIn = true
                req.session.accountID = result[0].idaccounts
                req.session.isVerified = result[0].isVerified
                req.session.accountRole =  result[0].accountsRole
                currentEmail = result[0].accountsEmail

                if(result[0].accountsRole === 9) {
                    res.send({isAdmin: true})
                } else {
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

router.put("/api/accounts/role", async (req, res) => {
    const role = escape(req.body.accountsRole)
    const accountsid = escape(req.session.accountID)

    const result = await accountRepo.updateAccountRole(role, accountsid)

    if (result) {
        req.session.accountRole = role
        res.sendStatus(200)
    } else {
        res.sendStatus(500)
    }
})


router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})


export default router
