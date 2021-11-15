import ProductCard from './ProductCard';
import products from '../Data/products.json';

import { useSelector, useDispatch } from "react-redux";
import { ADD } from '../reducers/cartReducer';

const Home = () => {
  // mapStateToProps
  const cartFromStore = useSelector((state) => state);
  // console.log(cartFromStore)
  // localStorage.setItem("cartProducts", []);

  // mapDispatchToProps
  const dispatch = useDispatch();
  const addToCartSore = (id) => dispatch({ type: ADD, id });

  const addToMyCart = (id) => {
    addToCartSore(id);
  }

  const isAddedToCart = (id) => {
    if(cartFromStore && cartFromStore.includes(id)) {
      return true;
    }
    return false;
  }

  return (
    <>
    {/* {console.log(products)} */}
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