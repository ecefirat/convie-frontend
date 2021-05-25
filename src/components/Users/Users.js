import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Users(props) {
  const { user } = props;

  const [uName, setPName] = useState(user.customer_name);
  const [msg, setMessage] = useState(false);
  const [uRole, setURole] = useState(user.role);
  const [deleteMsg, setDeleteMsg] = useState(false);

  const { register, handleSubmit } = useForm();

  const changeUName = (data) => {
    console.log(data);
    fetch("http://localhost:5000/uName", {
      method: "POST",
      body: JSON.stringify({ data, customer_id: user.customer_id }),
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

  const promoteUser = () => {
    console.log(uRole);
  };

  const deleteUser = () => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify({ user_id: user.customer_id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 404) {
        console.log("cant delete user");
      } else if (res.status === 200) {
        res.json().then((data) => {
          console.log("deleted");
          console.log(data.user_id);
          setDeleteMsg(true);
        });
      }
    });
  };

  const hideMsg = () => {
    setMessage(false);
  };

  return (
    <>
      <p style={deleteMsg ? { display: "block" } : { display: "none" }}>
        User {uName} is deleted.
      </p>
      <div className="col s12" key={user.customer_id}>
        <div className="card horizontal">
          <div className="card-stacked" style={{ flexDirection: "row" }}>
            <img
              src={user.profile_picture}
              alt={user.customer_name}
              style={{ width: 100, height: 100, margin: 10 }}
            />
            <button
              style={{ right: 5, bottom: -10 }}
              className="btn-floating btn-small halfway-fab waves-effect waves-light red"
              onClick={handleSubmit(deleteUser)}>
              <i className="material-icons">delete</i>
            </button>
            <button
              className="btn-floating btn-small halfway-fab waves-effect waves-light green"
              style={{ right: 40, bottom: -10 }}
              onClick={promoteUser}>
              <i className="material-icons">account_circle</i>
            </button>
            <div className="card-content">
              {/* <label>First Name</label> */}
              <input
                type="text"
                name="uName"
                value={uName}
                ref={register({
                  pattern: /^[A-Z]{1}[A-Z a-z]{2,}/,
                  maxlength: 25,
                  minLength: 2,
                })}
                onChange={(e) => setPName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.which === 13) {
                    setPName(e.target.value);
                    handleSubmit(changeUName(uName));
                    console.log(msg);
                  }
                }}
                onBlur={hideMsg}
              />
              <p style={msg ? { display: "block" } : { display: "none" }}>
                User name is changed as {uName}.
              </p>
              {/* <p>{user.customer_name}</p> */}
              {/* <p>{user.customer_surname}</p> */}
              <p>{user.customer_address}</p>
              <p>{user.customer_email}</p>
              <p>{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
