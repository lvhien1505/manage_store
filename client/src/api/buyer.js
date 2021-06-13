import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getBuyer =async ()=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/buyer`,{},headers);
    }else{
       return await axios.post("/buyer",{},headers);
    }
}

export const getBuyerWithId =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/buyer/get/${id}`,{},headers);
    }else{
       return await axios.post(`/buyer/get/${id}`,{},headers);
    }
}

export const createBuyer =async (body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/buyer/create`,body,headers);
    }else{
       return await axios.post(`/buyer/create`,body,headers);
    }
}

export const updateBuyer =async (id,body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/buyer/${id}`,body,headers);
    }else{
       return await axios.put(`/buyer/${id}`,body,headers);
    }
}

export const removeBuyer =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/buyer/${id}`,headers);
    }else{
       return await axios.delete(`/buyer/${id}`,headers);
    }
}