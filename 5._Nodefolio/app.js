/*
const express = require("express")
const app = express() */

import express from "express"
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//const { createPage } = require("./render.js")
//import createPage from "./render.js"

/*
const projectsRouter = require("./routers/projects.js")
const pageRouter = require("./routers/pages.js")
const contactRouter = require("./routers/contact.js")
*/

import projectsRouter from "./routers/projects.js"
import pageRouter from "./routers/pages.js"
import contactRouter from "./routers/contact.js"

app.use(projectsRouter)
app.use(pageRouter)
app.use(contactRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on ", PORT)
})