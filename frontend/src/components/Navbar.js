import { Link } from 'react-router-dom'
const Navbar = () => {
  return(
    <nav className="flex justify-center">
      <div>
        <Link to='/'>
          <img src="Candlelit.png" alt={'Candlelit logo'} className="size-20"/>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;
