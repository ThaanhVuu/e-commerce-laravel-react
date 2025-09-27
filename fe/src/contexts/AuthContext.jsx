import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Khi khởi tạo, lấy profile từ sessionStorage nếu có
    const [profile, setProfile] = useState(() => {
        const saved = sessionStorage.getItem("profile");
        return saved ? JSON.parse(saved) : null;
    });

    // Mỗi khi profile thay đổi thì cập nhật lại sessionStorage
    useEffect(() => {
        if (profile) {
            sessionStorage.setItem("profile", JSON.stringify(profile));
        } else {
            sessionStorage.removeItem("profile");
        }
    }, [profile]);

    return (
        <AuthContext.Provider value={{ profile, setProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
