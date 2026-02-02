import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { preBuildShowcaseService } from '../admin/services/preBuildShowcaseService';
import { PreBuildShowcaseItem } from '../admin/types/preBuildShowcase';
import { getImageUrl } from '../utils/imageUtils';

import { ToyTheme, gradients } from '../../theme/designTokens';

// --- Sub Components ---

const ShopButton: React.FC<{ link: string }> = ({ link }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(link)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`bg-white ${ToyTheme.colors.text.heading} px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-xl z-30`}
    >
      Shop Now
      <ChevronRight className="w-4 h-4 text-purple-500" />
    </motion.button>
  );
};

interface ProductCardProps {
  item: PreBuildShowcaseItem;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative group overflow-hidden ${ToyTheme.shapes.card} bg-white h-[450px] md:h-[500px] flex flex-col border-2 border-transparent hover:border-purple-200 ${ToyTheme.shadows.soft} ${item.isWide ? 'lg:col-span-4' : 'lg:col-span-1'
        }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-gray-50">
        <img
          src={getImageUrl(item.image)}
          alt={item.title}
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Gradient Overlays - Lighter for Toy Theme */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-purple-500/10 group-hover:bg-purple-500/0 transition-colors duration-500" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col h-full justify-end items-center text-center p-6 md:p-10 pb-16">
        <div className="flex flex-col items-center space-y-3 md:space-y-4">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/90 uppercase bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {item.category}
          </span>

          <h3 className={`font-black uppercase leading-[0.9] text-white drop-shadow-md ${item.isWide ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'
            }`}>
            {item.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>

          <p className="font-bold text-white text-lg md:text-2xl tracking-wide drop-shadow-sm">
            {item.price}
          </p>

          <div className="pt-4 md:pt-6">
            <ShopButton link={item.buttonLink} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PreBuildSection: React.FC = () => {
  const [items, setItems] = useState<PreBuildShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await preBuildShowcaseService.getShowcaseItems();
        setItems(response.data);
      } catch (error) {
        console.error("Failed to load pre-build showcase", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return null; // Or a skeleton loader
  if (items.length === 0) return null;

  return (
    <section className={`relative w-full ${ToyTheme.layout.container}`}>
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${ToyTheme.colors.text.heading}`}>
          <span className="text-purple-500">READY TO PLAY</span> <span className="text-pink-500">SETS</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <ProductCard
            key={item._id}
            item={item}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default PreBuildSection;