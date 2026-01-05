import React, { useEffect, useRef } from "react";
import * as Icon from "lucide-react";
import { useState } from "react";
import Input from "../components/Input";
import { useContext } from "react";
import { sharedContext } from "../components/Layout";
import { set, useForm } from "react-hook-form";
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/ApiCalls";
import toast from "react-hot-toast";
import Invoice from "./Invoice";

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const pageInfo = useSelector((state) => state.order.pageInfo);

  const [changePage, setChangePage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [timeSpan, setTimeSpan] = useState("");
  const [orderId, setOrderId] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [filterBox, setFilterBox] = useState(false);

  const { sidebar } = useContext(sharedContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoiceRef = useRef();
  const { register, handleSubmit, reset, watch } = useForm();
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

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const localDate = `${yyyy}-${mm}-${dd}`;

    setMaxDate(localDate);

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

  // console.log(maxDate);

  return (
    <div className="xs:px-8 px-4 xs:py-3">
      {screen.width < 500 && (
        <div
          className={`bg-black w-dvw h-dvh absolute top-0 right-0 opacity-35 z-10 ${
            filterBox ? "block" : "hidden"
          }`}
        ></div>
      )}
      {orderId && (
        <div ref={invoiceRef} className={`absolute right-full`}>
          <Invoice orderId={orderId} />
        </div>
      )}
      <h1 className="font-bold text-2xl xs:text-3xl xs:mb-3 mb-5">Orders</h1>

      {/* search bar for mobile */}
      {screen.width < 500 && (
        <div className="relative">
          <Icon.Search size={20} className="absolute top-2 left-1.5" />
          <Input
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className={`h-10 w-full pl-9 pr-1.5 bg-white transition-all ease-in-out`}
            placeholder="Search Order..."
          />
        </div>
      )}

      {/* Main body */}
      <div className="flex flex-col gap-4">
        <div
          className={`flex flex-col xs:gap-4 xs:static absolute xs:bg-transparent bg-white xs:w-full w-80 shadow-boxShadowBorder2 xs:shadow-none z-20 top-28 ${
            filterBox ? "right-9" : "right-full"
          } transition-all ease-in-out rounded-lg`}
        >
          {screen.width < 500 && (
            <div className="flex justify-between px-2 pt-2">
              <h4 className="text-2xl font-semibold">Filter</h4>
              <Icon.X onClick={() => setFilterBox((prev) => !prev)} />
            </div>
          )}

          <div className="bg-white rounded-lg p-5 flex justify-between gap-18">
            {/* Searchbar */}
            <div className="xs:relative hidden xs:block">
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

            <div className="flex xs:flex-row flex-col gap-8 w-full">
              {/* order Status */}
              <div className="relative">
                <select
                  name="OrderStatus"
                  value={orderStatus}
                  onChange={(e) => {
                    setOrderStatus(e.target.value);
                    setFilterBox((prev) => !prev);
                  }}
                  className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg w-full ${
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
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                    setFilterBox((prev) => !prev);
                  }}
                  className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg w-full ${
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
                    setFilterBox((prev) => !prev);
                  }}
                  className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg w-full ${
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
            className="bg-white rounded-lg p-5 flex xs:flex-row flex-col justify-between mt-2 xs:gap-0 gap-4"
          >
            <div className="xs:block flex flex-col gap-3">
              <label htmlFor="">Start Date: </label>
              <Input
                type={"date"}
                max={maxDate}
                {...register("startDate")}
                className={"w-full xs:w-fit"}
              />
            </div>
            <div className="xs:block flex flex-col gap-2">
              <label htmlFor="">End Date: </label>
              <Input
                type={"date"}
                min={watch("startDate")}
                max={maxDate}
                {...register("endDate")}
                className={"w-full xs:w-fit"}
              />
            </div>

            <div className="xs:space-x-16 w-full xs:w-fit xs:block flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                onClick={(e) => setFilterBox((prev) => !prev)}
                className={
                  loading ? "bg-gray-300 w-40" : "bg-green-500 xs:w-40 w-1/2"
                }
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
                  setFilterBox((prev) => !prev);
                }}
                type={"button"}
                className="bg-red-600 xs:w-40 w-1/2"
              >
                Reset
              </Button>
            </div>
          </form>
        </div>

        {/* orders */}
        <div className="bg-white rounded-lg overflow-hidden my-2">
          {/* heading */}
          <ul className="bg-gray-200 px-6 py-3 font-semibold place-items-center hidden xs:grid grid-cols-10">
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
                <ul className="border-b border-gray-200 px-6 py-3 place-items-center grid xs:grid-cols-10 grid-cols-3">
                  <li className="flex gap-1 items-center col-start-1 xs:col-end-2 col-end-4 xs:font-normal font-semibold xs:text-base text-lg">
                    <p className="xs:hidden">Order Id :</p>
                    <p>{order?.orderId}</p>
                  </li>
                  <li className="xs:col-start-2 xs:col-end-4 col-start-1 xs:row-start-1 row-start-4 col-end-3 justify-self-start xs:justify-self-center xs:text-base text-[0.93rem]">
                    <p>
                      {new Intl.DateTimeFormat("en-IN", option)
                        .format(new Date(order?.createdAt))
                        .replace(/am|pm/, (match) => match.toUpperCase())}
                    </p>
                  </li>
                  <li className="xs:col-start-4 xs:col-end-6 col-start-1 col-end-3 xs:justify-self-center justify-self-start xs:font-normal font-semibold xs:text-base text-lg">
                    <p>{order?.customer?.fullName}</p>
                  </li>
                  <li className="xs:col-start-6 xs:col-end-7 xs:row-start-1 col-start-3 col-end-4 row-start-2 xs:font-normal font-bold xs:text-base text-lg">
                    <p>₹{order?.netAmount}</p>
                  </li>
                  <li className="xs:text-base text-sm">
                    <p>{order?.paymentType}</p>
                  </li>
                  <li className=" text-green-500 font font-semibold xs:col-start-8 xs:row-end-2 col-start-1 row-end-3 xs:justify-self-center justify-self-start">
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
                  <li className="xs:text-base text-sm flex gap-1">
                    <p className="xs:hidden">Item :</p>
                    <p>{order?.products.length}</p>
                  </li>
                  <li className="flex gap-3 xs:col-start-10 xs:col-end-11 col-start-1 col-end-4 xs:w-fit w-full justify-between xs:mt-0 mt-3">
                    <div
                      className="xs:bg-transparent bg-blue-600 w-1/2 xs:text-black text-white p-1 xs:block flex gap-2 font-bold justify-center rounded-lg"
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
                      <p className="xs:hidden">Print Invoice</p>
                    </div>
                    <div
                      className="xs:bg-transparent bg-green-600 w-1/2 xs:text-black text-white p-1 xs:block flex gap-2 font-bold justify-center rounded-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/invoice/${order._id}`);
                      }}
                    >
                      <Icon.Eye />
                      <p className="xs:hidden">View Invoice</p>
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

      {screen.width < 500 && (
        <div
          className="absolute bottom-5 right-5 bg-white p-3 rounded-full shadow-boxShadowBorder2"
          onClick={() => setFilterBox((prev) => !prev)}
        >
          <Icon.Filter size={30} />
        </div>
      )}
    </div>
  );
};

export default Orders;
