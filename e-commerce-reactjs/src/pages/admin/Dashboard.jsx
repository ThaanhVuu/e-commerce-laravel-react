import {useEffect} from "react";
import {AuthService} from "../../services/AuthApi";

export default function Dashboard() {
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await AuthService.myInfo();
                console.log(res);
            } catch (err) {
                // log lỗi chi tiết
                console.error("Error fetching user info:", err.response ? err.response.data : err);
            }
        };

        fetchUser();
    }, []); // chỉ chạy 1 lần khi component mount

    return(
        <h1>Day la dashboard</h1>

    )
}