import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "./Slices/AuthSlice"
import profileReducer from "./Slices/profileSlice"
import cartReducer from "./Slices/cartSlice"
import courseReducer from "./Slices/viewCoursess"
import coursessReducer from "./Slices/courses"

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    coursess:coursessReducer,
})
export default rootReducer