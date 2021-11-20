import express, { application } from "express"
const router = express.Router()

import bcrypt, { hash } from "bcrypt"
import { connection } from "../database/connectSqlite.js";

import rateLimit from "express-rate-limit"
const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "To many tries try agian in 15min" 
})

router.use("/login/admin", rateLimiter)

router.post("/login/admin", async (req, res) => {
    //const db = await connectSqlite()

    const name = req.body.accountName 
    
    const hashInfo = await connection.get(`
        SELECT hash FROM secrets WHERE accountName = ?`, name
    )

    if(typeof hashInfo !== 'undefined') {
        bcrypt.compare(req.body.password, hashInfo.hash, function(err, result) {
            if (result) {
                req.session.loggedIn = true;
                res.sendStatus(200);
            } else {
                res.sendStatus(400)
            }
        }); 
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})


export default router