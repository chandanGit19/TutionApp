const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000,
    }
})
//  a function to  send mails

async function sendVerificationEmail(email,otp){

    try {

        const mailResponse = await  mailSender(email, "verification Email from a studyNotion ", otp)
        console.log("email send successfully in otp schema" ,mailResponse)
        
    } catch (error) {
        
        console.log("error during sending emails otp schema" ,error)
    }

}

otpSchema.pre("save",async function(next){
    console.log(this.email,this.otp,"this is under schema")
    await sendVerificationEmail(this.email,this.otp)
    // await mailSender()
    next();
})

module.exports = mongoose.model("Otp",otpSchema);