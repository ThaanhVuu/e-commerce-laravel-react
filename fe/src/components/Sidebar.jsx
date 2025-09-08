// noinspection JSXUnresolvedComponent

import {NavLink} from "react-router-dom";

//render sidebar
export function Sidebar({menuOption}) {
    return (
        <aside
            className="d-flex flex-column bg-dark"
            style={{ height: "calc(100vh - 72px)" }}
        >
            {menuOption.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.path}
                    className="nav-link p-3 d-flex align-items-center fs-5"
                    style={({ isActive }) => ({
                        gap: "10px",
                        color: isActive ? "#DC3545" : "#fff",
                        textDecoration: "none",
                        fontWeight: isActive ? "bold" : "none"
                    })}
                >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                </NavLink>
            ))}
        </aside>
    );
}