const Course = require("../model/Course");
const Tag = require("../model/catagory");
const User = require("../model/User");
const {uploadImageToCloudinaty}  = require("../utils/imageUploader");

// create course 
exports.createCourse = async (req,res)=>{
    try {
        // fetch all data

        const {courseName,courseDescription, whatWillYouLearn,price,tag} = req.body;

        const thumbnail = req.files.thumbnailImage;

        // validaton 

        if(!courseName ||  !courseDescription || !whatWillYouLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"all fields are require"
            })
        }
         const userId = req.user.id;

         const instructorDetailss = await User.findById(userId);

         if(!instructorDetailss){
            return res.status(404).json({
                success:false,
                message:"instructor details not found"
            })
         }


         const tagDetails = await Tag.findById(tag);

         if(!tag){
            return res.status(404).json({
                success:false,
                message:"tag not found"
            })
         }

        //  uploag to cloudinary

        const thumbnailImg  = await uploadImageToCloudinaty(thumbnail,process.env.FOLDER_NAME);

        // create an entry for new courses

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetailss._id,
            whatWillYouLearn,
            price,
            catagory:tagDetails._id,
            thumbnail:thumbnailImg.secure_url,
        })

        // add the new course to user schema
        const updateduser = await  User.findByIdAndUpdate({_id:instructorDetailss._id},{$push:{
            courses:newCourse._id
        }},{new:true});

        // update the tag schema 
        await Tag.findByIdAndUpdate(tag,{
            $push:{
                course:newCourse._id
            }
        })

        return res.status(200).json({
            success:true,
            message:"course created successfuly",
            data:newCourse
        })

    } catch (error) {
        
        return res.status(400).json({
            success:false,
            message:"course  can't created ",
        })
        
    }
}

exports.showAllCourses = async (req,res)=>{
    try {
         const allcourses = await Course.find({},{courseName:true,price:true,thumbnail:true,courseContent:true}).populate("instructor").exec();

         return res.status(200).json({
            success:true,
            message:"all courses fetch successfuly",
            data:allcourses,
         })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"can't fetch data from backend ",
        })
        
        
    }
}


exports.getAllCourseDetails = async (req,res) =>{
    try {
        // getID
        const {courseID} = req.body;
        if(!courseID){
            return res.status(404).json({
                success:false,
                message:"please provide correct courseID"
            })
        }
        // console.log("in the section of get singal course detals and courses ID" , courseID)

        const courseDetails = await Course.findOne({_id:courseID}).populate({
                        path:'instructor',
                        populate:{
                            path:"additionalDetail"
                        }
        }).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        });



        return res.status(200).json({
            success:true,
            message:"detail of this course",
            data:courseDetails
        })
    } catch (error) {
        return res.status(403).json({
            success:false,
            message:"got some error in feting data of a course"
        })
        
    }
}