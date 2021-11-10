import express from "express"
const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

import sauceRouter from "./routers/sauce.js"
import gamesRouter from "./routers/games.js"

app.use(sauceRouter)
app.use(gamesRouter)


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(8080)

