import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
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
          if (res.status === 404) {
            document.getElementById("notExists").style.display = "block";
          }
          if (res.status === 401) {
            document.getElementById("loginError").style.display = "block";
          }
          if (res.status === 200) {
            res.json().then((data) => {
              if (data.user.role === "admin") {
                document.getElementById("adminIcon").style.display = "block";
              }
            });
          }
        })
        .catch((error) => console.log(error));
      return req;
    }
    fetchSes();
  }, []);

  return (
    <nav className="footerzindex nav-wrapper amber darken-1">
      <ul className="nav-mobile ">
        <li>
          <Link to="/">
            <i className="material-icons">home</i>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <i className="material-icons">account_circle</i>
          </Link>
        </li>
        <li>
          <Link to="/history">
            <i className="material-icons">history</i>
          </Link>
        </li>
        <li id="adminIcon" style={{ display: "none" }}>
          <Link to="/admin">
            <i className="material-icons">admin_panel_settings</i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Footer;
