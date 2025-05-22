import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ViewProduct from "./pages/ViewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {path:"/", element: <Home/>},
      {path:"/products", element: <Products/>},
      {path:"/products/:product", element: <ViewProduct/>},
    ]
  }
])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App;
