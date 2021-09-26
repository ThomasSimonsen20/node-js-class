const app = require("express")()
const express = require("express")
app.use(express.json())


let memes = [
    {id: 1, name : "Drake Hotline Bling"},
    {id: 2, name : "Two buttons"},
    {id: 3, name : "Distracted Boyfriend"},
    {id: 4, name : "Change my mind"},
    {id: 5, name : "Gru's Plan"},
    {id: 6, name : "Sad Pablo Escobar"},
    {id: 7, name : "Anakin Padme 4 panel"},
    {id: 8, name : "Epic Handshake"},
    {id: 9, name : "Disaster Girl"},
    {id: 10, name : "Surprised Pikachu"}
]

app.get("/dankmemes", (req, res) => {
    res.send({memes})
})


app.get("/dankmemes/:id", (req, res) => {
    res.send(memes[req.params.id-1])
})



app.patch("/dankmemes/:id", (req, res) => {
    memes.forEach((meme, index) => {
        if (meme.id == req.params.id) {
            memes[index].name = req.body.name
            res.send(memes[index])
        }
    })
}) 


app.post("/dankmemes/", (req, res) => {
    let id = memes.length +1
    let meme = req.body.name
    console.log(req.body.name)
    memes.push({id: id, name : meme})
    res.send(memes[id])
})



app.delete("/dankmemes/:id", (req, res) => {
    const index = memes.map(meme => meme.id).indexOf(parseInt(req.params.id))
    if (index > -1) {
        memes.splice(index, 1)
    }
    res.send({memes})
})


app.listen(8080, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("The server is running on port", 8080);
})