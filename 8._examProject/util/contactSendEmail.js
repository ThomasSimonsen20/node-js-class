import dotenv from "dotenv"
dotenv.config()

import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.NODEMAILER_EMAIL, 
        pass: process.env.NODEMAILER_PASSWORD,  
    },
});

export function sendEmail(body) {

    const output = `
    <p>New support ticket</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Client name: ${body.name}</li>
      <li>Client email: ${body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${body.message}</p>
    `;
    
      transporter.sendMail({
        from: `"WatchedFlix Client" <${process.env.NODEMAILER_EMAIL}>`, 
        to: "bestpalaeu20@gmail.com", 
        subject: "New support ticket", 
        html: output, 
    });
}