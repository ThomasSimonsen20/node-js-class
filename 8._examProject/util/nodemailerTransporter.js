import dotenv from "dotenv"
dotenv.config()

import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken';

let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: process.env.NODEMAILER_EMAIL, 
          pass: process.env.NODEMAILER_PASSWORD, 
        },
});

export function jwtSign(id, email) {
    jwt.sign(
        {
          user: id,
        },
        process.env.EMAIL_SECRET,
        {
          expiresIn: '1d',
        },
        (err, emailToken) => {
          const url = `http://localhost:8080/confirmation/${emailToken}`;
            
          transporter.sendMail({
            to: "bestpalaeu20@gmail.com",
            subject: 'Confirm Email',
            html: `Please click this email to confirm your email: <a href="${url}">Verify Email</a>`,
          });
    })
}
