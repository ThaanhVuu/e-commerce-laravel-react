import {AdminHeader} from "../components/admin/AdminHeader";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../components/Sidebar";
import {LuLayoutDashboard} from "react-icons/lu";
import {FaRegUser} from "react-icons/fa";
import {MdOutlineCategory} from "react-icons/md";
import {AiOutlineProduct} from "react-icons/ai";
import {TbFileInvoice} from "react-icons/tb";
import {FiSettings} from "react-icons/fi";

export function ManagerLayout(){
    const menuOption = [
        { label: "Dashboard", path: "/manager/dashboard", icon: LuLayoutDashboard },
        { label: "Category", path: "/manager/category", icon: MdOutlineCategory },
        { label: "Product", path: "/manager/product", icon: AiOutlineProduct },
        { label: "Order", path: "/manager/order", icon: TbFileInvoice },
        {label: "Home Setting", path: "/manager/home-setting",  icon: FiSettings}
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
