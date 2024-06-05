const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
    },
    accountType:{
        type:String,
        enum:["admin","student","instructor"]
    },
    additionalDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        require:true,
    },
    token:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date,
    },

    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
            require:true
        }
    ],
    image:{
        type:String,
        require:true,
    },

    coursesProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress",
    }],

})

module.exports = mongoose.model("User",userSchema);