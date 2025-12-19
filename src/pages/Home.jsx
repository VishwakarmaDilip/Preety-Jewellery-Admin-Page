import React, { useEffect, useRef, useState } from "react";
import AnalyticCard from "../components/AnalyticCard";
import { useDispatch, useSelector } from "react-redux";
import { checkOwnerAuth, fetchOrders, fetchSummary } from "../features/ApiCalls";
import * as Icon from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Invoice from "./Invoice";

const Home = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const ORSummary = useSelector((state) => state.order.ORSummary);
  const [orderId, setOrderId] = useState("");
  const invoiceRef = useRef();
  const navigate = useNavigate();
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const searchTerm = "",
    page = 1,
    startDate = "",
    endDate = "",
    orderStatus = "",
    paymentType = "";

  const query = {
    searchTerm,
    page,
    startDate,
    endDate,
    orderStatus,
    paymentType,
  };

  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchOrders(query));
  }, []);

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
    <div className="px-3 xs:px-8 py-3">
      {orderId && (
        <div ref={invoiceRef} className={`absolute right-full`}>
          <Invoice orderId={orderId} />
        </div>
      )}
      {/* Page title */}
      <h1 className="font-bold text-2xl mb-4 xs:mb-0">Dashboard</h1>
      <div className="p-2 xs:p-5 flex flex-col gap-12">
        {/* Analytic */}
        <div className="flex flex-col gap-4">
          {/* Revenue */}
          <div className="bg-white flex flex-col rounded-xl">
            <h2 className="text-xl font-semibold ml-5 mt-2">Revenue</h2>
            <div className="grid grid-cols-2 gap-2 xs:flex items-center justify-evenly p-3 xs:p-5">
              <AnalyticCard
                title={"Today"}
                achieved={Number(ORSummary?.today?.revenue).toLocaleString()}
                bgcolor={"bg-green-500"}
                isAmount={true}
              />
              <AnalyticCard
                title={"Yesterday"}
                achieved={Number(
                  ORSummary?.yesterday?.revenue
                ).toLocaleString()}
                bgcolor={"bg-orange-500"}
                isAmount={true}
              />
              <AnalyticCard
                title={"This Month"}
                achieved={Number(
                  ORSummary?.thisMonth?.revenue
                ).toLocaleString()}
                bgcolor={"bg-blue-500"}
                isAmount={true}
              />
              <AnalyticCard
                title={"Last Month"}
                achieved={Number(
                  ORSummary?.lastMonth?.revenue
                ).toLocaleString()}
                bgcolor={"bg-cyan-800"}
                isAmount={true}
              />
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white flex flex-col rounded-xl">
            <h2 className="text-xl font-semibold ml-5 mt-2">Orders</h2>
            <div className="grid grid-cols-2 gap-2 xs:flex items-center justify-evenly p-3 xs:p-5">
              <AnalyticCard
                title={"Today"}
                achieved={Number(ORSummary?.today?.orders).toLocaleString()}
                bgcolor={"bg-rose-600"}
              />
              <AnalyticCard
                title={"Yesterday"}
                achieved={Number(ORSummary?.yesterday?.orders).toLocaleString()}
                bgcolor={"bg-lime-700"}
              />
              <AnalyticCard
                title={"This Month"}
                achieved={Number(ORSummary?.thisMonth?.orders).toLocaleString()}
                bgcolor={"bg-indigo-700"}
              />
              <AnalyticCard
                title={"Last Month"}
                achieved={Number(ORSummary?.lastMonth?.orders).toLocaleString()}
                bgcolor={"bg-cyan-500"}
              />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-xl font-bold mt-2">Recent Order</h2>
          <div className="bg-white rounded-lg overflow-hidden xs:mx-5 my-2 mt-5">
            {/* Heading */}
            <ul className="bg-gray-200 px-2 xs:px-6 py-3 font-semibold grid grid-cols-8 text-[0.6rem] xs:text-base">
              <li className="w-10 xs:w-20">
                <p>Order No.</p>
              </li>
              <li>
                <p>Amount</p>
              </li>
              <li className="col-start-3 col-end-5">
                <p>Order Time</p>
              </li>
              <li className="col-start-5 col-end-7">
                <p>Customer Name</p>
              </li>
              <li>
                <p>Status</p>
              </li>
              <li>
                <p>Invoice</p>
              </li>
            </ul>

            {/* orders */}
            <div className="overflow-auto max-h-[50rem]">
              {orders?.map((order) => {
                return (
                  <NavLink to={`/orders/${order._id}`} key={order?._id}>
                    <ul className="grid grid-cols-8 pr-3 py-3 pl-2 xs:pl-6 border-b border-gray-200 text-[0.6rem] xs:text-base">
                      <li>
                        <p>{order?.orderId}</p>
                      </li>
                      <li>
                        <p className="font-semibold">
                          ₹{Number(order?.netAmount).toLocaleString()}
                        </p>
                        <p>{order?.paymentType}</p>
                      </li>
                      <li className="col-start-3 col-end-5">
                        <p>
                          {new Intl.DateTimeFormat("en-IN", option)
                            .format(new Date(order?.createdAt))
                            .replace(/am|pm/, (match) => match.toUpperCase())}
                        </p>
                      </li>
                      <li className="col-start-5 col-end-7">
                        <p>{order?.customer?.fullName}</p>
                      </li>
                      <li>
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
                          {order?.status === "Placed"
                            ? "Pending"
                            : order.status}
                        </p>
                      </li>
                      <li className="flex flex-col xs:flex-row pl-2 xs:pl-0 gap-3">
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
