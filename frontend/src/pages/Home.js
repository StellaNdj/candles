import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return(
    <>
      <Navbar/>
      {/* Banner section */}
      <div className="flex justify-evenly m-4">
        <img src="candles.jpg" alt={'Banner section'} className="banner-img"/>
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold">FIND YOUR PERFECT CANDLE WITH US</h1>
          <p>Your new favorite candles that will give an unique and signature scent for all your experiences.</p>
        </div>
      </div>

      {/* Products snipper */}
      <div>
        <h2 className="text-2xl font-bold my-4">OUR PRODUCTS</h2>
      </div>

      {/* CTAs */}
      <div className="flex justify-evenly section-border m-4">
        <div className="p-10 w-1/2 bg-gray-200 section-side-border">
          <h2 className="text-2xl font-bold my-4">JOIN OUR NEWSLETTER</h2>
          <p>​Sign up to our newsletter so we can welcome you to the Candlelit community and keep you posted on new launches, events, special offers and more.</p>
        </div>
        <div className="p-10 w-1/2">
          <h2 className="text-2xl font-bold my-4">NEED HELP?</h2>
          <p>We are here to assist you.</p>
        </div>
      </div>

      {/* Useful links */}
      <div className="flex justify-evenly mx-4">
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
          <a href="#"><p>Facebook</p></a>
          <a href="#"><p>Twitter</p></a>
          <a href="#"><p>Instagram</p></a>
          <a href="#"><p>Youtube</p></a>
          <a href="#"><p>Pinterest</p></a>
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

export default Home
