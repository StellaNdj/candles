import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Candles from './pages/Candles';
import Candle from './pages/Candle';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>

            {/* Private routes */}
            <Route path="/candles" element={<ProtectedRoute element={Candles} />} />
            <Route path="/candle/:candleId" element={<ProtectedRoute element={Candle} />} />
            <Route path="/cart" element={<ProtectedRoute element={Cart} />} />

          </Routes>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
