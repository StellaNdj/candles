import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Candles from './pages/Candles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/candles' element={<Candles/>} />
      </Routes>
    </Router>
  );
}

export default App;
