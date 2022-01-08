import dotenv from "dotenv"
dotenv.config()

import express from "express"
const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

import sauceRouter from "./routers/sauce.js"
import gamesRouter from "./routers/games.js"

import connection from "./database/connectMysql.js"

app.use(sauceRouter)
app.use(gamesRouter)


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/schools", async (req, res) => {
    const [rows, columns] = await connection.execute("SELECT * FROM schools")
    res.send(rows)
})

app.post("/schools", async (req, res) => {
    const [ rows, columns] = await connection.execute(`INSERT INTO schools VALUES (?)`, [req.body.schoolName])
    res.send(rows)
})

app.listen(8080)

