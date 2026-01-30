import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/axiosConfig';
import { baseURL } from '../config/config';
import { brandService } from '../admin/services/brandService';
import { categoryAPI } from '../admin/services/categoryAPI';
import { ToyTheme } from '../../theme/designTokens';

// --- Icons --- //
const BoxIcon = () => (
  <svg className="w-8 h-8 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-8 h-8 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// ---- TYPES ---- //
interface BrandLogo {
  url: string | null;
  altText: string | null;
  publicId: string | null;
}

interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo: BrandLogo;
  isFeatured?: boolean;
  order?: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: any;
  // Added fields for sorting
  isFeatured?: boolean;
  order?: number;
}

// ---- UTILITY COMPONENTS ---- //
const FadeImage = ({ src, alt, className, fallback }: any) => {
  const [isLoaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error)
    return <div className={`flex items-center justify-center ${className}`}>{fallback}</div>;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-contain transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
          }`}
      />
    </div>
  );
};

const SectionHeader = ({ title, subtitle, titleColor = "text-purple-600" }: { title: string; subtitle: string, titleColor?: string }) => (
  <div className="text-center mb-16 space-y-4">
    <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${ToyTheme.colors.text.heading}`}>
      {title}
    </h2>
    <p className={`${ToyTheme.colors.text.body} text-lg max-w-2xl mx-auto font-medium`}>{subtitle}</p>
  </div>
);

// ---- MAIN COMPONENT ---- //
const HomePage: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getImageUrl = (url: any) => {
    if (!url) return "";
    const value = typeof url === "string" ? url : url.url;
    if (!value) return "";
    if (value.startsWith("http")) return value;
    const prefix = baseURL;
    return `${prefix}${value.startsWith("/") ? value : "/" + value}`;
  };

  const fetchHomepageData = async () => {
    try {
      setLoading(true);

      const [brandsRes, categoriesRes] = await Promise.all([
        brandService.getPublicShowcaseBrands(),
        categoryAPI.getPublicShowcaseCategories(),
      ]);

      // --- 1. PROCESS BRANDS ---
      let fetchedBrands: Brand[] = brandsRes.brands || [];

      fetchedBrands.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        const orderA = a.order && a.order > 0 ? a.order : 999999;
        const orderB = b.order && b.order > 0 ? b.order : 999999;
        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name);
      });

      setBrands(fetchedBrands.slice(0, 12));

      // --- 2. PROCESS CATEGORIES ---
      let fetchedCategories: Category[] = categoriesRes.categories || categoriesRes.data || [];

      fetchedCategories.sort((a, b) => {
        // Priority: Featured
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;

        // Priority: Order (Treat 0 as last)
        const orderA = a.order && a.order > 0 ? a.order : 999999;
        const orderB = b.order && b.order > 0 ? b.order : 999999;

        if (orderA !== orderB) return orderA - orderB;

        // Priority: Alphabetical
        return a.name.localeCompare(b.name);
      });

      setCategories(fetchedCategories.slice(0, 12));

    } catch (err: any) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHomepageData(); }, []);

  // ---- Loading ---- //
  if (loading) {
    return (
      <div className={`min-h-[200px] flex items-center justify-center ${ToyTheme.colors.background.page}`}>
        <div className="w-14 h-14 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ---- Error ---- //
  if (error) {
    return null; // Fail silently rather than showing ugly error on home
  }

  return (
    <div className={`${ToyTheme.colors.background.page} mb-16`}>

      {/* CATEGORIES SECTION */}
      {categories.length > 0 && (
        <section className="py-4">
          <div className={ToyTheme.layout.container}>

            <SectionHeader
              title="Explore by Box"
              subtitle="Find exactly what you need in our magical toy boxes!"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((cat, idx) => {
                const colors = [
                  'bg-yellow-100 hover:bg-yellow-200 border-yellow-200',
                  'bg-pink-100 hover:bg-pink-200 border-pink-200',
                  'bg-sky-100 hover:bg-sky-200 border-sky-200',
                  'bg-purple-100 hover:bg-purple-200 border-purple-200',
                  'bg-green-100 hover:bg-green-200 border-green-200',
                  'bg-orange-100 hover:bg-orange-200 border-orange-200',
                ];
                const colorClass = colors[idx % colors.length];

                return (
                  <Link
                    key={cat._id}
                    to={`/products/category/${cat.slug}`}
                    className={`group flex flex-col items-center justify-center p-6 ${colorClass} ${ToyTheme.shapes.card} border-2 transition-all duration-300 ${ToyTheme.animations.hoverScale} ${ToyTheme.shadows.soft}`}
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <FadeImage
                      src={getImageUrl(cat.image)}
                      alt={cat.name}
                      className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                      fallback={<BoxIcon />}
                    />
                    <h3 className={`mt-4 text-sm font-black ${ToyTheme.colors.text.heading} uppercase tracking-wide text-center`}>
                      {cat.name}
                    </h3>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ============================== */}
      {/* FEATURED BRANDS SECTION   */}
      {/* ============================== */}

      {brands.length > 0 && (
        <section className={`py-24 ${ToyTheme.colors.background.page} border-t border-purple-100`}>
          <div className={ToyTheme.layout.container}>

            <SectionHeader
              title="Famous Friends"
              subtitle="We play with the best brands in the world."
              titleColor="text-pink-500"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {brands.map((brand, idx) => (
                <Link
                  key={brand._id}
                  to={`/products/brand/${brand.slug}`}
                  className={`group flex items-center justify-center w-full h-32 bg-white border-2 border-transparent hover:border-pink-200 ${ToyTheme.shapes.card} ${ToyTheme.shadows.soft} hover:shadow-xl transition-all duration-300 p-4`}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <FadeImage
                    src={getImageUrl(brand.logo)}
                    alt={brand.name}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 grayscale group-hover:grayscale-0"
                    fallback={<BuildingIcon />}
                  />
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;