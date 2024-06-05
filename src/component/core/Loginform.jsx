import React, { useEffect } from 'react'
import {toast} from 'react-hot-toast'
import { FaEye ,FaEyeSlash} from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { setLoading,setToken,setSignupData } from '../../reducer/Slices/AuthSlice';
import { apiConnector } from '../../services/apiconnector';
import {setUser} from '../../reducer/Slices/profileSlice'
import { endpoints } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';





export default function Loginform() {
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector( (state)=> state.profile);
    const navigate = useNavigate()
    const dispatch =useDispatch()
    useEffect(()=>{
        if(token || user){
            navigate('/')
        }
    },[])
   
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      })
    
      const [showPassword, setShowPassword] = useState(false)
    
      const { email, password } = formData;

     async function login(email, password) {
        
          const toastId = toast.loading("Loading...")
          dispatch(setLoading(true))
          try {
            const response = await apiConnector("POST", endpoints.LOGIN_API, {
              email,
              password,
            })
      
            // console.log("LOGIN API RESPONSE............", response)
      
            if (!response.data.success) {
                navigate('/')
            }
            //  console.log("printing user details",response.data.existUser)
            toast.success("Login Successful")
            dispatch(setUser({...response.data.existUser}))
            dispatch(setToken(response.data.token))
            // const userImage = response.data?.user?.image
            //   ? response.data.user.image
            //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName} , image: userImage`
           
            
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("userrr", JSON.stringify(response.data.existUser))
            navigate("/dashboard/my-profile")
          } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
          }
          dispatch(setLoading(false))
          toast.dismiss(toastId)
        }
      
    
      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
      const handleOnSubmit = (e) => {
        e.preventDefault()
        login(email, password)
      }
  return (
    <div>
         <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
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
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <FaEye fontSize={24} fill="#AFB2BF" />
          ) : (
            <FaEyeSlash fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
      
    </div>
  )
}
