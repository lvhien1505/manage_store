import axios from 'axios';

export const signup =async (username,password,email)=>{
    let body ={
        username,password,email
    }
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`,body);
    }else{
       return await axios.post("/signup",body);
    }
  
}
