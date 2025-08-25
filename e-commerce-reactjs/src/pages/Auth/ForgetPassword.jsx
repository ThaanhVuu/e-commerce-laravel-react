import React, {useState} from "react";
import LoginLayout from "../../layouts/LoginLayout/LoginLayout";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthApi";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(user) {
        setLoading(true);
        setError("");
        try{
            await AuthService.forgetPassword(user.username);
            alert("password recovery email has been sending to ", user.username);
            navigate("/");
        }catch (error){
            if (error && error.response && error.response.data && error.response.data.error){
                alert("error while sending password recovery email to " + user.username + " : " + error.data.response.error);
                setError(error);
            }else{
                alert("Some thing went wrong");
            }
        }finally {
            setLoading(false);
        }
    }

    return (
        <LoginLayout
            title={`Forget Password`}
            handleOnSubmit={handleSubmit}
            linkHref={`/signup`}
            submitText={`Password Recovery`}
            label={`Sign up`}
            linkHref2={'/signin'}
            label2={'Sign In'}
            error={error}
            placeholder={'New Password'}
            loading={loading}
        />
    );
}
