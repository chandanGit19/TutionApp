import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiconnector';
import { catalogData, categories } from '../services/api';
import { useParams } from 'react-router-dom';
import CourseSlider from '../component/core/CourseSlider';

const Catalog = () => {
    const [catalogPage ,setCatalogPage] = useState([]);
    const {catalogName} = useParams();
    const [categoryId,setCategoryId] = useState("")
    const [active, setActive] = useState(1)
   
    
   
    console.log(categoryId)
    console.log(catalogPage)
 
    const getCatalogPageDetail =async (coursesId)=>{
        let res=[];
        try {
            
            const responce = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{catagoryId:coursesId});
            if(!responce?.data?.success){
                console.log("success is false please go on another place")
            }
            res = responce?.data;
            // console.log(res)
           setCatalogPage(res)
       
           
        } catch (error) {   
        }
    }

    const getCategoryID = async ()=>{
        try {
            const responce = await apiConnector("GET",categories.CATEGORIES_API);
            const category_ID = responce?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id ;
            // console.log(category_ID)
            setCategoryId(category_ID);
            
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getCategoryID();

    },[catalogName])

    useEffect(()=>{
        if(categoryId){
            getCatalogPageDetail(categoryId);
        }
      
    },[categoryId])


  return (
    // <div>
    //     <div>
    //         <p>
    //          Home/Catalog/<span className='text-yellow-25'>
    //             {catalogPage?.data?.selectedCatagory?.name}
    //          </span>
    //         </p>
              
    //         <p>
    //         {catalogPage?.data?.selectedCatagory?.name}
    //         </p>

    //         <p>
    //         {catalogPage?.data?.selectedCatagory?.description}

    //         </p>
    //     </div>

    //     <div>

    //         {/* section 1 */}

    //         <div>
    //             <div>
    //                 Courses to get you Started
    //             </div>
    //             <div className='flex gap-3'>
    //                 <p>
    //                     Most popular 
    //                 </p>
    //                 <p>
    //                     New
    //                 </p>
    //             </div>

    //             <div>
    //                  {catalogPage?.data?.selectedCatagory?.course &&
    //                    <CourseSlider course={catalogPage?.data?.selectedCatagory?.course}/> }
                    
                    
    //             </div>
    //         </div>


    //         {/* section 2 */}
    //         <div>
    //             <p>
    //                 Top courses in {catalogPage?.data?.differentCatagory[0].name}
    //             </p>

    //             <div>
    //             {catalogPage?.data?.differentCatagory[0] && <CourseSlider course={catalogPage?.data?.differentCatagory[0].course}/> }
    //            </div>
    //         </div>


    //         {/* section 3 */}

    //         <div>
    //             <p>frequntely brought together</p>
    //         </div>
    //     </div>
      
    // </div>
    <>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                {catalogPage?.data?.selectedCatagory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
              {catalogPage?.data?.selectedCatagory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
              {catalogPage?.data?.selectedCatagory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              {/* <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p> */}
            </div>
            <div>
            {catalogPage?.data?.selectedCatagory?.course &&  <CourseSlider course={catalogPage?.data?.selectedCatagory?.course}/> }
            </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPage?.data?.differentCatagory[0].name}
            </div>
            <div className="py-8">
            {catalogPage?.data?.differentCatagory[0] && <CourseSlider course={catalogPage?.data?.differentCatagory[0].course}/> }
              
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            {/* <div className="section_heading">Frequently Bought</div> */}
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* {catalogPage?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))} */}
              </div>
            </div>
          </div>
    
          {/* <Footer /> */}
        </>
  )
}

export default Catalog
