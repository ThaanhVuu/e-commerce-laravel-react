import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "./AuthContext";

export function ProtectedRoute({roles}) {
    const {profile} = useContext(AuthContext);

    if (!profile) {
        return <Navigate to="/signin" replace />;
    }

    if (roles && !roles.includes(profile.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
