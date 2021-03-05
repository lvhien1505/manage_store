import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getListUnit =async ()=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/unit`,{},headers);
    }else{
       return await axios.post("/unit",{},headers);
    }
}

export const getUnitWithId =async (id)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/unit/get/${id}`,{},headers);
    }else{
       return await axios.post(`/category/get/${id}`,headers);
    }
}

export const createUnit =async (body)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/unit/create`,body,headers);
    }else{
       return await axios.post(`/unit/create`,body,headers);
    }
}

export const updateUnit =async (id,body)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/unit/${id}`,body,headers);
    }else{
       return await axios.put(`/unit/${id}`,body,headers);
    }
}

export const removeUnit =async (id)=>{
    if (process.env.NODE_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/unit/${id}`,headers);
    }else{
       return await axios.delete(`/unit/${id}`,headers);
    }
}