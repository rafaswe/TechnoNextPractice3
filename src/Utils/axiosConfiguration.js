import axios from "axios";
import { useDispatch } from "react-redux";
import { setErrorMessage, setHaveError } from "../store/Reducers/errorSlice";



export const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // Headers:{
    //     'Accept': 'application/json'
    // },
    timeout:5000
})


//custom dispatch methods



// Request Interceptor 
axiosInstance.interceptors.request.use((config)=>{
    const dispatch = useDispatch();

    dispatch(setHaveError(false))
    return config;
   
},(error)=>{
    const dispatch = useDispatch();

    if(error.message ==='Network Error'){
        dispatch(setErrorMessage("Network Error..Please check your Internet connection"));
        
    }
    else if(error.message ==='Bad Request'){
                dispatch(setErrorMessage("Bad request"))
    }
    else if(error.message ==='Unauthorized'){
                        dispatch(setErrorMessage("Access Denied"));
            }
    else if(error.message ==='Forbidden'){
                        dispatch(setErrorMessage("Access Denied"));
            }
    else if(error.message ==='Not Found'){
                        dispatch(setErrorMessage("server-side error occurred"));
            }
    else if(error.message ==='Timeout Error'){
                        dispatch(setErrorMessage("server does not respond"));
            }
    else{
        dispatch(setErrorMessage("Something went wrong. Please try again later"))
    }
    dispatch(setHaveError(true))
    
})


// Response Interceptor 
axiosInstance.interceptors.response.use((response)=>{
    const dispatch = useDispatch();
dispatch(setHaveError(false))
return response;
},(error)=>{
    const dispatch = useDispatch();

    if (error.response) {
        const { status } = error.response;
  
        // Handle specific status codes
        if (status === 401) {
          // Perform actions for unauthorized errors (e.g., redirect to login page)
          dispatch(setErrorMessage('Unauthorized error'));
        } else if (status === 404) {
          // Perform actions for not found errors
          dispatch(setErrorMessage('The requested resource is not found on the server'));
        } else {
          // Handle other error status codes
          dispatch(setErrorMessage('something went wrong'));
        }
      } else {
        // Handle network errors
        dispatch(setErrorMessage('Network error occurred'));
      }  
      
      dispatch(setHaveError(true))
    
})