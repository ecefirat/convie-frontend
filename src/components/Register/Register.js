import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

function Register(props) {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  console.log("bla");

  const submitCustomerRegistration = (data) => {
    console.log(data);
    if (passwordCheck()) {
      let url = "http://localhost:5000/register";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log("blab");
        if (res.status === 404) {
          history.push("/login");
        }
        if (res.status === 409) {
          document.getElementById("existsError").style.display = "block";
        }
        if (res.status === 200) {
          history.push("/");
        }
        console.log(res.status);
        res.json().then((data) => {
          console.log(data);
          console.log("this one");
        });
      });
    }
  };

  const passwordCheck = (e) => {
    const pw = document.getElementById("password").value;
    const cpw = document.getElementById("confirmPassword").value;
    console.log(pw);
    console.log(cpw);
    if (pw !== cpw) {
      document.getElementById("confirmError").innerHTML =
        "Passwords don't match.";
    } else {
      document.getElementById("confirmError").innerHTML = "Passwords match.";
      return true;
    }
  };

  return (
    <div className="row">
      <form
        className="col s12"
        onSubmit={handleSubmit(submitCustomerRegistration)}>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="first_name"
              name="first_name"
              type="text"
              className="validate"
              ref={register({
                required: true,
                pattern: /^[A-Z]{1}[A-Z a-z]{2,}/,
                maxlength: 25,
                minLength: 2,
              })}
            />
            {errors.first_name && (
              <span>
                First name should include characters and start with a capital
                letter.
              </span>
            )}
            <label htmlFor="icon_prefix first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            {/* <i className="material-icons prefix">account_circl</i> */}
            <input
              id="last_name"
              name="last_name"
              type="text"
              className="validate"
              ref={register({
                required: true,
                pattern: /^[A-Z]{1}[A-Z a-z]{2,}/,
                maxlength: 25,
                minLength: 2,
              })}
            />
            {errors.last_name && (
              <span>
                Last name should include characters and start with a capital
                letter.
              </span>
            )}
            <label htmlFor="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">alternate_email</i>
            <input
              id="email"
              name="email"
              type="email"
              className="validate"
              ref={register({
                required: true,
                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
                minLength: 10,
                maxLength: 50,
              })}
            />
            {errors.email && <span>Please enter a valid email address.</span>}
            <span id="existsError" style={{ display: "none" }}>
              User exists, please sign up with a different address.
            </span>
            <label htmlFor=" icon_prefix email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input
              id="password"
              name="password"
              type="password"
              className="validate"
              ref={register({
                required: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              })}
            />
            {errors.password && (
              <span>
                Your password should contain at least one number, one upper case
                and one lower case letter and must be 8 characters long.
              </span>
            )}
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">loc</i>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="validate"
              onBlur={(e) => passwordCheck(e)}
              ref={register({
                required: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              })}
            />
            <span id="confirmError"></span>
            <label htmlFor="password">Confirm Password</label>
          </div>
        </div>
        <button
          id="bg-color"
          className="btn waves-effect waves-light green"
          type="submit"
          name="action">
          Register
          <i className="material-icons right">send</i>
        </button>
        <div style={{ marginTop: 10, marginBottom: 40 }}>
          Already have an account?
          <Link to="/login">{props.login} Login here!</Link>
        </div>
      </form>
    </div>
  );
}
export default Register;
