import { Mail, Phone, MapPin, Shield, Truck, Headphones, Gift, Star, Smile, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Shop Categories (Toy Store Theme)
  const shopCategories = [
    { label: "Action Figures", href: "/products/category/action-figures" },
    { label: "Educational Toys", href: "/products/category/educational" },
    { label: "Outdoor Fun", href: "/products/category/outdoor" },
    { label: "Dolls & Plush", href: "/products/category/dolls" },
    { label: "Board Games", href: "/products/category/games" },
    { label: "Arts & Crafts", href: "/products/category/arts" },
  ];

  // Brands 
  const popularBrands = [
    { label: "Lego", href: "/brands/lego" },
    { label: "Barbie", href: "/brands/barbie" },
    { label: "Hot Wheels", href: "/brands/hot-wheels" },
    { label: "Fisher-Price", href: "/brands/fisher-price" },
    { label: "Nerf", href: "/brands/nerf" },
    { label: "Hasbro", href: "/brands/hasbro" },
    { label: "Funko", href: "/brands/funko" },
    { label: "Disney", href: "/brands/disney" },
  ];

  // Customer Service
  const customerService = [
    { label: "Contact Us", href: "/contact", icon: <Headphones className="w-3 h-3" /> },
    { label: "Shipping Policy", href: "/shipping-policy", icon: <Truck className="w-3 h-3" /> },
    { label: "Return Policy", href: "/refund-policy", icon: <Shield className="w-3 h-3" /> },
    { label: "Safety Assurance", href: "/safety-policy", icon: <Star className="w-3 h-3" /> },
  ];

  // Company Info
  const companyInfo = [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Store Locator", href: "/stores" },
  ];

  // Legal Links
  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com", color: "hover:bg-blue-600" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com", color: "hover:bg-pink-500" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="w-full bg-[#1a1a2e] text-white rounded-xl px-2 mt-12">
      <div className="mx-auto w-full bg-[#1a1a2e] text-white relative overflow-hidden rounded-xl">

        {/* Background Effects - Playful Colors */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">

          {/* Top Section: Newsletter & Trust Badges */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12 pb-8 border-b border-white/10">

            {/* Newsletter */}
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Loke Fun Club!</span>
              </h2>
              <p className="text-zinc-400 mb-6">
                Subscribe for exclusive toy launches, fun activities, and special discounts!
              </p>

              <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter parent's email"
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full px-8 py-3 font-bold hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Join Now
                  </button>
                </div>
                <p className="text-zinc-600 text-xs mt-2 pl-4">
                  We promise no spam, only fun! Read our <Link to="/privacy-policy" className="text-yellow-400 hover:underline">Privacy Policy</Link>
                </p>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                <Truck className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-bold">Fast Delivery</p>
                <p className="text-xs text-zinc-400">To Your Doorstep</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm font-bold">Kid Safe</p>
                <p className="text-xs text-zinc-400">Non-Toxic Toys</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                <Smile className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <p className="text-sm font-bold">Best Prices</p>
                <p className="text-xs text-zinc-400">Price Match</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                <Gift className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-sm font-bold">Gift Wrap</p>
                <p className="text-xs text-zinc-400">Available</p>
              </div>
            </div>
          </div>

          {/* Middle Section: Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center">
                  <img src={Logo} alt="Loke Store" className="h-full w-full object-contain" />
                </div>
                <div>
                  <span className="font-bold text-2xl tracking-tight block text-white">Loke Store</span>
                  <span className="text-xs text-yellow-400 uppercase tracking-widest font-bold">Where Imagination Begins</span>
                </div>
              </div>

              <p className="text-zinc-400 leading-relaxed max-w-sm text-sm">
                Your favorite destination for the world's best toys, games, and gifts. We bring joy to children and peace of mind to parents with safe, high-quality products.
              </p>

              <div className="space-y-4">
                <a href="tel:8825403712" className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group">
                  <div className="p-2 bg-white/5 rounded-full group-hover:bg-blue-500/10 transition-colors">
                    <Phone className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span>+91 8825403712</span>
                </a>
                <a href="mailto:lokestore24@gmail.com" className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group">
                  <div className="p-2 bg-white/5 rounded-full group-hover:bg-purple-500/10 transition-colors">
                    <Mail className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <span>lokestore24@gmail.com</span>
                </a>
                <div className="flex items-center space-x-3 text-zinc-400 group">
                  <div className="p-2 bg-white/5 rounded-full group-hover:bg-green-500/10 transition-colors">
                    <MapPin className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                  </div>
                  <span>
                    Loke Store, Salem, Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>

            {/* Shop Categories */}
            <div>
              <h3 className="font-bold text-white mb-4 text-lg pb-2 border-b border-white/10">
                Shop Toys
              </h3>
              <ul className="space-y-3">
                {shopCategories.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group flex items-center text-zinc-400 hover:text-yellow-400 transition-colors text-sm py-1"
                    >
                      <span className="text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">›</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Brands */}
            <div>
              <h3 className="font-bold text-white mb-4 text-lg pb-2 border-b border-white/10">
                Top Brands
              </h3>
              <ul className="space-y-3">
                {popularBrands.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group flex items-center text-zinc-400 hover:text-pink-400 transition-colors text-sm py-1"
                    >
                      <span className="text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">›</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-bold text-white mb-4 text-lg pb-2 border-b border-white/10">
                Here to Help
              </h3>
              <ul className="space-y-3">
                {customerService.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm py-1"
                    >
                      <span className="text-green-500">
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-white/10">

            {/* Copyright */}
            <div className="text-zinc-500 text-sm">
              <p>© {currentYear} Loke Store. All rights reserved.</p>
              <div className="flex flex-wrap gap-4 mt-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-zinc-500 hover:text-white transition-colors text-xs"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <span className="text-zinc-500 text-sm mr-2">Follow Us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 text-zinc-400 transition-all duration-300 hover:text-white ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;