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
