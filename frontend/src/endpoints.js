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
