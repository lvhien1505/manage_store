import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getListPartner =async ()=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/partner`,{},headers);
    }else{
       return await axios.post("/partner",{},headers);
    }
}

export const getPartnerWithId =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/partner/get/${id}`,{},headers);
    }else{
       return await axios.post(`/partner/get/${id}`,{},headers);
    }
}

export const createPartner =async (body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/partner/create`,body,headers);
    }else{
       return await axios.post(`/partner/create`,body,headers);
    }
}

export const updatePartner =async (id,body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/partner/${id}`,body,headers);
    }else{
       return await axios.put(`/partner/${id}`,body,headers);
    }
}

export const removePartner =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/partner/${id}`,headers);
    }else{
       return await axios.delete(`/partner/${id}`,headers);
    }
}