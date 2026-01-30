import React from 'react';
// Make sure this path is correct relative to this file
import Peripherals from '../../assets/10018.webp';
import gpu from '../../assets/10019.webp';

const deals = [
  {
    title: 'Up to 30% Off GPUs',
    description: 'Upgrade your graphics power for less. Limited time offer!',
    // FIX: Use the variable directly, without curly braces
    imageUrl: gpu,
    href: '/products/category/gpu',
    cta: 'Shop GPUs',
  },
  {
    title: 'Gaming Peripherals Sale',
    description: 'Keyboards, mice, and headsets from top brands on sale now.',
    // FIX: Use the variable directly, without curly braces
    imageUrl: Peripherals,
    href: '/products/category/peripherals',
    cta: 'Explore Deals',
  },
];

import { ToyTheme } from '../../theme/designTokens';

const DealsSection: React.FC = () => {
  return (
    <section className={`py-4 ${ToyTheme.colors.background.page}`}>
      <div className={ToyTheme.layout.container}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <a
              key={deal.title}
              href={deal.href}
              className={`group relative block h-96 ${ToyTheme.shapes.card} overflow-hidden ${ToyTheme.shadows.float} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Background Image with Overlay Effect */}
              <div className="absolute inset-0">
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
                <h3 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-md">{deal.title}</h3>
                <p className="text-purple-100 text-lg mb-8 font-medium">{deal.description}</p>

                {/* Call to Action Button */}
                <div>
                  <span className={`inline-flex items-center justify-center ${ToyTheme.colors.secondary.default} ${ToyTheme.colors.secondary.hover} text-yellow-900 font-bold py-3 px-8 text-lg ${ToyTheme.shapes.button} transition-all duration-300 shadow-lg transform group-hover:scale-105`}>
                    {deal.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;