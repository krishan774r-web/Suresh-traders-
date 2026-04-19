/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Clock,
  ChevronRight,
  ChevronLeft,
  Tv,
  Wind,
  Refrigerator,
  Laptop,
  UtensilsCrossed,
  Speaker,
  Microwave,
  Smartphone,
  CheckCircle2,
  Lock,
  Package,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  mrp: number;
  discount: number;
}

interface Category {
  name: string;
  image: string;
  icon: any;
}

interface Slide {
  id: number;
  image: string;
  text: string;
  buttonText: string;
}

// --- Constants ---
const HERO_SLIDES: Slide[] = [
  { id: 1, image: 'https://doiqgxrhp4iii.cloudfront.net/Artboard 1 copy 27-100.jpg', text: 'Window Air Conditioner – Upto 57% Off', buttonText: 'Shop Now' },
  { id: 2, image: 'https://doiqgxrhp4iii.cloudfront.net/Artboard 1 copy 28-100.jpg', text: 'Air Cooler – Upto 57% Off', buttonText: 'Shop Now' },
  { id: 3, image: 'https://doiqgxrhp4iii.cloudfront.net/Artboard 1 copy 26-100.jpg', text: 'Refrigerator – Upto 39% Off', buttonText: 'Shop Now' },
  { id: 4, image: 'https://doiqgxrhp4iii.cloudfront.net/JUICER.jpg', text: 'Juicer/Mixer – Upto 62% Off', buttonText: 'Shop Now' },
];

