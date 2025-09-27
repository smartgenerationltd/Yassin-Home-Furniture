import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  Category.SOFAS,
  Category.CHAIRS,
  Category.BEDS,
  Category.TABLES,
  Category.STORAGE,
  Category.KITCHEN,
];

export const CONTACT_INFO = {
  whatsapp: '250785308635',
  phone: '1234567890',
  email: 'contact@yassinfurniture.com',
  address: {
    line1: 'Kivugiza Cell, Nyamirambo Sector',
    line2: 'Nyarugenge District, Kigali City, Rwanda',
  },
  adminEmail: 'admin@example.com', // The email for the admin user
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Plush Velvet Sofa',
    description: 'A luxurious and comfortable sofa, perfect for modern living rooms. Upholstered in high-quality velvet fabric.',
    price: 1299.99,
    category: Category.SOFAS,
    images: ['https://picsum.photos/seed/sofa1/800/600', 'https://picsum.photos/seed/sofa2/800/600', 'https://picsum.photos/seed/sofa3/800/600'],
  },
  {
    id: '2',
    name: 'Mid-Century Modern Chair',
    description: 'An iconic accent chair with a solid wood frame and comfortable cushioning. A timeless piece for any room.',
    price: 349.0,
    category: Category.CHAIRS,
    images: ['https://picsum.photos/seed/chair1/800/600', 'https://picsum.photos/seed/chair2/800/600'],
  },
  {
    id: '3',
    name: 'King Size Platform Bed',
    description: 'A minimalist platform bed with a sturdy wooden frame and a stylish headboard. Creates a serene and inviting bedroom atmosphere.',
    price: 899.5,
    category: Category.BEDS,
    images: ['https://picsum.photos/seed/bed1/800/600', 'https://picsum.photos/seed/bed2/800/600', 'https://picsum.photos/seed/bed3/800/600'],
  },
  {
    id: '4',
    name: 'Solid Oak Dining Table',
    description: 'A handcrafted dining table made from solid oak, capable of seating up to 8 people. Built to last for generations.',
    price: 1500.0,
    category: Category.TABLES,
    images: ['https://picsum.photos/seed/table1/800/600', 'https://picsum.photos/seed/table2/800/600'],
  },
  {
    id: '5',
    name: 'Rustic Wooden Bookshelf',
    description: 'A tall bookshelf with five spacious shelves, made from reclaimed wood for a rustic and industrial look.',
    price: 450.0,
    category: Category.STORAGE,
    images: ['https://picsum.photos/seed/storage1/800/600'],
  },
  {
    id: '6',
    name: 'Modern Kitchen Island',
    description: 'A stylish and functional kitchen island with a marble countertop and ample storage space. Perfect for food prep and casual dining.',
    price: 1799.99,
    category: Category.KITCHEN,
    images: ['https://picsum.photos/seed/kitchen1/800/600', 'https://picsum.photos/seed/kitchen2/800/600'],
  },
];