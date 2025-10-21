import React from "react";
import Button from "../components/Button";

const Invoice = () => {
  const products = [1, 2, 3, 4];
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="w-4xl flex justify-center items-center flex-col bg-white p-10">
        {/* head */}
        <div className="w-full flex justify-between">
          {/* invoice id */}
          <div>
            <h1 className="text-4xl font-semibold">INVOICE</h1>
            <p>INV202510001</p>
          </div>

          {/* LOGO */}
          <div className="font-bold text-xl text-[#967203]">Preeti Jwelery</div>
        </div>

        {/* bill to and from detail */}
        <div className="mt-10 w-full grid grid-cols-4 border-y border-gray-300">
          {/* invoice date and order id */}
          <div className="pl-5 py-4 space-y-2">
            <div>
              <p className="font-semibold">Invoice Date</p>
              <p>01 Aug, 2025</p>
            </div>
            <div>
              <p className="font-semibold">Order Id</p>
              <p>000001</p>
            </div>
          </div>

          {/* Shipped to */}
          <div className="border-x border-gray-300 pl-5 pr-2 py-4 space-y-2">
            <h1 className="font-semibold">Shipped To</h1>
            <div className="space-y-1">
              <p>Dilip Vishwakarma</p>
              <p className="text-xs">
                Room no. 205, 2nd floor, Hagare House, House no. 519, Danda
                Pada, near Raam Mandir.
              </p>
            </div>
          </div>

          {/* Billed */}
          <div className="pl-5 py-4 border-r border-gray-300">
            <h1 className="font-semibold">Billed To</h1>
            <div className="space-y-1">
              <p>Dilip Vishwakarma</p>
              <p className="text-xs">
                Room no. 205, 2nd floor, Hagare House, House no. 519, Danda
                Pada, near Raam Mandir.
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
            {products?.map((item, index) => (
              <ul key={index} className="w-full grid grid-cols-5 pb-2">
                <li className="col-start-1 col-end-3">Product name</li>
                <li className="place-self-end pr-2">5</li>
                <li className="place-self-end">₹200</li>
                <li className="place-self-end">₹1000</li>
              </ul>
            ))}
          </div>

          {/* price summary */}
          <div className="w-full border-t border-gray-300 flex justify-end">
            <div className="w-[18rem]">
              <div className="flex justify-between py-2">
                <p className="font-semibold">Subtotal</p>
                <p>₹4000</p>
              </div>
              <div className="flex justify-between py-2 border-y border-gray-300">
                <p className="font-semibold">Delivery Charge</p>
                <p>₹100</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="font-semibold">Total</p>
                <p>₹4100</p>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="w-full font-bold mt-35"> Thank you for the purchase</div>
        <div className="w-full flex justify-between mt-4 pt-4 border-t border-gray-300">
          <div className="font-bold text-xl text-[#967203]">Preeti jewelery</div>
          <div className="flex gap-2">
            <div className="border-r border-gray-300 pr-2">+91 9586248001</div>
            <div>hello@gmail.com</div>
          </div>
        </div>
      </div>

      <Button className={"bg-blue-500 hover:bg-blue-600 active:bg-blue-700 w-28 mt-5"}>Print</Button>
    </div>
  );
};

export default Invoice;
