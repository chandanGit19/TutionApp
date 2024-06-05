import React from 'react'

const Tab = ({tabData,accountType,setAcount}) => {
  return (
    <div className='p-1 flex items-center gap-2 bg-richblack-800 w-fit rounded-md my-4 cursor-pointer '>
        {
            tabData.map((ele)=>(
                <div key={ele.id} onClick={()=>setAcount(ele.accountType)} className={`${accountType===ele.accountType ? "bg-richblack-600 text-richblack-5" :"text-richblack-300"} p-2 rounded-md`}>
                        {ele.tabName}
                </div>
            ))
        }

      
    </div>
  )
}

export default Tab
