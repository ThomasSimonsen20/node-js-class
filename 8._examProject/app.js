import express from "express"
const app = express()

import session from "express-session"
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

import pagesRouter from "./routers/pages.js"

app.use(pagesRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on ", PORT)
})