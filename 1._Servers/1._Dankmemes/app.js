const express = require("express");
const app = express();
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

let AUTO_INCREMENT = 10;

app.get("/dankmemes", (req, res) => {
    res.send({memes})
})

app.get("/dankmemes/:id", (req, res) => {
    const meme = memes.find
    (dankmeme => dankmeme.id === Number(req.params.id))
    meme ? res.send(meme) : res.sendStatus(404)
})
 //sender meme hvis den er true.
/*
app.get("/dankmemes/:id", (req, res) => {
    res.send(memes[req.params.id-1])
})
//min metode
*/



app.patch("/dankmemes/:id", (req, res) => {
    let memeToUpdate
    memes = memes.map(meme => {
        if (meme.id === Number(req.params.id)) {
            memeToUpdate =  { ...meme, ...req.body, id: meme.id }
            ///... spread operator. Laver ny hvis variable ikke er der, overskrider hvis der er.
            return memeToUpdate
        }
        return meme
    })
    memeToUpdate? res.send(memeToUpdate) : res.sendStatus(404)
})

//hans løsning


/*
app.patch("/dankmemes/:id", (req, res) => {
    memes.forEach((meme, index) => {
        if (meme.id == req.params.id) {
            memes[index].name = req.body.name
            res.send(memes[index])
        }
    })
}) 
//Min løsning, men forEach er ikke alt for god. 
*/


app.post("/dankmemes/", (req, res) => {
    let id = memes.length +1
    let meme = req.body.name
    memes.push({id: id, name : meme})
    res.send(memes[id])
})
//meme.id = ++AUTO_INCREMENT
    //++ før auto så den bliver incrementet før værdien bliver assignet.

/*
app.delete("/dankmemes/:id", (req, res) => {
    const index = memes.map(meme => meme.id).indexOf(parseInt(req.params.id))
    if (index > -1) {
        memes.splice(index, 1)
        //splice deler listen op ved vores id, 1 tallet mere at den fjerne der.
    }
    res.send({memes})
})
*/
//kig mere på denne løsning. MIN LØSNING med map

app.delete("/dankmemes/:id", (req, res) => {
    let foundMeMeToDelete = false;
    memes = memes.filter(dankMeme => {
        const notToDelete = dankMeme.id !== Number(req.params.id)
        if(!notToDelete) foundMeMeToDelete = true
        return notToDelete
    })
    foundMeMeToDelete ? res.sendStatus(200) : res.sendStatus(404)
})

//filter køre igennem array sætter de værdier der ikke er lig med id ind i nyt memes array.
//hvis der er fundet en meme at slette, retunere den 200, ellers 404.
//hans løsning med filter.

app.listen(8080, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("The server is running on port", 8080);
})