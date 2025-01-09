import { createContext, useEffect, useState, useContext } from "react";
import { fetchCart } from "../endpoints";


export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchCartData = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const cartDetails = await fetchCart({token});
        console.log(cartDetails)
        setCart(cartDetails[0]);
        setCartItems(cartDetails[0].items)

      } catch (error) {
        console.log('Error while fetching cart context:', error)
      }
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [])

  return(
    <CartContext.Provider value={{cartCount, cartItems, cart, fetchCartData}}>
      {children}
    </CartContext.Provider>
  )

}

export const useCart = () => {
  return useContext(CartContext)
}
