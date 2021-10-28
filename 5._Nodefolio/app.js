const express = require("express")
const app = express()

app.use(express.static('public'))

const projectsRouter = require("./routers/projects")

const fs = require("fs")
app.use(projectsRouter.router)

const header = fs.readFileSync("./public/globals/components/header/header.html", "utf-8")
const footer = fs.readFileSync("./public/globals/components/footer/footer.html", "utf-8")

const frontpage = fs.readFileSync("./public/frontpage/frontpage.html", "utf-8")
const projects = fs.readFileSync("./public/projects/projects.html", "utf-8")
const cv = fs.readFileSync("./public/cv/cv.html", "utf-8")
const contact = fs.readFileSync("./public/contact/contact.html", "utf-8")


app.get("/", (req, res) => {
    res.send(header + frontpage + footer)
})

app.get("/projects", (req, res) => {
    res.send(header + projects + footer)
})

app.get("/cv", (req, res) => {
    res.send(header + cv + footer)
})

app.get("/contact", (req, res) => {
    res.send(header + contact + footer)
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on ", PORT)
})