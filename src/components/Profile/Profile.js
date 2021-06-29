import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Upload from "../Uploads/Uploads";
import { Image } from "cloudinary-react";

import { css } from "@emotion/core";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const override = css`
  display: block;
  margin: 35vh auto 5vh;
  border-color: red;
`;

function Profile() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffb300");

  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [customer_address, setCustomerAddress] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const [customer_email, setCustomerEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  const [imageIds, setImageIds] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_URL + "/sessionInfo", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setCustomerAddress(data.user.customer_address);
          setCustomerName(data.user.customer_name);
          setProfilePicture(data.user.profile_picture);
          setCustomerEmail(data.user.customer_email);
          setLoggedIn(true);
          history.push("/profile");
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          history.push("login");
        });
      }
    });
  }, []);

  const handleAddress = (data) => {
    // console.log(data);
    // console.log("handleaddress");
    fetch(process.env.REACT_APP_URL + "/customerAddress", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 404) {
        // console.log("couldnt change");
      }
      if (res.status === 200) {
        res.json().then((data) => {
          // console.log(data);
          setCustomerAddress(data.message);
          // console.log("address above");
        });
      }
    });
  };

  const uploadImage = async (data) => {
    const formData = new FormData();
    formData.append("picture", data.picture[0]);
    // console.log(formData);

    fetch(process.env.REACT_APP_URL + "/picture", {
      method: "POST",
      body: formData,
      credentials: "include",
    }).then((res) => {
      if (res.status === 415) {
        setFileTypeError(true);
        // console.log(fileTypeError);
      }
      if (res.status === 200) {
        setFileTypeError(false);
        res.json().then((data) => {
          // console.log(data);
          const newImagePath =
            process.env.REACT_APP_URL + "/uploads" + "/" + data.picture.name;
          setImagePath(newImagePath);
        });
      }
    });
  };

  const changeImage = (data) => {
    setProfilePicture(data.profile_picture);
    // console.log(data);
    // console.log("changeimage");
    fetch(process.env.REACT_APP_URL + "/uploads", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 404) {
        // console.log("couldnt change");
      }
      if (res.status === 200) {
        res.json().then((data) => {
          // console.log(data);
          // console.log("imagepath above");
        });
      }
    });
  };

  const loadImages = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_URL + "/api/images");
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const deleteAccount = (data) => {
    fetch(process.env.REACT_APP_URL + "/account", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        console.log("can't delete");
      } else if (res.status === 200) {
        res.json().then((data) => {
          // console.log(data);
          // console.log("account deleted");
          handleLogout();
          history.push("/login");
        });
      }
    });
  };

  const handleLogout = () => {
    fetch(process.env.REACT_APP_URL + "/logout", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res)
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn(false);
          history.push("/login");
        }
      });
  };

  return (
    <div>
      {loggedIn ? (
        <div className="container" style={{ marginTop: 20 }}>
          <h4 style={{ display: "inline" }}>Hi {customer_name}!</h4>
          <Link to="/help">
            <i
              className="material-icons"
              style={{
                float: "right",
                color: "#fff8e1",
                backgroundColor: "#25170ecb",
                fontSize: 22,
              }}>
              help
            </i>
          </Link>
          <img
            src={
              profile_picture === null
                ? "../../../images/defaultPicture.jpeg"
                : profile_picture
            }
            style={{ display: "block" }}
            alt="img"
            width="120px"
            height="120px"
          />

          <h5>Edit Address</h5>
          <p>{customer_address}</p>
          <input
            id="customer_address"
            type="text"
            placeholder="Enter new address..."
            className="validate"
            name="customer_address"
            ref={register({
              pattern: /[A-Za-z0-9]{1,}$/,
              maxLength: 150,
            })}
            style={{ marginBottom: 15 }}
          />
          {errors.customer_address && (
            <span style={{ display: "block" }}>
              Please enter a valid address.
            </span>
          )}
          <input
            type="hidden"
            value={customer_email}
            name="customer_email"
            ref={register({
              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
              minLength: 10,
              maxLength: 50,
            })}
          />
          <button
            className="btn waves-effect waves-light green"
            style={{ marginBottom: 10 }}
            onClick={handleSubmit(handleAddress)}>
            submit
          </button>
          <input
            type="hidden"
            value={customer_name}
            name="customer_name"
            ref={register({
              pattern: /^[A-Z]{1}[A-Z a-z]{2,}/,
              maxlength: 25,
              minLength: 2,
            })}
          />
          <h5>Change Profile Picture</h5>
          <Upload></Upload>
          {/* <input
            type="file"
            name="picture"
            accept=".jpeg"
            ref={register}
            style={{ marginBottom: 15 }}
          />
          <button
            className="btn waves-effect waves-light green"
            style={{ marginBottom: 10, display: "block" }}
            onClick={handleSubmit(uploadImage)}>
            upload
          </button> */}
          {fileTypeError ? <span>Please upload .jpeg file.</span> : null}
          {imagePath ? (
            <>
              <img src={imagePath} alt="img" width="200px" height="200px" />
              {console.log(profile_picture)}
              <input
                type="hidden"
                value={imagePath}
                name="profile_picture"
                ref={register}
              />
              <button
                className="btn waves-effect waves-light green"
                style={{ display: "block" }}
                onClick={handleSubmit(changeImage)}>
                Set
              </button>
            </>
          ) : null}
          {/* <h5>Update Payment Details</h5> */}
          <button
            className="btn waves-effect waves-light grey"
            style={{ marginBottom: 80, marginRight: 10 }}
            onClick={handleSubmit(deleteAccount)}>
            Delete Account
          </button>
          <button
            style={{ marginBottom: 80 }}
            className="btn waves-effect waves-light grey"
            onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      ) : (
        <ClimbingBoxLoader
          color={color}
          loading={loading}
          css={override}
          size={20}
        />
      )}
    </div>
  );
}

export default Profile;
