import React from "react";
import { useTheme } from "./ThemeContext";
import "./Button.css";

const Button = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <label className={`switch ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <input type="checkbox" onChange={toggleTheme} checked={isDarkMode} />
      <span className="slider"></span>
    </label>
  );
};

export default Button;