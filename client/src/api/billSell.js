import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getBillSell =async ()=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-sell`,{},headers);
    }else{
       return await axios.post("/bill-sell",{},headers);
    }
}

export const getBillWithId =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-sell/get/${id}`,{},headers);
    }else{
       return await axios.post(`/bill-sell/get/${id}`,{},headers);
    }
}

export const getBillWithStatus =async (body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-sell/history/status`,body,headers);
    }else{
       return await axios.post(`/bill-sell/history/status`,body,headers);
    }
}

export const getBillWithLimit =async ()=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-sell/history/limit`,{},headers);
    }else{
       return await axios.post(`/bill-sell/history/limit`,{},headers);
    }
}

export const getBillWithIdBuyerAndType =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-sell/history/bill/${id}/debt`,{},headers);
    }else{
       return await axios.post(`/bill-sell/history/bill/${id}/debt`,{},headers);
    }
}



export const createBillSell =async (body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-sell/create`,body,headers);
    }else{
       return await axios.post(`/bill-sell/create`,body,headers);
    }
}

export const updateBillSell =async (id,body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/bill-sell/${id}`,body,headers);
    }else{
       return await axios.put(`/bill-sell/${id}`,body,headers);
    }
}

export const updateStatusBill =async (id,body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/bill-sell/status/${id}`,body,headers);
    }else{
       return await axios.put(`/bill-sell/status/${id}`,body,headers);
    }
}

export const removeBillSell =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/bill-sell/${id}`,headers);
    }else{
       return await axios.delete(`/bill-sell/${id}`,headers);
    }
}