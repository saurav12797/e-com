import { lazy } from "react";
import { appRoutes } from "./appRoute";

const ProductListing = lazy(() => import("../views/Products/ProductListing"));
const ProductDetails = lazy(() => import("../views/Products/ProductDetails"));

export const routeConfig = [
  {
    path: appRoutes.PRODUCT_LISTING,
    element: <ProductListing />,
  },
  {
    path: appRoutes.PRODUCT_DETAILS,
    element: <ProductDetails />,
  },
];
