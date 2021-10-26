const router = require("express").Router();

const projects = [ 
    { name: "Node.js Recap", category: "Node.js", language: "Node.js", technologies: ["Node.js", "Html", "CSS"]},
    { name: "Nodefolio", category: "Node.js", language: "Node.js", technologies: ["Node.js", "Html", "CSS"]},
    { name: "3rd semester project", category: "Java", language: "Java", technologies: ["Java", "Thymeleaf", "CSS", "MySQL"]}
]

router.get("/api/projects", (req,res) => {
    res.send({projects})
})

module.exports = {
    router
}

