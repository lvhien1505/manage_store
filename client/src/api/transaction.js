import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getTransaction =async ()=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/transaction`,headers);
    }else{
       return await axios.post("/transaction",headers);
    }
}

export const createTransaction =async (body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/transaction/create`,body,headers);
    }else{
       return await axios.post(`/transaction/create`,body,headers);
    }
}

export const updateTransaction =async (id,body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/transaction/${id}`,body,headers);
    }else{
       return await axios.put(`/transaction/${id}`,body,headers);
    }
}

export const removeTransaction =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/transaction/${id}`,headers);
    }else{
       return await axios.delete(`/transaction/${id}`,headers);
    }
}