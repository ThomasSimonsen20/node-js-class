const express = require("express");
const app = express();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//bliver kørt 1 gang når serveren starter op.

app.get("/getDay", (req, res) => {
    const date = new Date()
    //res.send({day: new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date)});

    res.send({ day: days[date.getDay()]});
});
//callback function giver kørt hver gang der bliver lavet en request. 

//new Date().toLocaleDateString('da-DK', { weekday: 'long' })

app.listen(8080);