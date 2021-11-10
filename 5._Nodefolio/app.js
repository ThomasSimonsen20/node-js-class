/*
const express = require("express")
const app = express() */

import express from "express"
const app = express()

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//const { createPage } = require("./render.js")
import createPage from "./render.js"

/*
const projectsRouter = require("./routers/projects.js")
const pageRouter = require("./routers/pages.js")
const contactRouter = require("./routers/contact.js")
*/

import projectsRouter from "./routers/projects.js"
import pageRouter from "./routers/pages.js"
import contactRouter from "./routers/contact.js"

/*
app.use(projectsRouter.router)
app.use(pageRouter.router)
app.use(contactRouter.router)
*/
app.use(projectsRouter)
app.use(pageRouter)
app.use(contactRouter)

/* Ready the pages */
const frontpagePage = createPage("frontpage/frontpage.html", { title: "Nodefolio | Welcome"})
const projectsPage = createPage("projects/projects.html")
const cvPage = createPage("cv/cv.html")
const contactPage = createPage("contact/contact.html")


app.get("/", (req, res) => {
    res.send(frontpagePage)
})

app.get("/projects", (req, res) => {
    res.send(projectsPage)
})

app.get("/cv", (req, res) => {
    res.send(cvPage)
})

app.get("/contact", (req, res) => {
    res.send(contactPage)
})




const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on ", PORT)
})