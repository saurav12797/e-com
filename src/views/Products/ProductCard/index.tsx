import React from "react";
import { useProductContext } from "../../../context/productContext";
import type { ProductType } from "../../../types/product.type";

interface Props {
  product: ProductType;
}

const ProductCard = ({ product }: Props) => {
  const { favorites, toggleFavorite } = useProductContext();
  const isFavorite = favorites.includes(product.id);

  return (
    <div className={`card ${isFavorite ? "active" : ""}`}>
      <img src={product.image} alt={product.title} loading="lazy" />

      <h4 className="title">{product.title}</h4>

      <p className="category">{product.category}</p>

      <p className="price">₹ {product.price}</p>

      <p className="rating">
        ⭐ {product.rating?.rate} ({product.rating?.count})
      </p>

      <button
        className="favorite-btn"
        onClick={() => toggleFavorite(product.id)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default React.memo(ProductCard);
