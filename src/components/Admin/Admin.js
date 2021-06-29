import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminProducts from "../AdminProducts/AdminProducts";
import Users from "../Users/Users";

const Admin = (props) => {
  let history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [welcomeMsg, setWelcomeMsg] = useState();
  const [adminMsg, setAdminMsg] = useState();
  const [productMsg, setProductMsg] = useState();
  const [existMsg, setExistMsg] = useState();
  const [existsMsg, setExistsMsg] = useState();

  useEffect(() => {
    async function fetchSes() {
      const req = await fetch(process.env.REACT_APP_URL + "/sessionInfo", {
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
              // console.log(data);
              setLoggedIn(true);
            });
          } else if (res.status === 400) {
            res.json().then((data) => {
              // console.log(data);
              history.push("/login");
            });
          }
        })
        .catch((error) => console.log(error));
      return req;
    }
    fetchSes();
  }, []);

  // //ip whitelist for admin panel is disabled for live site
  // useEffect(() => {
  //   fetch(process.env.REACT_APP_URL + "/onlyAdmin", {
  //     method: "GET",
  //     body: JSON.stringify(),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   }).then((res) => {
  //     console.log(res);
  //     if (res.status === 403) {
  //       history.push("/login");
  //     } else if (res.status === 200) {
  //       res.json().then((data) => {
  //         setWelcomeMsg("Welcome to the admin panel");
  //       });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    async function fetchAPI() {
      const request = await fetch(process.env.REACT_APP_URL + "/userInfo", {
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
              // console.log(data);
              // console.log("users info error");
            });
          } else if (res.status === 200) {
            res.json().then((data) => {
              setUsers(data.users);
              setLoaded(true);
              // console.log(data);
              // console.log("users info");
            });
          }
        })
        .catch((error) => console.log(error));
      return request;
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    const request = fetch(process.env.REACT_APP_URL + "/products", {
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
            // console.log(data);
            // console.log("this is products data /error 405");
          });
        } else if (res.status === 200) {
          res.json().then((data) => {
            setProducts(data.prod);
            setLoaded(true);
            // console.log(data);
            // console.log("this is products data");
          });
        }
      })
      .catch((error) => console.log(error));
    return request;
  }, []);

  const addProduct = (data) => {
    // console.log(data);
    fetch(process.env.REACT_APP_URL + "/addProduct", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        // console.log("cant add product");
      } else if (res.status === 409) {
        setExistsMsg(`${data.pName} already exists.`);
      } else if (res.status === 200) {
        res.json().then((data) => {
          // console.log(data);
          // console.log("added");
          setProductMsg(`Product ${data.pName} is added as a new product.`);
        });
      }
    });
  };

  const addAdmin = (data) => {
    // console.log(data);
    fetch(process.env.REACT_APP_URL + "/addAdmin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        // console.log("cant add admin");
      } else if (res.status === 409) {
        setExistMsg("This admin already exists in the system.");
      } else if (res.status === 200) {
        res.json().then((data) => {
          // console.log(data);
          // console.log("added");
          setAdminMsg(`User ${data.admin} is added as admin.`);
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
          pattern: /^[A-Z]{1}[A-Z a-z]{1,}/,
          maxlength: 25,
          minLength: 2,
        })}
      />
      {errors.customer_name && (
        <span>
          First name should include characters and start with a capital letter.
        </span>
      )}
      <input
        type="text"
        name="customer_surname"
        placeholder="Surname"
        ref={register({
          pattern: /^[A-Z]{1}[A-Z a-z]{1,}/,
          maxlength: 25,
          minLength: 2,
        })}
      />
      {errors.customer_surname && (
        <span>
          Last name should include characters and start with a capital letter.
        </span>
      )}
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
      {errors.customer_email && (
        <span>Please enter a valid email address.</span>
      )}
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
        style={{ cursor: "pointer", display: "block", color: "green" }}
        onClick={handleSubmit(addAdmin)}>
        group_add
      </i>
      {errors.customer_password && (
        <span>
          Your password should contain at least one number, one upper case and
          one lower case letter and must be 8 characters long.
        </span>
      )}
      <p>{adminMsg}</p>
      <p>{existMsg}</p>
      <div style={{ height: 350, overflow: "scroll" }}>
        {users.map((user) => {
          return <Users key={user.customer_id} user={user} />;
        })}
      </div>
      <h3>Products</h3>
      <h6>Add New Product</h6>
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
      {errors.pName && (
        <span>
          Product name should include characters and start with a capital
          letter.
        </span>
      )}
      <input
        type="number"
        name="pPrice"
        placeholder="Price i.e 0.99"
        ref={register({
          minLength: 3,
          maxlength: 5,
        })}
      />
      <i
        className="material-icons"
        style={{ cursor: "pointer", color: "green" }}
        onClick={handleSubmit(addProduct)}>
        add_circle
      </i>
      {errors.pPrice && (
        <span>Product price should include numbers and two decimals.</span>
      )}
      <p>{productMsg}</p>
      <p>{existsMsg}</p>
      <div style={{ height: 300, overflow: "scroll", marginBottom: 80 }}>
        {products.map((product) => {
          return <AdminProducts key={product.pID} product={product} />;
        })}
      </div>
    </>
  );
};

export default Admin;
