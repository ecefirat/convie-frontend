import React from "react";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";

function Header() {
  return (
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
