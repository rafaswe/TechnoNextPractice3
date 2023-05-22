import axios from 'axios';
import { useEffect, useState } from 'react';
import SingleUser from './singleUser';

const Home = () => {
    const [errorMessage,setErrorMessage]= useState("");

    const [data,setData]= useState([]);
    const [haveError,setHaveError]= useState(false);
    
    
    //Custom instance Creation
    const axiosInstance = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com',
        // Headers:{
        //     'Accept': 'application/json'
        // },
        timeout:5000
    })
// Request Interceptor 
axiosInstance.interceptors.request.use((config)=>{

    setHaveError(false)
        return config;
       
    },(error)=>{

        if(error.message ==='Network Error'){
            setErrorMessage("Network Error..Please check your Internet connection");
        }
        else if(error.message ==='Bad Request'){
                    setErrorMessage("Bad request");
        }
        else if(error.message ==='Unauthorized'){
                            setErrorMessage("Access Denied");
                }
        else if(error.message ==='Forbidden'){
                            setErrorMessage("Access Denied");
                }
        else if(error.message ==='Not Found'){
                            setErrorMessage("server-side error occurred");
                }
        else if(error.message ==='Timeout Error'){
                            setErrorMessage("server does not respond");
                }
        else{
            setErrorMessage("Something went wrong. Please try again later")
        }
        setHaveError(true)
        
    })


// Response Interceptor 
axiosInstance.interceptors.response.use((response)=>{
    setHaveError(false)
    return response;
    },(error)=>{

        if (error.response) {
            const { status } = error.response;
      
            // Handle specific status codes
            if (status === 401) {
              // Perform actions for unauthorized errors (e.g., redirect to login page)
              setErrorMessage('Unauthorized error');
            } else if (status === 404) {
              // Perform actions for not found errors
              setErrorMessage('The requested resource is not found on the server');
            } else {
              // Handle other error status codes
              setErrorMessage('something went wrong');
            }
          } else {
            // Handle network errors
            setErrorMessage('Network error occurred');
          }  
          
          setHaveError(true)
        
    })
    
    useEffect(()=>{
        
        axiosInstance.get('/users')
        .then((response)=>{
            const data =response.data;
            setErrorMessage("")
            setData(data)
            setHaveError(false)
            // console.log(data)
        })
        .catch((error)=>{
            console.log("Error = " + error.message);
            setHaveError(true)
        })
      
    },[])



  return (
    <div className='container text-center mt-4'>
        <h1>Data Fetching by Axios</h1>


         {
            haveError?<h2>{errorMessage}</h2> :
            data.map((user)=>{
                return(
                    <SingleUser userInfo={user} key={user.id} />
                )
            })
         }
    </div>
  )
}

export default Home