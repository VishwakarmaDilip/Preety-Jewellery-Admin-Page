import React from "react";

const Input = ({ type, className, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${className} bg-gray-200 rounded-lg h-9`}
    />
  );
};

export default Input;
