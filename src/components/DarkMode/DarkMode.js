import React from "react";
import "./DarkMode.css";

const DarkMode = () => {
  let clicked = "clicked";
  let unClicked = "unclicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clicked);
      e.target.classList.add(unClicked);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clicked);
      e.target.classList.remove(unClicked);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
    }
  };

  return (
    <div className="switch">
      <label>
        <input type="checkbox" onClick={(e) => switchTheme(e)} />
        <span className="lever"></span>
      </label>
    </div>
    /* <button
      className={theme === "dark" ? clicked : unClicked}
      id="darkMode"
      onClick={(e) => switchTheme(e)}></button> */
  );
};

export default DarkMode;
