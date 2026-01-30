import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ytVideoService } from "../admin/services/ytVideoService";
import { YTVideoItem } from "../admin/types/ytVideo";
import { ToyTheme } from "../../theme/designTokens";

const NextArrow = ({ onClick, className, style }: any) => (
  <div
    className={`${className} !bg-purple-600 !rounded-full !w-12 !h-12 md:!w-14 md:!h-14 !flex !items-center !justify-center !right-[-15px] md:!right-[-40px] z-10 hover:!bg-purple-500 transition-colors shadow-xl`}
    style={{ ...style }}
    onClick={onClick}
  />
);

const PrevArrow = ({ onClick, className, style }: any) => (
  <div
    className={`${className} !bg-purple-600 !rounded-full !w-12 !h-12 md:!w-14 md:!h-14 !flex !items-center !justify-center !left-[-15px] md:!left-[-40px] z-10 hover:!bg-purple-500 transition-colors shadow-xl`}
    style={{ ...style }}
    onClick={onClick}
  />
);

const YTVideoSection = () => {
  const [videos, setVideos] = useState<YTVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await ytVideoService.getVideos();
        setVideos(response.data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const settings = {
    dots: true,
    infinite: videos.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '0px',
          arrows: false
        }
      }
    ],
  };

  if (loading) return null;
  if (videos.length === 0) return null;

  return (
    <section className={`py-4 md:py-8 ${ToyTheme.colors.background.page} overflow-hidden border-t border-purple-100`}>

      {/* Equal Height Hack for Slick Carousel */}
      <style>{`
        .slick-track { display: flex !important; gap: 0px; }
        .slick-slide { height: inherit !important; display: flex !important; justify-content: center; }
        .slick-slide > div { height: 100%; width: 100%; }
        /* Fix dots position on mobile */
        .slick-dots { bottom: -40px !important; }
        .slick-dots li button:before { font-size: 12px !important; color: #d8b4fe !important; opacity: 1; }
        .slick-dots li.slick-active button:before { color: #9333ea !important; }
      `}</style>

      <div className={ToyTheme.layout.container}>

        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`text-3xl sm:text-4xl md:text-6xl font-black ${ToyTheme.colors.text.heading} tracking-tight mb-4 md:mb-6 uppercase`}
          >
            Watch & <span className="text-purple-500">Play</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className={`${ToyTheme.colors.text.body} font-medium text-lg sm:text-xl md:text-2xl leading-relaxed`}
          >
            See our toys in action! Detailed reviews and fun showcases.
          </motion.p>
        </div>

        {/* Removed extra padding on mobile wrapper to maximize width */}
        <div className="px-0 md:px-12 mb-12">
          <Slider {...settings} className="sm:-mx-5">
            {videos.map((video) => (
              <div key={video._id} className="px-1 sm:px-5 pb-4 pt-2 h-full">
                <div
                  onClick={() => setSelectedVideo(video.videoId)}
                  className={`group bg-white ${ToyTheme.shapes.card} p-3 md:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full flex flex-col border-2 border-transparent hover:border-purple-200`}
                >
                  <div className={`relative aspect-[4/3] md:aspect-video ${ToyTheme.shapes.card} overflow-hidden bg-purple-100 shadow-inner flex-shrink-0`}>
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                      <div className="w-16 h-12 md:w-20 md:h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/30">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 flex-grow px-1 md:px-2 flex flex-col justify-start">
                    <h3 className={`font-black text-lg md:text-xl leading-snug line-clamp-2 ${ToyTheme.colors.text.heading} group-hover:text-purple-600 transition-colors tracking-tight`}>
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-red-500 transition-colors z-50 p-2 bg-black/50 rounded-full"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-7xl aspect-video bg-black rounded-xl md:rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                title="YouTube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default YTVideoSection;