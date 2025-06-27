import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import * as Icon from "react-feather";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import AddProduct from "../components/AddProduct";
import { sharedContext } from "../components/Layout";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const { register, handleSubmit, reset } = useForm();
  const [AddProductPage, setAddProductPage] = useState(false);
  const { sidebar } = useContext(sharedContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [changePage, setChangePage] = useState(false);
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Fetch products from the API
  useEffect(() => {
    let page;
    if (searchTerm === "") {
      page = pageNumber;
    } else {
      page = 1; // Reset to page 1 if search term is not empty
    }
    let delay = (changePage || categoryId) ? 0 : 700; // Delay for debounce effect
    const callApi = setTimeout(() => {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/product/getProducts?query=${searchTerm}&page=${page}&sortBy=${sortBy}&sortType=${sortType}&category=${categoryId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const responseData = await response.json();
          const allProducts = responseData.data.fetchedProduct.map((product) => ({
            ...product,
            selected: false, // Initialize selected state for each product
          }) );
          const pageData = responseData.data.pageInfo;

          setProducts(allProducts);
          setPageInfo(pageData);
        } catch (error) {
          console.log("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      setChangePage(false);
    }, delay);

    return () => clearTimeout(callApi);
  }, [searchTerm, refresh, pageNumber, sortBy, sortType, categoryId]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/product/category/getCategories`,
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
  }, []);

  const onSubmit = (data) => {
    if (data.category !== "") {
      setCategoryId(data.category);
    } else {
      setCategoryId("");
    }

    if (data.sortBy !== "") {
      const sortData = data.sortBy.split(" ");
      setSortBy(sortData[0]);
      setSortType(sortData[1] || "");
    } else {
      setSortBy("createdAt");
      setSortType("");
    }
  };

  const handleDeleteProduct = async (id) => {
    confirm("Are you sure you want to delete this product?") &&
      fetch(`http://localhost:3000/api/v1/product/deleteProduct/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            setProducts(products.filter((product) => product._id !== id));
            toast.success("Product deleted successfully");
          } else {
            toast.error("Failed to delete product");
          }
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          toast.error("An error occurred while deleting the product");
        })
        .finally(() => {
          setRefresh(!refresh);
        });
  };

  const handleBulkDelete = () => {
    const selectedProductIds = products.filter((product) => product.selected).map((product) => product._id)

    let deleted = null

    confirm("Are you sure you want to delete selected products?") && selectedProductIds.forEach((id) => {
      fetch(`http://localhost:3000/api/v1/product/deleteProduct/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            deleted = true;
          } else {
            toast.error("Failed to delete product");
          }
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          toast.error("An error occurred while deleting the product");
        })
        .finally(() => {
          setRefresh(!refresh);
        });
    })

    if(deleted) {
      toast.success("Selected products deleted successfully");
    } else if(deleted === false) {
      toast.error("some products could not be deleted");
    }
    
  }

  const toggleAddPage = () => {
    window.scrollTo(0, 0);
    setAddProductPage(!AddProductPage);
  };

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
    const updatedProducts = products?.map((product) =>
      product._id === id ? { ...product, selected: !product.selected } : product
    );
    setProducts(updatedProducts);
    setSelectAll(updatedProducts.every((p) => p.selected));
  };

  document.body.style.overflow = AddProductPage ? "hidden" : "auto";

  return (
    <div className="px-8 py-3">
      <h1 className="font-bold text-2xl">Products</h1>

      {/* add product form */}
      <div
        className={`${
          AddProductPage ? "absolute" : "hidden"
        } bg-[#12111150] w-full h-full z-10 top-0 left-0`}
      >
        <AddProduct
          toggleAddPage={toggleAddPage}
          setRefresh={setRefresh}
          productId={productId}
          setProductId={setProductId}
        />
      </div>
      <div className="p-5 flex flex-col gap-8">
        {/* quick action */}
        <div className="bg-white p-5 rounded-lg flex justify-end">
          <div className="flex gap-4">
            <Button onClick={() => handleBulkDelete()} className="bg-rose-700 hover:bg-rose-800 active:bg-rose-900">
              Delete In Bulk
            </Button>
            <Button
              onClick={() => toggleAddPage()}
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 flex"
            >
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
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                className={`${
                  sidebar ? "md:w-60" : "md:w-94"
                } h-10 pl-9 pr-1.5 transition-all ease-in-out`}
                placeholder="Search Product..."
              />
            </div>

            <form className="flex gap-14" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-6">
                <div className="relative">
                  <select
                    className={`appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg ${
                      sidebar ? "md:w-56" : "md:w-60"
                    } transition-all ease-in-out`}
                    {...register("category")}
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
                </div>

                <div className="relative">
                  <select
                    className="appearance-none focus:outline-none px-2 focus:ring-2 bg-gray-100 p-2 rounded-lg w-60"
                    {...register("sortBy")}
                  >
                    <option value="createdAt">Short</option>
                    <option value="price ascending">Price : Low to High</option>
                    <option value="price descending">
                      Price : High to Low
                    </option>
                  </select>
                  <Icon.Triangle
                    fill=""
                    size={12}
                    className="rotate-180 absolute right-3 top-4 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className={
                    loading ? "bg-gray-300 w-40" : "bg-violet-700 w-40"
                  }
                >
                  Filter
                </Button>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    reset({
                      category: "",
                      sortBy: "createdAt",
                    });
                  }}
                  className="bg-red-600 w-40"
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>

          {/* Products */}
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
            {products?.length > 0 ? (
              products?.map((product) => (
                <ul
                  className="grid grid-cols-8 px-6 py-3 border-b border-gray-200"
                  key={product?._id}
                >
                  <li className="flex gap-2 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!product?.selected}
                      onChange={() => handleSelectItem(product?._id)}
                      className=" cursor-pointer"
                    />
                    <p onClick={() => handleSelectItem(product?._id)}>
                      {product?.productId}
                    </p>
                  </li>
                  <li className="col-start-2 col-end-4 flex items-center gap-3">
                    <img src={product?.image[0]} alt="" className="h-5 w-5" />
                    <p>{product?.productName}</p>
                  </li>
                  <li>
                    <p>{product?.category[0]?.categoryName}</p>
                  </li>
                  <li>
                    <p>₹{product?.price}</p>
                  </li>
                  <li>
                    <p>{product?.quantity}</p>
                  </li>
                  <li>
                    <NavLink to={`/products/${product?._id}`}>
                      <Icon.Eye size={20} />
                    </NavLink>
                  </li>
                  <li className="flex gap-3 cursor-pointer">
                    <Icon.Edit
                      onClick={() => {
                        setProductId(product?._id);
                        toggleAddPage();
                      }}
                      size={20}
                      className="hover:text-green-500"
                    />
                    <Icon.Trash2
                      size={20}
                      onClick={() => handleDeleteProduct(product?._id)}
                      className="hover:text-red-600"
                    />
                  </li>
                </ul>
              ))
            ) : (
              <div className="text-center py-5">
                <p className="text-gray-500">No products found</p>
              </div>
            )}

            {products?.length > 0 && (
              <div className="bg-gray-200 px-6 py-3 flex items-center justify-between text-sm font-medium">
                {/* Left: Showing results info */}
                <p className="text-gray-700">
                  Showing page{" "}
                  <span className="text-gray-900">{pageInfo?.page}</span> of{" "}
                  <span className="text-gray-900">{pageInfo?.totalPages}</span>{" "}
                  pages (
                  <span className="text-gray-900">
                    {pageInfo?.totalProduct}
                  </span>{" "}
                  Products)
                </p>

                {/* Right: Prev / Next buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPageNumber(pageInfo.page - 1);
                      setChangePage(true);
                    }}
                    disabled={pageInfo.page === 1}
                    className={`px-3 py-1 rounded ${
                      pageInfo.page === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => {
                      setPageNumber(pageInfo.page + 1);
                      setChangePage(true);
                    }}
                    disabled={pageInfo.page === pageInfo.totalPages}
                    className={`px-3 py-1 rounded ${
                      pageInfo.page === pageInfo.totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
