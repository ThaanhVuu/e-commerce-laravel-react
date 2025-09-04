import {Navigate, Route, Routes} from "react-router-dom";
import {AdminLayout} from "./layouts/AdminLayout";
import {SignIn} from "./pages/auth/SignIn";
import {SignUp} from "./pages/auth/SignUp";
import {ForgetPassword} from "./pages/auth/ForgetPassword";
import {ProtectedRoute} from "./contexts/ProtectedRoute";
import {Dashboard} from "./pages/admin/Dashboard";
import {User} from "./pages/admin/User";
import {Unauthorized} from "./utils/Unauthorized";
import {Profile} from "./pages/admin/Profile";

function App() {
    return (
        <Routes>
            {/* auth */}
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/forgetpassword" element={<ForgetPassword/>}/>

            {/* Admin */}
            <Route element={<ProtectedRoute roles={["ADMIN"]}/>}>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<Navigate to="dashboard" replace/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="user" element={<User/>}/>
                    <Route path={"profile"} element={<Profile/>} />
                </Route>
            </Route>

            {/* Unauthorized page */}
            <Route path="/unauthorized" element={<Unauthorized/>}/>
        </Routes>
    );
}

export default App;
