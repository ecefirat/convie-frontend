import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminProducts from "../AdminProducts/AdminProducts";
import Product from "../Products/Product/Product";
import Users from "../Users/Users";

const Admin = (props) => {
  let history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [addAdm, setAddAdm] = useState(false);

  const { register, handleSubmit } = useForm();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState();

  useEffect(() => {
    async function fetchSes() {
      const req = await fetch("http://localhost:5000/sessionInfo", {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              console.log(data);
              setLoggedIn(true);
            });
          } else if (res.status === 400) {
            res.json().then((data) => {
              console.log(data);
              history.push("/login");
            });
          }
        })
        .catch((error) => console.log(error));
      return req;
    }
    fetchSes();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/onlyAdmin", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      console.log(res);
      if (res.status === 403) {
        history.push("/login");
      } else if (res.status === 200) {
        res.json().then((data) => {
          setWelcomeMsg("Welcome to the admin panel");
        });
      }
    });
  }, []);

  useEffect(() => {
    async function fetchAPI() {
      const request = await fetch("http://localhost:5000/userInfo", {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 400) {
            res.json().then((data) => {
              console.log(data);
              console.log("users info error");
            });
          } else if (res.status === 200) {
            res.json().then((data) => {
              setUsers(data.users);
              setLoaded(true);
              console.log(data);
              console.log("users info");
            });
          }
        })
        .catch((error) => console.log(error));
      return request;
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    const request = fetch("http://localhost:5000/products", {
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
  }, []);

  const addProduct = (data) => {
    console.log(data);
    fetch("http://localhost:5000/addProduct", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        console.log("cant add product");
      } else if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          console.log("added");
        });
      }
    });
  };

  const addAdmin = (data) => {
    console.log(data);
    fetch("http://localhost:5000/addAdmin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        console.log("cant add admin");
      } else if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          console.log("added");
          setAddAdm(true);
          setAdminName(data.admin);
        });
      }
    });
  };

  return (
    <>
      <p style={{ marginBottom: 5 }}>{welcomeMsg}</p>
      <h3 style={{ marginTop: 0 }}>Users</h3>
      <h6>Add New Admin</h6>
      <input
        type="text"
        name="customer_name"
        placeholder="Name"
        ref={register({
          pattern: /^[A-Z]{1}[A-Z a-z]{2,}/,
          maxlength: 25,
          minLength: 2,
        })}
      />
      <input
        type="text"
        name="customer_surname"
        placeholder="Surname"
        ref={register({
          pattern: /^[A-Z]{1}[A-Z a-z]{2,}/,
          maxlength: 25,
          minLength: 2,
        })}
      />
      <input
        type="email"
        name="customer_email"
        placeholder="Email"
        ref={register({
          pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
          minLength: 10,
          maxLength: 50,
        })}
      />
      <input
        type="password"
        name="customer_password"
        placeholder="Password"
        ref={register({
          pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        })}
      />
      <i
        className="material-icons"
        style={{ cursor: "pointer" }}
        onClick={handleSubmit(addAdmin)}>
        add
      </i>
      <p style={addAdm ? { display: "block" } : { display: "none" }}>
        User {adminName} is added as admin.
      </p>
      <div style={{ height: 350, overflow: "scroll" }}>
        {users.map((user) => {
          return <Users key={user.customer_id} user={user} />;
        })}
      </div>
      <h2>Products</h2>
      <h5>Add New Product</h5>
      <input
        type="text"
        name="pName"
        placeholder="Product Name"
        ref={register({
          pattern: /^[A-Z]{1}[A-Z a-z]{2,}/,
          maxlength: 25,
          minLength: 2,
        })}
      />
      <input
        type="number"
        name="pPrice"
        placeholder="Product Price"
        ref={register({
          maxlength: 5,
        })}
      />
      <i
        className="material-icons"
        style={{ cursor: "pointer" }}
        onClick={handleSubmit(addProduct)}>
        add
      </i>
      <div style={{ height: 300, overflow: "scroll", marginBottom: 80 }}>
        {products.map((product) => {
          return <AdminProducts key={product.pID} product={product} />;
        })}
      </div>
    </>
  );
};

export default Admin;
