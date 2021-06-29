import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  localStorage.setItem("loggedIn", false);

  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const [loginError, setLoginError] = useState("");
  const [notExists, setNotExists] = useState("");

  const submitCustomerLogin = (data) => {
    // console.log(data);
    //     console.log("login data");
    fetch(process.env.REACT_APP_URL + "/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res)
      .then((res) => {
        if (res.status === 404) {
          setNotExists(`The username does not exist in the system. Would you like to
          register?`);
        }
        if (res.status === 401) {
          setLoginError(`Your password and/or email is not correct. Your password should
          contain at least one number, one upper case and one lower case
          letter and must be 8 characters long.`);
        }
        if (res.status === 200) {
          // console.log(res.status);
          res.json().then((data) => {
            // console.log(data.user.role);
            // console.log("above");
            // console.log(loggedIn);
            setLoggedIn(true);
            // console.log(loggedIn);
            localStorage.setItem("loggedIn", true);
            if (data.user.role === "admin") {
              document.getElementById("adminIcon").style.display = "block";
              history.push("/admin");
            } else {
              history.push("/");
              history.go();
            }
          });
        }
      });
  };

  return (
    <>
      <img
        src="../../../images/convieLogoGif.gif"
        alt="logoGif"
        width="100px"
        style={{ margin: "100px 110px 50px" }}></img>
      <div className="row">
        <form onSubmit={handleSubmit(submitCustomerLogin)}>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">alternate_email</i>
              <input
                id="email"
                type="email"
                className="validate"
                name="email"
                ref={register({
                  required: true,
                  pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
                  minLength: 10,
                  maxLength: 50,
                })}
              />
              <label htmlFor=" icon_prefix email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input
                id="password"
                type="password"
                className="validate"
                name="password"
                ref={register({
                  required: true,
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                })}
              />
              <span>{loginError}</span>
              <span>{notExists}</span>
              <label htmlFor="password">Password - 8 characters</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light green" type="submit">
            Login
            <i className="material-icons right">send</i>
          </button>
          <div style={{ marginTop: 10, marginBottom: 40 }}>
            Don't have an account?
            <Link to="/register">{props.register} Register here!</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
