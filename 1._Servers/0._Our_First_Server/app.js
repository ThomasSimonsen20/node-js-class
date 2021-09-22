const express = require("express");
const app = express();
//const app = require("express")();
//leder i note_modules når der ikke er ./

app.use(express.json());

const cake = require("./cake.json")

app.get("/", (req, res) => {
    res.send({ mindIsBlown: true });
});

// create a new route on the endpoint "/adventureTime" 
// send back data (data type must be json)
app.get("/adventureTime", (req, res) => {
    res.send({ adventure: "Time" });
});

//create a route on /frontpage that sends back a welcome message

app.get("/getFrontPage", (req, res) => {
    //res.send("Welcome"); sender kun string ikke object som nedenunder.
    res.send({message: "Welcome"});
});

// path variable (with Spring syntax below)
// /endpoint/{someValue}
                                // query parameter
// https://www.google.com/search?hl=en&q=search

// given the existing query string 
// ?key=value&name=Tobias&svar=Godt&nicenesslevel=10
// send svar and its value back = respond with svar and its value
app.get("/senddata", (req, res) => {
    console.log(req.query.svar);
    res.send({ svar: req.query.svar});
});

// Create a route on favoriteNumber that through 
// request parameter/path variable gets the number and sends it back to the client
// bonus: tells the client if it's a nice number or not
app.get("/favoritenumber/:favoriteNumber", (req, res) => {
    res.send({ 
        number: req.params.favoriteNumber,
        nice: req.params.favoriteNumber < 5
    });
});

app.post("/messages", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});



app.listen(3000);
