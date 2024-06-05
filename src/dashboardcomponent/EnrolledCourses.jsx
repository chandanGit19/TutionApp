import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { profileEndpoints } from '../services/api'
import { apiConnector } from '../services/apiconnector'

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
  
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
  return (
    <div>
        <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
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
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
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
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
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
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Learning is motivation</p>
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
    </>
 
   {/* using this method we can only play video in loop we don't have control on the video as it play on loop as it is set by the developer */}

    {/* <div>
      {
         enrolledCourses && <video src={enrolledCourses.data.userDetails.courses[0].courseContent[0].subSection[0].videoUrl}/>
      }
    </div> */}
      
    </div>
  )
}

export default EnrolledCourses
