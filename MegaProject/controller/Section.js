const Section = require("../model/Section");
const Course = require("../model/Course");



exports.createSection = async (req,res)=>{
    try {
        
        // data fetch
        const {sectionName ,courseId} = req.body;

        // data validation

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"all fields are require"
            })
        }
        // create sections

        const newSection = await Section.create({sectionName});
        // update course with the sections
        const updateCourse =await Course.findByIdAndUpdate(courseId,{
            $push :{
                courseContent:newSection._id,
            }
        },{new:true}).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })

        // use populate section and subsection in updatedcourse

        // return status
        return res.status(200).json({
            success:true,
            message:"sections created successfuly",
            updateCourse,
        })


    } catch (error) {
        
        return res.status(400).json({
            success:false,
            message:"can't create sections ",
        })

    }
}


exports.updateSections = async ( req, res)=>{
try {
    // data input 
    const {sectionName ,sectionId} = req.body;

    // data validation
    if(!sectionName || !sectionId){
        return res.status(400).json({
            success:false,
            message:"all fields are require"
        })
    }
    
    // update data

    const sectionUpdated = await Section.findByIdAndUpdate({sectionId},{sectionName},{new:true});
    // return response

    return res.status(200).json({
        success:true,
        message:"section name updated successfully ",
        sectionUpdated
    })
} catch (error) {
    return res.status(400).json({
        success:false,
        message:"can't create sections ",
    })
    
}

}

exports.deletSection = async ( req,res) =>{
    try {
        // get is findByIdAndDelet
        const {sectionId} =req.params;

        await Section.findByIdAndDelete(sectionId);

        // do we need to delet the entery from the course
        // return responce

        return res.status(200).json({
            success:true,
            message:"delets successfuly"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"can't delet sections ",
        })
        
    }
}