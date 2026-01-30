
import React from 'react';
import { Product } from '../../types';
import StarIcon from '../icons/StarIcon';
import HeartIcon from '../icons/HeartIcon';
import EyeIcon from '../icons/EyeIcon';
import CartIcon from '../icons/CartIcon';

interface ProductCardProps {
  product: Product;
}

import { ToyTheme } from '../../theme/designTokens';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`group flex flex-col h-full bg-white ${ToyTheme.shapes.card} ${ToyTheme.shadows.soft} ${ToyTheme.animations.hoverScale} overflow-hidden border-2 border-transparent hover:border-purple-200`}>
      <div className="relative overflow-hidden">
        <a href="#">
          <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </a>

        {product.status && (
          <span className={`absolute top-3 left-3 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${product.status === 'Sale' ? 'bg-rose-500' : 'bg-sky-500'
            }`}>
            {product.status}
          </span>
        )}

        {product.originalPrice && product.status === 'Sale' && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full shadow-sm">
            -{discountPercent}%
          </span>
        )}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            className="p-3 rounded-full bg-white text-rose-500 shadow-lg hover:bg-rose-50 hover:scale-110 transition-all duration-200"
            aria-label="Add to wishlist"
            title="Add to wishlist"
          >
            <HeartIcon className="w-5 h-5 fill-current" />
          </button>
          <button
            className="p-3 rounded-full bg-white text-sky-600 shadow-lg hover:bg-sky-50 hover:scale-110 transition-all duration-200"
            aria-label="Quick view"
            title="Quick view"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-bold ml-1">({product.reviewCount})</span>
        </div>

        <h3 className={`text-md font-bold ${ToyTheme.colors.text.heading} h-12 line-clamp-2 mb-2 leading-snug`}>
          <a href="#" className="hover:text-purple-600 transition-colors">{product.name}</a>
        </h3>

        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <p className="text-xl font-black text-slate-800">${product.price?.toFixed(2) ?? '0.00'}</p>
          {product.originalPrice != null && (
            <p className="text-sm text-slate-400 line-through font-semibold">${product.originalPrice.toFixed(2)}</p>
          )}
        </div>

        <button className={`mt-4 w-full flex items-center justify-center ${ToyTheme.colors.primary.default} ${ToyTheme.colors.primary.hover} text-white font-bold py-3 px-4 ${ToyTheme.shapes.button} focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 ease-in-out transform active:scale-95 shadow-md hover:shadow-lg`}>
          <CartIcon className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
