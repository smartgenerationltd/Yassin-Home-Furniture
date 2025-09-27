
import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import ImageUploader from './ImageUploader';
import { generateDescription } from '../services/geminiService';
import { SparklesIcon } from './icons';
import Spinner from './Spinner';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Product | Omit<Product, 'id'>) => void;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: CATEGORIES[0],
    images: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '', description: '', price: 0, category: CATEGORIES[0], images: [],
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.name) {
      alert("Please enter a product name first to generate a description.");
      return;
    }
    setIsGenerating(true);
    const promptText = `${formData.name} in the ${formData.category} category`;
    const description = await generateDescription(promptText);
    setFormData(prev => ({...prev, description}));
    setIsGenerating(false);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSubmit({ ...formData, id: product.id });
    } else {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
            {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>
      </div>
      
      <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <div className="relative mt-1">
            <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
            <div className="absolute top-2 right-2">
                <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
                    {isGenerating ? <Spinner /> : <SparklesIcon className="w-4 h-4 mr-1"/>}
                    Generate
                </button>
            </div>
        </div>
      </div>

      <ImageUploader existingImages={formData.images} onImagesChange={handleImagesChange} />
      
      <div className="pt-4 flex justify-end space-x-3">
        <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
          {product ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
