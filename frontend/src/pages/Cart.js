import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/Navbar";
import { makePayment, placeOrder, removeFromCart } from '../endpoints';
import Button from '../components/Button';

const Cart = () => {
  const { cart, cartItems, fetchCartData } = useCart();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    payment_method: 'Card',
    card_number: '',
    card_expiry: '',
    card_cvv: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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
        alert('Order placed succesfully!');
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
            <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="payment_method"
              name="payment_method"
              value={paymentForm.payment_method}
              onChange={handleFormChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="Card">Card</option>
              <option value="Paypal">PayPal</option>
            </select>
          </div>

          {/* Card payment inputs - visible if 'card' is selected */}
          {paymentForm.payment_method === 'Card' && (
            <>
              <div className="mb-4">
                <label htmlFor="card_number" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  id="card_number"
                  name="card_number"
                  value={paymentForm.card_number}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="card_expiry" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="card_expiry"
                  name="card_expiry"
                  value={paymentForm.card_expiry}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="card_cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="card_cvv"
                  name="card_cvv"
                  value={paymentForm.card_cvv}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}

          {/* PayPal option - visible if 'paypal' is selected */}
          {paymentForm.payment_method === 'Paypal' && (
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
            {paymentForm.payment_method === 'Paypal' ? 'Place Order' : 'Submit Payment'}
          </button>
        </form>
      )}
    </>
  )

}

export default Cart;
