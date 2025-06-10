import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [viewImage, setViewImage] = useState("");
  const [moreImages, setMoreImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/product/getProduct/${productId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const responseData = await response.json();
        const fetchedProduct = responseData.data[0];
        const images = fetchedProduct.image;
        const firstImage = images[0];

        setMoreImages(images);
        setProduct(fetchedProduct);
        setViewImage(firstImage);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="px-8 py-3 flex ">
      {/*Product image */}
      <div className="w-1/2 flex flex-col gap-10 py-10">
        {/* image */}
        <div className="h-96 flex items-center justify-center">
          {viewImage && <img src={viewImage} alt="" className="h-full" />}
        </div>

        {/* More Image */}
        <div className="flex gap-4 justify-center">
          {moreImages?.map((img, index) => (
            <div
              key={index}
              onClick={() => setViewImage(img)}
              className={`h-20 cursor-pointer p-1 rounded transition-transform hover:scale-105 ${
                viewImage === img
                  ? "border-4 border-blue-500"
                  : "border border-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`Product ${index}`}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* product details */}
      <div className="bg-white w-1/2 p-5 flex flex-col justify-between">
        <div>
          <p className="text-gray-400 text-xs">PID</p>
          <p className="text-base">{product?.productId}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Name</p>
          <p className="text-base">{product?.productName}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Price</p>
          <p className="text-base">₹{product?.price}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Stock</p>
          <p className="text-base">{product?.quantity}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Category</p>
          <p className="text-base">{product?.category?.categoryName}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Description</p>
          <p className="text-base">{product?.description}</p>
        </div>

        {/* buttons */}
        <div className="flex gap-5">
          <Button className="bg-blue-400 w-1/2 hover:bg-blue-500 active:bg-blue-600">
            Edit
          </Button>
          <Button className="bg-red-600 w-1/2 hover:bg-red-700 active:bg-red-800">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
