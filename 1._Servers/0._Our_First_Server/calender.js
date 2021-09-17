const app = require("express")();
var moment = require('moment');

app.get("/", (req, res) => {
    res.send({ Time: moment().format('LTS')});
});

app.get("/dayofweek", (req, res) => {
    res.send({ 'Day in the week': moment().format('dddd')});
});

app.get("/month", (req, res) => {
    res.send({ Month: moment().format('LL')});
});

app.listen(3000);