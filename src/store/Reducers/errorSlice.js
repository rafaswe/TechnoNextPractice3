import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
    name: "error",
    initialState: {
        haveError: false,
        errorMessage:""  
    },
    reducers:{
        setHaveError: (state,action)=>{
            state.haveError = action.payload;
        },
        setErrorMessage: (state,action)=>{
            state.errorMessage = action.payload;
        }
    }
})

export const {setHaveError,setErrorMessage} = errorSlice.actions;
export default errorSlice.reducer;