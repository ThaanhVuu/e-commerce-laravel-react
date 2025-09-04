import axios from "axios";
import {API_URL} from "../utils/Global";

// Tạo instance Axios với baseURL và cookie support
const api = axios.create({
    baseURL: API_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true, // gửi cookie tự động
});

export const UserService = {
    create: async (username, password, role) => {
        try {
            const response = await api.post("/users", {username, password, role});
            // Laravel sẽ set HttpOnly cookie tự động
            return response.data; // có thể trả user info
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    get: async () => {
        try {
            const response = await api.get("/users");
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    update: async (username , password, role, id) => {
        try {
            const response = await api.put(`/users/${id}`, {username ,password, role});
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    getUserPaging: async (limit, page) => {
        try {
            const response = await api.get(`/users/paging/limit=${limit}?page=${page}`)
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await api.get(`/users/show/${id}`)
            return response.data;
        }catch (error){
            throw error.response ? error.response.data : error;
        }
    },
}
