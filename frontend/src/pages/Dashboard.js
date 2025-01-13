import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if(!user) return <div>Loading</div>

  return(
    <>
      <Navbar/>
      <h2>Welcome to your dashboard {user[0].username}</h2>
    </>
  )
}

export default Dashboard;
