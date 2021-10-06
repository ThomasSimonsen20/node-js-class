const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.static('files'))


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index/index.html")
})

app.get("/express", (req,res) => {
    res.sendFile(__dirname + "/public/express/express.html")
})

app.get("/tools", (req,res) => {
    res.sendFile(__dirname + "/public/tools/tools.html")
})

app.get("/fundamentals", (req,res) => {
    res.sendFile(__dirname + "/public/fundamentals/fundamentals.html")
})

app.get("/leftoverNotes", (req,res) => {
    res.sendFile(__dirname + "/public/leftover_notes/leftover_notes.html")
})

app.listen(8080, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("Server is running on port", 8080)
})

