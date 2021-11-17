import express from "express"
const router = express.Router()

import {connection} from "../database/connectDB.js"

router.get("/games", async (req, res) => {
    //const dbConnection = await connectSqlite()

    const result = await connection.all('SELECT * FROM games')

    res.send(result)
})

router.post("/games", async (req, res) => {
    //const dbConnection = await connectSqlite()

    const title = req.body.title
    const genre = req.body.genre
    const price = req.body.price

    connection.run('INSERT INTO games (title, genre, price) VALUES (?,?,?)', title, genre, price)

    res.send()
})

export default router