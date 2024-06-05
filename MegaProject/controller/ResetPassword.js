const User = require("../model/User");
const mailsender =require("../utils/mailSender");
const bcrypt = require("bcrypt");



// 

exports.resetPasswordToken = async (req,res)=>{
try {
    // get email from body
    const email = req.body.email;
// check usesr is exist 

   const user = await User.findOne({email:email});

   if(!user){
    return res.status(401).json({
        success:false,
        message:"your email is not registered with us"
    })
   }

// genetate token from uuid

const token = crypto.randomUUID();
// update user by adding token and expire timing

const updatedDetails = await User.findOneAndUpdate({email:email},{
    token:token,
    resetPasswordExpire:Date.now()+5*60*1000,
},{new:true});

const url = `http://localhost:3000/update-password/${token}`

// send mail to user 

await mailsender(email,"password reset kink",
    url
)
 

return res.status(200).json({
    success:true,
    message:"Email send successfuly please check your email",
    token:token,
})

} catch (error) {
    // console.log("error occure during sending mail to reset password",error)
   res.status(401).json({
    success:false,
    message:"error in sending mail"
   }) 
    
}

}




exports.resetPassword = async (req,res)=>{
    try {
        // data fetch 
        const {password,confirmPassword,token} = req.body;

        // validation
        if(password !== confirmPassword){
            return res.status(201).json({
                success:false,
                message:"please entire correct password"
            })
        }

        const userDetails = await User.findOne({token:token})

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"link expire please generate new link "
            })
        }
        // getting userdetailes

        if(userDetails.resetPasswordExpire< Date.now()){
            return res.status(401).json({
                success:false,
                message:"link expire please generate new link "
            })

        }

        // hash password
        let hashPass
        try {
             hashPass = await bcrypt.hash(password,10);
        } catch (error) {
        return res.json({
            success:false,
            message:"can't save updated password"
        })
            
        }

        const newpassUser = await User.findOneAndUpdate({token:token},{
            password:hashPass
        },{new:true})

        return res.status(200).json({
            success:true,
            message:"password updated successfuly"
        })






        // validatiing tokken
    } catch (error) {
        return res.status(401).json({
            success:true,
            message:"error occure during reseting new password"
        })
    }
}