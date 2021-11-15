import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  // mapStateToProps
  const cartFromStore = useSelector((state) => state);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to="/">Start Bootstrap</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/">About</Link>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/">All Products</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/">Popular Items</Link></li>
                <li><Link className="dropdown-item" to="/">New Arrivals</Link></li>
              </ul>
            </li>
          </ul>
          <Link className="btn btn-outline-dark" to="/cart">
            <i className="bi-cart-fill me-1"></i>
            Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">{(cartFromStore && cartFromStore.length)?(cartFromStore.length):(0)}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;