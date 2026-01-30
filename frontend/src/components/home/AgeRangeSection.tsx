
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ageRangeService } from '../admin/services/ageRangeService';
import { AgeRange } from '../admin/types/ageRange';
import { getImageUrl } from '../utils/imageUtils';


import { ToyTheme } from '../../theme/designTokens';

const AgeRangeSection: React.FC = () => {
    const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgeRanges = async () => {
            try {
                const response = await ageRangeService.getFeaturedAgeRanges();
                if (response.success) {
                    setAgeRanges(response.ageRanges);
                }
            } catch (error) {
                console.error("Failed to fetch featured age ranges", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgeRanges();
    }, []);

    if (loading) return null; // Or a skeleton loader
    if (ageRanges.length === 0) return null;

    return (
        <section className={`py-12 ${ToyTheme.colors.background.page}`}>
            <div className={ToyTheme.layout.container}>
                <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-3xl md:text-4xl font-black ${ToyTheme.colors.text.heading} tracking-tight`}>
                        <span className="relative inline-block">
                            Shop by Age
                            <svg className="absolute -bottom-2 right-0 w-full h-3 text-yellow-300 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h2>
                    <Link to="/products" className={`text-purple-600 hover:text-purple-700 font-bold text-lg flex items-center gap-1 ${ToyTheme.animations.hoverScale}`}>
                        View All <span aria-hidden="true" className="text-2xl">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {ageRanges.map((range, index) => {
                        const bgColors = [
                            'bg-sky-100', 'bg-purple-100', 'bg-pink-100', 'bg-green-100', 'bg-yellow-100'
                        ];
                        const bgClass = bgColors[index % bgColors.length];

                        return (
                            <Link
                                key={range._id}
                                to={`/products?ageRange=${range.slug}`}
                                className={`group block relative overflow-hidden ${ToyTheme.shapes.card} ${bgClass} ${ToyTheme.shadows.soft} ${ToyTheme.animations.hoverScale} ring-4 ring-white`}
                            >
                                <div className="aspect-[4/3] overflow-hidden relative m-3 rounded-2xl bg-white/50">
                                    {range.image?.url ? (
                                        <img
                                            src={getImageUrl(range.image)}
                                            alt={range.image.altText || range.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-4 pt-1 text-center">
                                    <h3 className={`text-lg font-extrabold ${ToyTheme.colors.text.heading}`}>{range.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium">{range.displayLabel}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default AgeRangeSection;
