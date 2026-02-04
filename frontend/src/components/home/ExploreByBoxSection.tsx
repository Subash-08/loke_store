import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Sparkles,
    ArrowRight,
    Image as ImageIcon
} from 'lucide-react';
import { categoryAPI } from '../admin/services/categoryAPI';
import { baseURL } from '../config/config';

import bg1 from '../../assets/cat-bg1.png';
import bg2 from '../../assets/cat-bg2.png';
import bg3 from '../../assets/cat-bg3.png';
// Define the shape of a Category from the DB
interface Category {
    _id: string;
    name: string;
    slug: string;
    image?: any;
    isFeatured?: boolean;
    order?: number;
    items?: string;
}

// Define the style properties we want to assign
interface CategoryStyle {
    color: string;
    bgColor: string;
}

const colorSchemes: CategoryStyle[] = [
    { color: "from-pink-400 to-rose-300", bgColor: "bg-rose-50" },
    { color: "from-sky-400 to-blue-300", bgColor: "bg-sky-50" },
    { color: "from-violet-400 to-purple-300", bgColor: "bg-violet-50" },
    { color: "from-amber-400 to-orange-300", bgColor: "bg-amber-50" },
    { color: "from-emerald-400 to-teal-300", bgColor: "bg-emerald-50" },
    { color: "from-cyan-400 to-teal-300", bgColor: "bg-cyan-50" },
    { color: "from-indigo-400 to-blue-300", bgColor: "bg-indigo-50" },
];

interface CategoryBubbleProps {
    category: Category;
    style: CategoryStyle;
    index: number;
    getImageUrl: (url: any) => string;
}

const CategoryBubble: React.FC<CategoryBubbleProps> = ({ category, style, index, getImageUrl }) => {
    const [isHovered, setIsHovered] = useState(false);
    const imageUrl = getImageUrl(category.image);

    return (
        <Link to={`products/category/${category.slug}`} className="block">
            <div
                className="group cursor-pointer flex flex-col items-center gap-4 relative transition-all duration-400 hover:-translate-y-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
                {/* Sparkle Effect */}
                <div className={`absolute -top-2 -right-2 transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                    <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                </div>

                <div className="relative">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${style.color} opacity-10 group-hover:opacity-20 blur-xl transition-opacity duration-500 scale-150`}></div>

                    {/* Rotating Dashed Border */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 group-hover:border-gray-300 scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ animation: isHovered ? 'spin 10s linear infinite' : 'none' }}></div>

                    {/* Main Circle with Gradient Border */}
                    <div className="relative z-10 flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg shadow-gray-200/50 group-hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                        {/* Gradient Border Technique */}
                        <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-gray-200 to-gray-100 group-hover:bg-gradient-to-br group-hover:from-teal-200 group-hover:via-pink-200 group-hover:to-orange-200 transition-all duration-500">
                            <div className={`w-full h-full rounded-full ${style.bgColor} flex items-center justify-center overflow-hidden relative`}>
                                {/* Inner gradient on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                {/* Icon / Image with rotation */}
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={category.name}
                                        className="w-18 h-18 md:w-22 md:h-22 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 mix-blend-multiply"
                                    />
                                ) : (
                                    <ImageIcon
                                        size={32}
                                        strokeWidth={1.5}
                                        className="text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Item Count Badge - Mocking items count or using real if available */}
                    {/* <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br ${style.color} text-white text-xs font-bold flex items-center justify-center shadow-md transform transition-all duration-300 ${isHovered ? 'scale-100' : 'scale-0'}`}>
                        {Math.floor(Math.random() * 50) + 10}+
                    </div> */}
                </div>

                {/* Label with hint */}
                <div className="text-center">
                    <span className="font-bold text-gray-700 text-sm md:text-base tracking-wide group-hover:text-gray-900 transition-colors block font-fredoka">
                        {category.name}
                    </span>
                    <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 block mt-1">
                        Explore →
                    </span>
                </div>
            </div>
        </Link>
    );
};

const ExploreByBoxSection: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const getImageUrl = (url: any) => {
        if (!url) return "";
        const value = typeof url === "string" ? url : url.url;
        if (!value) return "";
        if (value.startsWith("http")) return value;
        const prefix = baseURL;
        return `${prefix}${value.startsWith("/") ? value : "/" + value}`;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryAPI.getPublicShowcaseCategories();
                let fetchedCategories: Category[] = response.categories || response.data || [];

                // Sorting logic (Featured -> Order -> Alpha)
                fetchedCategories.sort((a, b) => {
                    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
                    const orderA = a.order && a.order > 0 ? a.order : 999999;
                    const orderB = b.order && b.order > 0 ? b.order : 999999;
                    if (orderA !== orderB) return orderA - orderB;
                    return a.name.localeCompare(b.name);
                });

                setCategories(fetchedCategories.slice(0, 12));
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <section className="py-4 md:py-8 relative overflow-hidden ">
                {/* Decorative Blobs */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm mb-4">
                            <Sparkles size={16} className="text-yellow-500" />
                            <span className="text-sm font-medium text-gray-600">Curated Collections</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-fredoka">
                            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-400">Category</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Discover our handpicked selection of premium baby and kids products
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-12">
                        {loading ? (
                            // Loading Skeletons
                            Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                                    <div className="w-24 h-24 rounded-full bg-gray-200"></div>
                                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                                </div>
                            ))
                        ) : (
                            categories.slice(0, 6).map((category, index) => {
                                // Round-robin style assignment
                                const style = colorSchemes[index % colorSchemes.length];
                                return (
                                    <CategoryBubble
                                        key={category._id}
                                        category={category}
                                        style={style}
                                        index={index}
                                        getImageUrl={getImageUrl}
                                    />
                                );
                            })
                        )}
                    </div>

                    <PromoBannersSection bg1={bg1} bg2={bg2} bg3={bg3} />

                    {/* CTA */}
                    {/* <div className=" text-center">
                        <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 hover:-translate-y-1">
                            <span>View All Categories</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div> */}
                </div>
            </section>
        </>
    );
};

