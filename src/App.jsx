import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {path:"/", element: <Home/>}
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
