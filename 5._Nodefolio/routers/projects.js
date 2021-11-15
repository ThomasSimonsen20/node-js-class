//const router = require("express").Router();

import express, { query } from "express"
const router = express.Router()

import { connectSqlite } from "../database/connectSqlite.js";

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

router.put("/api/projects", async (req, res) => {
    const dbConnection = await connectSqlite()

    const id = req.body.id
    const name = req.body.name
    const category = req.body.category
    const language = req.body.language
    const technologies = req.body.technologies
    const githubLink = req.body.githubLink

    dbConnection.run('UPDATE projects SET name = ?, category = ?, language = ?, technologies = ?, githubLink = ? WHERE id = ?', name, category, language, technologies, githubLink, id )

    res.send()
})


router.delete("/api/projects", async (req, res) => {
    const dbConnection = await connectSqlite()
    const id = req.body.id
    //console.log(id)
    dbConnection.run('DELETE FROM projects WHERE id=?', id)

    res.send()
})

router.get("/api/project/:id", async (req, res) => {
    const dbConnection = await connectSqlite()
    const id = req.params.id
    const project = await dbConnection.get('SELECT * FROM projects WHERE id = ?', id)

    res.send(project)
})


export default router


/*
const projects = [ 
    { name: "Node.js Recap", category: "Node.js", language: "Node.js", technologies: ["Node.js", "Html", "CSS"]},
    { name: "Nodefolio", category: "Node.js", language: "Node.js", technologies: ["Node.js", "Html", "CSS"]},
    { name: "3rd semester project", category: "Java", language: "Java", technologies: ["Java", "Thymeleaf", "CSS", "MySQL"]}
]


router.get("/api/projects", (req,res) => {
    res.send({projects})
}) */