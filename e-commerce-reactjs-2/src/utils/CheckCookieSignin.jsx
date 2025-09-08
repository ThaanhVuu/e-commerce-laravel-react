import {useEffect} from "react";
import {AuthService} from "../services/AuthService";
import {useNavigate} from "react-router-dom";

export default function CheckCookieSignin(){
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const user = await AuthService.myInfo();
                if (user.role === "ADMIN") {
                    navigate('/admin/dashboard');
                }else if (user.role === "USER"){
                    navigate('/home');
                }else if (user.role === 'MANAGER'){
                    navigate("manager");
                }
            } catch (err) {
                console.log('Error while check cookie sign in: ', (err.response) ? err.response.data : err);
            }
        })();
    }, [navigate]);
}