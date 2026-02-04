import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import {
  ChevronRight,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  Gift,
  Smile,
  Star,
  Heart
} from 'lucide-react';
import { BRAND } from './constants';
import { useNavigate } from 'react-router-dom';

// New colorful background or toy background
// Using a placeholder or generic bright color if image not available
// We will use a fun gradient instead of the dark tech image for now

const MainContent: React.FC = () => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full bg-rose-50 selection:bg-yellow-400 selection:text-black">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-sky-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2670&auto=format&fit=crop"
            alt="Happy Kids Playing"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-yellow-300 uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                Salem's Favorite Toy Store
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-[80px] font-black tracking-tight text-white leading-[0.95] mb-8"
            >
              Where fun<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                comes to life.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-2xl text-purple-100 font-medium leading-relaxed mb-12 max-w-xl"
            >
              From classic wooden toys to the latest educational games, {BRAND.name} is your partner in creating magical childhood memories.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <a
                href="#who-we-are"
                className="group relative px-8 py-4 bg-yellow-400 text-purple-900 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] flex items-center gap-3 overflow-hidden"
              >
                <span className="relative z-10">OUR STORY</span>
                <ChevronRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((id) => (
                    <div key={id} className="w-10 h-10 rounded-full border-2 border-purple-900 overflow-hidden relative z-0 hover:z-10 transition-all hover:scale-110">
                      <img src={`https://i.pravatar.cc/100?u=kid${id}`} className="w-full h-full object-cover" alt="Happy Parent" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">5k+ Families</span>
                  <span className="text-purple-200 text-xs">Shop with us</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- WHO WE ARE --- */}
      <section id="who-we-are" className="py-24 md:py-32 max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-100/50 rounded-full blur-3xl -z-10" />

            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-900/10 border border-slate-100 transform rotate-2 hover:rotate-0 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2670&auto=format&fit=crop"
                alt="Child playing with toys"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900"
            >
              Play is not just fun, <span className="text-purple-600">it's learning.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-lg text-slate-600 font-light leading-relaxed"
            >
              <p>
                Founded in Salem, <strong className="text-slate-900 font-semibold border-b-2 border-yellow-400">{BRAND.name}</strong> started with a simple mission: to bring high-quality, safe, and imaginative toys to our community.
              </p>
              <p>
                We carefully curate every item on our shelves. From developmental toys for toddlers to challenging puzzles for teens, we ensure every product meets our strict safety standards and "fun factor."
              </p>
            </motion.div>

            <div className="pt-8 border-t border-slate-100 flex gap-16">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-slate-900">100%</span>
                <span className="text-sm font-medium text-slate-400 uppercase tracking-wider mt-1">Safe & Non-Toxic</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-slate-900">1000+</span>
                <span className="text-sm font-medium text-slate-400 uppercase tracking-wider mt-1">Unique Toys</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OFFERINGS --- */}
      <section id="offerings" className="py-32 bg-yellow-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#eab308 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 max-w-2xl">
            <span className="text-purple-600 font-bold tracking-widest text-xs uppercase mb-4 block">Our Collections</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Something for every dreamer.</h2>
            <p className="text-xl text-slate-500 font-light">We stock the widest range of categories to spark creativity in every child.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Smile />, title: "Toddler & Baby", desc: "Safe, developmental toys for the little ones." },
              { icon: <Star />, title: "Action & Adventure", desc: "Superheroes, vehicles, and outdoor fun." },
              { icon: <Heart />, title: "Dolls & Plush", desc: "Soft friends and imaginative play sets." },
              { icon: <Gift />, title: "Arts & Crafts", desc: "Kits to unleash their inner artist." },
              { icon: <Smile />, title: "Board Games", desc: "Fun for the whole family game night." },
              { icon: <Star />, title: "STEM & Learning", desc: "Science kits and educational puzzles." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white p-8 lg:p-10 rounded-[2rem] border border-yellow-100 shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-8 
                  group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300"
                >
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STORE PRESENCE --- */}
      {/* <section id="store" className="py-12 max-w-7xl mx-auto px-6">
        <div className="relative group rounded-[2.5rem] overflow-hidden bg-purple-900 text-white min-h-[500px] flex items-center">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-900 via-purple-900/80 to-transparent" />

          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2574&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-60 transition-transform duration-[1.5s] group-hover:scale-110"
              alt="Loke Store Interior"
            />
          </div>

          <div className="relative z-20 p-6 md:p-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              Store Open
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Visit our Wonderland.</h2>

            <div className="space-y-8 text-purple-100 font-light mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-yellow-400 mt-1 shrink-0" />
                <p className="text-xl text-white">Loke Store, Salem, Tamil Nadu, India</p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <div className="text-purple-300 text-xs font-bold uppercase tracking-widest mb-2">Working Hours</div>
                  <div className="text-white text-lg font-medium">Mon–Sat: 10:00AM–9:00PM</div>
                  <div className="text-white text-lg font-medium">Sunday: 10:00AM–8:00PM</div>
                </div>
              </div>
            </div>
            <a
              href="https://maps.google.com" // Placeholder map link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group"
            >
              <button className="group/btn flex items-center gap-3 text-purple-900 font-bold bg-white hover:bg-yellow-400 border border-transparent px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
                Find Us on Map
                <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </a>
          </div>
        </div>
      </section> */}

      {/* --- CONTACT & CTA --- */}
      <section id="contact" className="py-24 md:py-32 max-w-5xl mx-auto px-6">
        <div className="bg-gradient-to-b from-white to-purple-50 rounded-[3rem] p-8 md:p-16 text-center border border-purple-100 shadow-xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Need help choosing?</h2>
          <p className="text-lg text-slate-500 font-light mb-12 max-w-2xl mx-auto">
            Our toy experts are here to help you find the perfect gift for any age or interest.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            <a href={`tel:8825403712`} className="group p-6 bg-white border border-slate-100 rounded-3xl hover:border-yellow-400 hover:shadow-lg transition-all duration-300 text-left relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Call Us</div>
                <div className="font-bold text-slate-900 text-xl group-hover:text-yellow-600 transition-colors">8825403712</div>
              </div>
            </a>

            <a href={`mailto:lokestore24@gmail.com`} className="group p-6 bg-white border border-slate-100 rounded-3xl hover:border-purple-500 hover:shadow-lg transition-all duration-300 text-left relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Email Us</div>
                <div className="font-bold text-slate-900 text-xl group-hover:text-purple-600 transition-colors">lokestore24@gmail.com</div>
              </div>
            </a>
          </div>

          <button onClick={() => navigate('/products')} className="px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-purple-600 hover:shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all duration-300">
            Browse All Toys
          </button>
        </div>
      </section>
    </div>
  );
};

const About: React.FC = () => {
  // ✅ SEO Strings
  const pageTitle = "About Loke Store | Premium Toy Store in Salem";
  const pageDesc = "Loke Store Salem - Your destination for educational toys, action figures, dolls, and more. Safe, high-quality fun for kids of all ages.";
  const canonicalUrl = "https://lokestore.in/about";

  // ✅ AboutPage Schema
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": pageTitle,
    "description": pageDesc,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ToyStore",
      "name": "Loke Store",
      "image": "https://lokestore.in/assets/logo.png",
      "telephone": "8825403712",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Salem",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(aboutSchema)}
        </script>
      </Helmet>

      <MainContent />
    </>
  );
};

export default About;