import axios from "axios";

// Tạo instance Axios với baseURL và cookie support
const api = axios.create({
    baseURL: "http://localhost:8000/api/v1.0",
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // gửi cookie tự động
});

export const AuthService = {
    // Sign in
    signIn: async (username, password) => {
        try {
            const response = await api.post("/signin", { username, password });
            // Laravel sẽ set HttpOnly cookie tự động
            return response.data; // có thể trả user info
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Register
    register: async (username, password) => {
        try {
            const response = await api.post("/signup", { username, password });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Forget password
    forgetPassword: async (username) => {
        try {
            const response = await api.post("/forgetpassword", { username });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Reset password
    resetPassword: async (password, token) => {
        try {
            // Token nếu có trong cookie thì không cần header Authorization
            const response = await api.post("/resetpassword", { password });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Lấy thông tin user đang đăng nhập
    myInfo: async () => {
        try {
            const response = await api.get("/me"); // cookie sẽ tự gửi
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // Logout (xóa cookie phía server)
    signout: async () => {
        try {
            await api.post("/signout"); // Laravel sẽ xóa cookie
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
};
