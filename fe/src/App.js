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
import {ManagerDashboard} from "./pages/manager/ManagerDashboard";
import {Category} from "./pages/manager/Category";
import {ManagerLayout} from "./layouts/ManagerLayout";
import {HomeLayout} from "./layouts/HomeLayout";
import {Product} from "./pages/manager/Product";
import {Order} from "./pages/manager/Order";
import {ProductHome} from "./pages/home/ProductHome";
//nhatminh
import {Cart} from "./pages/home/Cart";
import {OrderConfirm} from "./pages/home/OrderConfirm";
import {CreateProfile} from "./pages/CreateProfile";
import {HomeSetting} from "./pages/manager/HomeSetting";
import {ToastContainer} from "react-toastify";
import {ProfileUser} from "./pages/ProfileUser";

function App() {
    return (
        <>
            <Routes>
                {/* public */}
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/forgetpassword" element={<ForgetPassword/>}/>
                <Route path={"/"} element={<HomeLayout/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/order-confirm'} element={<OrderConfirm/>}/>
                <Route path={'/product'} element={<ProductHome/>}/>
                <Route path={'/profile-create'} element={<CreateProfile/>}/>
                <Route path={'/profile'} element={<ProfileUser/>} />
                {/* Admin */}
                <Route element={<ProtectedRoute roles={["ADMIN"]}/>}>
                    <Route path="/admin" element={<AdminLayout/>}>
                        <Route index element={<Navigate to="dashboard" replace/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="user" element={<User/>}/>
                        <Route path={"profile"} element={<Profile/>}/>
                    </Route>
                </Route>

                {/* Manager */}
                <Route element={<ProtectedRoute roles={["MANAGER"]}/>}>
                    <Route path="/manager" element={<ManagerLayout/>}>
                        <Route index element={<Navigate to="dashboard" replace/>}/>
                        <Route path="dashboard" element={<ManagerDashboard/>}/>
                        <Route path={"category"} element={<Category/>}/>
                        <Route path={"profile"} element={<Profile/>}/>
                        <Route path={"product"} element={<Product/>}/>
                        <Route path={"order"} element={<Order/>}/>
                        <Route path={"home-setting"} element={<HomeSetting/>}/>
                    </Route>
                </Route>

                {/* Unauthorized page */}
                <Route path="/unauthorized" element={<Unauthorized/>}/>
            </Routes>
            <ToastContainer position="top-center" autoClose={2000} toastClassName="custom-toast"
                            bodyClassName="custom-toast-body"/>
        </>
    );
}

export default App;
