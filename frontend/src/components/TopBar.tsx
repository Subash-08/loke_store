import React, { useState } from 'react';

const promoMessages = [
    { text: '🚚 Free Shipping on orders above ₹500!', highlight: 'Free Shipping' },
    { text: '🎁 New Arrivals Every Week — Explore Now!', highlight: 'New Arrivals' },
    { text: '⭐ 100% Safe & Non-Toxic Toys for Kids', highlight: 'Safe & Non-Toxic' },
    { text: '🧸 Best Toy Store in Salem — Visit Us Today!', highlight: 'Best Toy Store' },
];

const TopBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    // Duplicate messages for seamless infinite scroll
    const duplicatedMessages = [...promoMessages, ...promoMessages];

    return (
        <div className="relative bg-gradient-to-r from-[#2c2358] to-[#2c2358] text-white overflow-hidden z-50">
            {/* Animated marquee */}
            <div className="flex items-center h-9">
                <div className="flex animate-marquee whitespace-nowrap">
                    {duplicatedMessages.map((msg, index) => (
                        <span key={index} className="inline-flex items-center mx-8 text-[13px] font-medium tracking-wide">
                            <span>{msg.text}</span>
                            <span className="mx-6 text-yellow-400/60">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Close button */}
            {/* <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Close promotional bar"
            >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button> */}

            {/* Edge fade effects */}
            {/* <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#2c2358] to-transparent pointer-events-none" />
            <div className="absolute right-8 top-0 bottom-0 w-12 bg-gradient-to-l from-[#544D89] to-transparent pointer-events-none" /> */}

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};

export default TopBar;
