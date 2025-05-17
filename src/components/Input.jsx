import React from "react";

const Input = ({ type, className, placeholder, accept, id, onChange, ...props }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder ? placeholder : ""}
      accept={type === "file" ? accept : ""}
      onChange={onChange ? onChange : null}
      className={`${className} bg-gray-100 rounded-lg h-9 px-2`}
      {...props}
    />
  );
};

export default Input;
