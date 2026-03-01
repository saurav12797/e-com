import { Input, Select } from "antd";
import { SORT_OPTIONS, RATING_OPTIONS } from "./constants";
import type { Filters } from "../../../context/productContext";
import type { SortOrder } from "../../../types/product.type";
import "../product.scss";

interface Props {
  categories: string[];
  onChange: (filters: Partial<Filters>) => void;
  filters: Filters;
}

const ProductFilter = ({ categories, filters, onChange }: Props) => {
  return (
    <div className="filter-bar">
      <Input
        placeholder="Search..."
        style={{ width: 200 }}
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
      />

      <Select
        placeholder="Category"
        allowClear
        style={{ width: 150 }}
        value={filters.category}
        options={categories.map((cat) => ({
          label: cat,
          value: cat,
        }))}
        onChange={(value) => onChange({ category: value ?? null })}
      />

      <Select
        placeholder="Rating"
        allowClear
        style={{ width: 150 }}
        value={filters.rating}
        options={RATING_OPTIONS}
        onChange={(value) => onChange({ rating: value ?? null })}
      />

      <Select<SortOrder>
        placeholder="Sort"
        allowClear
        style={{ width: 150 }}
        value={filters.sort}
        options={SORT_OPTIONS}
        onChange={(value) => onChange({ sort: value ?? null })}
      />
    </div>
  );
};
export default ProductFilter;
