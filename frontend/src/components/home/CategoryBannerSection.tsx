import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ToyTheme } from '../../theme/designTokens';

// Placeholder imports 
import creativeToysImg from '../../assets/10021.png';
import puzzlesImg from '../../assets/10022.png';
import pushPullImg from '../../assets/10023.png';

interface BannerItem {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    bgColor: string;
    link: string;
    textColor: string;
}

const banners: BannerItem[] = [
    {
        id: 'creative',
        title: 'CREATIVE TOYS',
        subtitle: 'Inspire Young Imaginations',
        image: creativeToysImg,
        bgColor: '#E9F5E5', // Matches the light green in reference
        link: '/category/creative-toys',
        textColor: 'text-slate-800',
    },
    {
        id: 'puzzles',
        title: 'PUZZLES',
        subtitle: 'Think, Solve, Play!',
        image: puzzlesImg,
        bgColor: '#FAEBE6', // Matches the peach/pink in reference
        link: '/category/puzzles',
        textColor: 'text-slate-800',
    },
    {
        id: 'push-pull',
        title: 'PUSH & PULL TOYS',
        subtitle: 'Move, Explore, Grow!',
        image: pushPullImg,
        bgColor: '#EAF2FB', // Matches the light blue in reference
        link: '/category/push-pull',
        textColor: 'text-slate-800',
    }
];

const CategoryBannerSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className={`w-full py-6 md:py-10 ${ToyTheme.layout.container}`}>

            {/* Attractive Section Heading - Optional, remove if not needed */}
            <div className="text-center mb-6 md:mb-10 px-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
                    Discover <span className="text-blue-600">Learning Through Play</span>
                </h2>
                <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
                    Explore our curated collection of educational toys designed to spark creativity,
                    challenge minds, and support developmental growth at every stage.
                </p>
            </div>

            {/* Grid container - 1 column below 1024px, 3 columns above */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 px-4 md:px-0">
                {banners.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 zoom_hov"
                        style={{
                            // Responsive aspect ratio: taller on mobile, wider on desktop
                            aspectRatio: 'var(--banner-aspect-ratio)',
                        }}
                    >
                        <a
                            href={item.link}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(item.link);
                            }}
                            className="block w-full h-full"
                        >
                            {/* Background image container */}
                            <div
                                className="w-full h-full bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    backgroundColor: item.bgColor,
                                }}
                            >
                                {/* Text wrapper - right aligned */}
                                <div className="w-full h-full flex flex-col justify-center items-end p-4 md:p-6 lg:p-8">
                                    {/* Text container */}
                                    <div className="text-right max-w-[80%] md:max-w-[75%] lg:max-w-[70%]">
                                        {/* Title */}
                                        <h2
                                            className="font-bold uppercase tracking-wide mb-1 lg:mb-2"
                                            style={{
                                                margin: '4px 0',
                                                fontSize: 'clamp(15px, 3.5vw, 18px)',
                                                color: '#333',
                                                lineHeight: '1.2',
                                            }}
                                        >
                                            {item.title}
                                        </h2>

                                        {/* Subtitle */}
                                        <p
                                            className="mb-2 md:mb-3 lg:mb-4"
                                            style={{
                                                fontSize: 'clamp(12px, 2.2vw, 14px)',
                                                color: '#666',
                                                fontWeight: '500',
                                                lineHeight: '1.3',
                                            }}
                                        >
                                            {item.subtitle}
                                        </p>

                                        {/* Button - Reduced size */}
                                        <button
                                            className="bg-white text-slate-900 font-semibold uppercase tracking-wider rounded-full 
                                                px-3 py-1.5 md:px-3.5 md:py-2 lg:px-4 lg:py-2
                                                text-xs md:text-xs lg:text-sm
                                                hover:bg-slate-800 hover:text-white 
                                                transition-all duration-300 hover:scale-[1.03]
                                                shadow-sm border border-gray-200"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                navigate(item.link);
                                            }}
                                        >
                                            SHOP NOW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                ))}
            </div>

            {/* Responsive CSS for different breakpoints */}
            <style jsx>{`
                .zoom_hov {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .zoom_hov:hover {
                    transform: scale(1.02);
                }
                
                /* Set CSS custom property for aspect ratio */
                .zoom_hov {
                    --banner-aspect-ratio: 1.6 / 1;
                }
                
                /* Mobile (below 640px) */
                @media (max-width: 639px) {
                    .zoom_hov {
                        --banner-aspect-ratio: 1.4 / 1;
                    }
                    .grid-cols-1 {
                        gap: 16px;
                    }
                }
                
                /* Tablet (640px - 1023px) */
                @media (min-width: 640px) and (max-width: 1023px) {
                    .zoom_hov {
                        --banner-aspect-ratio: 1.8 / 1;
                    }
                    .grid-cols-1 {
                        gap: 20px;
                    }
                }
                
                /* Desktop (1024px and above) */
                @media (min-width: 1024px) {
                    .zoom_hov {
                        --banner-aspect-ratio: 2 / 1;
                    }
                    .lg\:grid-cols-3 {
                        gap: 20px;
                    }
                }
                
                /* Large desktop */
                @media (min-width: 1280px) {
                    .zoom_hov {
                        --banner-aspect-ratio: 2.2 / 1;
                    }
                }
            `}</style>
        </section>
    );
};

export default CategoryBannerSection;