// noinspection JSXUnresolvedComponent

import {NavLink} from "react-router-dom";

//render sidebar
export function Sidebar({menuOption}) {
    return (
        <aside className={'d-flex flex-column gap-2'}
               style={{background: "#222245", height: "89vh", color: "#fff", width: "15%"}}
        >
            {menuOption.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.path}
                    className="nav-link ms-3 mt-3 d-flex align-items-center fs-5"
                    style={({ isActive }) => ({
                        gap: "10px",
                        color: isActive ? "#aaa" : "#fff",
                        textDecoration: "none",
                        fontweight: isActive ? "bold" : "none"
                    })}
                >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                </NavLink>
            ))}
        </aside>
    );
}