import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AdminProducts(props) {
  const { product } = props;
  const [pName, setPName] = useState(product.pName);
  const [msg, setMessage] = useState(false);

  const { register, handleSubmit } = useForm();

  const changePName = (data) => {
    console.log(data);
    fetch("http://localhost:5000/pName", {
      method: "POST",
      body: JSON.stringify({ data, pID: product.pID }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 404) {
        console.log("cant change pname");
      } else if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setPName(data.message);
          console.log("pname above");
          setMessage(true);
          console.log(msg);
        });
      }
    });
  };

  const deleteProduct = () => {
    fetch("http://localhost:5000/product", {
      method: "POST",
      body: JSON.stringify({ pID: product.pID }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 404) {
        console.log("cant delete products");
      } else if (res.status === 200) {
        res.json().then((data) => {
          console.log("deleted");
          console.log(data.pID);
        });
      }
    });
  };

  const hideMsg = () => {
    setMessage(false);
  };

  return (
    <div className="col s4 m2 l2" key={product.pID}>
      <div className="card horizontal">
        <div className="card-stacked" style={{ flexDirection: "row" }}>
          <img
            src={product.pImage}
            alt={product.pName}
            style={{ width: 100, height: 100, margin: 10 }}
          />
          <button
            onClick={handleSubmit(deleteProduct)}
            className="btn-floating btn-small halfway-fab waves-effect waves-light red">
            <i className="material-icons">delete</i>
          </button>
          <div className="card-content">
            {/* <input></input> */}
            <input
              type="text"
              name="pName"
              value={pName}
              ref={register({
                pattern: /^[A-Z]{1}[A-Z a-z]{2,}/,
                maxlength: 25,
                minLength: 2,
              })}
              onChange={(e) => setPName(e.target.value)}
              onKeyPress={(e) => {
                if (e.which === 13) {
                  setPName(e.target.value);
                  handleSubmit(changePName(pName));
                  console.log(msg);
                }
              }}
              onBlur={hideMsg}
            />
            <p style={msg ? { display: "block" } : { display: "none" }}>
              Product name is changed as {pName}.
            </p>
            <p>${product.pPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
