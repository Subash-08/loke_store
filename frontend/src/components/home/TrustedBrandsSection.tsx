import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { FeaturedBrand } from '../admin/types/featuredBrand';
import { featuredBrandService } from '../admin/services/featuredBrandService';
import { getImageUrl } from '../utils/imageUtils';
import { ToyTheme } from '../../theme/designTokens';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const TrustedBrandsSection: React.FC = () => {
  const [brands, setBrands] = useState<FeaturedBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedBrands();
  }, []);

  const fetchFeaturedBrands = async () => {
    try {
      setLoading(true);
      const response = await featuredBrandService.getFeaturedBrandsCount();

      // Only fetch brands if there are any
      if (response.hasBrands) {
        const brandsResponse = await featuredBrandService.getFeaturedBrands();
        setBrands(brandsResponse.data);
      } else {
        setBrands([]);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load brands');
      console.error('Error loading featured brands:', err);
    } finally {
      setLoading(false);
    }
  };

  // Don't show the section if there are no brands or if loading
  if (loading) {
    return null; // You could return a loading skeleton here if desired
  }

  if (brands.length === 0 || error) {
    return null; // Don't show section if no brands or error
  }

  // Calculate grid columns based on number of brands
  const getGridColumns = () => {
    if (brands.length === 1) return 'grid-cols-1';
    if (brands.length === 2) return 'grid-cols-2';
    if (brands.length === 3) return 'grid-cols-3';
    if (brands.length === 4) return 'grid-cols-2 md:grid-cols-4';
    if (brands.length <= 6) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
  };

  const handleBrandClick = async (brandId: string, websiteUrl?: string) => {
    try {

      // Open website URL if available
      if (websiteUrl) {
        window.open(websiteUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.error('Error tracking brand click:', err);
    }
  };

  return (
    <section className={`w-full py-4 md:py-8 border-t border-purple-100 ${ToyTheme.colors.background.page}`}>
      <div className={ToyTheme.layout.container}>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black ${ToyTheme.colors.text.heading} tracking-tight mb-4`}
          >
            TRUSTED <span className="text-purple-400">PARTNERS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className={`${ToyTheme.colors.text.body} font-medium text-base sm:text-lg leading-relaxed`}
          >
            We work with the best toy and tech makers to bring you safe and fun products.
          </motion.p>
        </div>

        {/* Brand Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={`grid ${getGridColumns()} gap-4 md:gap-6`}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBrandClick(brand._id, brand.websiteUrl)}
              className={`group relative h-28 sm:h-32 md:h-40 bg-white border-2 border-transparent hover:border-purple-200 ${ToyTheme.shapes.card} flex items-center justify-center p-4 sm:p-6 md:p-8 cursor-pointer transition-all duration-300 ${ToyTheme.shadows.soft} hover:shadow-xl`}
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

              {/* Logo Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {brand.logo?.url ? (
                  <img
                    src={getImageUrl(brand.logo.url)}
                    alt={brand.logo.altText || `${brand.name} logo`}
                    className="w-full h-full object-contain opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 filter"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to brand name if logo fails to load
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
                      if (fallback) {
                        (fallback as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : (
                  <div className="logo-fallback w-full h-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-400 group-hover:text-purple-600 transition-colors text-center">
                      {brand.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Brand Accent Indicator */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <BadgeCheck className="w-5 h-5 text-purple-400 fill-purple-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm border border-purple-100">
            <p className="text-xs font-bold tracking-[0.1em] text-purple-300 uppercase">
              Official Retail Partner
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBrandsSection;