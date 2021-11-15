const ProductCard = ({ product, addToMyCart, isAddedToCart }) => {
  const MAX_RATING = 5;

  const getCurrenyINRformat = (val) => {
    val = parseFloat(val);
    return val.toLocaleString("en-IN", {
      style: 'currency',
      currency: 'INR',
    })
  }

  return (
    <>
    {/* {console.log(product)} */}
      <div className="col mb-5">
        <div className="card h-100">
          {/* Sale badge */}
          {
            (product.sale) ? (
              <div className="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "0.5rem"}}>Sale</div>
            ) : (<></>)
          }
          {/* Product image */}
          <img className="card-img-top" src={product.img} alt="..." />
          {/* Product details */}
          <div className="card-body p-4">
            <div className="text-center">
              {/* Product name */}
              <h5 className="fw-bolder">{ product.name }</h5>
              {/* Product Ratings */}
              <div className="d-flex justify-content-center small text-warning mb-2">
                {
                  (product.rating) ? (
                    <>
                    {/* filled stars */}
                    {
                      [...Array(product.rating).fill(1)].map((value, index) => {
                        return <div className="bi-star-fill" key={index}></div>
                      })
                    }
                    {/* empty stars */}
                    {
                      [...Array(MAX_RATING - product.rating).fill(1)].map((value, index) => {
                        return <div className="bi bi-star" key={MAX_RATING - index}></div>
                      })
                    }
                    </>
                  ) : (<></>)
                }
            </div>
              {/* Product price */}
              <span className="text-muted">{ getCurrenyINRformat(product.pricePerUnit) }</span>
            </div>
          </div>
          {/* Product actions */}
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
            {console.log(isAddedToCart(product.id))}
            <button className="btn btn-outline-dark mt-auto" disabled={isAddedToCart(product.id)} onClick={(e) => {addToMyCart(product.id)}}><i className="bi bi-cart-plus-fill mx-2"></i>Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;