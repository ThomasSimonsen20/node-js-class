import express from "express"
const app = express()

import helmet from "helmet"
app.use(helmet())

import _ from "./encryption.js"
//app.use(_())

import session from "express-session"
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

import rateLimit from "express-rate-limit"
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(rateLimiter)

const authRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 6
})

import sessionRouter from "./routers/sessionRouter.js"
app.use(sessionRouter)

app.use("/auth", authRateLimiter)

app.get("/auth/login", (req,res) => {
    res.send("<h2>You're now logged in</h2>")
})

const ipLogger = (req,res,next) => {
    //res.send({ yourIP: req.ip})
    console.log(req.ip)
    next();
}

//app.use("/findme", ipLogger)

function isAuthorized(req, res, next) {
    const userIsAuthorized = false
    req.customUserData = "Jens"
    if (!userIsAuthorized) {
        return res.status(403).send({ message: "You are not authorized"})
    }
    next()
}

app.get("/honeypot", ipLogger, (req,res) => {
    res.sendFile({ messasge: "Everything went well"})
})

app.get("/secretcache", isAuthorized, (req, res) => {
    res.send({ message: "you foind it."})
})

app.get("/findme", (req,res) => {
    res.send({messasge: "Did you find me"})
})

app.get("/findme", (req,res) => {
    res.send({messasge: "Or did you find me"})
})

app.get("*", (req, res) => {
    res.status(404).send("<h1>You found nothing.</h1>")
})

app.listen(8080)