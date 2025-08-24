import React, { useState } from "react";
import { AuthService } from "../../services/AuthApi";
import { useNavigate } from "react-router-dom";
import LoginLayout from "../../components/LoginLayout/LoginLayout";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleRegister(user) {
        setLoading(true);
        setError('');

        try {
            await AuthService.register(user.username, user.password);

            // Nếu register thành công
            alert("Sign up successful! Please check verify mail.");

            // Optionally: redirect về SignIn page
            navigate("/");
        } catch (err) {
            console.error("Register failed:", err);

            // Hiển thị lỗi từ server nếu có
            setError(err.error || "Sign up failed");

            // Alert lỗi
            alert(err.error || "Sign up failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <LoginLayout
            title="Sign Up"
            handleOnSubmit={handleRegister}
            linkHref="/"
            submitText="Sign up"
            label="Sign in"
            flag={true}
            linkHref2="/forgetpassword"
            label2="Forget Password"
            error={error}      // truyền lỗi cho UI hiển thị
            loading={loading}  // truyền loading để disable button hoặc show spinner
        />
    );
}
