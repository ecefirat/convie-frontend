import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";

function Header(props) {
  return (
    // <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper navbar-fixed amber darken-1">
        <Link to="/" className="brand-logo">
          <img
            src="../../../../images/logo.jpeg"
            alt="logo"
            width="60px"
            height="55px"
          />
        </Link>
        <DarkMode />
      </div>
    </nav>
  );
}

export default Header;
