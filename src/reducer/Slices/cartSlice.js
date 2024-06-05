import {createSlice} from "@reduxjs/toolkit"

const initialState  ={
    loading:false,
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,

} 


const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.totalItems = value.payload
        },
        setLoadding(state,value){
            state.loading = value.payload
        },
        resetCart: (state) => {
            // state.cart = []
            // state.total = 0
            state.totalItems = 0
            
            // localStorage.removeItem("cart")                // Update to localstorage
            // localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
          },

    }
    
})

export const {setTotalItems,setLoadding,resetCart} = cartSlice.actions;
export default cartSlice.reducer;