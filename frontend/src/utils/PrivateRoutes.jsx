import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';
import Cookie from '../helpers/Cookie';

export default function PrivateRoute({ children, allowedRoles }) {
  const userRole = Cookie.get('role');
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if(allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />
  }
  return children;
}
