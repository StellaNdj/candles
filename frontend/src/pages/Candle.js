import { useEffect, useState } from "react";
import { addToCart, fetchProduct, getReviews, addReview } from "../endpoints";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import StarRating from "../components/StarRating";

const Candle = () => {
  const [product, setProduct] = useState();
  const [charOpen, setCharOpen] = useState(false);
  const [ingOpen, setIngOpen] = useState(false);
  const [reviews, setReviews] = useState();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 3,
    title: '',
    comment: ''
  });

  const { candleId } = useParams();
  const {fetchCartData} = useCart();

  const fetchReviews = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const reviewData = await getReviews({ token, productId: candleId });
      setReviews(reviewData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      const data = await fetchProduct({productId: candleId});
      setProduct(data);

      await fetchReviews();
    };
    fetchData()
  }, []);

  const handleAddToCart = async (product, quantity) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      await addToCart({token, product, quantity});
      fetchCartData();
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddReview = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('accessToken');

    if (token) {
      const response = await addReview({token, productId: candleId, comment: reviewForm.comment, title: reviewForm.title, rating: reviewForm.rating})

      if(response) {
        setReviewForm({rating: 0, title: '', comment: ''})
        await fetchReviews();
      }
    }
  };


  if(!product) return <div><FontAwesomeIcon icon={faSpinner} spin/></div>
  if (!reviews) return <div><FontAwesomeIcon icon={faSpinner} spin/></div>

  return(
    <>
      <Navbar/>
      {/* Candle infos */}
      <div className="flex justify-evenly m-8">
        <img src={product.image} alt={'product.name'} className="size-1/2 mr-4"/>
        <div className="mr-8 p-2">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="text-lg my-2">{product.description}</p>
          <p className="text-xl font-bold text-end">{product.price}€</p>
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

      {/* Promise section */}
      <div className="p-12 promise-b">
        <h3 className="font-bold text-3xl text-center mb-4">Our promise to you</h3>
        <div className="flex justify-evenly">
          <img src="/e_1.png" alt='Eco friendly' className="w-40"/>
          <img src="/e_2.png" alt='Natural' className="w-40"/>
          <img src="/e_3.png" alt='Cruelty free' className="w-40"/>
          <img src="/e_4.png" alt='Phthalate free' className="w-40"/>
        </div>
      </div>

      {/* Safety section */}
      <div className='flex justify-evenly items-center cview-safe p-8'>
        <img src="/cviewbanner.png" alt="candle view banner" className='cview-img-banner'/>
        <div className="grid grid-cols-2 gap-4 w-1/2">
            <div className="text-center">
              <h3 className="font-bold text-2xl">BE SAFE</h3>
              <p>Always follow the safety instructions when burning candles.</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-2xl">TRIM IT</h3>
              <p>Please trim wick to 1/4 before burning to allow for a clean burn.</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-2xl">MELT IT</h3>
              <p>Allow candle to burn to the edge of the vessel for a longer burn. Do not burn for more than 3 hours at a time.</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-2xl">SNUFF IT</h3>
              <p>Never leave a candle burning unattended or within reach of drafts, pets, or small children.</p>
            </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="p-12">
        <Button text={'Write a review'} onClick={() => setShowReviewForm(!showReviewForm)}/>
        {showReviewForm && (
          <form onSubmit={handleAddReview}>
            <label className="block text-sm font-medium text-gray-700">Note</label>
            <StarRating rating={reviewForm.rating} setRating={(rating) => setReviewForm({ ...reviewForm, rating })} />

            <label>Title of your review</label>
            <input
              type='text'
              name='title'
              value={reviewForm.title}
              onChange={handleFormChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">How do you feel about the candle?</label>
            <textarea
              name='comment'
              value={reviewForm.comment}
              onChange={handleFormChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            <Button text={'Add review'} type={'submit'}/>
          </form>
        )}

        {reviews.length > 0 ?
          <div>
            {reviews.map((review) =>
              <div key={review.id}>
                <p>{review.title}</p>
                <p>{review.date_created}</p>
                <p>{review.customer_first_name} {review.customer_last_name}</p>
                <p>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < review.rating ? 'gold' : 'gray', fontSize: '20px' }}>★</span>
                  ))}
                </p>
                <p>{review.comment}</p>
              </div>
            )}
          </div>
         :
          <p className="text-lg text-center">No reviews yet. Be the first one to add one.</p>
        }
      </div>
      <Footer/>
    </>
  )
}

export default Candle;
