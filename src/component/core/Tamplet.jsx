import React from 'react'
import Signform from './Signform'
import Loginform from './Loginform'


const Tamplet = ({title,description1,description2,image,formType}) => {

  return (
    <div className='w-10/12 flex items-center justify-center gap-36 h-[80vh] mx-auto'>
     
     <div className=' w-[45%]  border-2 border-richblack-600 p-2 rounded-md'>
        <h2 className='text-2xl text-center mb-7 font-semibold'>
            {title}
        </h2>
        <p className=' font-semibold'>
            {description1}
            <span className='italic text-yellow-5'>
                {description2}
            </span>
        </p>
        {
            formType === "login" ? (<Loginform/>):(<Signform/>)
        }

     </div>

     <div className='bg-caribbeangreen-300 w-[45%] h-[60%] rounded-[20px] relative'>
        <img src={image} alt='IMageOfTHis' className='absolute -top-[15px] -left-[10px] h-full w-full rounded-[20px] object-cover'/>

     </div>




    </div>
  )
}

export default Tamplet
