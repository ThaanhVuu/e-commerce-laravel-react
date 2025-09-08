import axios from "axios";
import { API_URL } from "../utils/Global";

// Tạo instance Axios với baseURL và cookie support
const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // gửi cookie tự động
});

export const CategoryService = {
    // Lấy danh sách category có phân trang
    getCategories: async (limit, page) => {
        try {
            const res = await api.get(`/categories`);
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Lấy chi tiết category theo id
    getById: async (id) => {
        try {
            const res = await api.get(`/categories/${id}`);
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Tạo mới category
    create: async (name, description) => {
        try {
            const res = await api.post(`/categories`, { name, description });
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Cập nhật category
    update: async (id, name, description) => {
        try {
            const res = await api.put(`/categories/${id}`, { name, description });
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Xoá category
    delete: async (id) => {
        try {
            const res = await api.delete(`/categories/${id}`);
            return res.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
};
