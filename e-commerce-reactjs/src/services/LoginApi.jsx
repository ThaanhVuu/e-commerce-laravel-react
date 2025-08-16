import axios from "axios";

export function signIn(username, password){
    try{
        return axios.post('http://localhost:8000/api/signin',{username, password})
    }catch (error){
        console.error("Login error:", error);
        throw error.response ? error.response.data : error;
    }
}