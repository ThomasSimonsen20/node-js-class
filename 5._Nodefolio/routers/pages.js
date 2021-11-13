import express from "express"
const router = express.Router()

import createPage from "../render.js"

const frontpagePage = createPage("frontpage/frontpage.html", { title: "Nodefolio | Welcome"})
const projectsPage = createPage("projects/projects.html")
const createProjectPage = createPage("dashboard/createProject.html")
const updateProjectPage = createPage("dashboard/updateProject.html")
const cvPage = createPage("cv/cv.html")
const contactPage = createPage("contact/contact.html")
const dashboardPage = createPage("dashboard/dashboard.html")


router.get("/", (req, res) => {
    res.send(frontpagePage)
})

router.get("/projects", (req, res) => {
    res.send(projectsPage)
})

router.get("/cv", (req, res) => {
    res.send(cvPage)
})

router.get("/contact", (req, res) => {
    res.send(contactPage)
})

router.get("/dashboard", (req, res) => {
    res.send(dashboardPage)
})

router.get("/createProject", (req, res) => {
    res.send(createProjectPage)
})

router.get("/updateProject", (req, res) => {
    res.send(updateProjectPage)
})

export default router
