import dotenv from "dotenv"
dotenv.config()

import express from "express"
const router = express.Router()

import * as accountRepo from "../../database/repository/account.js"
import * as utilJwt from "../../util/jwtUtil.js"
import jwt from 'jsonwebtoken';

router.post("/api/accounts/resend-verification", async (req, res) => {
    try {
        utilJwt.jwtConfirmEmail(req.session.accountID, req.session.email)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

//verify
router.get('/confirmation/:token', async (req, res) => {
    try {
      const result = jwt.verify(req.params.token, process.env.EMAIL_SECRET)
      await accountRepo.updateIsVerified(1, result.user)
      req.session.accountID = result.user
      req.session.loggedIn = true
      req.session.isVerified = 1
    } catch (e) {
      res.sendStatus(500)
    }
  
    return res.redirect('http://localhost:8080/search-movies')
  })



//verify
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

export default router