import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { endpoints } from '../services/api'
import { apiConnector } from '../services/apiconnector'
import { useDispatch } from 'react-redux'


const EmailVerify = () => {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const [otp,setOtp] = useState("")
    // const [res,setres] =useState("")
    const {signupData} = useSelector((state)=>state.auth) 

    

    const singin =async (e)=>{
        e.preventDefault()
        const toastId =toast.loading("creating account")
        const {  lastName,firstName, email, password, confirmPassword,accountType } = signupData ;
        try {

            const response = await apiConnector("POST",endpoints.SIGNUP_API,{firstName,lastName,email,password,confirmPassword,accountType,otp})
            console.log("response is here",response.data.success)

            if(!response.data.success){
                console.log("can't create acccount right know");
                navigate('/signup')
            }
            // setres(response)

            toast.success("account created succesfully");

            navigate("/login")
        } catch (error) {
            console.log("error occure durring creating account")
        }
        toast.dismiss(toastId)
    }
    const handelopt = (e)=>{
        setOtp(e.target.value)
        console.log(otp)
    }

    useEffect(()=>{
     if(!signupData){
        navigate('/signup')
     }
    },[])



  return (
    <div className=' h-[80vh]  flex justify-center items-center mx-auto w-9/12  '>
        <form onSubmit={singin}>
            <label className='flex flex-col gap-3 '>
                <h1 className='text-center text-4xl '>Please enter your OTP</h1>
                <input
                type='text'
                name='otp'
                value={otp}
                onChange={handelopt}
                placeholder="Enter  otp please"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
                className='text-richblack-800 px-3 py-2 font-bold text-2xl'
                />
            </label>
            <button className='px-4 py-2 bg-richblack-500 text-richblack-25 text-2xl uppercase'>
                summit
            </button>
        </form>


      
    </div>
  )
}

export default EmailVerify
