import React, { useEffect, useRef } from "react";
import * as Icon from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import { useContext } from "react";
import { sharedContext } from "../components/Layout";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/ApiCalls";
import toast from "react-hot-toast";
import Invoice from "./Invoice";

const Orders = () => {
  const invoiceRef = useRef();
  const { register, handleSubmit, reset } = useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [changePage, setChangePage] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const { sidebar } = useContext(sharedContext);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [timeSpan, setTimeSpan] = useState("");
  const orders = useSelector((state) => state.order.orders);
  const pageInfo = useSelector((state) => state.order.pageInfo);
  const [orderId, setOrderId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    let delay = searchTerm == "" ? 0 : 700;

    const query = {
      searchTerm,
      page,
      startDate,
      endDate,
      orderStatus,
      paymentType,
    };

    const getOrders = setTimeout(() => {
      setLoading(true);
      dispatch(fetchOrders(query));
      setLoading(false);
      setChangePage(false);
    }, delay);

    return () => clearTimeout(getOrders);
  }, [searchTerm, refresh, pageNumber, orderStatus, paymentType]);

  const quickDate = (timeSpan) => {
    switch (timeSpan) {
      case "today":
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        setStartDate(today.getTime());

        today.setHours(23, 59, 0, 0);
        setEndDate(today.getTime());

        setRefresh((prev) => !prev);

        break;

      case "yesterday":
        const yesterday = new Date();
        yesterday.setDate(new Date().getDate() - 1);

        yesterday.setHours(0, 0, 0, 0);
        setStartDate(yesterday.getTime());

        yesterday.setHours(23, 59, 0, 0);
        setEndDate(yesterday.getTime());

        setRefresh((prev) => !prev);

        break;

      case "thisMonth":
        const year = new Date().getFullYear();
        const month = new Date().getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        setStartDate(firstDay.getTime());
        setEndDate(lastDay.getTime());

        setRefresh((prev) => !prev);

        break;

      case "lastMonth":
        const Year = new Date().getFullYear();
        const Month = new Date().getMonth();

        const dayFirst = new Date(Year, Month - 1, 1);
        const dayLast = new Date(Year, Month, 0);

        setStartDate(dayFirst.getTime());
        setEndDate(dayLast.getTime());

        setRefresh((prev) => !prev);

        break;

      default:
        break;
    }
  };

  const onSubmit = (data) => {
    const { startDate, endDate } = data;

    const firstDay = new Date(startDate);
    const lastDay = new Date(endDate);

    firstDay.setHours(0, 0, 0, 0);
    lastDay.setHours(23, 59, 0, 0);

    const firstDayTime = firstDay.getTime();
    const lastDayTime = lastDay.getTime();

    if (firstDayTime < lastDayTime) {
      setStartDate(firstDayTime);
      setEndDate(lastDayTime);
    } else {
      toast.error("Start date must be before end date");
      return;
    }

    setTimeSpan("custom");
    setRefresh((prev) => !prev);
  };

  const printInvoice = () => {
    const printContent = invoiceRef.current.innerHTML;
    const printWindow = window.open("", "_blank");

    // Get your compiled CSS file path (usually /index.css or /src/output.css)
    const appStyles = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return sheet.href
            ? `<link rel="stylesheet" href="${sheet.href}">`
            : "";
        } catch (err) {
          return "";
        }
      })
      .join("");

    printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        ${appStyles}
        <style>
          // @page { size: A4; margin: 5mm; }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print { display: none !important; }
        </style>
      </head>
      <body class="bg-white">
        <div class="print:p-0 print:bg-white">
          ${printContent}
        </div>
      </body>
    </html>
  `);

    printWindow.document.close();

    // Wait for CSS to fully load
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 50);
    };
  };

  return (
    <div className="px-8 py-3">
      {orderId && (
        <div ref={invoiceRef} className={`absolute right-full`}>
          <Invoice orderId={orderId} />
        </div>
      )}
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
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg ${
                  sidebar ? "md:w-56" : "md:w-60"
                } transition-all ease-in-out`}
              >
                <option value="">Order Status</option>
                <option value="Placed">Pending</option>
                <option value="Shipping">Shipping</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 top-4 pointer-events-none"
              />
            </div>

            {/* Payment Method */}
            <div className="relative">
              <select
                name="paymentType"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg ${
                  sidebar ? "md:w-56" : "md:w-60"
                } transition-all ease-in-out`}
              >
                <option value="">Payment Method</option>
                <option value="COD">COD</option>
                <option value="Online">Online</option>
                <option value="UPI">UPI</option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 top-4 pointer-events-none"
              />
            </div>

            {/* Order Date filter readyMade*/}
            <div className="relative">
              <select
                name="quickDate"
                value={timeSpan}
                onChange={(e) => {
                  quickDate(e.target.value);
                  setTimeSpan(e.target.value);
                  reset();
                }}
                className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg ${
                  sidebar ? "md:w-56" : "md:w-60"
                } transition-all ease-in-out`}
              >
                <option value="">All Orders</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option className="hidden" value="custom">
                  Custom
                </option>
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
                setTimeSpan("");
                setStartDate("");
                setEndDate("");
                setOrderStatus("");
                reset();
                setRefresh((prev) => !prev);
              }}
              type={"button"}
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
              <NavLink to={`/orders/${order._id}`} key={order?._id}>
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
                        order?.status === "Cancelled"
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
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setOrderId(order._id);
                        setTimeout(() => {
                          printInvoice();
                          setOrderId("");
                        }, 50);
                      }}
                    >
                      <Icon.Printer />
                    </div>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/invoice/${order._id}`);
                      }}
                    >
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
