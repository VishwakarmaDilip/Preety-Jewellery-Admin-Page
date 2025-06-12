import React from "react";

const Button = ({
  children,
  className,
  type,
  textColor,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${textColor ? "" : "text-white"} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } font-semibold px-4 py-2 rounded-2xl`}
    >
      {children}
    </button>
  );
};

export default Button;
