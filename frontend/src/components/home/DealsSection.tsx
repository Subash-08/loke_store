import React from 'react';
import { Sparkles } from 'lucide-react';
import { ToyTheme } from '../../theme/designTokens';
// Make sure this path is correct relative to this file
import dealImage1 from '../../assets/images/10030.jpg';
import dealImage2 from '../../assets/images/10018.jpg';

const deals = [
  {
    title: 'Soft & Cuddly Plushies',
    description: 'Up to 50% off on huggable friends. Perfect for gifts!',
    imageUrl: dealImage1,
    href: '/products?category=soft-toys',
    cta: 'Adopt a Friend',
  },
  {
    title: 'Educational & STEM',
    description: 'Learn while playing with our smart building sets.',
    imageUrl: dealImage2,
    href: '/products?category=educational',
    cta: 'Start Learning',
  },
];

const DealsSection: React.FC = () => {
  return (
    <section className={`py-12 ${ToyTheme.colors.background.page}`}>
      <div className={ToyTheme.layout.container}>

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm mb-4">
            <Sparkles size={16} className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">Unbeatable Offers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-fredoka">
            Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-400">Deals & Savings</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Grab your favorites at amazing prices. Limited time offers you cannot miss!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <a
              key={deal.title}
              href={deal.href}
              className={`group relative block h-80 md:h-96 ${ToyTheme.shapes.card} overflow-hidden ${ToyTheme.shadows.float} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Background Image with Overlay Effect */}
              <div className="absolute inset-0">
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className="w-full h-full object-cover transition-transform duration-700 "
                />
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-80"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight drop-shadow-md font-fredoka">{deal.title}</h3>
                <p className="text-gray-100 text-lg mb-8 font-medium">{deal.description}</p>

                {/* Call to Action Button */}
                <div>
                  <span className={`inline-flex items-center justify-center bg-white text-orange-600 font-bold py-3 px-8 text-base md:text-lg rounded-full transition-all duration-300 shadow-lg transform group-hover:scale-105`}>
                    {deal.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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