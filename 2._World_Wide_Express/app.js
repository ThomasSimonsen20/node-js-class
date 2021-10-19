const express = require("express")
const app = express()

app.use(express.static('public'))

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

//server
app.get("/sausage", (req, res) => {
    if (Number(req.query.money) > 25) {
        res.send({ message: "You bought a sausage"})
    } else {
        res.redirect("creditor")
    }
})

//Create an endpoint called /proxy and fecth google homepage and send it to the client.

app.get("/proxy", async (req, res) => {
    // fetch("https://www.google.com")
    // .then(response => response.text())
    // .then(result => res.send(result))
    const response = await fetch("https://www.google.com")
    const result = await response.text()
    res.send(result)
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

