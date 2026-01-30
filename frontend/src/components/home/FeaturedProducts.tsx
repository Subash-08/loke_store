
import React, { useRef } from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const products: Product[] = [
  {
    name: 'GeForce RTX 4080 Super Gaming OC 16GB',
    price: 1199.99,
    rating: 4.9,
    reviewCount: 345,
    imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=RTX+4080',
    status: 'New',
  },
  {
    name: 'AMD Ryzen 9 7950X3D 16-Core 32-Thread Processor',
    price: 649.00,
    originalPrice: 699.00,
    rating: 4.8,
    reviewCount: 512,
    imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Ryzen+9',
    status: 'Sale',
  },
  {
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz C36',
    price: 124.99,
    rating: 4.7,
    reviewCount: 890,
    imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=DDR5+RAM',
  },
  {
    name: 'Samsung 990 Pro 2TB NVMe SSD - Up to 7,450 MB/s',
    price: 169.99,
    originalPrice: 199.99,
    rating: 5.0,
    reviewCount: 1204,
    imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=NVMe+SSD',
    status: 'Sale',
  },
  {
    name: 'Logitech G Pro X Superlight Wireless Gaming Mouse',
    price: 159.99,
    rating: 4.9,
    reviewCount: 2310,
    imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=Gaming+Mouse',
  },
  {
    name: 'ASUS ROG Swift OLED PG27AQDM 27” 1440p 240Hz Monitor',
    price: 899.00,
    rating: 4.8,
    reviewCount: 188,
    imageUrl: 'https://placehold.co/400x400/334155/ffffff?text=OLED+Monitor',
    status: 'New',
  },
];


import { ToyTheme } from '../../theme/designTokens';

const FeaturedProducts: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth * 0.9;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`${ToyTheme.colors.background.page}`}>
      <div className={ToyTheme.layout.container}>
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-black ${ToyTheme.colors.text.heading} tracking-tight`}>Hot & Trending</h2>
          <div className="hidden sm:flex items-center space-x-3">
            <button onClick={() => scroll('left')} aria-label="Scroll left" className={`p-3 rounded-full bg-white text-purple-600 hover:bg-purple-100 shadow-md hover:shadow-lg transition-all ${ToyTheme.animations.clickBounce}`}>
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button onClick={() => scroll('right')} aria-label="Scroll right" className={`p-3 rounded-full bg-white text-purple-600 hover:bg-purple-100 shadow-md hover:shadow-lg transition-all ${ToyTheme.animations.clickBounce}`}>
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-8 -mb-4 snap-x snap-mandatory pt-2 pl-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-72 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
