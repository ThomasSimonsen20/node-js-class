import express from "express"
const router = express.Router()

import createPage from "../util/render.js"

const frontpagePage = createPage("frontpage/frontpage.html", { title: "Nodefolio | Welcome"})
const projectsPage = createPage("projects/projects.html")
const createProjectPage = createPage("dashboard/createproject/createProject.html")
const updateProjectPage = createPage("dashboard/updateproject/updateProject.html")
const cvPage = createPage("cv/cv.html")
const contactPage = createPage("contact/contact.html")
const dashboardPage = createPage("dashboard/dashboard.html")
const loginPage = createPage("login/login.html")


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

router.get("/createProject", (req, res) => {
    if (req.session.loggedIn) {
        res.send(createProjectPage)
    } else {
        res.send(loginPage)
    }
})

router.get("/updateProject", (req, res) => {
    if (req.session.loggedIn) {
        res.send(updateProjectPage)
    } else {
        res.send(loginPage)
    }
})

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.send(dashboardPage)
    } else {
        res.send(loginPage)
    }
    
})

router.get("/dashboard", (req, res) => {
    if (req.session.loggedIn) {
        res.send(dashboardPage)
    } else {
        res.send(loginPage)
    }
    
})


export default router
