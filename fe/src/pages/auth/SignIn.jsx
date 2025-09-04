import React, {useState, useContext} from "react";
import {AuthService} from "../../services/AuthService";
import {LoginLayout} from "../../layouts/login/LoginLayout";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

export function SignIn() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setProfile} = useContext(AuthContext);  // dùng contexts

    async function handleSignIn(user) {
        setLoading(true);
        setError("");

        try {
            await AuthService.signIn(user.username, user.password);

            const response = await AuthService.myInfo();
            setProfile(response); // lưu toàn cục

            if (response.role === "ADMIN") navigate("/admin");
            else navigate("/");
        } catch (err) {
            setError(err.error || "Lỗi kết nối tới server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <LoginLayout
            title="Sign In"
            handleOnSubmit={handleSignIn}
            linkHref="/signup"
            submitText="Sign In"
            label="Sign up"
            flag={true}
            linkHref2="/forgetpassword"
            label2="Forget Password"
            error={error}
            loading={loading}
        />
    );
}
