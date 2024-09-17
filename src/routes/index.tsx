import { Routes as Router, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import ProtectRoute from "./ProtectRoute";
import UseAuthContext from "../hooks/use-auth-context";

const Routes = () => {
  const { isAuthenticated } = UseAuthContext();
  return (
    <Router>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        }
      />
    </Router>
  );
};

export default Routes;
