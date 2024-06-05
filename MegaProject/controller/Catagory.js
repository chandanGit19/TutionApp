const Catagory = require("../model/catagory")



exports.CreateCatagory = async (req,res) =>{
try {
    const {name ,description} = req.body;

    if(!name || !description){
        return res.status(400).json({
            success:false,
            message:"all entries are require",
        })
    }

    const tegDetails  = await Catagory.create({
        name,description
    })

    return res.status(200).json({
        success:true,
        message:"Tag created successfuly"
    })


} catch (error) {

    return res.status(500).json({
        success:false,
        message:"can't creat tags"
    })
    
}
}

exports.showAllCatagorys = async ( req,res)=>{

    try {
        const allTags = await Catagory.find({},{name:true,description:true})

        return res.status(200).json({
            success:true,
            message:"all tags rreturn",
            data:allTags
        })
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"can't grt alll  catagories"
        })
        
    }
}

// catagory 
exports.catagoryPagesDetails = async (req,res) =>{
    try {
        // get catagoryID
        const {catagoryId} = req.body;
        // get courses for specificed catagory
        // console.log("got the ID" , catagoryId)
        const selectedCatagory = await Catagory.findById(catagoryId).populate({
            path:"course",
            populate:"instructor"
        }).exec();
        // console.log("step 1")
        // validaton

        if(!selectedCatagory){
            return res.status(400).json({
                success:false,
                message:"data not founf"
            })
        }
        // get courses for differen catagories

        const differentCatagory = await Catagory.find({_id:{$ne:catagoryId}}).populate({
            path:"course",
            populate:"instructor"
        }).exec();

        // get different catagories courses

        return res.status(200).json({
            success:true,
            data:{
                selectedCatagory,
                differentCatagory,
            }
        })


    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"can't find catagory courses tags"
        })
        
    }
}