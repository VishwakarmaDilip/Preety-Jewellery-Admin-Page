import React from "react";
import * as Icon from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import { useContext } from "react";
import { sharedContext } from "../components/Layout";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";

const Orders = () => {
  const { register, handleSubmit, reset } = useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const { sidebar } = useContext(sharedContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {};

  const orders = [1, 2, 3, 4];
  return (
    <div className="px-8 py-3">
      <h1 className="font-bold text-3xl mb-3">Orders</h1>
      {/* Main body */}
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-lg p-5 flex justify-between ">
          {/* Searchbar */}
          <div className="relative">
            <Icon.Search size={20} className="absolute top-2 left-1.5" />
            <Input
              type="search"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className={`${
                sidebar ? "md:w-96" : "md:w-[33rem]"
              } h-10 pl-9 pr-1.5 transition-all ease-in-out`}
              placeholder="Search Order..."
            />
          </div>

          <div className="flex gap-8">
            {/* order Status */}
            <div className="relative">
              <select
                name="OrderStatus"
                id=""
                className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg ${
                  sidebar ? "md:w-56" : "md:w-60"
                } transition-all ease-in-out`}
              >
                <option value="Order Status">Order Status</option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 top-4 pointer-events-none"
              />
            </div>

            {/*  */}
            <div className="relative">
              {/* Payment Method */}
              <select
                name="paymentMethod"
                id=""
                className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg ${
                  sidebar ? "md:w-56" : "md:w-60"
                } transition-all ease-in-out`}
              >
                <option value="">Payment Method</option>
                <option value="">COD</option>
                <option value="">Online</option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 top-4 pointer-events-none"
              />
            </div>
            <div className="relative">
              {/* order Status */}
              <select
                name="OrderStatus"
                id=""
                className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg ${
                  sidebar ? "md:w-56" : "md:w-60"
                } transition-all ease-in-out`}
              >
                <option value="Order Status">All Orders</option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 top-4 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg p-5 flex justify-between mt-2"
        >
          <div>
            <label htmlFor="">Start Date: </label>
            <Input type={"date"} {...register("startDate")} />
          </div>
          <div>
            <label htmlFor="">End Date: </label>
            <Input type={"date"} {...register("endDate")} />
          </div>

          <div className="space-x-16">
            <Button
              type="submit"
              disabled={loading}
              className={loading ? "bg-gray-300 w-40" : "bg-green-500 w-40"}
            >
              Apply
            </Button>
            <Button
              onClick={() => {
                setSearchTerm("");
                reset();
              }}
              className="bg-red-600 w-40"
            >
              Reset
            </Button>
          </div>
        </form>

        {/* orders */}
        <div className="bg-white rounded-lg overflow-hidden my-2">
          {/* heading */}
          <ul className="bg-gray-200 px-6 py-3 font-semibold place-items-center grid grid-cols-10">
            <li className="flex gap-2 items-center">
              <p>Order Id</p>
            </li>
            <li className="col-start-2 col-end-4">
              <p>Order Time</p>
            </li>
            <li className="col-start-4 col-end-6">
              <p>Customer Name</p>
            </li>
            <li>
              <p>Amount</p>
            </li>
            <li>
              <p>Payment</p>
            </li>
            <li>
              <p>Status</p>
            </li>
            <li>
              <p>Item</p>
            </li>
            <li>
              <p>Invoice</p>
            </li>
          </ul>

          {/* order row */}
          {orders?.length > 0 ? (
            orders?.map((index, data) => (
              <NavLink to={"/"} key={index}>
                <ul className="border-b border-gray-200 px-6 py-3 place-items-center grid grid-cols-10">
                  <li className="flex gap-2 items-center">
                    <p>123456</p>
                  </li>
                  <li className="col-start-2 col-end-4">
                    <p>05 oct 2025, 01:09 PM</p>
                  </li>
                  <li className="col-start-4 col-end-6">
                    <p>Dilip Vishwakarma</p>
                  </li>
                  <li>
                    <p>₹ 2,310</p>
                  </li>
                  <li>
                    <p>COD</p>
                  </li>
                  <li className=" text-green-500 font font-semibold">
                    <p>Shipping</p>
                  </li>
                  <li>
                    <p>5</p>
                  </li>
                  <li className="flex gap-3">
                    <div>
                      <Icon.Printer/>
                    </div>
                    <NavLink>
                      <Icon.Eye/>
                    </NavLink>
                  </li>
                </ul>
              </NavLink>
            ))
          ) : (
            <div className="text-center py-5">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
