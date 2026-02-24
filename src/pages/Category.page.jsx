import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import * as ICON from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../features/ApiCalls";
import toast from "react-hot-toast";

const Category = () => {
  const categories = useSelector((state) => state.product.categories);
  const isLoading = useSelector((state) => state.product.catLoad)

  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [refresh]);

  const handleDeleteCategory = async (categoryId) => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this Category..?",
    );
    if (!isConfirmed) return;
    try {
      await dispatch(deleteCategory(categoryId)).unwrap();
      toast.success("Category Deleted Successfully");
      setRefresh((pre) => !pre);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div>
          <Button className={"flex bg-blue-600 items-center gap-2"}>
            <ICON.Plus />
            <p>Add New</p>
          </Button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-col shadow-boxShadowBorder2 rounded-md overflow-hidden">
        <div className="bg-gray-200 p-2">
          <ul className="grid grid-cols-3 font-semibold">
            <li>Name</li>
            <li className="place-self-center">Products</li>
            <li className="place-self-end pr-2">Action</li>
          </ul>
        </div>

        <div>
          {categories?.map((item) => (
            <ul
              key={item?._id}
              className="grid grid-cols-3 p-2 pr-4 border-b border-gray-300"
            >
              <li>{item?.categoryName}</li>
              <li className="place-self-center">{item?.productCount}</li>
              <li
                className={`place-self-end ${item?.productCount === 0 ? "text-red-600" : "text-gray-300"}`}
              >
                <button
                  disabled={(item?.productCount === 0 ? false : true) || isLoading}
                  className={`${item?.productCount !== 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => handleDeleteCategory(item?._id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
