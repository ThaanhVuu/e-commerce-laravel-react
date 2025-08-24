import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path={"/signup"} element={<SignUp/>} />
                <Route path={'/forgetpassword'} element={<ForgetPassword/>} />
                <Route path={'/resetpassword'} element={<ResetPassword/>} />
                <Route path={'/admin/dashboard'} element={<Dashboard/>} />
            </Routes>
        </Router>
    );
}
