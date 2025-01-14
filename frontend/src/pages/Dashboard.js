import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Profile from "./Profile";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if(!user) return <div>Loading</div>

  return(
    <>
      <Navbar/>
      <h2 className="font-bold text-4xl">Welcome {user[0].username} {user[0].first_name} {user[0].last_name}</h2>
      <Profile/>
    </>
  )
}

export default Dashboard;
