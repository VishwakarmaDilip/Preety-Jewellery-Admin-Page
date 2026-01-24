import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";

const AddProduct = ({
  toggleAddPage,
  setRefresh,
  productId,
  refresh,
  setProductId = null,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreviews, setImagePreviews] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [newCategory, setNewCategory] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [adding, setAdding] = React.useState(false);

  // Fetch categories from the API
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `https://api.devbydilip.cloud/api/v1/product/getProduct/${productId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const responseData = await response.json();
          const product = responseData.data[0];

          reset({
            productName: product.productName,
            description: product.description,
            category: product.category._id,
            price: product.price,
            quantity: product.quantity,
          });

          setImagePreviews(product.image);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      // console.log(imagePreviews);
      fetchProduct();
    }
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://api.devbydilip.cloud/api/v1/product/category/getCategories`,
          {
            credentials: "include",
          }
        );

        const responseData = await response.json();
        const allCategories = responseData.data;

        setCategory(allCategories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [refresh, productId]);

  const creatCategory = async (category) => {
    try {
      const response = await fetch(
        "https://api.devbydilip.cloud/api/v1/product/category/createCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ category }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const data = await response.json();
      // Optionally update category list or show success message
      // console.log(data.data);

      setCategory((prev) => [...prev, data.data]);
      setNewCategory("");
      toast.success(`Now You can Choose ${data?.data?.categoryName} Category`);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Store file previews
    const imageURL = files.map((file) => URL.createObjectURL(file));
    // const previews = [...imagePreviews, ...imageURL];
    setImagePreviews((prev) => [...prev, ...imageURL]);

    // Store actual files for submission
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => {
      // Revoke the object URL to free memory
      URL.revokeObjectURL(prev[index].preview);

      // Remove the image at the specified index
      return prev.filter((_, i) => i !== index);
    });

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    if (imagePreviews.length === 0) {
      alert("At least one image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);

    selectedFiles?.forEach((file) => {
      formData.append("images", file);
    });

    // console.log(data, imagePreviews);
    setAdding(true);

    if (!productId) {
      fetch("https://api.devbydilip.cloud/api/v1/product/createProduct", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((response) => {
          // console.log("Response:", response);

          if (!response.ok) {
            throw new Error("Failed to add product");
          }
          toast.success("Product added successfully");
          reset();
          setImagePreviews([]);
          toggleAddPage();
          setRefresh((prev) => !prev); // Trigger refresh in parent component
          setSelectedFiles([]);
          return response.json();
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          // toast.error("Failed to add product");
        })
        .finally(() => {
          setAdding(false);
        });
    } else {
      formData.append("previousImages", imagePreviews);

      fetch(`https://api.devbydilip.cloud/api/v1/product/updateProduct/${productId}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update product");
          }
          toast.success("Product updated successfully");
          reset();
          setImagePreviews([]);
          toggleAddPage();
          setRefresh((prev) => !prev); // Trigger refresh in parent component
          setSelectedFiles([]);
          return response.json();
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          toast.error("Failed to update product");
        })
        .finally(() => {
          setAdding(false);
        });
    }
  };
  return (
    <div className="bg-[#F4F2F2] h-full w-full xs:w-6/7 absolute right-0">
      {/* navigation */}
      <nav className="bg-gray-200 flex justify-between p-5">
        <h2 className="font-bold text-lg">
          {productId ? "Edit Product" : "Add Product"}
        </h2>
        <Icon.X
          onClick={() => {
            if (setProductId !== null) {
              setProductId(null);
            }
            reset({
              productName: "",
              description: "",
              category: "",
              price: "",
              quantity: "",
            });
            setImagePreviews([]);
            toggleAddPage();
          }}
        />
      </nav>
      <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="h-4/5 overflow-y-scroll">
          <div className="flex flex-col bg-white justify-between gap-5 xs:gap-15 h-fit px-5 xs:px-20 xs:py-10 py-5">
            <div className="flex xs:flex-row flex-col gap-2 justify-between">
              <label htmlFor="productName">Name</label>
              <div className="xs:w-4/5 px-3 xs:px-0">
                <Input
                  type="text"
                  className="w-full"
                  {...register("productName", { required: "Name is required" })}
                />
                {errors.productName && (
                  <p className="text-red-500 text-sm">{errors.productName.message}</p>
                )}
              </div>
            </div>
            <div className="flex xs:flex-row flex-col gap-2 justify-between">
              <label htmlFor="description">Description</label>
              <div className=" xs:w-4/5 xs:px-0 px-3">
                <textarea
                  className="bg-gray-100 w-full resize-none px-2 py-1"
                  rows={6}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex xs:flex-row flex-col gap-2 justify-between">
              <label htmlFor="description">Category</label>
              <div className="flex flex-col items-center gap-2 xs:w-4/5 px-3 xs:px-0">
                <div className="relative w-full">
                  <select
                    className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg w-full`}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="">Category</option>
                    {category?.map((cat) => (
                      <option key={cat?._id} value={cat?._id}>
                        {cat?.categoryName}
                      </option>
                    ))}
                  </select>
                  <Icon.Triangle
                    fill=""
                    size={12}
                    className="rotate-180 absolute right-3 top-4 pointer-events-none"
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                <span>OR</span>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    className="w-45"
                    onChange={(e) => setNewCategory(e.target.value)}
                    value={newCategory}
                    placeholder="Create New Category"
                  />
                  <Button
                    type="button"
                    disabled={newCategory === "" ? true : false}
                    onClick={() => creatCategory(newCategory)}
                    className={`${
                      newCategory === ""
                        ? "bg-gray-400 w-35"
                        : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white w-35"
                    }`}
                  >
                    {" "}
                    Create
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex xs:flex-row flex-col gap-2 justify-between">
              <label>Image</label>
              <div className="xs:w-4/5 xs:px-0 px-3">
                <div className="border-2 w-full h-18 border-dashed">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center p-2"
                  >
                    <Icon.UploadCloud className="text-green-500" />
                    <p>Click Here To Add</p>
                  </label>
                </div>
                <Input
                  className="w-full hidden"
                  id="image"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {imagePreviews.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative border rounded-md overflow-hidden group"
                      >
                        <img
                          key={idx}
                          src={src}
                          alt={`preview-${idx}`}
                          className="h-15 object-cover border rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute cursor-pointer top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition"
                        >
                          <Icon.X size={9} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex xs:flex-row flex-col gap-2 justify-between">
              <label htmlFor="price">Price</label>
              <div className="xs:w-4/5 px-3 xs:px-0">
                <Input
                  className="w-full"
                  type="number"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>
            <div className="flex xs:flex-row flex-col gap-2 justify-between">
              <label htmlFor="quantity">Quantity</label>
              <div className="xs:w-4/5 xs:px-0 px-3">
                <Input
                  className="w-full"
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex xs:flex-row flex-col gap-2 justify-between">
              <label htmlFor="quantity">Discount</label>
              <div className="xs:w-4/5 px-3 xs:px-0">
                <Input
                  className="w-full"
                  type="number"
                  placeholder={"Enter Discount in %"}
                  {...register("discount")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-10 p-4 xs:px-20">
          <Button
            type="button"
            onClick={() => {
              if (setProductId !== null) {
                setProductId(null);
              }
              reset({
                productName: "",
                description: "",
                category: "",
                price: "",
                quantity: "",
              });
              setImagePreviews([]);
              toggleAddPage();
            }}
            className="bg-white w-xl hover:bg-gray-200 active:bg-gray-300 "
            textColor={true}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={adding}
            className={
              adding
                ? "bg-gray-400 w-xl"
                : "bg-green-600 w-xl hover:bg-green-700 active:bg-green-800 "
            }
          >
            {productId
              ? adding
                ? "Updating "
                : "Update Product"
              : adding
              ? "Adding..."
              : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
