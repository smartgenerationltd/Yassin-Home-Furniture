import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { CATEGORIES } from '../../constants';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderSuggestion from '../../components/OrderSuggestion';

const HomePage: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <main>
        <div className="relative bg-white">
          <div className="container mx-auto px-6 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl md:text-6xl font-serif">
                Timeless Design, Modern Living
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
                Discover our curated collection of high-quality furniture that brings style, comfort, and function to your home.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16">
          {CATEGORIES.map(category => {
            const categoryProducts = products.filter(p => p.category === category).slice(0, 4);
            if (categoryProducts.length === 0) return null;

            return (
              <section key={category} className="mb-16">
                <div className="flex justify-between items-baseline mb-8">
                  <h2 className="text-3xl font-bold text-brand-dark font-serif">{category}</h2>
                  <Link to={`/category/${encodeURIComponent(category)}`} className="text-brand-primary hover:underline">
                    View All &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {categoryProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
      <OrderSuggestion />
    </div>
  );
};

export default HomePage;
