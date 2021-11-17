import express from "express"
const router = express.Router()

router.get("/visit", (req, res) => {
    req.session.isVisiting = true
    res.send({message: "Welcome"})
})

router.get("/isVisiting", (req, res) => {
    res.send({ClientIsVisiting: req.session.isVisiting || false})
})

router.get("/leave", (req, res) => {
    req.session.destroy()
    res.send({})
})

export default router