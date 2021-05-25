import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Product from "../Products/Product/Product";
import Basket from "../Basket/Basket";
import Orders from "../Orders/Orders";
import "./Main.css";
import Login from "../Login/Login";

import { css } from "@emotion/core";
import { jsx } from "@emotion/react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 35vh auto 5vh;
  border-color: red;
`;

function Main(props) {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffb300");

  let history = useHistory();
  // const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  // localStorage.getItem("cart") ? localStorage.setItem("cart", cart) : []
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  //change this to if(!data) {return Loading}

  const [total, setTotal] = useState(0);
  const [customer, setCustomer] = useState("");
  const [customer_id, setCustomerId] = useState("");
  const [customer_address, setCustomerAddress] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const req = fetch("http://localhost:5000/sessionInfo", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setCustomer(data.user.customer_name);
          setCustomerId(data.user.customer_id);
          setCustomerAddress(data.user.customer_address);
          setLoggedIn(true);
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          console.log(data);
          history.push("/login");
        });
      }
    });
    // .catch((error) => console.log(error));
    return req;
  }, []);

  useEffect(() => {
    async function fetchAPI() {
      const request = await fetch("http://localhost:5000/products", {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 405) {
            res.json().then((data) => {
              console.log(data);
              console.log("this is products data /error 405");
            });
          } else if (res.status === 200) {
            res.json().then((data) => {
              setProducts(data.prod);
              setLoaded(true);
              console.log(data);
              console.log("this is products data");
            });
          }
        })
        .catch((error) => console.log(error));
      return request;
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    // if (localStorage.getItem("cart")) {
    //   localStorage.setItem("cart", JSON.stringify(cart));
    //   // setCart(JSON.parse(localStorage.getItem("cart")));
    // } else {
    localStorage.setItem("cart", JSON.stringify(cart));
    // }
    calculateTotal();
  }, [cart]);

  const handleSendOrder = (totall) => {
    fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        totals: totall,
        customer_id: customer_id,
        customer_address: customer_address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
        console.log("first");
        if (res.status === 400) {
          res.json().then((data) => {
            console.log(data);
          });
        } else if (res.status === 200) {
          res.json().then((data) => {
            console.log(data);
            setCart([]);
            history.push("/orders");
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const addtoCart = (product) => {
    const exists = cart.find((i) => i.pID === product.pID);
    if (exists) {
      setCart(
        cart.map((i) =>
          i.pID === product.pID ? { ...exists, qty: exists.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removefromCart = (product) => {
    const exists = cart.find((i) => i.pID === product.pID);
    if (exists.qty === 1) {
      setCart(cart.filter((i) => i.pID !== product.pID));
    } else {
      setCart(
        cart.map((i) =>
          i.pID === product.pID ? { ...exists, qty: exists.qty - 1 } : i
        )
      );
    }
    setTotal(0);
  };

  const emptyCart = () => {
    setCart([]);
    setTotal(0);
  };

  const calculateTotal = () => {
    if (cart.length < 1) {
      return null;
    } else {
      let prices = cart.map((item, index) => {
        return item.pPrice * item.qty;
      });
      let totals = prices.reduce((acc, cur) => acc + cur);
      setTotal(totals.toFixed(2));
      console.log(totals.toFixed(2));
      return total;
    }
  };

  return (
    <div className="main">
      {loggedIn ? (
        <div className="row">
          <h4>WELCOME {customer}</h4>
          {loaded ? (
            <>
              <div style={{ display: "inline-block" }}>
                {products.map((product) => (
                  <Product
                    key={product.pID}
                    product={product}
                    addtoCart={addtoCart}
                    removefromCart={removefromCart}
                  />
                ))}
              </div>
              <div>
                <button
                  className="order-btn btn waves-effect waves-light green"
                  onClick={() => handleSendOrder(total)}>
                  ${total} - ORDER
                </button>
                <Basket
                  cart={cart}
                  addtoCart={addtoCart}
                  removefromCart={removefromCart}
                />
                <button
                  style={{ display: "block", marginBottom: 70 }}
                  className="order-btn btn-small waves-effect waves-light red"
                  onClick={() => emptyCart()}>
                  Empty Cart
                </button>
              </div>
            </>
          ) : (
            <ClimbingBoxLoader
              color={color}
              loading={loading}
              css={override}
              size={15}
            />
          )}
        </div>
      ) : (
        <>
          <ClimbingBoxLoader
            color={color}
            loading={loading}
            css={override}
            size={20}
          />
        </>
      )}
    </div>
  );
}

export default Main;
