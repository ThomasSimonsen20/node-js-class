
const app = require("express")()
const memes = require("./memes.json")

app.get("/dankmemes", (req, res) => {
    res.send(memes)
})

app.get("/dankmemes/:dankmemeID", (req, res) => {
    res.send({
        id : req.params.dankmemeID,
        meme : memes[req.params.dankmemeID]
    })
})

app.listen(8080)

//få lavet documentation på det.
//collections navn = dankmemes.

//bedste data type på vores server: JSON.fil med alle ens dankmemes.
