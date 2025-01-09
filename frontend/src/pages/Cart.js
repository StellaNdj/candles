import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cart, cartItems, fetchCartData } = useCart();

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
          <img className="w-40" src={item.product.image} alt={item.product.name} />
          <div>
            <p>{item.quantity} x {item.product.name}</p>
            <p className="font-semibold">{item.total_price} €</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
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
    </div>
    </>
  )

}

export default Cart;
