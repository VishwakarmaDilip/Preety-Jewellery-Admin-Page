import React, { useEffect, useRef } from "react";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../features/ApiCalls";

const Invoice = (orderId) => {
  const order_id = useParams();
  const dispatch = useDispatch();
  const fetchedOrder = useSelector((state) => state.order.oneOrder);
  const invoiceRef = useRef();
  const option = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    dispatch(getOrder(order_id.orderId || orderId.orderId));
  }, [orderId]);

  const handlePrint = () => {
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
          @page { size: A4; margin: 15mm; }
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
    <div className="flex flex-col items-center justify-center p-5">
      <div
        className="w-4xl flex justify-center items-center flex-col bg-white p-10 print:w-full print:p-5 print:shadow-none"
        ref={invoiceRef}
      >
        {/* head */}
        <div className="w-full flex justify-between">
          {/* invoice id */}
          <div>
            <h1 className="text-4xl font-semibold">INVOICE</h1>
            <p>{fetchedOrder?.invoiceId}</p>
          </div>

          {/* LOGO */}
          <div className="font-bold text-xl text-[#967203]">Preeti Jwelery</div>
        </div>

        {/* bill to and from detail */}
        <div className="mt-10 w-full grid grid-cols-3 border-y border-gray-300">
          {/* invoice date and order id */}
          <div className="pl-5 py-4 space-y-2">
            <div>
              <p className="font-semibold">Invoice & Order Date</p>
              <p>
                {fetchedOrder?.createdAt &&
                  new Intl.DateTimeFormat("en-IN", option).format(
                    new Date(fetchedOrder.createdAt)
                  )}
              </p>
            </div>
            <div>
              <p className="font-semibold">Order Id</p>
              <p>{fetchedOrder?.orderId}</p>
            </div>
          </div>

          {/* Shipped to */}
          <div className="border-x border-gray-300 pl-5 pr-2 py-4 space-y-2">
            <h1 className="font-semibold">Shipped To</h1>
            <div className="space-y-1">
              <p>
                {fetchedOrder?.address?.[0]?.firstName}{" "}
                {fetchedOrder?.address?.[0]?.lastName}
              </p>
              <p className="text-xs">
                {fetchedOrder?.address?.[0]?.address}
                {", "}
                {fetchedOrder?.address?.[0]?.city}{" "}
                {fetchedOrder?.address?.[0]?.pinCode}
                {", "} {fetchedOrder?.address?.[0]?.state}
                {"."}
              </p>
            </div>
          </div>

          {/* from */}
          <div className="pl-5 py-4">
            <h1 className="font-semibold">Form</h1>
            <div className="space-y-1">
              <p>Preety Jewelery</p>
              <p className="text-xs">
                Room no. 205, 2nd floor, Hagare House, House no. 519, Danda
                Pada, near Raam Mandir.
              </p>
            </div>
          </div>
        </div>

        {/* product detail table */}
        <div className="w-full mt-15">
          {/* table head */}
          <div className="w-full font-semibold">
            <ul className="w-full grid grid-cols-5 border-b border-gray-300 pb-2">
              <li className="col-start-1 col-end-3">Product</li>
              <li className="place-self-end">Qty</li>
              <li className="place-self-end">Cost</li>
              <li className="place-self-end">Total</li>
            </ul>
          </div>

          {/* table body */}
          <div>
            {fetchedOrder?.products?.map((item, index) => (
              <ul key={index} className="w-full grid grid-cols-5 pb-2">
                <li className="col-start-1 col-end-3">
                  {item?.product?.productName}
                </li>
                <li className="place-self-end pr-2">{item?.quantity}</li>
                <li className="place-self-end">₹{item?.product?.price}</li>
                <li className="place-self-end">₹{item?.totalAmount}</li>
              </ul>
            ))}
          </div>

          {/* price summary */}
          <div className="w-full border-t border-gray-300 flex justify-end">
            <div className="w-[18rem]">
              <div className="flex justify-between py-2">
                <p className="font-semibold">Subtotal</p>
                <p>₹{fetchedOrder?.grossAmount}</p>
              </div>
              <div className="flex justify-between py-2 border-y border-gray-300">
                <p className="font-semibold">Delivery Charge</p>
                <p>₹{fetchedOrder?.shippingAmount}</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="font-semibold">Total</p>
                <p>₹{fetchedOrder?.netAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="w-full font-bold mt-35">
          {" "}
          Thank you for the purchase
        </div>
        <div className="w-full flex justify-between mt-4 pt-4 border-t border-gray-300">
          <div className="font-bold text-xl text-[#967203]">
            Preeti jewelery
          </div>
          <div className="flex gap-2">
            <div className="border-r border-gray-300 pr-2">+91 9586248001</div>
            <div>hello@gmail.com</div>
          </div>
        </div>
      </div>

      <Button
        className={
          "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 w-28 mt-5 print:hidden"
        }
        onClick={handlePrint}
      >
        Print
      </Button>
    </div>
  );
};

export default Invoice;
