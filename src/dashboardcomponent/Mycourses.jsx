import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdOutlineAddToPhotos } from "react-icons/md";
import { profileEndpoints } from '../services/api'
import { apiConnector } from '../services/apiconnector'

const Mycourses = () => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])


    // const { token } = useSelector((state) => state.auth)
    // const navigate = useNavigate()
  
    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const getEnrolledCourses = async () => {
        console.log("mai chala hu bhai")
      try {
        const res = await apiConnector("GET",profileEndpoints.GET_USER_DETAILS_API,null,{Authorisation: `Bearer ${token}`});
   
        setEnrolledCourses(res);
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    };
    console.log(enrolledCourses)
    useEffect(() => {
      getEnrolledCourses();
    }, [])
  
    // useEffect(() => {
    //   const fetchCourses = async () => {
    //     // const result = await fetchInstructorCourses(token)
    //     // if (result) {
    //     //   setCourses(result)
    //     // }
    //   }
    //   fetchCourses()
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
  return (
    
      <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <button
          onClick={() => navigate("/dashboard/add-course")} className='flex items-center gap-2 bg-richblack-700 px-3 py-5 rounded-md'
        >
            Add courses
            <MdOutlineAddToPhotos size={20}/>
        </button>
      </div>
      {/* {courses && <CoursesTable courses={courses} setCourses={setCourses} />} */}
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.data.userDetails.courses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet. please enrolle in any courses.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Total-Student</p>
            <p className="flex-1 px-2 py-3">Total-Income</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.data.userDetails.courses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                // onClick={() => {
                //   navigate(
                //     `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                //   )
                // }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course.studentsEnrolled.length}</div>
              <div className="flex-1 flex w-1/5 justify-between gap-9 px-2 py-3">
                <p className='w-[90px]'>{course.studentsEnrolled.length*course.price}</p>
                <div className='flex flex-wrap gap-3 justify-center '>
                  <button className='bg-richblack-700 text-center font-bold px-1 py-2 rounded-md'>
                    Edit Course
                  </button>
                  <button className='bg-richblack-700 text-center font-bold px-1 py-2 rounded-md text-nowrap'>
                    Delete course
                  </button>
                </div>
                {/* <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                /> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  )
}

export default Mycourses
