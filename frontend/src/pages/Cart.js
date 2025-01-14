import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/Navbar";
import { makePayment, placeOrder, removeFromCart } from '../endpoints';
import Button from '../components/Button';

const Cart = () => {
  const { cart, cartItems, fetchCartData } = useCart();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentFormChange = (e) => {
    setPaymentForm({
      ...paymentForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveFromCart = async (cartItemId, quantity) => {
    const token = localStorage.getItem('accessToken');

    if(token) {
      await removeFromCart({ token, cartItemId, quantity })
      fetchCartData();
    }
  }

  // const handlePlaceOrder = async (cart_id) => {
  //   const token = localStorage.getItem('accessToken')
  //   if (token) {
  //     await makePayment({token, cart_id})
  //     await placeOrder({token, cart_id})
  //   }
  // }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    try {
      const paymentResponse = await makePayment({token, cart_id: cart.id, paymentForm});
      if(paymentResponse && paymentResponse.message === 'Payment successful.') {
        const payment_id = paymentResponse.payment_id;

        await placeOrder({token, cart_id:cart.id, payment_id});
      }
    } catch (error) {

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
        <Button text={`Pay ${cart.total_price}€`} onClick={() => setShowPaymentForm(true) }/>
        {/* <Button text={'Place Order'} onClick={() => handlePlaceOrder(cart.id)} /> */}
    </div>

     {/* Display the payment form conditionally */}
     {showPaymentForm && (
        <form onSubmit={handlePaymentSubmit} className="mt-4 w-8/12">
          <h3 className="text-center font-bold text-xl mb-2">Payment Details</h3>

          {/* Payment method selection */}
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="card">Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Card payment inputs - visible if 'card' is selected */}
          {paymentMethod === 'card' && (
            <>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  onChange={handlePaymentFormChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  onChange={handlePaymentFormChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  onChange={handlePaymentFormChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}

          {/* PayPal option - visible if 'paypal' is selected */}
          {paymentMethod === 'paypal' && (
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Click 'Place Order' to proceed with PayPal payment.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-green-500 text-white"
          >
            {paymentMethod === 'paypal' ? 'Place Order' : 'Submit Payment'}
          </button>
        </form>
      )}
    </>
  )

}

export default Cart;
