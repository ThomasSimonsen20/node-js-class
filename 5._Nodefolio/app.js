const express = require("express")
const app = express()

app.use(express.static('public'))

const projectsRouter = require("./routers/projects")
app.use(projectsRouter.router)

const fs = require("fs")
const frontpage = fs.readFileSync("./public/frontpage/frontpage.html", "utf-8")
console.log(frontpage)

app.get("/", (req, res) => {
    res.send(frontpage + frontpage + frontpage)
})

app.get("/projects", (req, res) => {
    res.sendFile(__dirname + "/public/projects/projects.html")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on ", PORT)
})