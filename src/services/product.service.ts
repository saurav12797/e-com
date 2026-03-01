import { axiosInstance } from "../api/axiosInstance";
import { AxiosError } from "axios";
import { notification } from "antd";
import { ApiRoute } from "../Routes/apiRoute";
import type { ProductType } from "../types/product.type";
import type { GetProductsParams } from "../types/product.type";

export const getProducts = async (params?: GetProductsParams) => {
  try {
    const base = ApiRoute.PRODUCTS;

    const endpoint = params?.search
      ? `${base}/search`
      : params?.category
        ? `${base}/category/${params.category}`
        : base;

    const { data } = await axiosInstance.get(endpoint, {
      params: {
        sort: params?.sort,
        q: params?.search,
      },
    });

    return data.products ?? (data as ProductType[]);
  } catch (error) {
    const err = error as AxiosError;

    notification.error({
      message: "Error",
      description: err.message || "Failed to fetch products",
    });

    throw err;
  }
};
export const getCategories = async (): Promise<string[]> => {
  try {
    const { data } = await axiosInstance.get(`${ApiRoute.PRODUCTS}/categories`);

    return data;
  } catch (error) {
    const err = error as AxiosError;

    notification.error({
      message: "Error",
      description: err.message || "Failed to fetch categories",
    });

    throw err;
  }
};
