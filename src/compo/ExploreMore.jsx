import React, { useState } from 'react'
import {HomePageExplore} from '../data/homepage-explore'
import HighlightText from '../component/core/HighlightText';
import CoursesCard from './CoursesCard';
const tabsNaem=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",

]

const ExploreMore = () => {
    const [currentTab,SetCurrentTab] = useState(tabsNaem[0]);
    const [courses,SetCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,SetaCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value)=>{
        SetCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag ==value);
        SetCourses(result[0].courses);
        // console.log(result)
        SetaCurrentCard(result[0].courses[0].heading);
    }

  

  return (
    <div className='relative w-[80%]'>
        <div className='text-4xl font-semibold text-center '>
            Unlock the <HighlightText text={" Power of Code"}/>
        </div>
        <p className='text-[16px] text-center text-richblack-300'>
            Learn to build anything you can imagin
        </p>

        <div className='flex gap-3 justify-center rounded-full bg-richblack-800  px-2 w-fit py-2 mt-7 mx-auto'>
            {
                tabsNaem.map((element,index)=>{
                    return(
                        <div className={`text-[16px] flex items-center py-2 px-2 rounded-full transition-all duration-200 cursor-pointer ${currentTab ===element ? "bg-richblack-400 text-richblack-5 font-medium" : "text-richblack-200"}
                         `} key={index} onClick={()=>setMyCard(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>
        <div className='lg:h-[200px]'></div>
  {/* couses card */}
        <div className='flex gap-7 absolute justify-center -bottom-[20%] w-full'>
            {
                courses.map((ele,index)=>{
                    return(
                        <CoursesCard
                        key={index}
                        cardData={ele}
                        currentCard={currentCard}
                        SetaCurrentCard={SetaCurrentCard}
                        />
                    )
                })
            }

        </div>
      
    </div>
  )
}

export default ExploreMore
