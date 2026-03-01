export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export type SortOrder = "asc" | "desc";

export interface GetProductsParams {
  limit?: number;
  search?: string;
  category?: string;
  sort?: SortOrder;
}
