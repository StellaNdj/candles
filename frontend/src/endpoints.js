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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error while fetching the cart:', error)
  }
}

export const addToCart = async ({token, product, quantity}) => {
  console.log(token, product, quantity)
  try {
    const response = await axios.post(`${endpointAPI}cart/cart-items/`, {
      data: { product, quantity },
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error while adding to cart:', error)
  }
}
