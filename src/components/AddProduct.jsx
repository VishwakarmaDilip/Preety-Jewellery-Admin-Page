import React from "react";
import * as Icon from "react-feather";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imagePreviews, setImagePreviews] = React.useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageURL = files.map((file) => URL.createObjectURL(file));
    const previews = [...imagePreviews, ...imageURL];
    setImagePreviews(previews);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => {
      // Revoke the object URL to free memory
      URL.revokeObjectURL(prev[index].preview);

      // Remove the image at the specified index
      return prev.filter((_, i) => i !== index);
    });
  };

  const onSubmit = (data) => {
    if (imagePreviews.length === 0) {
      alert("At least one image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("images", imagePreviews );

    // console.log(data);
    console.log(formData.getAll("images"));
    
  };
  return (
    <div className="bg-[#F4F2F2] h-full w-6/7 absolute right-0">
      {/* navigation */}
      <nav className="bg-gray-200 flex justify-between p-5 ">
        <h2 className="font-bold text-lg">Add Product</h2>
        <Icon.X />
      </nav>
      <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="h-4/5 overflow-y-scroll">
          <div className="flex flex-col bg-white justify-between gap-15 h-fit px-20 py-10">
            <div className="flex justify-between">
              <label htmlFor="name">Name</label>
              <div className="w-4/5">
                <Input
                  type="text"
                  className="w-full"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <label htmlFor="description">Description</label>
              <div className=" w-4/5 ">
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
            <div className="flex justify-between">
              <label htmlFor="category">Category</label>
              <div className="w-4/5">
                <Input
                  className="w-full"
                  type="text"
                  {...register("category", {
                    required: "category is required",
                  })}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <label>Image</label>
              <div className="w-4/5">
                <div className="border-2 w-full h-18 border-dashed">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center p-2"
                  >
                    <Icon.UploadCloud className="text-green-500" />
                    <p>Click Here To Upload</p>
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
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition"
                        >
                          <Icon.X size={9} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <label htmlFor="price">Price</label>
              <div className="w-4/5">
                <Input
                  className="w-full"
                  type="number"
                  {...register("price", { required: "price is required" })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <label htmlFor="quantity">Quantity</label>
              <div className="w-4/5">
                <Input
                  className="w-full"
                  type="number"
                  {...register("quantity", {
                    required: "quantity is required",
                  })}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-10 p-4 px-20">
          <Button
            className="bg-white w-xl hover:bg-gray-200 active:bg-gray-300"
            textColor={true}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-green-600 w-xl hover:bg-green-700 active:bg-green-800"
          >
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
