const SubSection = require("../model/SubSection");
const Section = require("../model/Section");
const {uploadImageToCloudinaty} =require("../utils/imageUploader")

exports.createSubsection = async (req ,res) =>{
    try {
        // fetch data from reques body 
        const {sectionId ,title,timeDuration,description} = req.body;
        // extract video from body
        const video = req.files.videoFiles
        // validation
        if(!sectionId || !title ||!timeDuration || !description){
            return res.status(400).json({
                success:true,
                message:"all fields are require"
            });
        }
        // uploadvideo to media managing side and get secure Url

        const uploadDetails = await uploadImageToCloudinaty(video,process.env.FOLDER_NAME);
        // console.log(uploadDetails)
        // update section with subsection Id
        const sucsectionDetails = await SubSection.create({
            title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })

        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $push:{
                subSection:sucsectionDetails._id,
            }
        },{new:true}).populate({path:"subSection"})

        // log updated here after adding populat query

        return res.status(200).json({
            success:true,
            message:"subsection created successfully ",
            updatedSection,
        })



    } catch (error) {
        
    }
}

// hw update section and delet section  to do 