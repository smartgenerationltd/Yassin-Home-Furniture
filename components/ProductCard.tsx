import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addProduct, removeProduct, isProductSelected } = useCart();
  const isSelected = isProductSelected(product.id);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addProduct(product.id);
    } else {
      removeProduct(product.id);
    }
  };

  return (
    <div className={`group overflow-hidden relative rounded-md border transition-all duration-300 ${isSelected ? 'border-brand-primary ring-2 ring-brand-primary ring-offset-2' : 'border-gray-200'}`}>
       <div className="absolute top-3 right-3 z-10 bg-white/75 rounded-full p-1">
         <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          className="h-5 w-5 rounded-full border-gray-400 text-brand-primary focus:ring-brand-primary"
          aria-label={`Select ${product.name}`}
        />
       </div>

      <Link to={`/product/${product.id}`} className="block">
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

        <div className="relative bg-white p-4">
          <h3 className="text-lg text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {product.name}
          </h3>
          <p className="mt-1.5 tracking-wide text-brand-primary font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
