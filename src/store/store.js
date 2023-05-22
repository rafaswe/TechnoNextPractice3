import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./Reducers/errorSlice";

export const store = configureStore({
    reducer:{
        errorInfo: errorSlice,
    },
})