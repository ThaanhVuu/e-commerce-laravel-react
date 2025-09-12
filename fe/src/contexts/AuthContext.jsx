import {createContext, useState, useEffect} from "react";
import {AuthService} from "../services/AuthService";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const publicPaths = ["/", "/signin", "/signup", "/forgetpassword"];
        if (publicPaths.includes(window.location.pathname)) {
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const response = await AuthService.myInfo();
                setProfile(response);
            } catch (err) {
                setProfile(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    if (loading) {
        return (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{profile, setProfile}}>
            {children}
        </AuthContext.Provider>
    );
}
