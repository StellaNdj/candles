import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Profile from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getOrders } from "../endpoints";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('accessToken');
      if(token) {
        const data = await getOrders({token});
        setOrders(data);
        setLoading(false);
      };
    }
    fetchOrders();
  }, [])

  if(!user) return <div><FontAwesomeIcon icon={faSpinner} spin/></div>
  if(loading) return <div><FontAwesomeIcon icon={faSpinner} spin/></div>

  return(
    <>
      <Navbar/>
      <div className="p-12">
        <h2 className="font-bold text-4xl">Welcome {user[0].username} {user[0].first_name} {user[0].last_name}</h2>

        {/* Orders info */}
        <h3 className='font-bold text-2xl'>Order history</h3>
        {orders.length > 0 ? (
          <div className="border p-4">
            {orders.map((order) => (
              <div key={order.id}>
                <div className='flex justify-between border-b'>
                  <div>
                    <p className="font-bold">Order number</p>
                    <p>{order.id}</p>
                  </div>
                  <div>
                    <p className="font-bold">Date placed</p>
                    <p>{new Date(order.order_date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                  <div>
                    <p className="font-bold">Total amount</p>
                    <p className="font-bold">{order.total_price}€</p>
                  </div>
                  <button className="cursor-pointer" onClick={() => setShowDetails(!showDetails)}>View details</button>
                </div>
                {showDetails && (
                  <>
                    {order.items.map((item) =>
                      <div lye={item.id}>
                        <img src={item.image} alt={item.name}/>
                        <h3>{item.name} x {item.quantity}</h3>
                        <p>{item.price}€</p>
                      </div>
                    )}
                  </>
                )}
                <p>Status : {order.status}</p>
              </div>

            ))}
          </div>
        ) : (
          <div>You don't have any orders yet. Order now.</div>
        )}


        {/* Update profile info */}
        <Profile/>
      </div>
    </>
  )
}

export default Dashboard;
