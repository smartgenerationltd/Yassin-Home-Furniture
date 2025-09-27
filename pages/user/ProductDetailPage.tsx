
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { WhatsAppIcon, PhoneIcon, MailIcon } from '../../components/icons';
import { CONTACT_INFO } from '../../constants';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { getProductById } = useProducts();
  const product = getProductById(productId || '');
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div>
        <Header />
        <div className="text-center py-20">Product not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[activeImage]}
                alt={`${product.name} view ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square w-full rounded-md overflow-hidden ring-2 ring-offset-2 ${
                    activeImage === index ? 'ring-brand-primary' : 'ring-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pt-4">
            <nav className="text-sm mb-4">
              <ol className="list-none p-0 inline-flex space-x-2">
                <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
                <li><span>/</span></li>
                <li><Link to={`/category/${encodeURIComponent(product.category)}`} className="text-gray-500 hover:text-gray-700">{product.category}</Link></li>
              </ol>
            </nav>
            <h1 className="text-4xl font-bold text-brand-dark font-serif">{product.name}</h1>
            <p className="text-3xl mt-4 text-brand-primary">${product.price.toFixed(2)}</p>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Interested? Contact us to order.</h3>
              <div className="space-y-4">
                 <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-3" />
                  Order on WhatsApp
                </a>
                 <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <PhoneIcon className="w-5 h-5 mr-3 text-brand-primary" />
                  Call to Order
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(`Inquiry about ${product.name}`)}`}
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <MailIcon className="w-5 h-5 mr-3 text-brand-primary" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
