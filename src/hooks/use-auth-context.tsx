import { useContext } from "react";
import AuthContext from "../context/auth";

const UseAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  return context;
};

export default UseAuthContext;
