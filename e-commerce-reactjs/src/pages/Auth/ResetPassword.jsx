import LoginLayout from "../../components/LoginLayout/LoginLayout";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {AuthService, resetPassword} from "../../services/AuthApi";

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Lấy toàn bộ query string (sau dấu ?)
    const token = location.search.substring(1);

    async function handleSubmit(user) {
        try {
            setLoading(true);
            await AuthService.resetPassword(user.password, token);
        }catch (error){
            alert("error when send mail reset password: ", (error.response) ? error.response.data : error);
            setError(error);
        }finally {
            setLoading(false);
        }
    }

    return (
        <LoginLayout
            title={`Reset Password`}
            handleOnSubmit={handleSubmit}
            submitText={`Reset`}
            flag={false}
            placeholder={"New Password"}
            loading={loading}
            error={error}
        />
    );
}