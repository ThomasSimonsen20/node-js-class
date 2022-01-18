import express from "express"
const router = express.Router()

router.get("/", (req,res) => {
    res.send("test")
})

export default router

/*
"node-fetch": "^3.1.0",
        "node-localstorage": "^2.2.1",
*/