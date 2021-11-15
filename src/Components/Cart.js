import { useState, useEffect } from 'react';
import products from '../Data/products.json';

import { useSelector, useDispatch } from "react-redux";
import { REMOVE } from '../reducers/cartReducer';

const Cart = () => {

  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);

  // mapStateToProps
  const cartFromStore = useSelector((state) => state);
  console.log(cartFromStore)

  // mapDispatchToProps
  const dispatch = useDispatch();
  const removeFromCartStore = (id) => dispatch({ type: REMOVE, id });

  useEffect(() => {
    //ComponentDidMount

    //Only product ids are stored in Cart store. Add product details to cart
    let tempCartProducts = [...cartFromStore];
    for(let i=0; i<tempCartProducts.length; i++) {
      let id = tempCartProducts[i];
      let product = products.find(product => (product.id===id));
      if(!product.quantity) {
        product.quantity = 1;
      }
      if(!product.price) {
        product.price = product.pricePerUnit;
      }
      tempCartProducts[i] = product;       
    }
    setCartProducts(tempCartProducts);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const updateTotal = () => {
      let sum = 0;
      if(cartProducts) {
        cartProducts.forEach(product => {
          sum+=product.price;
        });
      }
      setTotal(sum);
    }
    updateTotal();
  }, [cartProducts]);

  const setQuantity = (id, quantity) => {
    cartProducts.forEach(product => {
      if(product.id === id) {
        if(quantity<0) {
          quantity = 1;
        }
        product.quantity = quantity;
        product.price = Math.round(product.pricePerUnit * product.quantity * 100) / 100;
      }
    });
    setCartProducts([...cartProducts]);
  }

  const getCurrenyINRformat = (val) => {
    val = parseFloat(val);
    return val.toLocaleString("en-IN", {
      style: 'currency',
      currency: 'INR',
    })
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
    <div className="container px-4 px-lg-5 my-4">
      <header>
        <h1 className="display-4 fw-bolder text-primary text-center">My Cart</h1>
      </header>
        <hr/>
        {
          (cartProducts && cartProducts.length>0) ? (
            <div style={{marginBottom:"100px"}}>
            {
              cartProducts.map(product => (
                <div className="card p-5 mt-2" key={product.id}>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                      <img className="img-thumbnail" src={product.img} alt="..." />
                    </div>
                    <div className="col-12 col-md-6 col-lg-7 col-xl-8">
                      <div className="card-body border h-100">
                        <h2 className="card-title">{product.name}</h2>
                        <h5 className="card-subtitle mb-2 text-muted">{getCurrenyINRformat(product.price)}</h5>
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
            }
              <div className="bg-dark px-5 py-4 d-flex justify-content-between fixed-bottom">
                <h4 className="text-white">Total: <span>{getCurrenyINRformat(total)}</span></h4>
                <button className="btn btn-primary">Pay</button>
              </div>
            </div>
          ) : (<h5 className="text-center text-info">Cart is empty</h5>)
        }
    </div>  
  );
}
 
export default Cart;