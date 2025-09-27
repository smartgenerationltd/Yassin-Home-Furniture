import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Category } from '../../types';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderSuggestion from '../../components/OrderSuggestion';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { products } = useProducts();

  const category = decodeURIComponent(categoryName || '') as Category;
  const filteredProducts = products.filter(p => p.category === category);

  return (
    <div className="bg-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-brand-dark font-serif">{category}</h1>
          <p className="mt-4 text-lg text-gray-500">
            Browse our curated selection of high-quality {category.toLowerCase()}.
          </p>
        </div>

        <div className="pt-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found in this category.</p>
          )}
        </div>
      </main>
      <Footer />
      <OrderSuggestion />
    </div>
  );
};

export default CategoryPage;
