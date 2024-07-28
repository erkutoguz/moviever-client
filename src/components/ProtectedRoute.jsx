import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAppContext();
  if (!isAuthenticated) {
    return <Navigate to={"/sign-in"} />;
  }

  return children;
}

export default ProtectedRoute;
