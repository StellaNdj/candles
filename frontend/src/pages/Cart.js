import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/Navbar";
import { placeOrder, removeFromCart } from '../endpoints';
import Button from '../components/Button';

const Cart = () => {
  const { cart, cartItems, fetchCartData } = useCart();

  const handleRemoveFromCart = async (cartItemId, quantity) => {
    const token = localStorage.getItem('accessToken');

    if(token) {
      await removeFromCart({ token, cartItemId, quantity })
      fetchCartData();
    }
  }

  const handlePlaceOrder = async (cart_id) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      await placeOrder({token, cart_id})
    }
  }

  useEffect(() => {
    fetchCartData()
  }, [])

  return (
    <>
      <Navbar/>
      <div className="flex flex-col items-center">
       <div className="border-b-2 w-8/12">
          <h2 className="text-center font-bold text-3xl mb-4">Your Shopping Cart</h2>
        </div>
        {cartItems.map(item => (
        <div key={item.id} className="flex w-8/12 border-b-2 items-center justify-between">
          <img className="w-40" src={`http://localhost:8000/${item.product_image}`} alt={item.product_name} />
          <div>
            <p>{item.quantity} x {item.product_name} ({item.product_price}€)</p>
            <p className="font-semibold">{item.total_price}€</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const quantity_to_remove = parseInt(e.target.quantity.value, 10);
              handleRemoveFromCart(item.id, quantity_to_remove)
            }}
            className="flex items-center"
          >
            <input
              type="number"
              name="quantity"
              min="1"
              max={item.quantity}
              defaultValue="1"
              className="w-16 text-center border"
            />
            <button type="submit" className="ml-2 px-4 py-2 bg-red-500 text-white">Remove</button>
          </form>
        </div>
      ))}
        <h3>Total: {cart.total_price}€</h3>
        <Button text={'Place Order'} onClick={() => handlePlaceOrder(cart.id)} />
    </div>
    </>
  )

}

export default Cart;
