
import React from 'react';
import {
  Monitor,
  Cpu,
  Laptop,
  Wrench,
  Briefcase,
  ShieldCheck,
  Tag,
  Lightbulb,
  Headphones,
  MapPin,
  Heart
} from 'lucide-react';

export const BRAND = {
  name: 'Loke Store',
  phone: '8825403712',
  email: 'lokestore24@gmail.com',
  address: `Loke Store, RBT Mall, Meyyanur Bypass Rd, Opp. to iPlanet, Meyyanur, Salem, Tamil Nadu – 636004`
};

export const OFFERINGS = [
  {
    title: 'Educational Toys',
    description: 'STEM kits and learning games that make education fun.',
    icon: <Monitor className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Action Figures',
    description: 'Heroes and villains from your favorite movies and shows.',
    icon: <Cpu className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Arts & Crafts',
    description: 'Everything you need to unleash your inner artist.',
    icon: <Laptop className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Curated Gift Sets',
    description: 'Perfectly packaged bundles for birthdays and holidays.',
    icon: <Wrench className="w-6 h-6 text-yellow-500" />
  },
  {
    title: 'Party Supplies',
    description: 'Decorations and games for the ultimate celebration.',
    icon: <Briefcase className="w-6 h-6 text-yellow-500" />
  }
];

export const TRUST_POINTS = [
  {
    title: 'Child Safety First',
    description: 'All products meet strict safety standards and are non-toxic.',
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    title: 'Best Price Guarantee',
    description: 'We match any local competitor\'s price on identical items.',
    icon: <Tag className="w-5 h-5" />
  },
  {
    title: 'Expert Play Guides',
    description: 'Our staff can help you find the perfect toy for any age.',
    icon: <Lightbulb className="w-5 h-5" />
  },
  {
    title: 'Gift Wrapping',
    description: 'Complimentary premium gift wrapping on all in-store purchases.',
    icon: <Headphones className="w-5 h-5" />
  },
  {
    title: 'Local Community',
    description: 'Serving Salem families with joy and imagination for years.',
    icon: <MapPin className="w-5 h-5" />
  },
  {
    title: '5-Star Fun',
    description: 'Rated the #1 toy store in Salem by happy parents and kids.',
    icon: <Heart className="w-5 h-5" />
  }
];
