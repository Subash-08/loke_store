import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ShowcaseSection } from './showcaseSection';
import ProductCard from './ProductCard';
import CountdownTimer from './CountdownTimer';
import { ToyTheme } from '../../theme/designTokens';

interface ProductShowcaseSectionProps {
  section: ShowcaseSection;
  className?: string;
  style?: React.CSSProperties;
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  section,
  className = '',
  style
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const {
    _id,
    title,
    subtitle,
    type,
    products,
    timerConfig,
    showViewAll,
    viewAllLink
  } = section;


  // Smooth scroll handler
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      const newScrollLeft = direction === 'left'
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Safety check
  if (!products || products.length === 0) return null;

  return (
    <section className={`py-12 ${className}`} style={style}>

      {/* --- Header --- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 px-2">
        <div className="space-y-2">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block w-2 h-8 bg-purple-400 rounded-full"></div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className={`text-2xl lg:text-3xl font-black ${ToyTheme.colors.text.heading} tracking-tight`}>
                {title}
              </h2>
              {timerConfig.hasTimer && timerConfig.endDate && (
                <div className="">
                  <CountdownTimer
                    endDate={timerConfig.endDate}
                    timerText={timerConfig.timerText}
                    className="bg-rose-100 text-rose-600 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-2 border-rose-200"
                  />
                </div>
              )}
            </div>
          </div>

          {subtitle && (
            <p className={`${ToyTheme.colors.text.body} font-medium text-sm lg:text-base max-w-2xl sm:pl-5`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
          {showViewAll && (
            <Link
              to={viewAllLink || `/products`}
              className={`group flex items-center gap-2 text-sm font-bold ${ToyTheme.colors.primary.text} hover:opacity-80 transition-all duration-300 bg-white px-4 py-2 ${ToyTheme.shapes.pill} shadow-sm border border-purple-100`}
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}

          {/* Carousel Navigation */}
          {type === 'carousel' && products.length > 4 && (
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                className={`w-10 h-10 ${ToyTheme.shapes.button} bg-white text-purple-400 border-2 border-purple-100 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 active:scale-95 flex items-center justify-center shadow-sm`}
                aria-label="Previous products"
              >
                <ChevronLeft className="w-5 h-5 stroke-[3]" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className={`w-10 h-10 ${ToyTheme.shapes.button} bg-white text-purple-400 border-2 border-purple-100 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 active:scale-95 flex items-center justify-center shadow-sm`}
                aria-label="Next products"
              >
                <ChevronRight className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Content Grid/Carousel --- */}
      <div className="relative">
        {type === 'grid' ? (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products.slice(0, 8).map((product) => (
              <div key={product._id} className="w-[220px] max-w-[220px] sm:w-[260px] sm:max-w-[260px] md:w-[280px] md:max-w-[280px] max-w-[320px] lg:w-auto lg:max-w-none snap-start shrink-0">
                <ProductCard
                  product={product as any}
                  // @ts-ignore
                  cardStyle="modern"
                />
              </div>
            ))}
          </div>
        ) : (
          /* Carousel Layout */
          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-4 lg:gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2"
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="max-w-[320px] min-w-[240px] md:min-w-[260px] lg:min-w-[280px]  snap-start"
                >
                  <ProductCard
                    product={product as any}
                    // @ts-ignore
                    cardStyle="modern"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(ProductShowcaseSection);