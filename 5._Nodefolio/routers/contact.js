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
        secure: false, // true for 465, false for other ports
        auth: {
          user: "nodemailertest202@gmail.com", // generated ethereal user
          pass: "nodemailer20", // generated ethereal password
        },
    });
    
      // send mail with defined transport object
      transporter.sendMail({
        from: '"Nodemailer contact" <nodemailertest202@gmail.com>', // sender address
        to: "bestpalaeu20@gmail.com", // list of receivers
        subject: "Node contact request", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });



    
    res.redirect("/contact")
})

module.exports = {
    router
}