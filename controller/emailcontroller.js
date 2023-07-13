const nodemailer= require("nodemailer")
 const dotenv=require("dotenv").config()
 // firt you creat a configure function 
 const  mailsender= async(options)=>{
    const transporter= nodemailer.createTransport({
        service: process.env.service,
        auth:{
            user:process.env.user,
            pass:process.env.gmailpassword,

            secure:false


        }

    })
    const mailoptions={
        from:process.env.user,
        to:options.email,
        subject:options.subject,
        text:options.message


    }
    await transporter.sendMail(mailoptions)
 }
 module.exports={mailsender}