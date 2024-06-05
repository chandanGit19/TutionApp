import React from 'react'

const CoursesCard = ({cardData ,currentCard,SetaCurrentCard}) => {
    // console.log(cardData)
  return (
    <div className={`w-[100%] flex flex-col p-3 rounded-md gap-12 ${cardData.heading === currentCard ? "bg-white text-black":"bg-richblack-700 text-richblack-500"}`}
    onClick={()=>SetaCurrentCard(cardData.heading)}>
        <div >
            <h1 className='font-semibold mb-7'>{cardData.heading}</h1>
            <p>
            {cardData.description}
        </p>
     
        </div>
        <div className='flex justify-between'>
            <div>
                {cardData.level}
            </div>
            <div>
                {cardData.lessionNumber}
            </div>
        </div>
       
    </div>
  )
}

export default CoursesCard
