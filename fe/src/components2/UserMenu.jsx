import { LuCircleUser } from "react-icons/lu";
import { AuthService } from "../services/AuthService";
import Dropdown from "react-bootstrap/Dropdown";

export function UserMenu({profile, setProfile}) {

    async function handleLogout() {
        await AuthService.signout();  // gọi API logout (nếu có)
        setProfile(null);             // clear context
        window.location.href = "/";   // quay về trang chủ
    }

    function handleProfile() {
        window.location.href = "/profile";
    }

    // chưa login → hiện icon user (link signin)
    if (!profile) {
        return (
            <a
                href="/signin"
                className="m-0 text-dark text-decoration-none"
                style={{ cursor: "pointer" }}
            >
                <LuCircleUser size={16} />
            </a>
        );
    }

    // đã login + có profile → hiện dropdown
    return (
        <Dropdown>
            <Dropdown.Toggle
                as="a" // render thành <a> thay vì <button>
                className="m-0 text-dark text-decoration-none"
                style={{ cursor: "pointer" }}
            >
                <LuCircleUser size={16} />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ zIndex: "9999" }}>
                <Dropdown.Header className="px-3 py-2 text-muted">
                    Hello, <strong>{profile?.profile?.full_name}</strong>!
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
