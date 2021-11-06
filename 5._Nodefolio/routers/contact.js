const router = require("express").Router()
const nodemailer = require("nodemailer");

router.post("/api/contact", (req,res) => {

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
          user: "nodemailertest202@gmail.com", 
          pass: "nodemailer20", 
        },
    });
    
      transporter.sendMail({
        from: '"Nodemailer contact" <nodemailertest202@gmail.com>', 
        to: "bestpalaeu20@gmail.com", 
        subject: "Node contact request", 
        text: "Hello world?", 
        html: output, 
    });
    
    res.redirect("/contact")
})

module.exports = {
    router
}