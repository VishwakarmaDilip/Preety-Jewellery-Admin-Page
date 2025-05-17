import React from "react";
import AnalyticCard from "../components/AnalyticCard";

const Home = () => {
  const testArray = [1, 2, 3, 4, 5, 6, 7];
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
                achieved={1566}
                bgcolor={"bg-green-500"}
                isAmount={true}
              />
              <AnalyticCard
                title={"Yesterday"}
                achieved={4566}
                bgcolor={"bg-orange-500"}
                isAmount={true}
              />
              <AnalyticCard
                title={"This Month"}
                achieved={9545}
                bgcolor={"bg-blue-500"}
                isAmount={true}
              />
              <AnalyticCard
                title={"Last Month"}
                achieved={24560}
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
                achieved={49}
                bgcolor={"bg-rose-600"}
              />
              <AnalyticCard
                title={"Yesterday"}
                achieved={60}
                bgcolor={"bg-lime-700"}
              />
              <AnalyticCard
                title={"This Month"}
                achieved={155}
                bgcolor={"bg-indigo-700"}
              />
              <AnalyticCard
                title={"Last Month"}
                achieved={987}
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
            <ul className="bg-gray-200 px-6 py-3 font-semibold grid grid-cols-7">
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
            </ul>

            {/* orders */}
            {testArray.map((e) => {
              return (
                <ul
                  className="grid grid-cols-7 px-6 py-3 pl-6 border-b border-gray-200"
                  key={e}
                >
                  <li>
                    <p>123456789</p>
                  </li>
                  <li>
                    <p>₹450</p>
                  </li>
                  <li className="col-start-3 col-end-5">
                    <p>27 Apr 2025, 03:30 PM</p>
                  </li>
                  <li className="col-start-5 col-end-7">
                    <p>Ajay Sahu</p>
                  </li>
                  <li>
                    <p className="text-red-600 font-bold">Pending</p>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
