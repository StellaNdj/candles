import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSquareXTwitter, faSquareInstagram, faYoutube, faSquarePinterest} from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  return(
    <>
      <Navbar/>
      {/* Banner section */}
      <div className="flex justify-evenly m-4">
        <img src="candles.jpg" alt={'Banner section'} className="banner-img"/>
        <div className="w-1/2 p-10">
          <h1 className="text-4xl font-bold my-2">FIND YOUR PERFECT CANDLE WITH US</h1>
          <p>We believe in the power of a nice scent. Let us help you find the perfect candle to create unique moments for you.</p>
        </div>
      </div>

      {/* Products snipper */}
      <div>
        <h2 className="text-2xl font-bold my-4 text-center">OUR CANDLES</h2>
      </div>

      {/* CTAs */}
      <div className="flex justify-evenly section-border m-4">
        <div className="p-10 w-1/2 h-80 bg-gray-200 section-side-border text-center">
          <h2 className="text-2xl font-bold my-4">JOIN OUR NEWSLETTER</h2>
          <p>​Sign up to our newsletter so we can welcome you to the Candlelit community and keep you posted on new launches, events, special offers and more.</p>
          <Button text={'SUBSCRIBE'}/>
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

      {/* Useful links */}
      <div className="flex justify-evenly mx-10">
        <div className="w-1/4 infos">
          <h5>USEFUL INFORMATION</h5>
          <a href="#"><p>Track your order</p></a>
          <a href="#"><p>Shipping & Delivery</p></a>
          <a href="#"><p>Return an item</p></a>
          <a href="#"><p>Help center/FAQs</p></a>
          <a href="#"><p>Exclusive offers</p></a>
        </div>
        <div className="w-1/4 infos">
          <h5>SERVICES</h5>
          <a href="#"><p>Our services</p></a>
          <a href="#"><p>Find the perfect gift</p></a>
        </div>
        <div className="w-1/4 infos">
          <h5>FOLLOW US</h5>
          <a href="#" className="flex items-baseline"><FontAwesomeIcon icon={faFacebook} className="mx-1"/><p>Facebook</p></a>
          <a href="#" className="flex items-baseline"><FontAwesomeIcon icon={faSquareXTwitter} className="mx-1"/><p>Twitter</p></a>
          <a href="#" className="flex items-baseline"><FontAwesomeIcon icon={faSquareInstagram} className="mx-1"/><p>Instagram</p></a>
          <a href="#" className="flex items-baseline"><FontAwesomeIcon icon={faYoutube} className="mx-1"/><p>Youtube</p></a>
          <a href="#" className="flex items-baseline"><FontAwesomeIcon icon={faSquarePinterest} className="mx-1"/><p>Pinterest</p></a>
        </div>
        <div className="w-1/4 infos">
          <h5>LEGAL</h5>
          <a href="#"><p>Website Terms of Use</p></a>
          <a href="#"><p>Cookie Policy</p></a>
          <a href="#"><p>Online Privacy Policy</p></a>
          <a href="#"><p>Products Terms and Conditions</p></a>
        </div>
      </div>
    </>
  )
}

export default Home;
