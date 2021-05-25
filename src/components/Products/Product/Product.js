import React from "react";

function Product(props) {
  const { product, addtoCart } = props;
  return (
    <div className="col s4 m2 l2" key={product.pID}>
      <div className="card">
        <div className="card-image">
          <img src={product.pImage} alt={product.pName} />
          <button
            className="btn-floating halfway-fab waves-effect waves-light green"
            onClick={() => addtoCart(product)}>
            <i className="material-icons">add</i>
          </button>
          <div className="card-content">
            <p>{product.pName}</p>
            <p>${product.pPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
