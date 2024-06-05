import React from 'react'
import { Link } from 'react-router-dom'

const Course_card = ({course ,height="250px"}) => {
  return (
    <div className='mx-auto h-full'>
        <Link to={`/courses/${course._id}`}>
        <div>
            <img 
            src={course?.thumbnail}
            className={`h-[${height}] w-sm rounded-sm object-cover`}/>
        </div>
        <div>
            <p>
            price :{course?.price}              
            </p>
            <p>
               {/* Instructor Name : {course?.instructor?.firstName} */}
            </p>
            <p>
            Course Title : {course.courseName}                
            </p>
        </div>
        </Link>
      
    </div>
  )
}

export default Course_card
