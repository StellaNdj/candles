import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Candles from './pages/Candles';
import Candle from './pages/Candle';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>

          {/* Private routes */}
          <Route path="/candles" element={<ProtectedRoute element={<Candles />} />} />
          <Route path="/candle/:candleId" element={<ProtectedRoute element={<Candle />} />}/>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
