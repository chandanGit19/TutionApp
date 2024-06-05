import React, { useEffect, useState } from 'react'
import { studentEndpoints } from '../../services/api';
import {toast} from 'react-hot-toast';
import { apiConnector } from '../../services/apiconnector';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoadding } from '../../reducer/Slices/cartSlice';
import { courseEndpoints } from '../../services/api';
import Course_card from './Course_card';
// import CTAButton from "../../component/core/Button"
const CoursesDetails = () => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams()
    const [courseData,setCourseData] = useState(null);
    const [totalstudent,setTotalstudent] = useState(0)
// console.log(token)

    // const {COURSE_PAYMENT_API, COURSE_VERIFY_API } = studentEndpoints;

    async function loadScript(src){
        return new Promise((resolve)=>{
            const script = document.createElement("script");
            script.src = src;

            script.onload = () =>{
                console.log("scripte loaded")
                resolve(true)
            }

            script.onerror = ()=>{
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    async function verifyPayment(bodyData,token){
        const toastId = toast.loading("verifying payment....");
        dispatch(setLoadding(true))

        try {
            console.log("i am in verification and bodydata",bodyData)
            const responce= await apiConnector("POST",studentEndpoints.COURSE_VERIFY_API,bodyData,{
                Authorisation:`Bearer ${token}`,
            }
            )
            
            console.log("second part in verification")

            if(!responce.data.success){
                console.log("success false in verification")
                console.log("error dudo beeeeeeee")
            }
            toast.success("payment successfull");
            navigate("/dashboard/enrolled-courses");
            dispatch(setLoadding(false))
        } catch (error) {
            
            console.log("erroe in verifying");
            toast.dismiss(toastId)
            toast.error("can't move forward")
        }
   toast.dismiss(toastId);
    }


    async function buyCouses(token ,courses,userDetails){
        const toastid = toast.loading("Loading..")
        try {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if(!res){
                toast.error("failed to load razorpay")
            }
            // 
            console.log("step 1",courses)
            const ordercapture = await apiConnector("POST",studentEndpoints.COURSE_PAYMENT_API,{courses},{ Authorisation:`Bearer ${token}`})

            console.log("ordercapture" ,ordercapture)

             if(!ordercapture.data.success){
                toast.dismiss(toastid)
                toast.error(ordercapture.data.message)
                return console.log("error showing on front end as failed in payment");
             }
              console.log("api key ---> zp_test_DWYqJIt4IyNzn8",ordercapture.data.data.currency)
             const options = {
                key:'rzp_test_DWYqJIt4IyNzn8',
                currency:ordercapture.data.data.currency,
                amount:ordercapture.data.data.amount,
                order_id:ordercapture.data.data.id,
                name:"chandan Tution",
                description:"thanks for buying the course",
                prefill:{
                    name:userDetails.firstName,
                    email:userDetails.email,
                },
                handler: function (responce){
                    console.log(responce)
                      verifyPayment({...responce,courses},token)
                }
             }
             const paymentObject = new window.Razorpay(options)
             paymentObject.open();



        } catch (error) {
            console.log("payment api errror......");
            toast.error("could not make payment")
            
        }
        toast.dismiss(toastid);
    }


    const handleBuyCourse = () =>{
        if(token){
            buyCouses(token,[courseId],user);
            return;
        }
        console.log("no user")
        navigate("/login")
    }

    async function fetchDetails(){

        try {
            let cour = await apiConnector("POST",courseEndpoints.COURSE_DETAILS_API,{courseID:courseId});
            console.log(cour.data.data)
            setTotalstudent(cour.data.data.studentsEnrolled.length)
            setCourseData(cour)
        } catch (error) {
            console.log("cant fetch data of courses")
            
        }
        
        
    } 

    useEffect(()=>{
        fetchDetails()
    },[courseId])

    const [isActive,setActive]=useState(Array(0))

    const handelActive=(id)=>{

    }
    


  return (
    <div className=' text-richblack-5 w-10/12 mx-auto'>
        <div className='relative bg-richblack-800 p-14'>
            <div className='w-[40%] mt-6'>
            <h1 className='text-3xl font-bold text-left pb-5'>
                { courseData && courseData?.data?.data?.courseName}
            </h1>

            <p className= ' text-2xl font-semibold italic mb-5'>
               This course is created by :- <span className='text-yellow-5'>{ courseData && courseData.data.data.instructor.firstName}</span>
            </p>

            <p className='font-semibold '>
Total students enrolled :-{totalstudent}

            </p>
            </div>
            <div className='absolute top-[50%] right-[6%] border border-richblack-200 p-4'>
              {courseData && <div>
                <img
                src={courseData.data.data?.thumbnail} height={250} width={250}/>
                

              <p className='mt-2 txt-2xl font-bold'>
                {
                    courseData.data.data?.price
                }
              </p>
              <button className='text-black rounded-sm p-2 mt-2 w-full mx-auto bg-yellow-5' onClick={handleBuyCourse}>
                  buy now
                   </button>
                   </div> }
                
            </div>
        </div>
        <div className='mt-7 w-[60%] px-2 py-7 bg-richblack-800'>
            <p>
                What you will learn
                <div>
                    { courseData && courseData.data.data?.whatWillYouLearn}
                </div>
            </p>
        </div>

        <div>
            <div>
                <p>
                    Course Contnent :
                </p>
            </div>

            <div>
                <span>{courseData && courseData.data.data?.courseContent.length }  section(s)</span>
            </div>
            <div>
                <button className='text-yellow-50' onClick={()=>setActive([])}>
                    Collaps all sections
                </button>
            </div>



        </div>
        
     
    </div>
  )
}

export default CoursesDetails
