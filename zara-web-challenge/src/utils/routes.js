import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import ProductDetails from "../components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product-details",
    element: <ProductDetails />,
  },
]);
