import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faBagShopping } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return(
    <nav className="flex justify-between items-center nav-border my-4">
      <div className='mx-2'>
        <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
      </div>
      <div className=''>
        <Link to='/'>
          <img src="Candlelit.png" alt={'Candlelit logo'} className="size-20"/>
        </Link>
      </div>
      <div className='mx-2'>
        <FontAwesomeIcon icon={faUser} size='lg' className='mx-2'/>
        <FontAwesomeIcon icon={faBagShopping} size='lg' className='mx-2' />
      </div>
    </nav>
  )
}

export default Navbar;
