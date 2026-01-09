import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ViewProduct from "./pages/ViewProduct";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import ViewOrder from "./pages/ViewOrder";
import Invoice from "./pages/Invoice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkOwnerAuth } from "./features/ApiCalls";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  // Private routes
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/products", element: <Products /> },
          { path: "/products/:productId", element: <ViewProduct /> },
          { path: "/orders", element: <Orders /> },
          { path: "/orders/:orderId", element: <ViewOrder /> },
        ],
      },
      { path: "/invoice/:orderId", element: <Invoice /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.owner.loading)

  useEffect(() => {
    dispatch(checkOwnerAuth())
  },[])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
