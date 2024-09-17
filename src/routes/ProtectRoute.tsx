import { Navigate } from "react-router-dom";
import UseAuthContext from "../hooks/use-auth-context";
import { ReactNode } from "react";
interface ProtectRouteProps {
  children: ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const { isAuthenticated } = UseAuthContext();
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectRoute;
