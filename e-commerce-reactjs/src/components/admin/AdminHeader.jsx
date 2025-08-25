import {Logo} from "../../assets/Logo";
import {useLocation, useNavigate} from "react-router-dom";

export default function AdminHeader() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        {label: "Dashboard", path: "/admin/dashboard"},
        {label: "User", path: "/admin/usercontrol"}
    ];

    return (
        <header className="sticky-top bg-white pt-2 shadow-sm">
            <div className={"d-flex py-2 justify-content-center"}>
                <Logo/>
            </div>

            <ul
                className="nav justify-content-center gap-2 py-2"
                style={{
                    background: "#fcaf17",
                    color: "#2A2A86",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                }}
            >
                {navItems.map((item) => (
                    <li className={"nav-item"} key={item.label}>
                        <button
                            className={`nav-link border-0 bg-transparent ${
                                location.pathname === item.path ? "text-white fw-bold" : ""
                            }`}
                            style={{
                                color: "#2A2A86",
                            }}
                            onClick={() => navigate(item.path)}
                        >{item.label}</button>
                    </li>
                ))}
            </ul>
        </header>
    );
}