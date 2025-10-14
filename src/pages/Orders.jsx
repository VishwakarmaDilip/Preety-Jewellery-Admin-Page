import React, { useEffect } from "react";
import * as Icon from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import { useContext } from "react";
import { sharedContext } from "../components/Layout";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/ApiCalls";

const Orders = () => {
  const { register, handleSubmit, reset } = useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [changePage, setChangePage] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { sidebar } = useContext(sharedContext);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const orders = useSelector((state) => state.order.orders);
  const pageInfo = useSelector((state) => state.order.pageInfo);
  const dispatch = useDispatch();
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    let page;
    if (searchTerm === "") {
      page = pageNumber;
    } else {
      page = 1;
    }

    let delay = changePage ? 0 : 700;

    const query = { searchTerm, page, startDate, endDate };

    const getOrders = setTimeout(() => {
      setLoading(true);
      dispatch(fetchOrders(query));
      setLoading(false);
      setChangePage(false);
    }, delay);

    return () => clearTimeout(getOrders);
  }, [searchTerm, refresh, pageNumber]);

  console.log(orders);

  const onSubmit = () => {};

  // const orders = [1, 2, 3, 4];
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
            orders?.map((order) => (
              <NavLink to={"/"} key={order?._id}>
                <ul className="border-b border-gray-200 px-6 py-3 place-items-center grid grid-cols-10">
                  <li className="flex gap-2 items-center">
                    <p>{order?.orderId}</p>
                  </li>
                  <li className="col-start-2 col-end-4">
                    <p>
                      {new Intl.DateTimeFormat("en-IN", option)
                        .format(new Date(order?.createdAt))
                        .replace(/am|pm/, (match) => match.toUpperCase())}
                    </p>
                  </li>
                  <li className="col-start-4 col-end-6">
                    <p>{order?.customer?.fullName}</p>
                  </li>
                  <li>
                    <p>₹{order?.netAmount}</p>
                  </li>
                  <li>
                    <p>{order?.paymentType}</p>
                  </li>
                  <li className=" text-green-500 font font-semibold">
                    <p
                      className={`${
                        order?.status === "Placed" ||
                        order?.status === "cancelled"
                          ? "text-red-500"
                          : order?.status === "Shipping"
                          ? "text-yellow-400"
                          : "text-green-500"
                      } font-bold`}
                    >
                      {order?.status === "Placed" ? "Pending" : order.status}
                    </p>
                  </li>
                  <li>
                    <p>{order?.products.length}</p>
                  </li>
                  <li className="flex gap-3">
                    <div>
                      <Icon.Printer />
                    </div>
                    <div>
                      <Icon.Eye />
                    </div>
                  </li>
                </ul>
              </NavLink>
            ))
          ) : (
            <div className="text-center py-5">
              <p className="text-gray-500">No Orders found</p>
            </div>
          )}

          {orders?.length > 0 && (
            <div className="bg-gray-200 px-6 py-3 flex items-center justify-between text-sm font-medium">
              {/* Left: Showing results info */}
              <p className="text-gray-700">
                Showing page{" "}
                <span className="text-gray-900">{pageInfo?.page}</span> of{" "}
                <span className="text-gray-900">{pageInfo?.totalPages}</span>{" "}
                pages (
                <span className="text-gray-900">{pageInfo?.totalOrders}</span>{" "}
                Orders)
              </p>

              {/* Right: Prev / Next buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPageNumber(pageInfo.page - 1);
                    setChangePage(true);
                  }}
                  disabled={pageInfo.page === 1}
                  className={`px-3 py-1 rounded ${
                    pageInfo.page === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setPageNumber(pageInfo.page + 1);
                    setChangePage(true);
                  }}
                  disabled={pageInfo.page === pageInfo.totalPages}
                  className={`px-3 py-1 rounded ${
                    pageInfo.page === pageInfo.totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Orders;
