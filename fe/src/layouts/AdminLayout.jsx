import {AdminHeader} from "../components/admin/AdminHeader";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../components/Sidebar";
import {LuLayoutDashboard} from "react-icons/lu";
import {FaRegUser} from "react-icons/fa";

export function AdminLayout(){
    const menuOption = [
        { label: "Dashboard", path: "/admin/dashboard", icon: LuLayoutDashboard },
        { label: "User", path: "/admin/user", icon: FaRegUser },
        { label: "ProfileUser", path: "/admin/profile", icon: FaRegUser },
    ];

    return (
        <>
            <AdminHeader/>
            <main className="d-flex">
                {/* Sidebar: không cho co lại */}
                <div className="flex-shrink-0" style={{width: "15%"}}>
                    <Sidebar menuOption={menuOption}/>
                </div>

                {/* Content: cho co lại + chặn tràn ngang */}
                <div
                    className="p-3 flex-grow-1"
                    style={{ background: "#f3f3f7", minWidth: 0, overflowX: "hidden" }}
                >
                    <Outlet/>
                </div>
            </main>
        </>
    );
}
