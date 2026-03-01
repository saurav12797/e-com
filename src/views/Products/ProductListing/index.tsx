import { useEffect, useState } from "react";
import { Spin, Empty, Pagination } from "antd";
import ProductCard from "../ProductCard";
import ProductFilter from "../ProductFilter";
import { getProducts, getCategories } from "../../../services/product.service";
import { useProductContext } from "../../../context/productContext";
import { PAGE_SIZE } from "./constants";
import type { GetProductsParams } from "../../../types/product.type";
import "../product.scss";

const ProductListing = () => {
  const {
    products,
    setProducts,
    filters,
    updateFilters,
    page,
    setPage,
    loading,
    setLoading,
  } = useProductContext();

  const [categories, setCategories] = useState<string[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params: GetProductsParams = {
          limit: 200,
          search: debouncedSearch || undefined,
          category: filters.category || undefined,
          sort: filters.sort ?? undefined,
        };

        const data = await getProducts(params);
        if (data) setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch, filters.category, filters.sort]);

  const filteredByRating =
    filters.rating !== null
      ? products.filter((product) => product.rating?.rate >= filters.rating!)
      : products;

  const paginated = filteredByRating.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <>
      <ProductFilter
        filters={filters}
        categories={categories}
        onChange={updateFilters}
      />

      <div className="product-list-wrapper">
        {loading ? (
          <div className="product-loader">
            <Spin size="large" />
          </div>
        ) : filteredByRating.length === 0 ? (
          <Empty description="No products found" />
        ) : (
          <>
            <div className="product-list">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              current={page}
              pageSize={PAGE_SIZE}
              total={filteredByRating.length}
              onChange={(p) => setPage(p)}
              showSizeChanger={false}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ProductListing;
