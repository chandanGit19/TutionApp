const Otp = require("../model/Otp");
const User = require("../model/User");
const Profile = require("../model/profile");
const OtpGenerator =require("otp-generator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

require("dotenv").config();
// send emael for verification

exports.sendOtp = async (req,res)=>{
    try {
        //fetch email from req body

        const {email} = req.body;
        // check if user is alradey exixt 

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(200).json({
                success:false,
                message:"user already resister"
            })
        }

         var Otpg = OtpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
         })
 
        //  check unique otp 

        let result = await Otp.findOne({otp:Otpg});
        

        while(result){
            Otpg = OtpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await Otp.findOne({otp:Otpg})
        }


        // console.log(email,Otpg)

        const otpPayload  = {email,otp:Otpg};
// create an entry in db
        const otpBody = await Otp.create(otpPayload)

        res.status(200).json({
            success:true,
            message:"opt send successfuly",
            Otpg
        })

    } catch (error) {
        console.log("error during creaitng a OTP ",error)
        
    }
}


// signup functionality

exports.signUp = async ( req,res) =>{
// datafectch from requset body 
try {
    
    const {email,firstName,lastName,password,confirmPassword,accountType,contactNumber,otp} = req.body;
// validation

if(!firstName || ! lastName || !email || !password || !confirmPassword || !otp){
  return  res.status(403).json({
        success:false,
        message:"All fields are require"
    })
}

if(password !== confirmPassword){
   return res.status(400).json({
        success:false,
        message:"password must me same"
    })
}
// check 2 password match or not
// check user already exist or not 

const existingUser = await User.findOne({email});

if(existingUser){
    return res.status(400).json({
        success:false,
        message:"email already exist please try different email"
    })
}



// find most recent otp stored 

const recentOtp =await Otp.find({email}).sort({createdAt:-1}).limit(1)

console.log(recentOtp)
console.log(otp)

if(recentOtp.length == 0){
    return res.status(400).json({
        success:false,
        message:"OTP not found "
    })
}else if(otp !== recentOtp[0].otp){

    return res.status(400).json({
        success:false,
        message:"please entire correct OTP"
    })
}

// hash password

const hashPassword = await bcrypt.hash(password,10);

const profile = await Profile.create({
    gender:null,
    dateOfBirth:null,
    about:null,
    contactNumber:null
})

const user =await User.create({
    firstName,lastName,email,contactNumber,
    password:hashPassword,accountType,
    additionalDetail:profile._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
})

return res.status(200).json({
    success:true,
    message:"user created successfuly in db"
})


} catch (error) {
    // console.log("error during creating a user",error)

    return res.status(500).json({
        success:false,
        message:"canot createt user an error occured"
    })
}
}



// login function

exports.login = async (req,res) =>{
    try {
        const {email ,password} =req.body;

        if(!email || !password){ 
            return res.status(400).json({
                success:false,
                message:"please fill all the fiels"
            })
        }

            const existUser =await User.findOne({email});

            if(!existUser){
                return res.status(400).json({
                    success:false,
                    message:"user is not registerd please sign up first"
                })
            }

            if(await bcrypt.compare(password,existUser.password)){

                const payload = {
                    email :existUser.email,
                    id:existUser._id,
                    role:existUser.accountType
                }

                const token = jwt.sign(payload ,process.env.JWT_SECRET,{
                    expiresIn:"2h"
                })

                existUser.token = token;
                existUser.password = undefined;
                const resaf = "happynoer";

                const Option ={
                    expires:new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly:true,
                }

                res.cookie("token" ,token,Option).status(200).json({
                    success:true,
                    token,
                    existUser,
                    message:"logged in succesfuly"
                })
            }else{
                return res.status(401).json({
                    success:false,
                    message:"password is incorrect"
                })
            }
        }
     catch (error) {

        // console.log("error during login ", error)
        return res.status({
            success:false,
            message:"errors occures during the login"
        })
        
    }
}