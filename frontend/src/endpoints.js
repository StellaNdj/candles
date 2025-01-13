import axios from 'axios';


const endpointAPI = "http://localhost:8000/api/";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${endpointAPI}products/`);
    return response.data;
  } catch (error) {
    console.log('Error while fetching products:', error);
  }
}

export const fetchProduct = async ({productId}) => {
  try {
    const response = await axios.get(`${endpointAPI}products/${productId}`);
    return response.data;
  } catch (error) {
    console.log('Error while fetching product:', error)
  }
}

export const loginUser = async ({username, password }) => {
  try {
    const response = await axios.post(`${endpointAPI}token/`, {
      username: username,
      password: password
    });
    return response.data;
  } catch (error) {
    console.log('Error while logging in:', error)
  }
}

export const fetchUserDetails = async ({token}) => {
  try {
    const response = await axios.get(`${endpointAPI}user/`, {
      headers : {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    console.log('Error while fetching user details', error)
  }
}

export const fetchCart = async ({token}) => {
  try {
    const response = await axios.get(`${endpointAPI}cart/`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('Error while fetching the cart:', error)
  }
}

export const addToCart = async ({token, product, quantity}) => {
  try {
    const response = await axios.post(`${endpointAPI}cart-items/`,
      { product, quantity },
      {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    console.log('Error while adding to cart:', error)
  }
}

export const removeFromCart = async({token, cartItemId, quantity}) => {
  try {
    const response = await axios.delete(`${endpointAPI}cart-items/${cartItemId}/`, {
      data: { quantity },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data;

  } catch (error) {
    console.log('Error while removing from the cart:', error)
  }
}

export const placeOrder = async ({token, cart_id}) => {
  try {
    const response = await axios.post(`${endpointAPI}orders/place-order/`,
      { cart_id },
      {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    console.log('Error while placing order', error)
  }
}

export const getReviews = async ({token, productId}) => {
  try {
    const response = await axios.get(`${endpointAPI}products/${productId}/reviews/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Errow while gettings review:', error)
  }
}

export const addReview = async ({token, productId, comment, rating}) => {
  try {
    const response = await axios.post(`${endpointAPI}products/${productId}/reviews/`, {
      data: { rating, comment },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error while adding a review', error)
  }
}
