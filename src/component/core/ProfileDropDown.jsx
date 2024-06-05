import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDropdown,IoMdArrowDropup } from "react-icons/io";
import { RiProfileFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { resetAuth } from '../../reducer/Slices/AuthSlice';
import { resetCart } from '../../reducer/Slices/cartSlice';
import { resetProfile } from '../../reducer/Slices/profileSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProfileDropDown = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const [open ,setOpen] = useState(false);
  const ref = useRef(null);
  const {user} = useSelector((state)=>state.profile)
  // console.log(ref)


  const LogOut=()=>{
    dispatch(resetAuth());
    dispatch(resetCart());
    dispatch(resetProfile());
    navigate("/login")

  }

  useEffect(()=>{
    const listener =(event)=>{
     
      if(!ref.current || ref.current.contains(event.target) ){
        // console.log(ref.current)
        return;
      }
      setOpen(false);
    }
      

      document.addEventListener("mousedown",listener);
      document.addEventListener("touchstart",listener)

      return()=>{
        document.removeEventListener("mousedown",listener);
        document.removeEventListener("touchstart",listener)
      }

    
    
  },[ref,open])
  return (
    <div className='text-richblack-5'>
      <button className='relative ' ref={ref}>
        <div className='flex gap-2 items-center p-1 bg-richblack-500 rounded-md  relative ' onClick={()=>setOpen(!open)}>
          <img src={user?.image} alt="profileImage" className='rounded-full
          object-cover w-[30px]'/>
          {
            open ? <IoMdArrowDropup/>:<IoIosArrowDropdown />
          }
        </div>
    

      {
        open && (
          // 
          <div className='absolute top-[110%] -left-[20%] z-[100] text-richblack-5  py-2 px-1 rounded-md bg-richblack-700 border border-richblack-400 ' onClick={(e)=>e.stopPropagation}  >
            <Link to={'/dashboard/my-profile'} onClick={()=>setOpen(false)}>
              <div className='flex gap-1 items-center justify-start border-b border-richblack-50 mb-2 pb-1'>
                <RiProfileFill/>
                Dashboard

              </div>
            </Link>
            <div className='flex  gap-1 items-center justify-start ' onClick={()=>{LogOut() ;setOpen(false)}}> 
              <MdLogout/>
              LogOut

            </div>
          </div>
        )
      }
        </button>
     
    </div>
  )
}

export default ProfileDropDown
