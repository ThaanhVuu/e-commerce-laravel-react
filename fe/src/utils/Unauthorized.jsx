import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";

export function Unauthorized() {
    const {setProfile} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xoá profile → coi như logout
        setProfile(null);
        navigate("/signin", {replace: true});
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center p-5 rounded shadow bg-white" style={{maxWidth: "400px"}}>
                <h1 className="display-6 text-danger mb-3">🚫 Unauthorized</h1>
                <p className="mb-4">Bạn không có quyền truy cập trang này.</p>
                <div className="d-flex gap-3 justify-content-center">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/", {replace: true})}
                    >
                        ⬅️ Về trang chủ
                    </button>
                    <button
                        className="btn btn-outline-danger"
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    );
}
