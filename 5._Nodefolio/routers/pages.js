const router = require("express").Router();

router.get("/ballade", (req,res) => {
    res.send("<h1>Sjov</h1>")
})

module.exports = {
    router
}