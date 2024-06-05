const express = require("express")
const router = express.Router()

const {getAllUser,deletAccount,updateProfile,updateDisplayPicture} =require("../controller/profile")
const {auth} = require("../middelware/auth")

router.delete("/deletProfile",auth,deletAccount);
router.post("/updateProfileee",auth,updateProfile);
router.get("/getUserDetails",auth,getAllUser);
router.put("/updateProfile",auth,updateDisplayPicture)

module.exports = router