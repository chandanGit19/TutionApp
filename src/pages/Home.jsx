import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import {Link} from 'react-router-dom'
import HighlightText from '../component/core/HighlightText'
import CTAButton from '../component/core/Button'
import banner from '../assets/images/banner.mp4'
import ImageTimeLine from '../assets/images/TimelineImage.png'
import CodeBlocks from '../component/core/CodeBlocks';
import Logo1 from "../assets/Logoes/Logo1.svg"
import Logo2 from "../assets/Logoes/Logo2.svg"
import Logo3 from "../assets/Logoes/Logo3.svg"
import Logo4 from "../assets/Logoes/Logo4.svg"
import Know_your_progress from "../assets/images/Know_your_progress.png"
import compare_with_other from "../assets/images/Compare_with_others.png"
import plan_your_lession from "../assets/images/Plan_your_lessons.png"
import Instructor from "../assets/images/Instructor.png"
import ExploreMore from '../compo/ExploreMore'



const Home = () => {

  const TimeLineSection =[
    {
      Logo:Logo1,
      heading:"LeaderShip",
      Discripton:"Fully commited toward your future"
    },
    {
      Logo:Logo2,
      heading:"LeaderShip",
      Discripton:"Fully commited toward your future"
    },
    {
      Logo:Logo3,
      heading:"LeaderShip",
      Discripton:"Fully commited toward your future"
    },
    {
      Logo:Logo4,
      heading:"LeaderShip",
      Discripton:"Fully commited toward your future"
    },
  ]
  return (
    <div>
        {/* section 1 */}
      <section className='relative mx-auto flex flex-col w-11/12 items-center  justify-between text-white group '>
        <Link to= {"/signup"}>
            <div className='mt-16 p-1  overflow-hidden mx-auto rounded-full w-fit bg-richblack-800 font-bold text-richblack-500 transition-all duration-200 group-hover:text-white  hover:scale-95'>
                <div className='flex items-center gap-3  px-10 py-[5px]' >
                
                <p>Become an Instructor</p>
                <FaArrowRight/>
                </div>
            </div>
             </Link>

             <header className='text-center text-4xl font-bold mt-4'>
              <p>Empower your future with <HighlightText text ={"Coding"}/></p>

              <div className='mt-5 mx-auto w-[70%] text-center text-lg font-bold text-richblack-300'>
                With our online coading Courses , you can leatn at your own pace , from anywhere in the world and get access to a wealth of resourse,
                including hands-on project ,quizzes and personalized feedback from Instructor
              </div>
             </header>
             <div className='flex gap-7 mt-6'>
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>

              <CTAButton>
                Book a demo
              </CTAButton>

             </div>

             <div className='shadow-blue-200 mx-3 my-12 w-[80%] rounded-sm overflow-hidden' >
              <video src={banner} className='h-[60%]' muted loop autoPlay/>

             </div>

             {/* code section */}

             <div>
              <CodeBlocks 
              position={"lg:flex-row"}
              heading={
                <div className='text-4xl font-semibold'>
                  Unlock Your  
                   <HighlightText text={" Coding Potential "}/> with our online courses
                </div>
              }
              subheading={"Our courses are designed and taught by industry experts who have years of experince in coaching the aspirant"
              }

              ctabtn1={
                {btnText:"try it yourself",
                  linkto:"/signup",
                  active:true
                }
              }
              ctabtn2={
                {btnText:"try it yourself",
                  linkto:"/login",
                  active:false
                }
              }
              codeblock={`<!DOCTYPE html> \n <html> \n <head><title>Chandan project \n </title><head> \n <link rel =" styleSheet" \n </head> This is not a video \n This is made by react-type-Animation`}
              codeColor={"text-yellow-25"}
              />

              
             </div>
             <div>
              <CodeBlocks 
              position={"lg:flex-row-reverse"}
              heading={
                <div className='text-4xl font-semibold'>
                  Unlock Your  
                   <HighlightText text={" Coding Potential "}/> with our online courses
                </div>
              }
              subheading={"Our courses are designed and taught by industry experts who have years of experince in coaching the aspirant"
              }

              ctabtn1={
                {btnText:"try it yourself",
                  linkto:"/signup",
                  active:true
                }
              }
              ctabtn2={
                {btnText:"try it yourself",
                  linkto:"/login",
                  active:false
                }
              }
              codeblock={`<!DOCTYPE html> \n <html> \n <head><title>Chandan project \n </title><head> \n <link rel =" styleSheet" \n </head> This is not a video \n This is made by react-type-Animation`}
              codeColor={"text-yellow-25"}
              />

              
             </div>

            <ExploreMore/>




      </section>



        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 flex flex-col  justify-center '>
          <div className='homepage_bg h-[300px]'>
            <div className='h-[40%]'></div>
            <div className='w-11/12 flex items-center justify-center gap-5 mx-auto' >
              <div className='flex gap-7'>
                <CTAButton active={true} linkto={'/signup'}>
                  <div className='flex gap-2 items-center'>
                    Explore Full Catalog
                    <FaArrowRight/>
                  </div>
                </CTAButton>
                <CTAButton active={false} linkto={'/signup'}>
                  <div className='flex gap-2 items-center'>
                    Learn more
                  </div>
                </CTAButton>
              </div>

            </div>
            

          </div>

          <div className='mx-auto mt-7 flex flex-col items-center w-11/12 justify-center gap-7 mb-10'>
            <div className='flex  gap-5 justify-center'>
              <div className='text-4xl font-semibold w-[45%] '>
                Get the skills you need for a <HighlightText text={" job that is in demand"} />
              </div>
              <div className='flex flex-col gap-10  w-[40%] items-start'>
                <p className='text-[16px]'>
                  The modern StudyNotion is the dictates its own term . Today , to be a competitive specialist requires more than professional skills.
                </p>
                <CTAButton active={true} linkto={'/signup'}  >
                  Learn more
                </CTAButton>

              </div>

            </div>

          </div>


          <div className='flex gap-15 items-center justify-center w-10/12 mx-auto mt-6'>
            <div className='flex flex-col w-[45%] gap-2'>
              {
                TimeLineSection.map((element ,index)=>(
                  <div className='flex gap-1' key={index}>
                    <div className='w-[50px] h-[50px] bg-white flex items-center'>
                         <img src={element.Logo} alt='logo'/>
                    </div>

                     <div>
                      <h2 className='font-semibold text-[18px] '> {element.heading}</h2>
                      <p>{element.Discripton}</p>
                      </div>
                  </div>
                ))
              }

            </div>

            <div className='relative shadow-blue-5 w-[60%]'>
              <img src={ImageTimeLine} alt='Time line ' className='shadow-pure-greys-25 h-fit w-full'/>

              <div className='absolute bg-caribbeangreen-700 flex text-white gap-5 uppercase py-10 px-4 left-[50%] -translate-y-[70%] -translate-x-[50%] '>
                <div className='flex gap-2 border-r items-center border-caribbeangreen-300 px-4 '>
                  <h1 className='text-4xl'>10</h1>
                  <h2 className=''>10 year of experince</h2>
                </div>
                       
                <div className='flex gap-2 items-center '>
                  <h1 className='text-4xl'>250</h1>
                  <h2 className=''>Type of courses</h2>
                </div>
              </div>


            </div>



          </div>

                       
           <div className='learnig_language flex flex-col items-center justify-center w-10/12 mx-auto mt-[130px] mb-9'>
            <div className='h-[1px] bg-blue-800'></div>
            <div className='mx-auto text-4xl font-bold text-center mt-6'>
              Your swiss knife for <HighlightText text={" Learning any langugae"}/>
            </div>
            <div className='text-center text-richblack-600 mx-auto mt-6 w-[65%]' >
              Using spin making learning multiple languages easy . With 20+ languages realistic voice-over , progress tracking custom schedule and more 
            </div>

            <div className='flex items-center justify-center mt-6  group transition-all duration-100'>
            <img src={Know_your_progress} alt='progessimge' className='object-contain w-[40%] -mr-36 group-hover:-mr-12 transition-all duration-100'/>
            <img src={compare_with_other} alt='comparewithotherimage' className='object-contain w-[40%] transition-all duration-100'/>
            <img src={plan_your_lession} alt='planeimage' className='object-contain w-[40%] -ml-36 group-hover:-ml-14 transition-all duration-100'/>
            </div>
            <div className='w-fit'>
            <CTAButton active={true} linkto={"/sibgup"}>
                Learn More...
            </CTAButton>
            </div>

           </div>

        </div>






        {/* section 3 */}
        <div className='w-10/12 mx-auto flex flex-col gap-8 bg-richblack-900  text-white'>
          <div className='flex items-center justify-between mt-5'>
            <img src={Instructor} alt='instructorImage' className='w-[45%]'/>
           <div className='w-[50%] flex flex-col '>
            <div className='text-4xl text-white font-semibold w-[50%] mb-9'>
              Become an <HighlightText text={"Instructor"}/>
            </div>
            <p className='mb-9'>
              Instructor from around the world teach millons of students on StudyNotion .We provides the tools and skills to teach what you love
            </p>
             <div className='w-fit'>
            <CTAButton active={true} linkto={'/signup'}> 
                 <div className='flex gap-3 items-center'>
                  Start learning Today
                  <FaArrowRight/>
                 </div>
            </CTAButton>
            </div>

           </div>
          </div>

          <h2 className='text-4xl mx-auto' >
            {/* Reviews from the learner */}
          </h2>

        </div>






        {/* Footer */}



    </div>
  )
}

export default Home

// section 1


