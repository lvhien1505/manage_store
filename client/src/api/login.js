import axios from 'axios';
import Cookies from "js-cookie";


let token = Cookies.get("__t");
let __token = localStorage.getItem("__t");


export const login = async (username, password) => {
    let body = {
        username, password
    }
    if (process.env.NODE_ENV === "development") {
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, body, { withCredentials: true });
    } else {
        return await axios.post("/login", body, { withCredentials: true });
    }

}

export const checkAuth = async () => {
    let headers = {};
    if (process.env.NODE_ENV === "development") {
        if (token) {
            headers.headers.authorization = `Bearer ${token}`
        } else {
            headers.headers.authorization = `Bearer ${__token}`
        }
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check-auth`, {}, headers);
    } else {
        if (token) {
            headers.headers.authorization = `Bearer ${token}`
        } else {
            headers.headers.authorization = `Bearer ${__token}`
        }
        await axios.post("/check-auth", {}, headers);
    }
    return

}

