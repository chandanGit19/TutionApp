const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({

    courseName:{
        type:String,
        trim:true,
        require:true,
    },
    courseDescription:{
        type:String,
        require:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    whatWillYouLearn:{
        type:String,
    },
    catagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catagory",
        require:true,

    },

    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }],

    ratingAndReviews:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
       ],
     
     price:{
        type:Number
     },
       
     thumbnail:{
        type:String,
        require:true,
     },

     tag:{
        type:[String],
        require:true,
     },
     studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requier:true,
     }],

});

module.exports = mongoose.model("Course",courseSchema);