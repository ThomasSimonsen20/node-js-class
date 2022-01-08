import express from "express"
import connection from "../database/conectMysql.js"
import bcrypt from "bcrypt"
import * as accountRepo from "../database/repository/account.js"

const router = express.Router()

let accountsid = 10
const saltRounds = 12

/*
router.get("/api/movies", async (req, res) => {

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    } 

    const [rows] = await connection.execute("SELECT * FROM movies WHERE accountsid = ?", [accountsid])
    console.log(rows)
    res.send(rows)
}) */



export default router