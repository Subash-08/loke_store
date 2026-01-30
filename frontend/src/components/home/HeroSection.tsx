
import React, { useState, useEffect } from 'react';

const slides = [
  {
    bgImage: 'https://placehold.co/1920x800/0f172a/60a5fa?text=Big+PC+Upgrade+Sale',
    title: 'The Big PC Upgrade Sale',
    subtitle: 'Up to 40% off on CPUs, GPUs, and Motherboards!',
    cta: 'Shop Now',
    href: '#',
  },
  {
    bgImage: 'https://placehold.co/1920x800/0c4a6e/e0f2fe?text=Build+Your+Dream+PC',
    title: 'Build Your Dream PC',
    subtitle: 'Use our powerful and easy-to-use Custom PC Builder.',
    cta: 'Start Building',
    href: '#',
  },
  {
    bgImage: 'https://placehold.co/1920x800/1e293b/94a3b8?text=Featuring+Top+Brands',
    title: 'Featuring Top Brands',
    subtitle: 'The latest hardware from Intel, NVIDIA, and AMD.',
    cta: 'Explore Brands',
    href: '#',
  },
];

import { ToyTheme } from '../../theme/designTokens';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] bg-slate-900 text-white overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className={`w-full h-full bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30 flex items-center justify-center`}>
              <div className="text-center max-w-4xl px-4">
                <h1 className="text-4xl md:text-7xl font-bold drop-shadow-lg tracking-tight mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">
                    {slide.title}
                  </span>
                </h1>
                <p className="mt-4 text-xl md:text-3xl drop-shadow-md text-blue-50 font-medium opacity-90">{slide.subtitle}</p>
                <a
                  href={slide.href}
                  className={`mt-10 inline-block ${ToyTheme.colors.primary.default} ${ToyTheme.colors.primary.hover} text-white font-bold py-4 px-10 ${ToyTheme.shapes.button} text-xl ${ToyTheme.animations.hoverScale} ${ToyTheme.shadows.float} border-4 border-white/20 backdrop-blur-sm`}
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-10 p-3 bg-black/20 backdrop-blur-md rounded-full">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white'
              }`}
          ></button>
        ))}
      </div>
    </section>
  );
};


export default HeroSection;
