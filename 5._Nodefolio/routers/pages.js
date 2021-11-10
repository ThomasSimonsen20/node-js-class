//const router = require("express").Router();

import express from "express"
const router = express.Router()

router.get("/ballade", (req,res) => {
    res.send("<h1>Sjov</h1>")
})

export default router

/*
module.exports = {
    router
} */