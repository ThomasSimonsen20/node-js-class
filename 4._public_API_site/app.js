const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static("public"))


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/api_page.html")
})

app.listen(8080, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("Server is running on port", 8080)
})