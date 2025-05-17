import React, { useState } from "react";
import Button from "../components/Button";
import * as Icon from "react-feather";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import AddProduct from "../components/AddProduct";

const Products = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  // State: Products with `selected` property
  const [products, setProducts] = useState(
    [1, 2, 3, 4, 5, 6, 7].map((id) => ({
      id,
      name: "Gold Bird",
      category: "Ear Ring",
      price: 450,
      stock: 60,
      selected: false,
    }))
  );

  // State: Select All checkbox
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    setProducts(
      products.map((product) => ({ ...product, selected: newValue }))
    );
  };

  const handleSelectItem = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, selected: !product.selected } : product
    );
    setProducts(updatedProducts);
    setSelectAll(updatedProducts.every((p) => p.selected));
  };

  document.body.style.overflow="hidden"

  return (
    <div className="px-8 py-3">
      
      <h1 className="font-bold text-2xl">Products</h1>

      {/* add product form */}
      <div className="absolute bg-[#12111150] w-full h-full z-10 top-0 left-0">
        <AddProduct/>
      </div>
      <div className="p-5 flex flex-col gap-8">
        {/* quick action */}
        <div className="bg-white p-5 rounded-lg flex justify-end">
          <div className="flex gap-4">
            <Button className="bg-rose-700 hover:bg-rose-800 active:bg-rose-900">
              Delete In Bulk
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 active:bg-green-700 flex">
              <Icon.Plus />
              Add Products
            </Button>
          </div>
        </div>

        {/* order box */}
        <div>
          {/* filter box */}
          <div className="bg-white rounded-lg p-5 flex justify-between ">
            <div className="relative">
              <Icon.Search size={20} className="absolute top-2 left-1.5" />
              <Input
                type="search"
                className="md:w-96 pl-9 pr-1.5"
                placeholder="Search Product..."
              />
            </div>

            <form className="flex gap-14" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-8">
                <div className="relative">
                  <select
                    className="appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg w-60"
                    {...register("Category")}
                  >
                    <option>Category</option>
                    <option value="earRing">Ear Ring</option>
                    <option value="bangle">Bangle</option>
                    <option value="neckless">Neckless</option>
                  </select>
                  <Icon.Triangle
                    fill=""
                    size={12}
                    className="rotate-180 absolute right-3 top-4 pointer-events-none"
                  />
                </div>

                <div className="relative">
                  <select
                    className="appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg w-60"
                    {...register("Short")}
                  >
                    <option>Short</option>
                    <option value="earRing">Ear Ring</option>
                    <option value="bangle">Bangle</option>
                    <option value="neckless">Neckless</option>
                  </select>
                  <Icon.Triangle
                    fill=""
                    size={12}
                    className="rotate-180 absolute right-3 top-4 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <Button type="submit" className="bg-violet-700 w-40">
                  Filter
                </Button>
                <Button className="bg-red-600 w-40">Reset</Button>
              </div>
            </form>
          </div>

          {/* orders */}
          <div className="bg-white rounded-lg overflow-hidden my-2 mt-5">
            {/* Heading */}
            <ul className="bg-gray-200 px-6 py-3 font-semibold grid grid-cols-8">
              <li className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <p>PID</p>
              </li>
              <li className="col-start-2 col-end-4">
                <p>Product Name</p>
              </li>
              <li>
                <p>Category</p>
              </li>
              <li>
                <p>Price</p>
              </li>
              <li>
                <p>Stock</p>
              </li>
              <li>
                <p>View</p>
              </li>
              <li>
                <p>Action</p>
              </li>
            </ul>

            {/* Product rows */}
            {products.map((product) => (
              <ul
                className="grid grid-cols-8 px-6 py-3 border-b border-gray-200"
                key={product.id}
              >
                <li className="flex gap-2 items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={product.selected}
                    onChange={() => handleSelectItem(product.id)}
                    className=" cursor-pointer"
                  />
                  <p onClick={() => handleSelectItem(product.id)}>
                    {product.id.toString().padStart(6, "0")}
                  </p>
                </li>
                <li className="col-start-2 col-end-4 flex items-center gap-3">
                  <Icon.Image size={15} />
                  <p>{product.name}</p>
                </li>
                <li>
                  <p>{product.category}</p>
                </li>
                <li>
                  <p>₹{product.price}</p>
                </li>
                <li>
                  <p>{product.stock}</p>
                </li>
                <li>
                  <Icon.Eye size={20} />
                </li>
                <li className="flex gap-3">
                  <Icon.Edit size={20} />
                  <Icon.Trash2 size={20} />
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
