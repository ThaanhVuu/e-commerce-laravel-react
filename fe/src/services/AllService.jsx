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

export const ProfileService = {
    create: (data) => api.post("/profile", data),
}

export const OrderService = {
    create: (data) => api.post("/orders", data),
    getAll: (params = {}) => api.get("/orders", { params }),
    update: (id, data) => api.put(`/orders/${id}`, data),
    remove: (id) => api.delete(`/orders/${id}`),
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

export const SettingCollection = {
    getAll: (params = {}) => api.get("/collection", { params }),
    create: (data) => api.post("/collection", data),
    update: (id, data) => api.put(`/collection/${id}`, data),
    remove: (id) => api.delete(`/collection/${id}`),
}