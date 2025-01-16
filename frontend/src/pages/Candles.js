import { useEffect, useState } from "react";
import { fetchProducts } from "../endpoints";
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Candles = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/candle/${productId}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    fetchData();
  }, [])

  return(
    <>
      <Navbar/>
      <h1 className="text-4xl font-bold text-center">OUR CANDLES</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 m-8">
        {products.map((product) =>
          <div key={product.id}>
            <div onClick={() => handleProductClick(product.id)} className="cursor-pointer">
              <img src={product.image} alt={product.name}/>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p>{product.description.substring(0, 50)}[..]</p>
              <p>{product.price}€</p>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  )
}

export default Candles;
