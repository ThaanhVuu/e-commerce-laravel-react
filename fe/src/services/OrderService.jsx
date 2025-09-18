import axios from "axios";
import {API_URL} from "../utils/Global";

const api = axios.create({
    baseURL: API_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true, // gửi cookie tự động
});

export const OrderService = {
    delete: async (id) => {
        try {
            const res = await api.delete(`${API_URL}/orders/${id}`);
            return res.data;
        } catch (err) {
            throw err.response ? err.response.data : err;
        }
    },
    getById: async (id) => {
        try {
            const res = await api.get(`${API_URL}/orders/${id}`);
            return res.data;
        } catch (err) {
            throw err.response ? err.response.data : err;
        }
    },

    update: async (id, obj) => {
        try {
            const res = await api.put(`${API_URL}/orders/${id}`, obj);
            return res.data;
        } catch (err) {
            throw err.response ? err.response.data : err;
        }
    },

    create: async (obj) => {
        try {
            const res = await api.post(`${API_URL}/orders`, obj);
            return res.data;
        } catch (err) {
            throw err.response ? err.response.data : err;
        }
    },
}