const PromoBannersSection = ({ bg1, bg2, bg3 }: { bg1: string; bg2: string; bg3: string }) => {
    return (
        <section className="py-4 pt-12" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Promo Cards Grid 
                    Changed 'md:grid-cols-3' to 'min-[1000px]:grid-cols-3'
                    This forces 1 column until the screen is at least 1000px wide.
                */}
                <div className="grid grid-cols-1 min-[1000px]:grid-cols-3 gap-8 mb-16">

                    {/* Card 1 - Wood Toys (Beige) */}
                    <div className="bg-[#EAD8CE] rounded-xl p-10 h-[380px] min-[1000px]:h-[480px] relative overflow-hidden flex flex-col justify-end group transition-all hover:-translate-y-2 duration-300 shadow-sm">
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <img
                                src={bg1}
                                alt="Wood Toys"
                                className="w-full h-full object-cover opacity-90 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative z-10 mt-auto">
                            <h3 className="font-bold text-4xl text-gray-900 leading-[1.15] mb-3 tracking-tight">
                                Wood toys <br /> for your kids
                            </h3>
                            <p className="text-gray-700 text-base mb-4 font-medium">Get 20% flat your first purchase</p>
                            <button className="bg-[#1a1a1a] text-white text-[11px] tracking-wider font-bold py-4 px-8 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors w-fit shadow-lg">
                                SHOP NOW <ArrowRight size={16} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    {/* Card 2 - Black Friday (Lavender) */}
                    <div className="bg-[#DADAF5] rounded-xl p-10 h-[380px] min-[1000px]:h-[480px] relative overflow-hidden flex flex-col justify-end group transition-all hover:-translate-y-2 duration-300 shadow-sm">
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <img
                                src={bg2}
                                alt="Specials"
                                className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative z-10 mt-auto">
                            <h3 className="font-bold text-4xl text-gray-900 leading-[1.15] mb-3 tracking-tight">
                                Early black <br /> friday specials
                            </h3>
                            <p className="text-gray-700 text-base mb-4 font-medium">Big discount 50% off on all order</p>
                            <button className="bg-[#1a1a1a] text-white text-[11px] tracking-wider font-bold py-4 px-8 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors w-fit shadow-lg">
                                SHOP NOW <ArrowRight size={16} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    {/* Card 3 - Best Thing (Green) */}
                    <div className="bg-[#A7D7C5] rounded-xl p-10 h-[380px] min-[1000px]:h-[480px] relative overflow-hidden flex flex-col justify-end group transition-all hover:-translate-y-2 duration-300 shadow-sm">
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <img
                                src={bg3}
                                alt="Clothes"
                                className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative z-10 mt-auto">
                            <h3 className="font-bold text-4xl text-gray-900 leading-[1.15] mb-3 tracking-tight">
                                The best <br /> thing for kids
                            </h3>
                            <p className="text-gray-700 text-base mb-4 font-medium">Special offer gift voucher</p>
                            <button className="bg-[#1a1a1a] text-white text-[11px] tracking-wider font-bold py-4 px-8 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors w-fit shadow-lg">
                                SHOP NOW <ArrowRight size={16} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Deal Strip 
                    Updated breakpoints here as well to match the 1000px requirement for consistency 
                */}
                {/* <div className="flex flex-col min-[1000px]:flex-row items-center justify-center gap-6 text-center ">
                    <div className="hidden min-[1000px]:block">
                        <RainbowIcon className="w-12 h-12" />
                    </div>

                    <p className="font-bold text-lg min-[1000px]:text-xl text-gray-800 tracking-tight">
                        Greatest prices and deals
                        <span className="text-[#E76F51] mx-2 underline decoration-[#E76F51] decoration-wavy decoration-2 underline-offset-4">
                            save 20%off
                        </span>
                        baby and kids wears.
                    </p>

                    <div className="min-[1000px]:block">
                        <RainbowIcon className="w-12 h-12" />
                    </div>
                </div> */}

            </div>
        </section>
    );
};
const RainbowIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 17a10 10 0 0 0-20 0" />
        <path d="M6 17a6 6 0 0 1 12 0" />
        <path d="M10 17a2 2 0 0 1 4 0" />
        <path d="M2 17h20" />
        <path d="M2 17c0-3 2-5 5-5" />
        <path d="M17 12c3 0 5 2 5 5" />
        <path d="M7 16l1-2" />
        <path d="M16 16l1-2" />
    </svg>
);

export default ExploreByBoxSection;
