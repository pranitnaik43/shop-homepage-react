import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store";
import Nav from './Components/Nav';
import Home from './Components/Home';
import Cart from './Components/Cart';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
      <Nav />
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
