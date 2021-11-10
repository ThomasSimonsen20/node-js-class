/*
const router = require("express").Router()
const nodemailer = require("nodemailer"); */

import express from "express"
const router = express.Router()

import nodemailer from 'nodemailer'



router.post("/api/contact", (req,res) => {

    console.log(req.body.name)
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
          user: "nodemailertest202@gmail.com", // generated ethereal user
          pass: "nodemailer20", // generated ethereal password
        },
    });
    
      transporter.sendMail({
        from: '"Nodemailer contact" <nodemailertest202@gmail.com>', 
        to: "bestpalaeu20@gmail.com", 
        subject: "Node contact request", 
        text: "Hello world?", 
        html: output, 
    });
    
    res.send()
})


export default router
/*
module.exports = {
    router
}
*/