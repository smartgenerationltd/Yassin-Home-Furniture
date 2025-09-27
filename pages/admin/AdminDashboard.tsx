import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useUserAuth } from '../../context/UserAuthContext';
import { Product } from '../../types';
import Modal from '../../components/Modal';
import ProductForm from '../../components/ProductForm';
import { TrashIcon, EditIcon, PlusIcon } from '../../components/icons';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { isAuthenticated, logout } = useUserAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = (productData: Product | Omit<Product, 'id'>) => {
    if ('id' in productData) {
      updateProduct(productData as Product);
    } else {
      addProduct(productData);
    }
    closeModal();
  };
  
  const handleDelete = (productId: string) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
          deleteProduct(productId);
      }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div>
            <Link to="/" className="text-sm text-gray-600 hover:text-brand-primary mr-4">View Site</Link>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">Logout</button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-end mb-6">
          <button onClick={openAddModal} className="flex items-center bg-brand-primary text-white py-2 px-4 rounded-md hover:bg-brand-dark transition-colors">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16">
                        <img className="w-full h-full rounded object-cover" src={product.images[0]} alt={product.name} />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap font-semibold">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{product.category}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${product.price.toFixed(2)}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button onClick={() => openEditModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4"><EditIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900"><TrashIcon className="w-5 h-5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
        <ProductForm product={editingProduct} onSubmit={handleFormSubmit} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default AdminDashboard;