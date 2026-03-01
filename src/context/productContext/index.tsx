import { createContext, useContext, useState, type ReactNode } from "react";
import type { ProductType } from "../../types/product.type";
import type { SortOrder } from "../../types/product.type";

export interface Filters {
  search: string;
  category: string | null;
  rating: number | null;
  sort: SortOrder | null;
}

interface ProductContextType {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;

  page: number;
  setPage: (page: number) => void;

  // 🔥 MUST INCLUDE
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: null,
    rating: null,
    sort: null,
  });

  const [page, setPage] = useState(1);

  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]"),
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        setLoading,
        filters,
        updateFilters,
        page,
        setPage,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("Must be inside ProductProvider");
  return context;
};
