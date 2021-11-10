import express from "express"
const router = express.Router()

router.get("/sauce", (req, res) => {
    res.send({ type: "Bernaise" })
})

export default router