import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEntireCourseData,setCourseSectionData } from '../reducer/Slices/viewCoursess';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/api';
import Sidecontroller from './Sidecontroller';

const ViewVideo = () => {
  const {token} = useSelector((state)=>state.auth)
 const {courseId} = useParams();
 const dispatch = useDispatch();


 useEffect(() => {
  ;(async () => {
    const courseData = await apiConnector("POST",courseEndpoints.COURSE_DETAILS_API,{courseID : courseId},{Authorisation :`Bearer ${token}`})
    console.log("Course Data here... ", courseData.data.data.courseContent)
    dispatch(setCourseSectionData(courseData.data.data.courseContent))
    dispatch(setEntireCourseData(courseData.data.data))
  })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
       
       <div className=''>
        <Sidecontroller/>
       </div>
       <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto mx-6'>
       <Outlet/>
       </div>
        
      
    </div>
  )
}

export default ViewVideo
