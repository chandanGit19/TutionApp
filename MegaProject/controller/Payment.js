const {instance} = require("../config/razorpay");
const Course = require("../model/Course");
const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const {default:mongoose} = require("mongoose");
const crypto =require("crypto")



// capture the payment and intiate the payment

exports.capturePayment = async (req,res)=>{
    console.log("hi i am in payment")

    const {courses} = req.body;
    const userId = req.user.id;
    console.log("hi i am in payment")
    if(!courses){
        return res.status(400).json({
            success:false,
            message:"please provide valid courses"
        })
    };

    if(courses.length ===0){
        return res.status(400).json({
            success:false,
            message:"please provide valid courses"
        })
    }
    let totalAmoun=0;

    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"could not find the courses"
                })
            }
            
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"student already Enrolled"
                })
            }

            console.log("new student")
            totalAmoun +=course.price
            console.log(Math.random(Date.now()).toString())



        }catch(err){
            console.log(err);
            return res.status(200).json({
                success:false,
                message:"can't buy this course right noe please try after some time"
            })

        }

        const option={
            amount:totalAmoun*100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString()
        }
        try {
            const paymentResponse =await instance.orders.create(option);
            res.status(200).json({
                success:true,
                message:"payment response",
                data:paymentResponse
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success:false,
                message:"can't create payment instance"
            })
        }

    }

    
}




exports.verifyPayment =async (req,res)=>{


    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature =req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId =req.user.id;
    console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature,courses,userId)

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        console.log("some thing is missing")
        return res.status(200).json({
            success:false,
            message:"payment failed"
        })
    }
    // let body = razorpay_order_id + "|" + razorpay_payment_id;
    // console.log('error here')
    // const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest() -->> i have miss there to write "hex" in digest;

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      await enrolle(courses, userId, res)
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }



    if(expectedSignature === razorpay_signature){
        console.log("going in fintion to purcase the course")

  await enrolle(courses,userId,res)
        return res.status(200).json({
            success:true,
            message:"payment verify"
        })
    }
    return res.status(200).json({ success: false, message: "Payment Verified fail" })
    


}

const enrolle = async (courses,userID,res) =>{
    if( !courses || !userID ){
        return res.status(400).json({
            success:false,
            message:"please provide data for courses or userId"
        })
    }


    for(const course_id of courses){
        const enrolledCourse = await Course.findOneAndUpdate({_id:course_id},{
            $push:{
                studentsEnrolled:userID
            }
        },{new:true})

        if(!enrolledCourse){
            return res.status(400).json({
                success:false,
                message:"course not found",
            })
        }
        const enrolledstudent = await User.findByIdAndUpdate(userID,{
            $push :{
                courses:course_id
            }
        },{new:true})

        const emailrespone = await mailSender(enrolledstudent.email,"successfully Enrolled into course","this is mail to tell you are now enrolled into course")

    }
    
    
}























































// exports.capturePayment = async (req,res)=>{
//     try {
//         // get course ID and user is 
//         const {courseId} = req.body;

//         const userID = req.User.id;
//         // vadidation
//         if(!courseId){
//             return res.status(404).json({
//                 success:false,
//                 message:"please enter valid couse id"
//             })
//         }
//         // valid course ID and valide course
//         const courseDetails = await Course.findById(courseId);
//         if(!courseDetails){
//             return res.status(404).json({
//              success:false,
//              messaage:"course don't exist please choose a valid course"
//             })
//         }
//         // is user already exist
//         const uid = new mongoose.Types.ObjectId(userID);
//         if(courseDetails.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"you have already buyed this course please check your dashboard"
//             })
//         }

//         // creater order

//         const amount = courseDetails.price;
//         const currency ="INR";

//         const option={
//             amount:amount*100,
//             currency:currency,
//             receipt: Math.random(Date.now().toString()),
//             notes:{
//                 courseID:courseDetails,
//                 userID
//             }
//         }


//         try {
//             const paymentResponce = await instance.orders.create(option)
//             return res.status(200).json({
//                 success:true,
//                 courseName:courseDetails.courseName,
//                 courseDescription:courseDetails.courseDescription,
//                 orderID:paymentResponce.id,
//                 amount:paymentResponce.amount,
//             })
//         } catch (error) {

//             return res.json({
//                 succes:false,
//                 message:"error during paymet attemp"
//             })
//         }

//         // return the responce
//     } catch (error) {
        
//         return res.json({
//             succes:false,
//             message:"could not initiate order/payment"
//         })
        
//     }
// }


// exports.verifySignature = async (req,res) =>{
//     try {
//         const secret = "12345678";

//         const signature = req.header["x-razorpay-signature"];

//        const shasum=  Crypto.createHmac("sha256",secret);
//        shasum.update(JSON.stringify(req.body));
//        const digest = shasum.digest("hex");

//        if(signature == digest){
//         console.log("payment is authorized");
//         const {courseID,userID} = req.body.payload.payment.entity.notes;

//         try {
            
//             const enrolledCourse = await Course.findOneAndUpdate({_id:courseID},{
//                 $push:{
//                     studentsEnrolled:userID
//                 }
//             },{new:true})

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"some thing gone wronge in enrolling the student"
//                 })
//             }


//             const enrolledStudent = await User.findOneAndUpdate({_id:userID},{
//                 $push:{
//                     courses:courseID
//                 }
//             },{new:true})

//             const email = mailSender(enrolledStudent.email,"course buy succcessfuly","thanks for taking the couses",)

//             return res.status(200).json({
//                 succes:true,
//                 message:"course buy successfuly"
//             })

//         } catch (error) {
            
//             return res.status(400).json({
//                 success:false,
//                 message:"some thing went wrong on purchasing the course"
//             })
//         }
        


//        }
//        else{
//         return res.status(400).json({
//             success:false,
//             message:"signature not matches"
//         })
//     }
//     } catch (error) {
//         return res.status(400).json({
//             success:false,
//             message:"not abel to verify"
//         })
        
//     }
// }