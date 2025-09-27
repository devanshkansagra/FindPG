import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";
import Cookie from "../helpers/Cookie";

export default function PrivateRoute({children, role}) {
    const userRole = Cookie.get("role");
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    if (role !== userRole) {
        return <Navigate to="/login" />; // or another route for unauthorized access
    }
    return children;
}