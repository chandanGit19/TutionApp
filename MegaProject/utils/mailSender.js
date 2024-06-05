const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async function(email,title,body){

  try {
    let transporter = nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
      },
    });

    console.log(process.env.MAIL_HOST)

  
    let info = await transporter.sendMail({
      from:'chandan kumar yadav',
      to:`${email}`,
      subject:`${title}`,
      text:`hello your otp${body}`,
    })
   

   return info

  } catch (error) {
    
    console.log("error during creating the mail in mail sender",error)
  }



}

module.exports = mailSender;