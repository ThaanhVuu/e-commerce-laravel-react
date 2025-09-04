import axios from "axios";
import {API_URL} from "../utils/Global";

// Tạo instance Axios với baseURL và cookie support
const api = axios.create({
    baseURL: API_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true, // gửi cookie tự động
});

export const ProfileService = {
    getProfile: async (limit, page) => {
        try {
            const response = await api.get(`/profile/limit=${limit}?page=${page}`)
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/profile/${id}`)
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
}
