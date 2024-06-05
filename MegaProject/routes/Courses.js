const express = require("express");

const router = express.Router();

const {createCourse,getAllCourseDetails,showAllCourses} = require("../controller/Course");
const {createSection,updateSections,deletSection} = require("../controller/Section");
const {createSubsection} = require("../controller/Subsection");
const {createRating,getAllRating,getAverageRating} = require("../controller/RatingAndReview");
const {auth,isAdmin,isInstructor,isStudent} = require("../middelware/auth")
const {showAllCatagorys,CreateCatagory,catagoryPagesDetails} = require("../controller/Catagory")
// const {createCourse,showAllCourses,getAllCourseDetails} = require("../controller/Course");


 
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/createSection",auth,isInstructor,createSection);
router.post("/updateSection" ,auth ,isInstructor,updateSections);
router.post("/getAllCourseDetails",getAllCourseDetails);
router.get("/showAllCourses",showAllCourses);
router.post("/createSubSection" ,auth,isInstructor,createSubsection);
router.post("createRating",auth,isStudent,createRating);
router.get("/getAllRating",getAllRating);
router.get("/averageRating",getAverageRating);
router.post("/createCategory",auth,isAdmin,CreateCatagory);
router.get("/showAllcategory",showAllCatagorys);
router.post("/categoryPagesDetails",catagoryPagesDetails);





module.exports = router
