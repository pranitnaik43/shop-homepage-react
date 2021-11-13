import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Home from './Components/Home';
import Cart from './Components/Cart';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
