import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/owner/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.status < 300){
        reset();
      toast.success("Logged In");
      navigate("/");
      } else {
        toast.error("Invalid credentials or something went wrong");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" h-92 w-92 flex flex-col items-center justify-center gap-10">
        <h1 className="font-bold text-4xl text-[#967203]">Preety Jewellery</h1>

        <form
          onSubmit={handleSubmit(submit)}
          className="mt-5 w-full flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="">Username or Email</label>
            <input
              type="text"
              placeholder={"Enter your username or email"}
              {...register("identifier", {
                required: "Username or Email is required",
              })}
              className="w-full bg-white h-11 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#967203] focus:border-transparent transition-all duration-200"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 relative">
            <label htmlFor="">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={"Enter your password"}
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full bg-white h-11 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#967203] focus:border-transparent transition-all duration-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 top-8 right-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <Icon.Eye size={20} className="cursor-pointer" />
              ) : (
                <Icon.EyeOff size={20} className="cursor-pointer" />
              )}
            </button>
          </div>

          <Button className="bg-[#967203] text-white hover:bg-[#a88f03] active:bg-[#b89c04] transition-all duration-200 mt-2">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
