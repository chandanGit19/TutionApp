const RatingAndReview = require("../model/RatingAndReview");
const Course = require("../model/Course");
const { default: mongoose } = require("mongoose");

// create a rating 
exports.createRating = async (req,res ) =>{
    try {
        // get userId
        const userID = req.user.id;
        // fetch data of user
        const {rating ,review,couseID} =req.body;
        // check is user is enrolled or not  
        const courseDetailse = await Course.findOne({_id:couseID,
                                                   studentsEnrolled:{$elemMatch :{$eq:userID}}
        });
        if(!courseDetailse){
            return res.status(403).json({
                success:false,
                message:"student is not enrolled in the course"
            })
        }

        // check already review the course

        const alreadyReview  =await RatingAndReview.findOne({user:userID,
                                                              Course:couseID,
        })

        if(alreadyReview){
            return res.status(403).json({
                success:false,
                message:"course is already reviewed by you"
            })
        }
        // update the couses on which the review have given

        const ReviewDetails = await RatingAndReview.create({
            rating,review,Course:couseID,user:userID
        })

        const updatecourse = await Course.findByIdAndUpdate(couseID,{
            $push:{
                ratingAndReviews:ReviewDetails._id,
            }
        },{new:true});

        return res.status(200).json({
            success:false,
            messsage:"successfuly review the course",
            updatecourse
        })
        // responce
    } catch (error) {
        return res.status(403).json({
            success:false,
            message:"can't review now "
        })
    }
}



// get average rawting 

exports.getAverageRating = async (req, res) =>{
    try {
        // get courser details 
        const courseID =req.body.courseid;

        //data calculate average

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseID)
                }
            },{
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])


        if(result.length>0){
            return res.statsu(200).json({
                success:false,
                message:"rating and reviews created successfully",
                averageRating:result[0].averageRating,

            })
        }

        return res.status(200).json({
            success:true,
            message:"no rating till now"
        })
    } catch (error) {
        return res.status(403).json({
            success:false,
            message:" review not found  now "
        })
        
    }
}


exports.getAllRating = async (req,res) =>{
    try {
        const allRating  = await RatingAndReview.find({}).sort({rating:"desc"}).populate({path:"user",
                                                                                          select:"firstName lastName email image"
        }).populate({
            path:"course",
            select:"courseName"
        });


        return res.status(200).json({
            success:true,
            message:"all rating reviews are fetched",
            data:allRating
        })
        



    } catch (error) {
        return res.status(403).json({
            success:false,
            message:" review not found  now "
        })
        
    }

}