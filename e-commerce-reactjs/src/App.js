import {Routes, Route, useLocation, Navigate} from "react-router-dom";

import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/home/Home";
import Admin from "./layouts/AdminLayout/Admin";
import User from "./pages/admin/User";

export default function App() {
    // const location = useLocation();
    // const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <Routes>
            {/* Login */}
            <Route path="/signin" element={<SignIn/>}/>
            <Route path={"/signup"} element={<SignUp/>}/>
            <Route path={'/forgetpassword'} element={<ForgetPassword/>}/>

            {/* Admin */}
            <Route path="/admin" element={<Admin/>}>
                <Route index element={<Navigate to="dashboard" replace/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="usercontrol" element={<User/>} />
            </Route>

            {/* Home */}
            <Route path={'/'} element={<Home/>}/>
        </Routes>
    );
}
