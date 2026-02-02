import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ageRangeService } from '../admin/services/ageRangeService';
import { AgeRange } from '../admin/types/ageRange';
import { ToyTheme } from '../../theme/designTokens';
import { baseURL } from '../config/config';

// Reusing FadeImage for consistent loading effect
const FadeImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    if (!src || error) return <div className={`flex items-center justify-center bg-white/20 ${className}`} />;

    return (
        <div className={`relative ${className}`}>
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className={`w-full h-full object-contain transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
            />
        </div>
    );
};

const FetchAgeRangeHome: React.FC = () => {
    const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
    const [loading, setLoading] = useState(true);

    const colors = [
        { bg: 'bg-[#F48221]', text: 'text-white', footerBg: 'bg-[#FFF0E0]', footerText: 'text-[#F48221]' }, // Orange
        { bg: 'bg-[#F26444]', text: 'text-white', footerBg: 'bg-[#FFEBE6]', footerText: 'text-[#F26444]' }, // Red-Orange
        { bg: 'bg-[#FDC345]', text: 'text-white', footerBg: 'bg-[#FFF9E6]', footerText: 'text-[#FDC345]' }, // Yellow
        { bg: 'bg-[#8BC46E]', text: 'text-white', footerBg: 'bg-[#EDF7E8]', footerText: 'text-[#8BC46E]' }, // Green
        { bg: 'bg-[#3EB18E]', text: 'text-white', footerBg: 'bg-[#E0F5EF]', footerText: 'text-[#3EB18E]' }, // Teal
        { bg: 'bg-[#F48221]', text: 'text-white', footerBg: 'bg-[#FFF0E0]', footerText: 'text-[#F48221]' }, // Repeat or new color
    ];

    const getImageUrl = (image: any) => {
        if (!image) return null;
        const url = typeof image === 'string' ? image : image.url;
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `${baseURL}${url.startsWith('/') ? url : '/' + url}`;
    };

    useEffect(() => {
        const fetchAgeRanges = async () => {
            try {
                setLoading(true);
                const data = await ageRangeService.getAgeRanges();

                // Sort by order and take first 5-6
                let ranges = data.ageRanges || [];
                ranges.sort((a: AgeRange, b: AgeRange) => (a.order || 0) - (b.order || 0));
                setAgeRanges(ranges);
            } catch (error) {
                console.error("Failed to fetch age ranges", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgeRanges();
    }, []);

    if (loading) return null;
    if (ageRanges.length === 0) return null;

    return (
        <section className="py-12 bg-orange-50/30">
            <div className={ToyTheme.layout.container}>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-black text-[#1F2937] tracking-tight">Shop by age</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {ageRanges.slice(0, 5).map((range, index) => {
                        const colorTheme = colors[index % colors.length];
                        const displayAge = range.displayLabel || `${range.startAge} - ${range.endAge}`;

                        return (
                            <Link
                                to={`/products?ageRange=${range.slug}`}
                                key={range._id}
                                className={`group relative flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                            >
                                {/* Top colored section */}
                                <div className={`${colorTheme.bg} flex-1 p-4 flex flex-col items-center justify-between min-h-[220px]`}>
                                    <h3 className="text-3xl font-black text-white mt-2 drop-shadow-md">
                                        {displayAge}
                                    </h3>

                                    <div className="flex-1 w-full flex items-center justify-center p-2">
                                        <FadeImage
                                            src={getImageUrl(range.image) || ''}
                                            alt={range.name}
                                            className="w-28 h-28 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Bottom footer section */}
                                <div className={`${colorTheme.footerBg} p-3 border-t border-black/5`}>
                                    <div className="font-bold text-gray-800 text-lg leading-tight">
                                        {displayAge}
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium">
                                        {range.productCount || 0} items
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FetchAgeRangeHome;
