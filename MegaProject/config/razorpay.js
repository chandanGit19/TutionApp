const Razozrpay  = require("razorpay");
require("dotenv").config()
console.log(process.env.RAZORPAY_KEY,process.env.RAZORPAY_SECRET)


exports.instance =  new Razozrpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET,
})