const express = require("express");
const router = express.Router();

const {signUp,sendOtp,login,} =require("../controller/Auth");
const {resetPassword,resetPasswordToken} =require("../controller/ResetPassword")
// router for login
router.post("/login",login);
// router for signup
router.post("/signup",signUp);
// router for send otp
router.post("/sendotp",sendOtp);
// // Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router
