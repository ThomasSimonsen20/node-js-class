const router = require("express").Router();

router.get("/api/birthday", (req,res) => {
    res.send({message : "happy birthday"})
})

module.exports = {
    router
}
