const router = require("express").Router()

router.post("/api/contact", (req,res) => {

    //send en mail med form data'en
    res.redirect("/contact")
})

module.exports = {
    router
}