const CATEGORIES: Category[] = [
  { name: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/TVV 44.jpg', icon: Tv },
  { name: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/ACCCC.jpg', icon: Wind },
  { name: 'Washing Machine', image: 'https://doiqgxrhp4iii.cloudfront.net/WASHING.jpg', icon: Wind }, // No direct Lucide icon for washing machine, using Wind as fallback or Smartphone/Box
  { name: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/Refrig 1 copy 28-100.jpg', icon: Refrigerator },
  { name: 'Laptop', image: 'https://doiqgxrhp4iii.cloudfront.net/Lap 1 copy 35-100.jpg', icon: Laptop },
  { name: 'Kitchen Appliances', image: 'https://doiqgxrhp4iii.cloudfront.net/KITHCEN APP - TABS.jpeg', icon: UtensilsCrossed },
  { name: 'Speakers', image: 'https://doiqgxrhp4iii.cloudfront.net/Speaker 1 copy 38-100.jpg', icon: Speaker },
  { name: 'Microwave Oven', image: 'https://doiqgxrhp4iii.cloudfront.net/Artboard 1 copy 33-100.jpg', icon: Microwave },
];

const SPECIAL_OFFERS: Product[] = [
  { id: 'so1', name: 'Panasonic 23L Convection & Grill Microwave Oven (NNCT35MBFDG) Black', category: 'Microwave Oven', image: 'https://doiqgxrhp4iii.cloudfront.net/NNCT35MBFDGz (1).jpg', price: 14300, mrp: 16490, discount: 13 },
  { id: 'so2', name: 'Haier 4.5KW 1 Ltr Water Heater (EI1V-X4.5 W)', category: 'Kitchen Appliances', image: 'https://doiqgxrhp4iii.cloudfront.net/WhatsApp Image 2024-08-11 at 20.48.19.jpg', price: 2500, mrp: 5050, discount: 50 },
  { id: 'so3', name: 'LG 81.28 cm (32 inch) HD Smart TV AI Processor Gen6', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/32LR686B6LA_11zon (2).jpg', price: 20850, mrp: 28490, discount: 26 },
  { id: 'so4', name: 'Whirlpool 8.5 Kg 5 Star Fully Automatic Top Load Washing Machine (31640)', category: 'Washing Machine', image: 'https://doiqgxrhp4iii.cloudfront.net/167899-800-auto_11zon (1).jpg', price: 20150, mrp: 25700, discount: 21 },
  { id: 'so5', name: 'Lloyd 1 Ton 3 Star 4-Way Swing Fixed Speed Split AC (GLS12C3XWADS)', category: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/GLS12C3XWADS (1)f.jpg', price: 30750, mrp: 49990, discount: 38 },
];

const REFRIGERATORS: Product[] = [
  { id: 'r1', name: 'Panasonic 400L 2 Star Frost-Free Double Door', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/NR-BK418BGMN (1).jpg', price: 57450, mrp: 86490, discount: 33 },
  { id: 'r2', name: 'LG 242L Frost Free Double Door Smart Inverter', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/GL-N292DPZY (1).jpg', price: 25500, mrp: 33499, discount: 23 },
  { id: 'r3', name: 'LG 340L 3 Star Bottom Freezer Wi-Fi Convertible', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/GL-B382FPTX.APTZEBNu.png', price: 45800, mrp: 66999, discount: 31 },
  { id: 'r4', name: 'LG 185L 5 Star Single Door Direct Cool', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/GL-D201APZUQ-removebg-preview__1___1_-removebg-preview.png', price: 17650, mrp: 22499, discount: 21 },
  { id: 'r5', name: 'Haier 520L French Door Convertible', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/HRB600KGU1-PA.png', price: 90000, mrp: 137990, discount: 34 },
  { id: 'r6', name: 'LG 340L 3 Star Bottom Freezer Wi-Fi Black Mirror', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/GL-B382EBMXo.png', price: 47400, mrp: 68999, discount: 31 },
  { id: 'r7', name: 'GEM 92L 1 Star Single Door Mini Fridge', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/GRDN120HSTP.jpg', price: 9990, mrp: 13300, discount: 24 },
  { id: 'r8', name: 'Samsung 236L 2 Star Digital Inverter Double Door', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/RT28C3022CU.jpeg', price: 26400, mrp: 32990, discount: 19 },
  { id: 'r9', name: 'Samsung 467L 2 Star Bespoke Smart Double Door', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/RT80F51C2FHL_11zon__1_-removebg-preview.png', price: 51300, mrp: 74999, discount: 31 },
  { id: 'r10', name: 'Godrej 272L 2 Star Frost Free Nano Shield Double Door', category: 'Refrigerator', image: 'https://doiqgxrhp4iii.cloudfront.net/EONVALOR.jpg', price: 26300, mrp: 38490, discount: 31 },
];

const AIR_CONDITIONERS: Product[] = [
  { id: 'ac1', name: 'Whirlpool 1.5 Ton 3 Star 3DCOOL Inverter Split AC', category: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/43393 ODU_11zon (1).jpg', price: 30550, mrp: 62000, discount: 50 },
  { id: 'ac2', name: 'LG 1.5 Ton 5 Star 6-in-1 Convertible Dual Inverter Split AC', category: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/USUQ19HNZE12 (1)a.jpg', price: 44500, mrp: 81990, discount: 45 },
  { id: 'ac3', name: 'Daikin 1 Ton 3 Star Split AC with PM 2.5 Filter', category: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/FTL35UV16W1 (1).jpg', price: 30200, mrp: 42390, discount: 28 },
  { id: 'ac4', name: 'Hitachi 1.5 Ton 3 Star Fixed Speed Split AC Senpai', category: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/RAC318WCAID (1).jpg', price: 34000, mrp: 58800, discount: 42 },
  { id: 'ac5', name: 'Lloyd 1.5 Ton 3 Star 5-in-1 Inverter Split AC', category: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/S18I3KOSEC.jpg', price: 40000, mrp: 59990, discount: 33 },
  { id: 'ac6', name: 'Whirlpool 1.0 Ton 3 Star 3DCOOL Inverter Split AC', category: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/43392 ODU.jpg', price: 27500, mrp: 59200, discount: 53 },
  { id: 'ac7', name: 'Daikin 1.5 Ton 3 Star Split Inverter AC', category: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/FTKL50UV16VAF_11zon__1_-removebg-preview.png', price: 35000, mrp: 53830, discount: 34 },
  { id: 'ac8', name: 'Whirlpool 3DCool Pro 1.5T 5 Star Inverter Split AC', category: 'Air Conditioner', image: 'https://doiqgxrhp4iii.cloudfront.net/43396 ODU_11zon (1).jpg', price: 35990, mrp: 74700, discount: 51 },
];

const TELEVISIONS: Product[] = [
  { id: 'tv1', name: 'Samsung 32 inch HD Smart TV Tizen OS', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/UA32H4570F.png', price: 15450, mrp: 19900, discount: 22 },
  { id: 'tv2', name: 'Samsung 55 inch QLED 4K Smart TV Alexa & Bixby', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/QA55Q8FA.png', price: 64850, mrp: 86100, discount: 24 },
  { id: 'tv3', name: 'LG 32 inch HD Smart TV AI Processor Gen6', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/32LR686B6LA_11zon (2).jpg', price: 20850, mrp: 28490, discount: 26 },
  { id: 'tv4', name: 'LG 32 inch HD WebOS ThinQ AI Magic Remote', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/32LR595B6LA.ATR (1).png', price: 16950, mrp: 28990, discount: 41 },
  { id: 'tv5', name: 'LG 43 inch 4K Ultra HD Smart TV a7 AI Gen8', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/43UA83006LA_11zon (1).jpg', price: 34550, mrp: 48790, discount: 29 },
  { id: 'tv6', name: 'TCL 43 inch 4K Smart Google TV 43P6K (2025)', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/43P6KA_11zon.jpg', price: 26990, mrp: 48590, discount: 44 },
  { id: 'tv7', name: 'TCL 55 inch 4K Smart Google TV 55P6K (2025)', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/55P6Ka_11zon.jpg', price: 35990, mrp: 71090, discount: 49 },
  { id: 'tv8', name: 'Samsung 55 inch Crystal 4K Smart TV Alexa', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/UA55U8100F_a-removebg-preview.png', price: 46950, mrp: 62500, discount: 24 },
  { id: 'tv9', name: 'LG 43 inch UR75 4K Ultra HD Smart LED TV', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/43UR75006LCy.png', price: 34200, mrp: 46090, discount: 25 },
  { id: 'tv10', name: 'Vu 55 inch 4K QLED Smart Google TV Vibe Series', category: 'Television', image: 'https://doiqgxrhp4iii.cloudfront.net/55VIBE-DV.jpg', price: 36500, mrp: 60000, discount: 39 },
];

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

// --- Components ---

const ProductCard = ({ product, onAddToCart, onClick }: { product: Product, onAddToCart: (p: Product) => void, onClick: (p: Product) => void }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)' }}
      className="bg-white rounded-[6px] overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full relative group transition-all cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="absolute top-2 left-2 z-10 bg-[#e53935] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow-sm uppercase tracking-wide">
        {product.discount}% OFF
      </div>
      <button 
        className="absolute top-2 right-2 z-10 p-1 bg-white/50 backdrop-blur-sm rounded-full text-gray-300 hover:text-red-500 transition-colors"
        onClick={(e) => { e.stopPropagation(); }}
      >
        <Heart size={14} />
      </button>

      <div className="h-[120px] p-3 bg-[#f9f9f9] flex items-center justify-center overflow-hidden m-2 rounded-[4px]">
        <motion.img 
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="p-3 flex-grow flex flex-col">
        <span className="text-[10px] uppercase font-bold text-text-light tracking-wide mb-1">
          {product.category}
        </span>
        <h3 className="text-xs font-semibold text-text-main line-clamp-2 min-h-[32px] leading-tight mb-2">
          {product.name}
        </h3>
        
        <div className="mt-auto flex flex-col mb-3">
          <span className="text-xs text-text-light line-through leading-none">
            {CURRENCY_FORMATTER.format(product.mrp)}
          </span>
          <span className="text-base font-extrabold text-accent leading-tight">
            {CURRENCY_FORMATTER.format(product.price)}
          </span>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-1.5 rounded-[4px] text-xs transition-colors uppercase cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title, viewAll }: { title: string, viewAll?: boolean }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="section-title-geometric">
      {title}
    </h2>
    {viewAll && (
      <a href="#" className="text-xs font-bold text-accent hover:underline mb-4">VIEW ALL →</a>
    )}
  </div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 2,
    minutes: 14,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center md:items-end">
      <div className="text-[10px] text-white uppercase font-bold tracking-widest mb-1 opacity-90">Ends In</div>
      <div className="text-lg md:text-xl font-mono font-bold text-white tracking-widest bg-accent px-4 py-1.5 rounded-[4px] shadow-sm">
        {String(timeLeft.days).padStart(2, '0')} : {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans select-none overflow-x-hidden text-text-main">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 md:px-6 text-[11px] font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-center md:text-left">
            <span>✅ 100% Satisfaction | 🔒 Secure Payment | 📍 Parbatsar, Rajasthan | 🕒 10 AM - 10 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <span>📞 +91-9XXXXXXXXX | <button className="hover:text-accent font-bold transition-colors">Login</button> | <button className="hover:text-accent font-bold transition-colors">Signup</button></span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4 border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex flex-col cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <h1 className="text-2xl md:text-[24px] font-heading font-extrabold text-primary leading-none tracking-tight">
              SURESH TRADERS
            </h1>
            <p className="text-[10px] text-accent font-bold tracking-[1px] uppercase mt-1">
              Your Trusted Electronics Store in Parbatsar
            </p>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-grow max-w-[400px] relative">
            <input 
              type="text" 
              placeholder="Search for TV, AC, Refrigerators..."
              className="w-full bg-[#f0f2f5] border border-[#e0e0e0] rounded-[4px] py-2.5 px-4 pr-10 outline-none focus:border-accent transition-colors text-[13px] text-text-light placeholder:text-text-light"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-primary transition-colors">
              <Search size={16} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="hidden sm:flex flex-col items-center text-primary font-bold text-[14px]">
              Track Order
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center text-primary font-bold text-[14px] relative bg-gray-50 px-3 py-1.5 rounded-[4px] border border-gray-100 hover:bg-white hover:border-accent transition-all cursor-pointer"
            >
              <ShoppingCart size={16} className="mr-2" />
              Cart ({cart.length})
            </button>
            <button 
              className="md:hidden text-primary"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-heading font-bold text-lg text-primary uppercase">Suresh Traders</span>
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-6">
                <button className="text-left font-bold text-gray-800 border-b pb-2 flex items-center justify-between" onClick={() => { setIsMenuOpen(false); scrollToSection('categories'); }}>Categories <ChevronRight size={18} /></button>
                <button className="text-left font-bold text-gray-800 border-b pb-2 flex items-center justify-between">Special Offers <ChevronRight size={18} /></button>
                <button className="text-left font-bold text-gray-800 border-b pb-2 flex items-center justify-between">Order Status <ChevronRight size={18} /></button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-primary uppercase">Your Shopping Cart</h2>
                  <p className="text-xs text-text-light font-bold mt-1 uppercase tracking-wider">{cart.length} Items</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <ShoppingCart size={64} className="mb-4 text-gray-300" />
                    <p className="text-lg font-bold text-text-main">Your cart is empty</p>
                    <p className="text-sm">Start adding some electronics!</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-gray-50 rounded-[4px] border border-gray-100 flex-shrink-0 p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow flex flex-col">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-bold text-text-main line-clamp-2 pr-4">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(idx)}
                            className="text-gray-400 hover:text-error transition-colors p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-extrabold text-accent">
                            {CURRENCY_FORMATTER.format(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-text-main uppercase tracking-widest">Total Amount</span>
                    <span className="text-xl font-heading font-extrabold text-primary">
                      {CURRENCY_FORMATTER.format(cartTotal)}
                    </span>
                  </div>
                  <button className="w-full bg-accent hover:bg-accent/90 text-white font-extrabold py-4 rounded-[4px] transition-all uppercase tracking-widest text-sm shadow-md shadow-accent/20">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/70 z-[80] backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] bg-white z-[90] shadow-2xl rounded-[12px] flex flex-col md:flex-row overflow-hidden"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors text-primary shadow-sm"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 p-8 bg-[#f9f9f9] flex items-center justify-center overflow-auto">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="max-w-full max-h-[400px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                <div className="mb-6">
                  <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-2xl font-heading font-extrabold text-primary leading-tight mb-4">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-extrabold text-accent">
                      {CURRENCY_FORMATTER.format(selectedProduct.price)}
                    </span>
                    <span className="text-lg text-text-light line-through font-medium">
                      {CURRENCY_FORMATTER.format(selectedProduct.mrp)}
                    </span>
                    <span className="bg-[#e53935] text-white text-[12px] font-bold px-3 py-1 rounded-full">
                      {selectedProduct.discount}% OFF
                    </span>
                  </div>
                </div>

                <div className="space-y-6 flex-grow mb-8 border-t border-gray-100 pt-6">
                  <div>
                    <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                       <CheckCircle2 size={14} className="text-green-500" /> Key Features
                    </h4>
                    <ul className="text-[13px] text-text-light space-y-2">
                      <li>• High Performance & Energy Efficient</li>
                      <li>• Professional Installation Available in Parbatsar</li>
                      <li>• 1 Year Comprehensive Warranty</li>
                      <li>• Genuine Parts & 100% Satisfaction</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2">Delivery Information</h4>
                    <p className="text-[13px] text-text-light flex items-center gap-2">
                      <MapPin size={14} className="text-accent" /> 
                      Same Day Delivery in Parbatsar & Nearby Areas
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="flex-grow bg-primary hover:bg-primary/95 text-white font-extrabold py-4 rounded-[4px] transition-all uppercase tracking-widest text-sm"
                  >
                    Add to Cart
                  </button>
                  <button className="p-4 border border-gray-100 rounded-[4px] hover:border-accent transition-all text-text-light">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 w-full flex-grow grid md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-8">
          <div className="bg-white rounded-[8px] p-5 shadow-sm border border-gray-100 h-fit">
            <h2 className="section-title-geometric">Shop By Category</h2>
            <ul className="flex flex-col">
              {CATEGORIES.map((cat, idx) => (
                <li 
                  key={idx} 
                  onClick={() => scrollToSection(cat.name.toLowerCase().replace(/\s+/g, '-'))}
                  className="cat-item py-2 text-[13px] border-b border-gray-50 last:border-0 hover:text-accent transition-colors flex items-center gap-2 cursor-pointer group"
                >
                  <span className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">{<cat.icon size={16} />}</span>
                  {cat.name}
                </li>
              ))}
            </ul>

            <h2 className="section-title-geometric mt-10">Store Locator</h2>
            <div className="flex items-start gap-2 mb-4">
              <Clock size={16} className="text-accent mt-0.5 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-text-main uppercase">Store Timing</span>
                <span className="text-[11px] text-text-light">10:00 AM – 10:00 PM (Daily)</span>
              </div>
            </div>
            <p className="text-[11px] text-text-light leading-relaxed mb-4">
              Main Market, Parbatsar,<br />
              Nagaur District, Rajasthan – 341542
            </p>
            <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-4 border border-gray-100">
               <MapPin size={32} className="text-accent opacity-20" />
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex flex-col gap-6 overflow-hidden">
          {/* Hero Banner Section */}
          <section className="relative h-[240px] md:h-[220px] rounded-[8px] overflow-hidden bg-gradient-to-br from-primary to-[#2a4e9c] text-white">
            <div className="p-8 md:p-10 w-full md:w-[60%] h-full flex flex-col justify-center items-start z-10 relative">
              <span className="bg-accent text-white px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider mb-3">
                Limited Time Offer
              </span>
              <h2 className="text-2xl md:text-[28px] font-heading font-extrabold mb-4 leading-tight">
                Air Conditioners & Coolers<br />Up to 57% Off
              </h2>
            </div>

            {/* Visual element on right */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-[40%] bg-white/10 flex items-center justify-center pointer-events-none">
              <Wind size={80} className="text-white/20 -rotate-12" />
            </div>

            {/* Countdown Overlay in Banner */}
            <div className="absolute top-4 right-4 hidden lg:block">
              <CountdownTimer />
            </div>
          </section>

          {/* Special Offers Section */}
          <section id="special-offers" className="bg-white rounded-[8px] p-6 shadow-sm border border-gray-100">
            <SectionHeader title="Today's Special Offers" viewAll />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {SPECIAL_OFFERS.slice(0, 4).map(product => (
                <div key={product.id}>
                  <ProductCard product={product} onAddToCart={addToCart} onClick={setSelectedProduct} />
                </div>
              ))}
            </div>
          </section>

          {/* Refrigerator Section */}
          <section id="refrigerators" className="flex flex-col">
            <SectionHeader title="Refrigerators" viewAll />
            <div className="relative group">
              <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
                {REFRIGERATORS.map(product => (
                  <div key={product.id} className="min-w-[180px] md:min-w-[200px] snap-start">
                    <ProductCard product={product} onAddToCart={addToCart} onClick={setSelectedProduct} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Air Conditioner Section */}
          <section id="air-conditioners" className="flex flex-col">
            <SectionHeader title="Air Conditioners" viewAll />
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
                {AIR_CONDITIONERS.map(product => (
                  <div key={product.id} className="min-w-[180px] md:min-w-[200px] snap-start">
                    <ProductCard product={product} onAddToCart={addToCart} onClick={setSelectedProduct} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Television Section */}
          <section id="television" className="flex flex-col text-television">
            <SectionHeader title="Smart Televisions" viewAll />
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
                {TELEVISIONS.map(product => (
                  <div key={product.id} className="min-w-[180px] md:min-w-[200px] snap-start">
                    <ProductCard product={product} onAddToCart={addToCart} onClick={setSelectedProduct} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div id="speakers" />
          <div id="microwave-oven" />

          {/* New Content: About The Store */}
          <section id="about-store" className="mt-8 pt-8 border-t border-gray-100">
            <h2 className="section-title-geometric mb-6">About Suresh Traders</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-[8px] border border-gray-100 shadow-sm">
              <div className="order-2 md:order-1">
                <p className="text-sm text-text-light leading-relaxed mb-4">
                  Suresh Traders has been the trusted destination for electronics in <strong>Parbatsar</strong> and the surrounding Nagaur district for years. We take pride in being more than just a retail outlet; we are your local partners in modern living.
                </p>
                <p className="text-sm text-text-light leading-relaxed mb-6">
                  From the extreme summers of Rajasthan where a powerful <strong>Air Conditioner</strong> is a necessity, to the daily comfort brought by high-end <strong>Refrigerators</strong> and <strong>Smart TVs</strong>, we curate our collection to meet the specific environmental and lifestyle needs of our local community.
                </p>
                <div className="flex gap-4">
                   <div className="flex flex-col">
                      <span className="text-2xl font-heading font-extrabold text-primary">10+</span>
                      <span className="text-[10px] text-accent uppercase font-bold">Years Experience</span>
                   </div>
                   <div className="w-px h-10 bg-gray-100"></div>
                   <div className="flex flex-col">
                      <span className="text-2xl font-heading font-extrabold text-primary">5000+</span>
                      <span className="text-[10px] text-accent uppercase font-bold">Happy Customers</span>
                   </div>
                   <div className="w-px h-10 bg-gray-100"></div>
                   <div className="flex flex-col">
                      <span className="text-2xl font-heading font-extrabold text-primary">100%</span>
                      <span className="text-[10px] text-accent uppercase font-bold">Genuine Only</span>
                   </div>
                </div>
              </div>
              <div className="order-1 md:order-2 rounded-lg overflow-hidden h-[250px] relative group">
                <img 
                  src="https://picsum.photos/seed/electronics-store/800/600" 
                  alt="Suresh Traders Store" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-xs font-bold shadow-lg">Our Parbatsar Showroom</span>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Factors Banner */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-4 bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm transition-all hover:border-accent group">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Package size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-primary uppercase mb-1">Expert Installation</h3>
                <p className="text-[11px] text-text-light">Professional setup by our in-house technicians.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm transition-all hover:border-accent group">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-primary uppercase mb-1">Genuine Warranty</h3>
                <p className="text-[11px] text-text-light">Direct brand warranty on every single purchase.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm transition-all hover:border-accent group">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-primary uppercase mb-1">Local Support</h3>
                <p className="text-[11px] text-text-light">We are right here in the market to help you 24/7.</p>
              </div>
            </div>
          </section>

          {/* New Section: Why Shop With Us & FAQ */}
          <section className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
              <h2 className="section-title-geometric mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {[
                  { name: 'Rakesh Verma', comment: 'Best store in Parbatsar. Got my Whirlpool AC installed within 2 hours of purchase. Highly recommended!', rating: 5 },
                  { name: 'Sanjay Sharma', comment: 'Authentic products and very helpful staff. Prices are even better than Jaipur markets.', rating: 5 },
                  { name: 'Anita Devi', comment: 'Bought a Panasonic Refrigerator. The delivery team was very careful and professional.', rating: 4 }
                ].map((testimonial, i) => (
                  <div key={i} className="border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center gap-0.5 mb-1 text-accent">
                      {[...Array(testimonial.rating)].map((_, i) => <Heart key={i} size={10} fill="currentColor" />)}
                    </div>
                    <p className="text-[12px] text-text-main font-medium italic mb-1">"{testimonial.comment}"</p>
                    <span className="text-[10px] text-text-light font-bold uppercase tracking-wider">— {testimonial.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
              <h2 className="section-title-geometric mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-50 pb-3 last:border-0">
                  <h4 className="text-[12px] font-extrabold text-primary mb-1 uppercase tracking-tight">Do you provide home delivery in nearby villages?</h4>
                  <p className="text-[11px] text-text-light leading-relaxed">Yes, we provide safe and secure delivery across Parbatsar market and all connected villages in Nagaur district.</p>
                </div>
                <div className="border-b border-gray-50 pb-3 last:border-0">
                  <h4 className="text-[12px] font-extrabold text-primary mb-1 uppercase tracking-tight">What about installation of complex appliances?</h4>
                  <p className="text-[11px] text-text-light leading-relaxed">We have a permanent team of certified technicians for AC, Smart TV, and Washing Machine installation available 24/7.</p>
                </div>
                <div>
                  <h4 className="text-[12px] font-extrabold text-primary mb-1 uppercase tracking-tight">Are all products on display in the showroom?</h4>
                  <p className="text-[11px] text-text-light leading-relaxed">Most latest models are available for live demonstration. You can visit our Parbatsar Main Market showroom anytime between 10 AM to 10 PM.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section IDs for smooth Category Navigation */}
          <div id="washing-machine" />
          <div id="laptop" />
          <div id="kitchen-appliances" />
          <div id="speakers" />
          <div id="microwave-oven" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-8 md:p-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Store Identity */}
            <div className="flex flex-col">
              <h1 className="text-lg font-heading font-extrabold text-primary mb-4 uppercase tracking-tighter">
                SURESH TRADERS
              </h1>
              <p className="text-[11px] text-text-light leading-relaxed mb-1 font-bold">🕒 10:00 AM - 10:00 PM Everyday</p>
              <p className="text-[11px] text-text-light leading-relaxed mb-1">Main Market, Parbatsar, Nagaur District, Rajasthan – 341542</p>
              <p className="text-[11px] text-text-light mb-1 underline">sureshtraders@gmail.com</p>
              <p className="text-[11px] text-text-light">+91-9XXXXXXXXX</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[12px] font-extrabold text-primary uppercase mb-6 tracking-wider">Quick Links</h4>
              <ul className="flex flex-col gap-2">
                {['Home', 'About Us', 'Contact Us', 'Track Order'].map(item => (
                  <li key={item}><a href="#" className="text-[11px] text-text-light hover:text-accent transition-colors font-medium underline-offset-4 hover:underline">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-[12px] font-extrabold text-primary uppercase mb-6 tracking-wider">Categories</h4>
              <ul className="flex flex-col gap-2">
                {['TV', 'AC', 'Refrigerator', 'Laptops'].map(item => (
                  <li key={item}><a href="#" className="text-[11px] text-text-light hover:text-accent transition-colors font-medium underline-offset-4 hover:underline">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-[12px] font-extrabold text-primary uppercase mb-6 tracking-wider">Follow Us</h4>
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-[11px] text-text-light font-medium flex items-center gap-2 cursor-pointer hover:text-accent"><Facebook size={14} /> Facebook</span>
                <span className="text-[11px] text-text-light font-medium flex items-center gap-2 cursor-pointer hover:text-accent"><Instagram size={14} /> Instagram</span>
                <span className="text-[11px] text-text-light font-medium flex items-center gap-2 cursor-pointer hover:text-accent"><Phone size={14} /> WhatsApp</span>
              </div>
              <div className="bg-bg-base p-2 rounded-[4px] border border-gray-200 border-dashed text-[11px] text-center font-bold text-primary/60">
                Newsletter Signup
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-gray-400 font-medium">
              © 2025 Suresh Traders, Parbatsar. All Rights Reserved. | Site by DesignTeam
            </p>
            <div className="flex items-center gap-4 opacity-30 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2.5" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/UPI-Logo-vector.svg" className="h-3" alt="UPI" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

