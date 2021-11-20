import express from "express"
const router = express.Router()

import nodemailer from 'nodemailer'
import { connectSqlite } from "../database/connectSqlite.js";

router.post("/api/contact", async (req,res) => {
    const db = await connectSqlite()

    const emailDetails = await db.get(`SELECT * FROM email WHERE id = 1`)
 
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: emailDetails.accountName, 
          pass: emailDetails.password, 
        },
    });
    
      transporter.sendMail({
        from: '"Nodemailer contact" <nodemailertest202@gmail.com>', 
        to: "bestpalaeu20@gmail.com", 
        subject: "Node contact request", 
        text: "pewpew", 
        html: output, 
    });
    
    res.send()
})


export default router
