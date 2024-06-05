const Profile =  require("../model/profile");
const User = require("../model/User");
const {uploadImageToCloudinaty} =require("../utils/imageUploader")
require("dotenv").config();


exports.updateProfile = async (req,res)=>{

    try {
        // console.log("this is id to check 1")
        const {dateOfBirth="" ,about="",contactNumber,gender} =req.body;
        // console.log("this is id to check");
        const id = req.user.id;
        console.log(id);

        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:"all fields are require"
            })
        }

        const userDetails = await User.findById(id);
        // console.log("userdetaisl", userDetails);

        const profileId = userDetails.additionalDetail;

        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about =about;
        profileDetails.contactNumber =contactNumber;
        profileDetails.gender = gender;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"profile updated successfuly",
            profileDetails,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"profile updating fail"
        })
        
    }
}

exports.deletAccount = async ( req ,res) =>{
    try {
        // get id 
        const id = req.user.id;

        // validation

        const userDetails =  await User.findById(id);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"invalid user id"
            })
        }
        // delet profile and user delete
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetail});

        await User.findByIdAndDelete(
            {_id:id}
        )
        return res.status(200).json({
            success:true,
            message:"profile deleted successfuly",
            profileDetails,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"unable to delet the profile"
        })
        
    }
}

exports.getAllUser = async (req,res)=>{
    try {
        console.log("inside the get all userdetails 1")
        const id = req.user.id;
        // console.log(id)
        const userDetails = await User.findById(id).populate({
            path:"courses",
            populate:{
                   path:"courseContent",
                   populate:{
                    path:"subSection"
                   }
            }
        }).exec();
        console.log( "this is if userfetails not found",userDetails)
 
        console.log("inside the get all userdetails")

        return res.status(200).json({
            success:true,
            message:"user fetch successfuly",
            userDetails,
        })
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"user can't find"
        })
    }
}
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
    //   console.log("userid is in updateDisplayPicturers", userId)
      const image = await uploadImageToCloudinaty(
        displayPicture,
        process.env.FOLDER_NAME,
      )
    //   console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }