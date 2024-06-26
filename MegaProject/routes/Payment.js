const express = require('express');
const router = express.Router()

const {capturePayment,verifyPayment} = require('../controller/Payment');
const {auth,isAdmin,isInstructor,isStudent} = require("../middelware/auth")

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,isStudent,verifyPayment)

module.exports = router