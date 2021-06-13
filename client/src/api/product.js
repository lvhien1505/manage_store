import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getProduct =async ()=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/product`,{},headers);
    }else{
       return await axios.post("/product",{},headers);
    }
}


export const getProductWithId =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/product/get/${id}`,{},headers);
    }else{
       return await axios.post(`/product/get/${id}`,{},headers);
    }
}

export const createProduct =async (body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/product/create`,body,headers);
    }else{
       return await axios.post(`/product/create`,body,headers);
    }
}

export const updateProduct =async (id,body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`,body,headers);
    }else{
       return await axios.put(`/product/${id}`,body,headers);
    }
}

export const removeProduct =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/product/${id}`,headers);
    }else{
       return await axios.delete(`/product/${id}`,headers);
    }
}