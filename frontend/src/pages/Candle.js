import { useEffect, useState } from "react";
import { addToCart, fetchProduct } from "../endpoints";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Candle = () => {
  const [product, setProduct] = useState();
  const [charOpen, setCharOpen] = useState(false);
  const [ingOpen, setIngOpen] = useState(false);

  const { candleId } = useParams();
  const {fetchCartData} = useCart()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProduct({productId: candleId});
      setProduct(data);
    };
    fetchData()
  }, []);

  const handleAddToCart = async (product, quantity) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      await addToCart({token, product, quantity});
      fetchCartData()
    }
  }

  if(!product) return <div>Loading...</div>

  return(
    <>
      <Navbar/>
      <div className="flex justify-evenly m-8">
        <img src={product.image} alt={'product.name'} className="size-1/2 mr-4"/>
        <div className="mr-8 p-2">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="text-lg my-2">{product.description}</p>
          <p className="text-lg">{product.price}€</p>
          <div className="border-t-2 border-black border-b-2 my-2 flex justify-between">
            <div>
              <div className="flex items-baseline">
                <h5 className="text-lg font-bold">Characteristics</h5>
                {charOpen ? <FontAwesomeIcon icon={faMinus} size='sm' className="ml-2 cursor-pointer" onClick={() => setCharOpen(!charOpen)}/> : <FontAwesomeIcon icon={faPlus} size='sm' className="ml-2 cursor-pointer" onClick={() => setCharOpen(!charOpen)}/>}
              </div>
              {charOpen && (
                <>
                {product.characteristics.split('. ').map((sentence, index) => (
                  <p key={index}>{sentence}{index < product.characteristics.split('. ').length - 1 ? '.' : ''}</p>
                ))}
              </>
              )}
            </div>
            <div>
              <div className="flex items-baseline">
                <h5 className="text-lg font-bold">Ingredients</h5>
                {ingOpen ? <FontAwesomeIcon icon={faMinus} size="sm" className="ml-2 cursor-pointer" onClick={() => setIngOpen(!ingOpen)}/> : <FontAwesomeIcon icon={faPlus} size="sm" className="ml-2 cursor-pointer" onClick={() => setIngOpen(!ingOpen)}/>}
              </div>
              {ingOpen && (
                <>
                  {product.ingredients.split(',').map((ingredient, index) => (
                    <p key={index}>{ingredient}{index < product.ingredients.split(', ').length - 1 ? '.' : ''}</p>
                  ))}
                </>
              )}

            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const quantity_to_add = parseInt(e.target.quantity.value, 10)
              handleAddToCart(product.id, quantity_to_add)
            }}

            className="flex items-center"
          >
            <input
              type="number"
              name="quantity"
              min={1}
              defaultValue={1}
              className="w-16 text-center border mr-8"
            />
            <Button text={'Add to cart'} type={'submit'}/>
          </form>
        </div>
      </div>
      <div>
        <img src="cview.png" alt="candle view banner"/>
      </div>
    </>
  )
}

export default Candle;
