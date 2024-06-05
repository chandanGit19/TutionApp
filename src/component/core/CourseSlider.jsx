import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import {FreeMode ,pagination} from 'swiper'
import Course_card from './Course_card';
 

const CourseSlider = ({course}) => {
  console.log(course.length)
  return (
    <div>
      
        {
            course.length ? (
                <div>
                    <Swiper
                    slidesPerView={3}
                    loop={true}
                    spaceBetween={25}
                    >
                      {
                        course.map((course,index)=>(
                          <SwiperSlide key={index}>
                            <Course_card course={course} />
                          </SwiperSlide>
                        ))
                      }
                        
                    </Swiper>

                </div>

            ):
            (<p> courses not found</p>)
        }
      
    </div>
  )
}

export default CourseSlider
