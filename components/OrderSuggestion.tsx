import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { CONTACT_INFO } from '../constants';
import { WhatsAppIcon } from './icons';

const OrderSuggestion: React.FC = () => {
    const { selectedProducts } = useCart();
    const { products } = useProducts();

    if (selectedProducts.length === 0) {
        return null;
    }

    const selectedProductDetails = products.filter(p => selectedProducts.includes(p.id));
    const productNames = selectedProductDetails.map(p => p.name).join(', ');
    const message = `Hi, I'm interested in ordering the following products: ${productNames}.`;
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
            >
                <WhatsAppIcon className="w-6 h-6 mr-3" />
                <span className="font-semibold">
                    Order on WhatsApp ({selectedProducts.length} {selectedProducts.length === 1 ? 'item' : 'items'})
                </span>
            </a>
        </div>
    );
};

export default OrderSuggestion;
