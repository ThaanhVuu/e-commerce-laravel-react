import { api } from "../utils/api";
import {data} from "react-router-dom";

export const ProductService = {
    getAll: (params = {}) => api.get("/products", { params }),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post("/products", data),
    update: (id, data) => api.put(`/products/${id}`, data),
    remove: (id) => api.delete(`/products/${id}`),
};


export const CategoryService = {
    getAll: (params = {}) => api.get("/categories", { params }),
    getById: (id) => api.get(`/categories/${id}`),
    create: (data) => api.post("/categories", data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    remove: (id) => api.delete(`/categories/${id}`),
};

export const ProfileService = {
    create: (data) => api.post("/profile", data),
}

export const OrderService = {
    create: (data) => api.post("/orders", data),
}

export const SettingBanner = {
    getAll: (params = {}) => api.get("/banner-home-images", { params }),
    create: (data) => api.post("/banner-home-images", data),
    update: (id, data) => api.put(`/banner-home-images/${id}`, data),
    remove: (id) => api.delete(`/banner-home-images/${id}`),
}

export const SettingGallery = {
    getAll: (params = {}) => api.get("/gallery-images", { params }),
    create: (data) => api.post("/gallery-images", data),
    update: (id, data) => api.put(`/gallery-images/${id}`, data),
    remove: (id) => api.delete(`/gallery-images/${id}`),
}