import React, { useState } from "react";
import "./Basket.css";

function Basket(props) {
  const { cart, addtoCart, removefromCart } = props;
  return (
    <div>
      <div>{cart && !cart.length && <div>Cart is empty.</div>}</div>
      {cart ? (
        <div>
          {cart.map((item) => {
            return (
              <div key={item.pID}>
                <div style={{ display: "inline" }}>
                  {item.pName} -
                  <div style={{ display: "inline" }}>
                    - {item.qty} x {item.pPrice} --
                  </div>
                  <i
                    className="cursor small material-icons"
                    onClick={() => addtoCart(item)}>
                    add_circle_outline
                  </i>
                  <i
                    className="cursor small material-icons"
                    onClick={() => removefromCart(item)}>
                    remove_circle_outline
                  </i>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>cart is empty</div>
      )}
    </div>
  );
}
export default Basket;
