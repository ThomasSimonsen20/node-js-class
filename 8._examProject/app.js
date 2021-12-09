import dotenv from "dotenv"
dotenv.config()

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
import paymentRouter from "./routers/payment.js"
import accountRouter from "./routers/account.js"
import moviesRouter from "./routers/movies.js"

app.use(pagesRouter)
app.use(paymentRouter)
app.use(accountRouter)
app.use(moviesRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, (error) => {
    console.log("Server is running on ", PORT)
})