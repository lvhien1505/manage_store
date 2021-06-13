import axios from 'axios';
import Cookies from "js-cookie";


let token=Cookies.get("__t")
let headers={
    headers:{
        authorization:`Bearer ${token}`
    }
}

export const getBillBuy =async ()=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-buy`,{},headers);
    }else{
       return await axios.post("/bill-buy",{},headers);
    }
}

export const getBillWithId =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-buy/get/${id}`,{},headers);
    }else{
       return await axios.post(`/bill-buy/get/${id}`,{},headers);
    }
}

export const getBillWithStatus =async (body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-buy/history/status`,body,headers);
    }else{
       return await axios.post(`/bill-buy/history/status`,body,headers);
    }
}

export const getBillWithIdPartnerAndType =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-buy/history/bill/${id}/debt`,{},headers);
    }else{
       return await axios.post(`/bill-buy/history/bill/${id}/debt`,{},headers);
    }
}

export const getBillBuyWithLimit =async ()=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-buy/history/limit`,{},headers);
    }else{
       return await axios.post(`/bill-buy/history/limit`,{},headers);
    }
}

export const createBillBuy =async (body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bill-buy/create`,body,headers);
    }else{
       return await axios.post(`/bill-buy/create`,body,headers);
    }
}

export const updateBillBuy =async (id,body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/bill-buy/${id}`,body,headers);
    }else{
       return await axios.put(`/bill-buy/${id}`,body,headers);
    }
}

export const updateStatusBill =async (id,body)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/bill-buy/status/${id}`,body,headers);
    }else{
       return await axios.put(`/bill-buy/status/${id}`,body,headers);
    }
}

export const removeBillBuy =async (id)=>{
    if (process.env.REACT_APP_ENV === "development") {  
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/bill-buy/${id}`,headers);
    }else{
       return await axios.delete(`/bill-buy/${id}`,headers);
    }
}