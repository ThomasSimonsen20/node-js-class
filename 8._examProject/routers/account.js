import dotenv from "dotenv"
dotenv.config()

import express from "express"
//import connection from "../database/conectMysql.js"
import bcrypt from "bcrypt"
import * as accountRepo from "../database/repository/account.js"
import { jwtSign } from "../util/jwtSign.js"
import jwt from 'jsonwebtoken';

const router = express.Router()

const saltRounds = 12
let currentUsername


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


router.post("/api/accounts", async (req, res) => {

    const accountsPassword = req.body.accountsPassword

    bcrypt.hash(accountsPassword, saltRounds, async (err, hash) => {

        let account = {accountsUsername: req.body.accountsUsername, accountsPassword: hash, accountsRole: req.body.accountsRole, accountsEmail: req.body.accountsEmail}

        const result = await accountRepo.createAccount(account)

        if(result) {
            req.session.accountID = result.insertId
            req.session.accountRole =  req.body.accountsRole
            req.session.isVerified = 0
            req.session.loggedIn = true
            currentUsername = req.body.accountsUsername

            jwtSign(result.insertId, req.body.accountsEmail)

            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    });
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




router.post("/api/accounts/login", async (req, res) => {
    currentUsername = req.body.accountsUsername
    const password = req.body.accountsPassword
    
    const result = await accountRepo.login(currentUsername)
    
    //if(typeof result[0].accountsPassword !== 'undefined') {
    if(result[0]) {
        bcrypt.compare(password, result[0].accountsPassword, (err, newResult) => {
            if (newResult) {
                req.session.loggedIn = true
                req.session.accountID = result[0].idaccounts
                req.session.isVerified = result[0].isVerified
                req.session.accountRole =  result[0].accountsRole

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
    const role = req.body.accountsRole
    const accountsid = req.session.accountID

    const result = await accountRepo.updateAccountRole(role, accountsid)
    console.log(result)

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
