import { createContext, useState, useEffect } from "react";
import { AuthService } from "../services/AuthApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [profile, setProfile] = useState(null);

    // khi app load, thử lấy thông tin user
    useEffect(() => {
        (async () => {
            try {
                const response = await AuthService.myInfo();
                setProfile(response);
            } catch (err) {
                console.log("Chưa đăng nhập hoặc token hết hạn");
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ profile, setProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
