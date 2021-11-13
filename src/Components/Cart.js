import { useState, useEffect } from 'react';
import products from '../Data/products.json';

const Cart = () => {

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    let cartProductsStr = localStorage.getItem("cartProducts");
    try {
      if(cartProductsStr) {
        let tempCartProducts = JSON.parse(cartProductsStr);
        for(let i=0; i<tempCartProducts.length; i++) {
          let id = tempCartProducts[i];
          let product = products.find(product => (product.id===id));
          product.quantity = 1;
          tempCartProducts[i] = product;       
        }
        setCartProducts(tempCartProducts);
      }
    }
    catch(e) {
      console.log(e);
    }
  }, []);

  const setQuantity = (id, quantity) => {
    cartProducts.forEach(product => {
      if(product.id === id) {
        product.quantity = quantity;
      }
    });
    setCartProducts([...cartProducts]);
  }

  return ( 
    <div className="container px-4 px-lg-5 my-5">
      {/* {console.log(cartProducts)} */}
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
                      <button className="btn btn-danger mt-2 mt-md-2 mt-lg-3 w-100"><i className="bi bi-cart-x-fill mx-2"></i>Remove From Cart</button>
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