import React from "react";

const Input = ({ type, className, placeholder, accept, id, onChange, bgColor, ...props }) => {
  // console.log(onChange);
  
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder ? placeholder : ""}
      accept={type === "file" ? accept : ""}
      onChange={onChange ? onChange : null}
      className={`${className} ${bgColor ? bgColor:"bg-gray-100"} rounded-lg h-9 px-2`}
      {...props}
    />
  );
};

export default Input;
