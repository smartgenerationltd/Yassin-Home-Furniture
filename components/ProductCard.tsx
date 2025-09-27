
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block overflow-hidden">
      <div className="relative h-[350px] sm:h-[450px]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
        />
        <img
          src={product.images[1] || product.images[0]}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      <div className="relative bg-white pt-3">
        <h3 className="text-lg text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {product.name}
        </h3>
        <p className="mt-1.5 tracking-wide text-brand-primary font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
