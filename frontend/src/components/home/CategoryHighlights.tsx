
import React from 'react';
import { ToyTheme } from '../../theme/designTokens';

const categories = [
  { name: 'CPUs', icon: '🧠', href: '#' },
  { name: 'GPUs', icon: '🎮', href: '#' },
  { name: 'Motherboards', icon: '🛠️', href: '#' },
  { name: 'RAM', icon: '💾', href: '#' },
  { name: 'Storage', icon: '💽', href: '#' },
  { name: 'Cases', icon: '🖥️', href: '#' },
  { name: 'Peripherals', icon: '🖱️', href: '#' },
  { name: 'Laptops', icon: '💻', href: '#' },
];

const CategoryHighlights: React.FC = () => {
  return (
    <section className={`py-4 ${ToyTheme.colors.background.page}`}>
      <div className={ToyTheme.layout.container}>
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-black ${ToyTheme.colors.text.heading} tracking-tight mb-3`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Shop by Category
            </span>
          </h2>
          <p className={`${ToyTheme.colors.text.body} text-lg max-w-2xl mx-auto`}>
            Find the perfect parts for your next build.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            // Rotate through theme accent colors
            const colors = [
              'bg-purple-100 text-purple-600 hover:bg-purple-200',
              'bg-pink-100 text-pink-600 hover:bg-pink-200',
              'bg-sky-100 text-sky-600 hover:bg-sky-200',
              'bg-yellow-100 text-yellow-600 hover:bg-yellow-200',
            ];
            const colorClass = colors[index % colors.length];

            return (
              <a
                key={category.name}
                href={category.href}
                className={`group flex flex-col items-center justify-center p-6 ${colorClass} ${ToyTheme.shapes.card} ${ToyTheme.shadows.soft} ${ToyTheme.animations.hoverScale} transition-all duration-300 border-2 border-transparent hover:border-white/50`}
              >
                <div className="text-4xl mb-2 filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <span className="font-bold text-center text-sm">{category.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
