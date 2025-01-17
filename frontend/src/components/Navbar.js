import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faBagShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import CandleSearch from '../pages/CandleSearch';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleIconClick = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  };

  const handleCartClick = () => {
    if (user) {
      navigate('/cart')
    } else {
      navigate('/login')
    }
  }

  return(
    <nav className="flex justify-between items-center nav-border p-4 bg-white sticky top-0 z-40">
      <div className='mx-2'>
        <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' onClick={openModal} className='cursor-pointer'/>
      </div>
      <div className=''>
        <div className='flex justify-center'>
          <Link to='/'>
            <img src="/Candlelit.png" alt={'Candlelit logo'} className={`size-20 ${scrolled ? 'hidden' : ''}`}/>
          </Link>
        </div>
        <div className='flex my-2'>
          <Link to='/'><p className='mx-1'>HOME</p></Link>
          <Link to='/candles'><p className='mx-1'>CANDLES</p></Link>
          <p className='mx-1'>SERVICES</p>
          <p className='mx-1'>ABOUT US</p>
        </div>
      </div>
      <div className='mx-2 flex'>
        <FontAwesomeIcon icon={faUser} size='lg' className='mx-2 cursor-pointer' onClick={handleIconClick}/>
        <div className="flex items-center cursor-pointer" onClick={handleCartClick}>
          <FontAwesomeIcon icon={faBagShopping} size="lg" className="mx-2" />
          <span className="shopping-icon">{user ? cartCount : 0}</span>
        </div>
        {user && (
          <>
            <span className='user-icon'>{user[0].username}</span>
            <FontAwesomeIcon icon={faRightFromBracket} size='lg' className='mx-2 cursor-pointer' onClick={() => logout() } />
          </>
        )}
      </div>

      {/* Search component modal */}
      {isModalOpen && (
        <div className="modal">
        <div className="modal-content">
            <button onClick={closeModal} className="close-modal" aria-label="Close">
                ✖
            </button>
                <CandleSearch closeModal={closeModal}/>
            </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;
