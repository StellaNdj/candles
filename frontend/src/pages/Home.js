import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { fetchHomeProducts } from "../endpoints";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const [mail, setMail] = useState('');
  const [products, setProducts] = useState([]);

  const handleMailing = (e) => {
    e.preventDefault();
    toast.success(`${mail} joined our mailing list!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
    setMail('');
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHomeProducts();
      setProducts(data);
    }
    fetchData();
  }, [])

  if(!products) return <div><FontAwesomeIcon icon={faSpinner} spin/></div>

  return(
    <>
      <Navbar/>
      {/* Banner section */}
      <div className="flex justify-evenly">
        <img src="bl_candle.webp" alt={'Banner section'} className="banner-img"/>
        <div className="w-1/2 p-12 home-bg flex flex-col justify-center">
          <h1 className="text-4xl font-bold my-2 banner-w-h">FIND YOUR PERFECT CANDLE WITH US</h1>
          <p className="banner-w-p">We believe in the power of a nice scent. Let us help you find the perfect candle to create unique moments for you.</p>
        </div>
      </div>

      {/* Products snippet */}
      <div>
        <h2 className="text-2xl font-bold my-4 text-center">OUR CANDLES</h2>
        <Link to='/candles'><span className="mx-8 italic">View All<FontAwesomeIcon icon={faArrowRight} className="ml-4"/></span></Link>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 m-8">
          {products.map((product) =>
            <div key={product.id}>
            <div className="cursor-pointer">
              <img src={product.image} alt={product.name}/>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p>{product.price}€</p>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex justify-evenly section-border my-4">
        <div className="p-10 w-1/2 h-80 bg-gray-200 section-side-border text-center">
          <h2 className="text-2xl font-bold my-4">JOIN OUR NEWSLETTER</h2>
          <p>​Sign up to our newsletter so we can welcome you to the Candlelit community and keep you posted on new launches, events, special offers and more.</p>
          <ToastContainer />
          <form onSubmit={handleMailing}>
            <input
              type="text"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="Ex: johndoe@icloud.com"
              className='h-11 p-1'
            />
            <Button type={'submit'} text={'SUBSCRIBE'}/>
          </form>
        </div>
        <div className="p-10 w-1/2 h-80 text-center">
          <h2 className="text-2xl font-bold my-4">NEED HELP?</h2>
          <p>We are here to assist you.</p>
          <Button text={'CONTACT US'}/>
          <p className="text-gray-500"> 0980 750 6010 <br></br>
            Monday - Friday: 9 am to 6 pm <br></br>
            Saturday: 9 am to 4 pm (excluding holidays)
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </>
  )
}

export default Home;
