import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Shapes, TreeDeciduous, Heart } from 'lucide-react';
import woodenToysImg from '../../assets/bg-image2.png'; // Using the known wood toys image
import { useNavigate } from 'react-router-dom';
import { ToyTheme, gradients } from '../../theme/designTokens';

// --- Configuration ---
const ASSETS = {
  centerImage: woodenToysImg,
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const floatingAnimation = {
  y: [-10, 10],
  rotateX: [2, -2],
  transition: {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  },
};

const breathingGlow = {
  scale: [1, 1.1, 1],
  opacity: [0.4, 0.7, 0.4],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// --- Sub-components ---

const BackgroundGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Subtle Grid Pattern - adjusted for softer theme */}
    <div
      className="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"
    />
    {/* Subtle top gradient fade */}
    <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-amber-50 to-transparent"></div>
  </div>
);

const FloatingParticle = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: [0, 0.5, 0], y: -100, x: parseInt(x) > 50 ? 50 : -50 }}
    transition={{ duration: 15, repeat: Infinity, delay, ease: "linear" }}
    className={`absolute w-3 h-3 bg-amber-200 rounded-full blur-[2px] opacity-60`}
    style={{ left: x, top: y }}
  />
);

const FeaturePillar = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div variants={itemVariants} className={`flex flex-col items-center text-center space-y-4 p-6 ${ToyTheme.shapes.card} hover:bg-white/60 transition-colors duration-300 group`}>
    <motion.div
      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className={`p-4 rounded-full ${gradients.primary} text-white shadow-lg ring-4 ring-white transition-all`}
    >
      <Icon size={28} strokeWidth={2} />
    </motion.div>
    <h3 className={`text-xl font-black ${ToyTheme.colors.text.heading} tracking-tight`}>{title}</h3>
    <p className={`${ToyTheme.colors.text.body} leading-relaxed`}>{desc}</p>
  </motion.div>
);

// --- Main Component ---
const CustomPCSection = () => {
  const navigate = useNavigate();
  return (
    <section className={`relative w-full flex items-center justify-center overflow-hidden ${ToyTheme.colors.background.page} py-12 md:py-24`}>
      <BackgroundGrid />

      {/* Floating atmospheric particles */}
      <FloatingParticle delay={0} x="10%" y="80%" />
      <FloatingParticle delay={5} x="80%" y="60%" />
      <FloatingParticle delay={2} x="30%" y="90%" />
      <FloatingParticle delay={8} x="60%" y="70%" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >

          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 space-y-2 md:space-y-4">
            <motion.h2
              variants={itemVariants}
              className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter ${ToyTheme.colors.text.heading} leading-[1.1]`}
            >
              Handcrafted <span className={`bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500`}>Wooden Collections</span>
            </motion.h2>
            <motion.p variants={itemVariants} className={`text-base md:text-lg lg:text-xl ${ToyTheme.colors.text.body} font-medium leading-relaxed max-w-2xl mx-auto px-2`}>
              Sustainable, durable, and designed for open-ended play. The perfect start to their imagination.
            </motion.p>
          </div>

          {/* Main Visual Centerpiece (Simulated 3D) */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-4xl mx-auto h-[250px] md:h-[350px] lg:h-[450px] mb-8 md:mb-12 perspective-1000"
          >
            {/* The "Breathing" Glow behind the Items - Warm Amber */}
            <motion.div
              animate={breathingGlow}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[80px] md:blur-[100px] bg-amber-200/40 -z-10`}
            />

            {/* The Image Floating Animation */}
            <motion.div
              animate={floatingAnimation}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={ASSETS.centerImage}
                alt="Wooden Toys Collection"
                className="w-auto h-full object-contain drop-shadow-2xl max-w-[90%]"
                style={{
                  filter: "drop-shadow(0 25px 30px rgb(0 0 0 / 0.1))",
                  imageRendering: "crisp-edges"
                }}
              />
            </motion.div>

            {/* Start Building Button - Absolute positioned below Image */}
            <motion.div
              variants={itemVariants}
              className="absolute -bottom-4 md:-bottom-8 left-1/2 z-20"
              style={{ x: "-50%" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => navigate('/products?category=wood-toys')}
                className={`group relative inline-flex items-center gap-2 px-8 py-4 text-xl font-extrabold text-white ${gradients.primary} ${ToyTheme.shapes.button} overflow-hidden shadow-xl shadow-amber-500/20 transition-all hover:shadow-amber-500/40 ring-4 ring-white`}
              >
                <span className="relative z-10">Explore Collection</span>
                <ChevronRight className="relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={3} />

                {/* Button Glow Overlay */}
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20" />
              </button>
            </motion.div>
          </motion.div>

          {/* Feature Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl px-4 md:px-0 relative mt-8 md:mt-12">
            {/* Glassmorphism background support for pillars */}
            <div className={`absolute inset-0 -z-10 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm`}></div>

            <FeaturePillar
              icon={Shapes}
              title="Endless Creativity"
              desc="Simple shapes that inspire complex worlds and stories."
            />
            <FeaturePillar
              icon={TreeDeciduous}
              title="100% Sustainable"
              desc="Crafted from ethically sourced, natural wood materials."
            />
            <FeaturePillar
              icon={Heart}
              title="Safe & Non-Toxic"
              desc="Smooth finishes and child-safe paints for worry-free play."
            />
          </div>

        </motion.div>
      </div>

      {/* CSS for image visibility */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        /* Ensure image loads properly */
        img {
          max-height: 100%;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .perspective-1000 {
            perspective: none;
          }
        }
      `}</style>
    </section>
  );
};

export default CustomPCSection;