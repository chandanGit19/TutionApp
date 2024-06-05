const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");

// auth
exports.auth = async (req,res,next)=>{
 try {
    const token =req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ","");

    if(!token){
        // console.log("can't find tooken")
        return res.status(400).json({
            success:false,
            message:"can't find token please log in again"
        })
    }
    console.log(" find tooken")

    try {
        const decod = await jwt.verify(token,process.env.JWT_SECRET);
        // console.log("tokken found",decod);
        req.user = decod; 
    } catch (error) {
        console.log("can't decode")
        return res.status(401).json({
            success:false,
            message:"token is missing"
        })
    }
 next();
    
 } catch (error) {
    return res.status(401).json({
        success:false,
        message:"error during fetching the token in auth"
    })
    
 }
}


exports.isStudent = async (req,res,next)=>{
    
    try {
        if(req.user.role !== "student"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"user rolel can't be verify"
        })
        
    }
}

exports.isInstructor = async (req,res,next)=>{
    
    try {
        if(req.user.role !== "instructor"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"user rolel can't be verify"
        })
        
    }
}

exports.isAdmin = async (req,res,next)=>{
    
    try {
        if(req.user.role !== "admin"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route"
            })
        }
        next()
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"user rolel can't be verify"
        })
        
    }
}
