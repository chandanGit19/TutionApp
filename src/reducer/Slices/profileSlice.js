import {createSlice} from "@reduxjs/toolkit"

const initialState  = {
    user: localStorage.getItem("userrr") ? JSON.parse(localStorage.getItem("userrr")) : null 

} 


const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        resetProfile: (state) => {
            state.user=null;
            localStorage.removeItem("userrr");
          },

    }
})

export const {setUser,resetProfile} = profileSlice.actions;
export default profileSlice.reducer;