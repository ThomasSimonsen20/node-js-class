const express = require("express");
const app = express();

const memes = [{
    1 : "Drake Hotline Bling",
    2 : "Two buttons",
    3 : "Distracted Boyfriend",
    4 : "Change my mind",
    5 : "Gru's Plan",
    6 : "Sad Pablo Escobar",
    7 : "Anakin Padme 4 panel",
    8 : "Epic Handshake",
    9 : "Disaster Girl",
    10 : "Surprised Pikachu"
}];

app.get("/dankmemes", (req, res) => {
    res.send({memes: memes});
});




app.listen(8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("The server is running on port", 8080);
});