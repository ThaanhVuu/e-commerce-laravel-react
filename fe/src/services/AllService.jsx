import { api } from "../utils/api";

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
