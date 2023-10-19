import React from "react";
import "./Button.css";

const Button = ({
  label,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  size = "medium",
  disabled = false,
  isLoading = false,
}) => {
  const classes = `custom-button ${variant} ${size} ${className} ${
    isLoading ? "loading" : ""
  }`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;
