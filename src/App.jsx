import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ViewProduct from "./pages/ViewProduct";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
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
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
