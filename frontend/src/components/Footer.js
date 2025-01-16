import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSquareXTwitter, faSquareInstagram, faYoutube, faSquarePinterest} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <div className="flex justify-evenly p-10 footer-border">
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

export default Footer;
