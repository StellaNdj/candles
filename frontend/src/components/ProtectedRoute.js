import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({element: Element, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if(loading) {
    return <div>Loading...</div>
  }

  return user ? <Element {...rest} /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
