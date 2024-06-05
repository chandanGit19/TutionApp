import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, matchPath, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const {user} = useSelector((state)=>state.profile);
    console.log(user)
    const dispatch =useDispatch();
     const navigate = useNavigate();
     const location  = useLocation()
     const sidebarLinks =[ {
        id: 1,
        name: "My Profile",
        path: "/dashboard/my-profile",
        // type:null,

      },
      // {
      //   id: 16,
      //   name: "My Profile",
      //   path: "/dashboard/my-profile",
      //   type:"unknown"

      // },
      {
        id: 2,
        name: "Dashboard",
        path: "/dashboard/instructor",
        type: "instructor"
      },
      {
        id: 3,
        name: "My Courses",
        path: "/dashboard/my-courses",
        type: "instructor"
      },
      {
        id: 4,
        name: "Add Course",
        path: "/dashboard/add-course",
        type: "instructor",
      },
      {
        id: 5,
        name: "Enrolled Courses",
        path: "/dashboard/enrolled-courses",
        type: "student"
      },
      {
        id: 6,
        name: "Your Cart",
        path: "/dashboard/cart",
        type: "student",
      },]

      const matchroute =(route)=>{
        return matchPath(route,location.pathname)
      }

  return (
    <div>
       <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <Link key={link.id} to={link.path}  >
                 <p className={`text-2xl font-bold text-center ${matchroute(link.path) ? "bg-richblack-900" : "bg-richblack-600"}  my-5 py-2 mx-1 rounded-sm`}>{link.name} </p>
              </Link>
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col ">
          {/* <Link
            to={ "/dashboard/settings" }
          >
            <p className='text-2xl font-bold text-center bg-richblack-700 my-5'>
                Setting
            </p>
          </Link> */}
    </div>
    </div>
    </div>
  )
}

export default Sidebar
