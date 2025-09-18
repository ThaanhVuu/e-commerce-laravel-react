import Dropdown from 'react-bootstrap/Dropdown';
import avatar from "../assets/avata.jpg";
import {AuthService} from "../services/AuthService";
import {useNavigate} from "react-router-dom";

export function ProfileDropDown({profile}){
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await AuthService.signout();
            navigate("/signin");
        } catch (err) {
            alert("Logout failed!");
            console.error("Logout error:", err);
        }
    }

    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="danger rounded-pill d-flex align-items-center p-2"
                             id="dropdown-user"
            >
                <img
                    src={avatar}
                    alt="avatar"
                    className="rounded-circle me-2"
                    style={{ width: "25px", height: "25px", objectFit: "cover" }}
                />
                {profile.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
