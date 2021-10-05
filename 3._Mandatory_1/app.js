const express = require("express")
const app = express()

app.use(express.static('images'))
app.use(express.static('files'))


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/html/index.html")
})

app.get("/express", (req,res) => {
    res.sendFile(__dirname + "/public/html/express.html")
})

app.get("/tools", (req,res) => {
    res.sendFile(__dirname + "/public/html/tools.html")
})

app.get("/fundamentals", (req,res) => {
    res.sendFile(__dirname + "/public/html/fundamentals.html")
})

app.listen(8080, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("Server is running on port", 8080)
})