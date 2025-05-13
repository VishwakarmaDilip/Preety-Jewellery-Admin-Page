import React from "react";
import Button from "../components/Button";
import * as Icon from "react-feather";
import Input from "../components/Input";
import { useForm } from "react-hook-form";

const Products = () => {
  const { register, handleSubmit } = useForm();
  return (
    <div className="px-8 py-3">
      {/* Page Title */}
      <h1 className="font-bold text-2xl">Products</h1>
      <div className="p-5 flex flex-col gap-8">
        {/* quick action */}
        <div className="bg-white p-5 rounded-lg flex justify-end">
          {/* button section */}
          <div className="flex gap-4">
            <Button className="bg-rose-700">Delete In Bulk</Button>
            <Button className="bg-green-500 flex">
              <Icon.Plus />
              Add Products
            </Button>
          </div>
        </div>

        {/* order box*/}
        <div>
          {/* filter box */}
          <div className="bg-white rounded-lg p-5 flex justify-between ">
            {/* Search Bar */}
            <div className=" relative">
              <Icon.Search size={20} className=" absolute top-2 left-1.5" />
              <Input
                type="search"
                className=" md:w-96 pl-9 pr-1.5"
                placeholder="Search Product..."
              />
            </div>

            {/* filter */}
            <form className=" flex gap-4">
              <div className=" relative ">
                <select
                  className="appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-200 p-2 rounded-lg w-40"
                  {...register("Category")}
                >
                  <option>Category</option>
                  <option value="earRing">Ear Ring</option>
                  <option value="bangle">Bangle</option>
                  <option value="neckless">Neckless</option>
                </select>
                <Icon.Triangle
                  size={12}
                  fill=""
                  className=" rotate-180 absolute right-3 top-4 pointer-events-none"
                />
              </div>

              <div className=" relative ">
                <select
                  className="appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-200 p-2 rounded-lg w-40"
                  {...register("Short")}
                >
                  <option>Short</option>
                  <option value="earRing">Ear Ring</option>
                  <option value="bangle">Bangle</option>
                  <option value="neckless">Neckless</option>
                </select>
                <Icon.Triangle
                  size={12}
                  fill=""
                  className=" rotate-180 absolute right-3 top-4 pointer-events-none"
                />
              </div>
            </form>
          </div>

          {/* orders */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Products;
