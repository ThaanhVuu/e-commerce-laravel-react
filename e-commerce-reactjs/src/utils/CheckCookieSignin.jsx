import {useEffect} from "react";
import {AuthService} from "../services/AuthApi";
import {useNavigate} from "react-router-dom";

export default function CheckCookieSignin(){
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const user = await AuthService.myInfo();
                if (user) {
                    navigate('/admin/dashboard');
                }
            } catch (err) {
                console.log('Error while check cookie sign in: ', (err.response) ? err.response.data : err);
            }
        })();
    }, [navigate]);
}