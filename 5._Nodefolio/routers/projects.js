//const router = require("express").Router();

import express from "express"
const router = express.Router()

import { connectSqlite } from "../database/connectSqlite.js";

const projects = [ 
    { name: "Node.js Recap", category: "Node.js", language: "Node.js", technologies: ["Node.js", "Html", "CSS"]},
    { name: "Nodefolio", category: "Node.js", language: "Node.js", technologies: ["Node.js", "Html", "CSS"]},
    { name: "3rd semester project", category: "Java", language: "Java", technologies: ["Java", "Thymeleaf", "CSS", "MySQL"]}
]

/*
router.get("/api/projects", (req,res) => {
    res.send({projects})
}) */

router.get("/api/projects", async (req,res) => {
    const dbConnection = await connectSqlite()
    const projects = await dbConnection.all('SELECT * FROM projects')

    res.send(projects)
}) 


router.post("/api/projects", async (req, res) => {
    const dbConnection = await connectSqlite()

    const name = req.body.name
    const category = req.body.category
    const language = req.body.language
    const technologies = req.body.technologies
    const githubLink = req.body.githubLink

    dbConnection.run('INSERT INTO projects (name, category, language, technologies, githubLink) VALUES (?,?,?,?,?)', name, category, language, technologies, githubLink )

    res.send()
})


export default router

/*

module.exports = {
    router
} */

