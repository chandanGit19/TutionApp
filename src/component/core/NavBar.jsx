import React, { useEffect, useState } from 'react'
import { Link ,matchPath,useLocation} from 'react-router-dom'
import logo from "../../assets/homeLogo/Logo-Full-Light.png"
import { NavbarLink } from '../../data/navbar-link'
import { useSelector } from 'react-redux'
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from './ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/api'


const NavBar = () => {
    const location = useLocation();
    const  {token} = useSelector( (state) =>state.auth);
    const {user} = useSelector( (state)=> state.profile);
    const {totalItems} = useSelector((state)=> state.cart);
    const [subLink,setSubLink] = useState([])

   const fetchLink = async ()=>{
    try {
        const result =await apiConnector("GET",categories.CATEGORIES_API)
        console.log(result.data.data)
        setSubLink(result.data.data)
    } catch (error) {
        console.log("can't fetch categories link")
    }
   }

    useEffect(()=>{
        fetchLink()

    },[])


    
    const matchRout = (rout)=>{
        return matchPath({path:rout},location.pathname);
    }
     

  return (
    <div className='border-b-[1px] border-richblack-100 p-4 '>
      <div className='flex w-9/12 justify-between items-center mx-auto '> 
           <Link to={'/'}>
            <img src={logo} alt="logoImage" width={160} height={40} loading='lazy'/>

           </Link>

           <nav>
            <ul className='flex gap-4 text-richblack-25'>
                {NavbarLink.map((element,index)=>{
                    return(
                        <li key={index}>
                            {
                                element.title === "Catalog" ? (<div className='group relative '>
                                    <p>{element.title}</p>

                                    <div className='invisible absolute left-[50%] translate-x-[-50%] top-[150%] flex flex-col bg-richblack-5 text-richblack-900 opacity-0 
                                    group-hover:visible group-hover:opacity-100  lg:w-[180px] p-4 z-10'>
                                            


                                        <div className='absolute left-[50%] top-[-8%] rotate-45 h-6 w-6 bg-richblack-5 '></div>
                                        {
                                                subLink.length  ? (
                                                    subLink.map((ele,index)=>(
                                                        <Link to={`catalog/${ele.name.split(" ").join("-").toLowerCase()}`} key={index} className='border-b border-richblack-500 pb-2'>
                                                        {ele.name}
                                                        </Link>

                                                    ))
                                                ):
                                                (<div></div>)
                                             }
                                    </div>
                                    
                                </div>) :
                                (
                                    <Link to={`${element?.path}`}>
                                        <p className={`${matchRout(element?.path) ? "text-yellow-25" :"text-richblack-25"}`}>
                                        {element.title}
                                        </p>
                                        {/* element?.path */}
                                    </Link>
                                )
                            }

                        </li>
                    )
                })


                }
            </ul>
           </nav>

           {/* login/signup/dashboard */}
           <div className='flex items-center gap-2'>
            {
                user && user?.accountType !="instructor" && (
                    <Link to={"/dashboard/cart"} className='relative text-3xl mr-3'>
                             <IoCartOutline />
                             {
                               totalItems>0 && (
                                    <span className='absolute right-[-20%] top-[-30%]  animate-bounce text-sm bg-caribbeangreen-400 px-[3px] py-[2px] rounded-full'>
                                        {totalItems}
                                    </span>
                                )
                             }
                    </Link>
                )
            }
            {
                token ===null && (
                    <Link to={"/login"}>
                        <button className='border border-richblack-700 bg-richblack-800 rounded-md text-richblack-25 py-2 px-4'>
                            Log in 
                        </button>
                    </Link>
                )
            }
              {
                token ===null && (
                    <Link to={"/signup"}>
                        <button className='border border-richblack-700 bg-richblack-800 rounded-md text-richblack-25 py-2 px-4'>
                            Sign Up 
                        </button>
                    </Link>
                )
            }

            {
                token !== null && <ProfileDropDown/>
            }

           </div>
 
           
      </div>
    </div>
  )
}

export default NavBar
