import express from "express"
const router = express.Router()

import { sendEmail } from "../util/contactSendEmail.js"

router.post("/api/contact", async (req,res) => {
    try {
        sendEmail(req.body)
        res.sendStatus(200)
    } catch {
        res.statusCode(500)
    }
})


export default router
