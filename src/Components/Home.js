import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import products from '../Data/products.json';

const Home = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    try {
      //get cart products from local storage
      let tempCartProductsString = localStorage.getItem("cartProducts");
      let tempCartProducts = [];
      if(tempCartProductsString) {
        tempCartProducts = JSON.parse(tempCartProductsString);
      }
      setCartProducts(tempCartProducts);
    }
    catch(e) {
      console.log(e);
    }
  }, [])

  const addToMyCart = (id) => {
    let tempCartProducts = cartProducts;
    if(!tempCartProducts) {
      tempCartProducts = [];
    }
    // console.log(tempCartProducts);
    tempCartProducts.push(id);
    //save to local storage
    localStorage.setItem("cartProducts", JSON.stringify(tempCartProducts));
    console.log(tempCartProducts);

    //set state
    setCartProducts(tempCartProducts);
  }

  const isAddedToCart = (id) => {
    if(cartProducts && cartProducts.includes(id)) {
      return true;
    }
    return false;
  }

  return (
    <>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
          </div>
        </div>
      </header>

      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {
              (products) ? (
                products.map((product) => {
                  return <ProductCard key={product.id} product={product} addToMyCart={addToMyCart} isAddedToCart={isAddedToCart}/>
                })
              ) : (<p>No products found</p>)
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;