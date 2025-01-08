import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({component: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if(loading) {
    return <div>Loading...</div>
  }

  return user ? Component : <Navigate to="/login" />;
}

export default ProtectedRoute;
