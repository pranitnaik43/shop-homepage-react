import { useState, useEffect } from 'react';
import products from '../Data/products.json';

import { useSelector, useDispatch } from "react-redux";
import { REMOVE } from '../reducers/cartReducer';

const Cart = () => {

  const [cartProducts, setCartProducts] = useState([]);

  // mapStateToProps
  const cartFromStore = useSelector((state) => state);
  console.log(cartFromStore)

  // mapDispatchToProps
  const dispatch = useDispatch();
  const removeFromCartStore = (id) => dispatch({ type: REMOVE, id });

  useEffect(() => {
    //Only product ids are stored in Cart store. Add product details to cart
    let tempCartProducts = [...cartFromStore];
    for(let i=0; i<tempCartProducts.length; i++) {
      let id = tempCartProducts[i];
      let product = products.find(product => (product.id===id));
      product.quantity = 1;
      tempCartProducts[i] = product;       
    }
    setCartProducts(tempCartProducts);
      
    // eslint-disable-next-line
  }, []);

  const setQuantity = (id, quantity) => {
    cartProducts.forEach(product => {
      if(product.id === id) {
        product.quantity = quantity;
      }
    });
    setCartProducts([...cartProducts]);
  }

  const removeFromCart = (id) => {
    try {
      removeFromCartStore(id);

      //change state
      let tempCartProducts = cartProducts;
      if(!tempCartProducts) {
        tempCartProducts = [];
      }
      tempCartProducts = tempCartProducts.filter(product => (product.id!==id));
      setCartProducts(tempCartProducts);
      }
    catch(e) {
      console.log(e);
    }
  }

  return ( 
    <div className="container px-4 px-lg-5 my-5">
      {console.log(cartProducts)}
      <header>
        <h1 className="display-4 fw-bolder text-primary text-center">My Cart</h1>
      </header>
        <hr/>
        {
          (cartProducts && cartProducts.length>0) ? (
            cartProducts.map(product => (
              <div className="card p-5 mt-2" key={product.id}>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                    <img className="img-thumbnail" src={product.img} alt="..." />
                  </div>
                  <div className="col-12 col-md-6 col-lg-7 col-xl-8">
                    <div className="card-body border h-100">
                      <h2 className="card-title">{product.name}</h2>
                      <h5 className="card-subtitle mb-2 text-muted">{"$" + product.price}</h5>
                      <div className="input-group mt-2 mt-md-2 mt-lg-3">
                        <span className="input-group-text bg-white">Quantity</span>
                        <input type="number" className="form-control" min="1" value={product.quantity} onChange={(e) => setQuantity(product.id, e.target.value)}/>
                      </div>
                      <button className="btn btn-danger mt-2 mt-md-2 mt-lg-3 w-100" onClick={() => removeFromCart(product.id)}><i className="bi bi-cart-x-fill mx-2"></i>Remove From Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (<h5 className="text-center text-info">Cart is empty</h5>)
        }
    </div>  
  );
}
 
export default Cart;