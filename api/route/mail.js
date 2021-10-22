const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const otp = require('../model/otp');
require('dotenv').config();

router.post('/', async(req, res, next) => {
    
    
    let otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    console.log(otp)

   const mail = nodemailer.createTransport({
       service: 'gmail',
       auth:{
           user:process.env.USER,
           pass:process.env.PASSWORD    

       }
   });

   const mailOptions = {
    from: 'manalichahande.123@gmail.com',
    to: req.body.email,
    subject: 'Your OTP for login',
    html: `<p>Your One Time Password for account login <h2 style:"color:red;">${otp.toString()}</h2> please enter!</p>`
   };
    
  mail.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Mail Sent')
    }
    });

})


module.exports = router;



