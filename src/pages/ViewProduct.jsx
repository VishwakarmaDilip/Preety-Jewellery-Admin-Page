import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AddProduct from "../components/AddProduct";

const ViewProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [viewImage, setViewImage] = useState("");
  const [moreImages, setMoreImages] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [AddProductPage, setAddProductPage] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
  }, [productId, refresh]);

  const handleDeleteProduct = async () => {
    confirm(`Are Sure You Want to Delete ${product?.productName}`) &&
      setLoading(true) &
        fetch(
          `http://localhost:3000/api/v1/product/deleteProduct/${productId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        )
          .then(() => {
            toast.success("Product deleted successfully");
            navigate("/products");
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
          })
          .finally(() => {
            setLoading(false);
          });
  };

  const toggleAddPage = () => {
    window.scrollTo(0, 0);
    setAddProductPage(!AddProductPage);
  };

  return (
    <div className="px-8 py-3 flex ">
      {/* add product form */}
      <div
        className={`${
          AddProductPage ? "absolute" : "hidden"
        } bg-[#12111150] w-full h-full z-10 top-0 left-0 `}
      >
        <AddProduct
          toggleAddPage={toggleAddPage}
          productId={productId}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      </div>
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
          <Button
            onClick={() => toggleAddPage()}
            className="bg-blue-400 w-1/2 hover:bg-blue-500 active:bg-blue-600"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteProduct()}
            disabled={loading}
            className={
              loading
                ? "bg-gray-300  w-1/2"
                : "bg-red-600 w-1/2 hover:bg-red-700 active:bg-red-800"
            }
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
