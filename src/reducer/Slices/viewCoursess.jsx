import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    courseSectionData: [],
    courseEntireData: [],

}

const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
          },
          setEntireCourseData: (state, action) => {
            state.courseEntireData = action.payload
          },

    }
})
export const {setCourseSectionData ,setEntireCourseData} = courseSlice.actions;
export default courseSlice.reducer;
