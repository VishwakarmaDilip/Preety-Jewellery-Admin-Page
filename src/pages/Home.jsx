import React, { useEffect } from "react";
import AnalyticCard from "../components/AnalyticCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchSummary } from "../features/ApiCalls";
import * as Icon from "lucide-react"

const Home = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const ORSummary = useSelector((state) => state.order.ORSummary);
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchOrders());
  }, []);

  return (
    <div className="px-8 py-3">
      {/* Page title */}
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="p-5 flex flex-col gap-12">
        {/* Analytic */}
        <div className="flex flex-col gap-4">
          {/* Revenue */}
          <div className="bg-white flex flex-col rounded-xl">
            <h2 className="text-xl font-semibold ml-5 mt-2">Revenue</h2>
            <div className="flex items-center justify-evenly p-5">
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
            <h2 className="text-lg font-semibold ml-5 mt-2">Orders</h2>
            <div className="flex items-center justify-evenly p-5">
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
          <div className="bg-white rounded-lg overflow-hidden mx-5 my-2 mt-5">
            {/* Heading */}
            <ul className="bg-gray-200 px-6 py-3 font-semibold grid grid-cols-8">
              <li>
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
            <div className="overflow-auto max-h-[30rem]">
              {orders?.map((order, index) => {
                return (
                  <ul
                    className="grid grid-cols-8 px-6 py-3 pl-6 border-b border-gray-200"
                    key={index}
                  >
                    <li>
                      <p>{order?.orderId}</p>
                    </li>
                    <li>
                      <p className="font-semibold">
                        ₹{Number(order?.grossAmount).toLocaleString()}
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
                    <li className="flex gap-2">
                      <Icon.Printer/>
                      <Icon.Eye/>
                    </li>
                  </ul>
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
