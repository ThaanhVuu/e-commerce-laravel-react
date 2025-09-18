import axios from "axios";
import {API_URL} from "../utils/Global";

const api = axios.create({
    baseURL: API_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true, // gửi cookie tự động
});

export const ProductService = {
    deleteProduct: async (id) => {
        try {
            const res = await api.delete(`/products/${id}`);
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    getProductById: async (id) => {
        try {
            const res = await api.get(`/products/${id}`);
            return res.data;

        } catch (err) {
            throw err.response ? err.response.data : err;
        }
    },

    updateProduct: async (id, product) => {
        try {
            const res = await api.put(`/products/${id}`, product)
            return res.data;
        } catch (err) {
            throw err.response ? err.response.data : err;
        }
    },

    createProduct: async (product) => {
        try {
            const res = await api.post(`/products`, product)
            return res.data;
        } catch (err) {
            throw err.response ? err.response.data : err;
        }
    },


}