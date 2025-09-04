import {AdminHeader} from "../components/admin/AdminHeader";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../components/Sidebar";
import {LuLayoutDashboard} from "react-icons/lu";
import {FaRegUser} from "react-icons/fa";

//chứa các trang của admin
export function AdminLayout(){
    const menuOption = [
        { label: "Dashboard", path: "/admin/dashboard", icon: LuLayoutDashboard },
        { label: "User", path: "/admin/user", icon: FaRegUser },
        { label: "Profile", path: "/admin/profile", icon: FaRegUser },
    ];

    return(
        <>
            <AdminHeader/>
            <main className={'d-flex'}>
                <Sidebar menuOption={menuOption}/>
                <div className="flex-grow-1 p-3" style={{ background: '#f3f3f7' }}>
                    <Outlet/>
                </div>
            </main>
        </>
    )
}