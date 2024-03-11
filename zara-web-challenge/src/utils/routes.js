import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import ProductDetails from "../components/ProductDetails";
import Favourites from "../components/Favourites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product-details",
    element: <ProductDetails />,
  },
  {
    path: "/favourites",
    element: <Favourites />,
  },
]);
