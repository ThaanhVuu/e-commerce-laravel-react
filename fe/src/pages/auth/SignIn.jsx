import React, {useState, useContext} from "react";
import {AuthService} from "../../services/AuthService";
import {LoginLayout} from "../../layouts/login/LoginLayout";
import {AuthContext} from "../../contexts/AuthContext";

export function SignIn() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {setProfile} = useContext(AuthContext);  // dùng contexts

    async function handleSignIn(user) {
        setLoading(true);
        setError("");

        try {
            let response = await AuthService.signIn(user.username, user.password);
            setProfile(response.user); // lưu toàn cục
            if (response.user.role === "ADMIN") {
                window.location.href = "/admin";
            } else if (response.user.role === "MANAGER") {
                window.location.href = "/manager";
            } else {
                window.location.href = "/";
            }
        } catch (err) {
            setError(err.error || "Can not connect to server");
            console.log(err);
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
