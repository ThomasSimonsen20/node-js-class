const express = require("express")
const app = express()

app.use(express.static('public'))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/frontpage/index.html")
})

app.get("/cleo", (req,res) => {
    res.sendFile(__dirname + "/public/cleo/cleo.html")
})

// create a new file called teenageroom.html
// serve /teenegeroom
// use dynamic client-side redirection to redirect after 3 seconds

app.get("/teenageroom", (req,res) => {
    res.sendFile(__dirname + "/public/teenageroom/teenageroom.html")
})


app.get("/creditor", (req,res) => {
    res.send({ message: "You are indebted and you won't get what you want."})
})

app.get("/sausage", (req, res) => {
    if (Number(req.query.money) > 25) {
        res.send({ message: "You bought a sausage"})
    } else {
        res.redirect("creditor")
    }
})
//server side redirection

// task allow the developer setting the port
// task start-dev should run on port 8080
const PORT = process.env.PORT || 8080
//hvis true sætter env.PORT ellers default 8080
//? process.env.PORT : kunne man også skrive istedet for ||


app.listen(PORT, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("Server is running on port", PORT)
})