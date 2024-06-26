import React, { useEffect, useState } from 'react'
import Tab from './Tab'
import {toast} from 'react-hot-toast'
import { FaEye ,FaEyeSlash} from "react-icons/fa";
import { setSignupData } from '../../reducer/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { endpoints } from '../../services/api';
import { apiConnector } from '../../services/apiconnector';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function Signform() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();


    const [accountType,setAcount]=useState("student")

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    
      const [showPassword, setShowPassword] = useState(false)
      const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
      const { firstName, lastName, email, password, confirmPassword } = formData

      // first send email and hold all the data localy in auth
      const sendOtp = async (email)=>{
        const toastId = toast.loading("loading")
            try {
              console.log("mai chala hu bhai")
              const response = await apiConnector("POST",endpoints.SENDOTP_API,{email});
              // console.log("responce of email " , response)

              if(!response.data.success){
                 toast.error(`${response.data.message}`);
                  navigate("/signup");
                  toast.dismiss(toastId)
                  return console.log("cant send any email right now");
               
              }

              toast.success("email OTP send successfuly")
              navigate("/verify-email")
            } catch (error) {
            toast.error("can't send otp")
              // console.log("error occure in front end during sending otp")
              
            }
            toast.dismiss(toastId)

      }




    
      // Handle input fields, when some value changes
      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
      // Handle Form Submission
      const handleOnSubmit = (e) => {
        e.preventDefault()
    
        if (password !== confirmPassword) {
          toast.error("Passwords Do Not Match")
          return
        }
        const signupData = {
          ...formData,
          accountType,
        }
    

        dispatch(setSignupData(signupData))


        sendOtp(email)
        // Setting signup data to state
        // To be used after otp verification
        // dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        // dispatch(sendOtp(formData.email, navigate))
    
        // Reset
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        // setAccountType(ACCOUNT_TYPE.STUDENT)
        setAcount("student")
      }

    const tabData=[{
        id:1,
        tabName:"student",
        accountType:"student"
    },{
        id:2,
        tabName:"instructor",
        accountType:"instructor"
    }]


    useEffect(()=>{
      if(token){
        navigate("/dashboard/my-profile")
      }

    },[])


  return (
    <div>
        <Tab tabData={tabData} accountType={accountType} setAcount={setAcount}/>
        <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                < FaEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <FaEyeSlash fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <FaEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <FaEyeSlash fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
      
    </div>
  )
}
