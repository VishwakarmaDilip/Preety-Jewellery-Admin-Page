import * as Icon from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cancelTheOrder, getOrder } from "../features/ApiCalls";
import Button from "../components/Button";
import toast from "react-hot-toast";

const ViewOrder = () => {
  const order_id = useParams();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const fetchedOrder = useSelector((state) => state.order.oneOrder);
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    dispatch(getOrder(order_id.orderId));
  }, [refresh]);


  const orderDate = fetchedOrder?.createdAt
    ? new Intl.DateTimeFormat("en-IN", option).format(
        new Date(fetchedOrder?.createdAt)
      )
    : "";

    const acceptOrder = () => {

    }

    const cancelOrder = () => {
        const isCancellationAllowed = confirm("Are you sure you want to cancel this order?")

        if(isCancellationAllowed) {
            dispatch(cancelTheOrder(order_id.orderId))
        } else {
            toast.error("Order cancellation aborted")
        }
    }

  return (
    <div className="mt-16 p-5 px-32">
      <div className="bg-white p-4 rounded-md">
        {/* page head */}
        <div className="">
          <div className="flex justify-between items-center">
            {/* ID */}
            <h1 className="text-3xl font-bold">
              Order ID :<span> {fetchedOrder?.orderId}</span>
            </h1>

            {/* invoice and trackOrder */}
            <div className="flex gap-6">
              {/* Invoice */}
              <div className="flex items-center justify-center gap-2 shadow-boxShadowBorder2 rounded-lg w-28 h-10">
                <Icon.FileText />
                <p>Invoice</p>
              </div>

              {/* Track Order */}
              <div className="flex items-center justify-center w-36 h-10 bg-blue-500 text-white rounded-lg gap-2">
                <p>Track Order</p>
                <Icon.LocateFixed />
              </div>
            </div>
          </div>

          {/* order date and arrival estimation */}
          <div className="flex px-3 py-2 border-b-2 border-gray-300">
            <div className="flex gap-2">
              <p className="text-gray-400 font-semibold">Order Date :</p>
              <p className="border-r-2 border-black pr-2 mr-2">{orderDate}</p>
            </div>
            {fetchedOrder?.status != "Cancelled" ? (
              <div className="flex gap-1 font-semibold text-green-500">
                <Icon.Truck />
                <p>Estimated Delivery :</p>
                <p>{fetchedOrder?.delivery}</p>
              </div>
            ) : (
              <div className="text-red-400 font-bold bg-red-100 px-4 rounded-full">
                {fetchedOrder?.status}
              </div>
            )}
          </div>
        </div>

        {/* page body : order detail*/}
        <div className="py-4 px-10">
          {fetchedOrder?.products?.map((item) => (
            <div
              key={item?._id}
              className="flex justify-between items-center py-2"
            >
              {/* image and detail */}
              <div className="flex items-center gap-2">
                <div className="w-20 h-20 bg-gray-400">
                  <img
                    src={item.product?.image[0]}
                    alt=""
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl">{item.product?.productName}</p>
                  <p className="text-gray-400">Other Details</p>
                </div>
              </div>

              {/* price and qty */}
              <div className="flex flex-col items-end">
                <p className="text-xl">₹{item.product?.price}</p>
                <p className="text-gray-400">
                  Qty: <span>{item.quantity}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* orders other details */}
        <div>
          <div className="border-t-2 border-b-2 border-gray-300 flex justify-between px-6 py-4">
            {/* Payment Type */}
            <div>
              <h3 className="text-lg font-semibold">Payment</h3>
              <p className="pl-2">{fetchedOrder?.paymentType}</p>
            </div>

            {/* Order Summary */}
            <div className="w-52">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              <div className="pl-2">
                <div className="flex justify-between text-lg">
                  <p>Subtotal</p>
                  <p>₹{fetchedOrder?.grossAmount}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Delivery</p>
                  <p>₹{fetchedOrder?.shippingAmount}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Tax</p>
                  <p>₹{0}</p>
                </div>
                <div className="flex justify-between border-t-2 border-dashed border-gray-300 mt-2 pt-2 text-lg">
                  <p>Total</p>
                  <p>₹{fetchedOrder?.netAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between px-6 py-4">
            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold">Delivery</h3>
              <p className="pl-2">
                {fetchedOrder?.address?.[0]?.address},{" "}
                {fetchedOrder?.address?.[0]?.city} -{" "}
                {fetchedOrder?.address?.[0]?.pinCode},{" "}
                {fetchedOrder?.address?.[0]?.state}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-10 mt-2 flex gap-4" >
          <Button className={"bg-red-700 w-1/2 hover:bg-red-800 active:bg-red-900"} onClick={() => cancelOrder(order_id)}>Cancel</Button>
          <Button className={"bg-green-500 hover:bg-green-600 active:bg-green-700 w-1/2"}>Accept</Button>
      </div>
    </div>
  );
};

export default ViewOrder;
