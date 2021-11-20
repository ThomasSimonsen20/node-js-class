import express, { query } from "express"
const router = express.Router()

import { connection } from "../database/connectSqlite.js";

router.get("/api/projects", async (req,res) => {
    //const dbConnection = await connectSqlite()
    const projects = await connection.all('SELECT * FROM projects')

    res.send(projects)
}) 

router.post("/api/projects", async (req, res) => {
    //const dbConnection = await connectSqlite()

    const name = req.body.name
    const category = req.body.category
    const language = req.body.language
    const technologies = req.body.technologies
    const githubLink = req.body.githubLink

    connection.run('INSERT INTO projects (name, category, language, technologies, githubLink) VALUES (?,?,?,?,?)', name, category, language, technologies, githubLink )

    res.send()
})

router.put("/api/projects", async (req, res) => {
    //const dbConnection = await connectSqlite()

    const id = req.body.id
    const name = req.body.name
    const category = req.body.category
    const language = req.body.language
    const technologies = req.body.technologies
    const githubLink = req.body.githubLink

    connection.run('UPDATE projects SET name = ?, category = ?, language = ?, technologies = ?, githubLink = ? WHERE id = ?', name, category, language, technologies, githubLink, id )

    res.send()
})


router.delete("/api/projects", async (req, res) => {
    //const dbConnection = await connectSqlite()
    const id = req.body.id
    connection.run('DELETE FROM projects WHERE id = ?', id)

    res.send()
})

router.get("/api/project/:id", async (req, res) => {
    //const dbConnection = await connectSqlite()
    const id = req.params.id
    const project = await connection.get('SELECT * FROM projects WHERE id = ?', id)

    res.send(project)
})


export default router

