import React, { useState, useRef } from 'react';

// ==========================================
// ASSET CONSTANTS
// ==========================================
const LOGO_DARK = "https://www.drytechindia.com/drytech-logo.png";
const LOGO_WHITE = "https://www.drytechindia.com/drytech-logo-white.svg";
const FOOTER_LOGO = "https://www.drytechindia.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdrytech-footer-logo.c0fbefe0.png&w=828&q=90";

// Brand Sub-Logos
const BRAND_LOGOS = {
  nutritif: "https://www.drytechindia.com/assets/logos/nutritif.svg",
  kremadel: "https://www.drytechindia.com/assets/logos/kremadel.svg",
  liposharp: "https://www.drytechindia.com/assets/logos/liposharp.svg",
  maxaphos: "https://www.drytechindia.com/assets/logos/maxaphos.svg",
  capnova: "https://www.drytechindia.com/assets/logos/capnova.svg",
  frutinov: "https://www.drytechindia.com/assets/logos/frutinov.svg",
  drytang: "https://www.drytechindia.com/assets/logos/drytang.svg",
};

// Client Industry Logos
const CLIENT_LOGOS = [
  { name: "Nestle", src: "https://www.drytechindia.com/assets/home/industry/nestle.png" },
  { name: "Mondelez", src: "https://www.drytechindia.com/assets/home/industry/mondelez-international.png" },
  { name: "Hindustan Unilever", src: "https://www.drytechindia.com/assets/home/industry/hindustan-unilever-limited.png" },
  { name: "PepsiCo", src: "https://www.drytechindia.com/assets/home/industry/pepsico.png" },
  { name: "Danone", src: "https://www.drytechindia.com/assets/home/industry/danone.png" },
  { name: "ITC Limited", src: "https://www.drytechindia.com/assets/home/industry/itc-limited.png" },
  { name: "IFF", src: "https://www.drytechindia.com/assets/home/industry/iff.png" },
  { name: "Givaudan", src: "https://www.drytechindia.com/assets/home/industry/givaudan.png" },
  { name: "Symrise", src: "https://www.drytechindia.com/assets/home/industry/symrise.png" },
  { name: "DSM-Firmenich", src: "https://www.drytechindia.com/assets/home/industry/dms-firmenich.png" },
  { name: "Mars", src: "https://www.drytechindia.com/assets/home/industry/mars.png" },
  { name: "Kelloggs", src: "https://www.drytechindia.com/assets/home/industry/kelloggs.png" },
  { name: "Ferrero", src: "https://www.drytechindia.com/assets/home/industry/ferrero.png" },
  { name: "Haldirams", src: "https://www.drytechindia.com/assets/home/industry/haldirams.png" },
  { name: "Amway", src: "https://www.drytechindia.com/assets/home/industry/amway.png" },
  { name: "Herbalife", src: "https://www.drytechindia.com/assets/home/industry/herbalife.png" },
  { name: "Sun Pharma", src: "https://www.drytechindia.com/assets/home/industry/sun-pharma.png" },
  { name: "Dohler", src: "https://www.drytechindia.com/assets/home/industry/dohler.png" },
  { name: "Promasidor", src: "https://www.drytechindia.com/assets/home/industry/promasidor.png" },
  { name: "DS Group", src: "https://www.drytechindia.com/assets/home/industry/ds-group.png" },
  { name: "Cafe Coffee Day", src: "https://www.drytechindia.com/assets/home/industry/cafe-coffeday.png" },
  { name: "GSK", src: "https://www.drytechindia.com/assets/home/industry/gsk.png" },
  { name: "Perfetti", src: "https://www.drytechindia.com/assets/home/industry/perfetti.png" },
  { name: "General Mills", src: "https://www.drytechindia.com/assets/home/industry/general-mills.png" }
];

// Stats Images
const STATS_IMAGES = {
  unit: "https://www.drytechindia.com/_next/image?url=%2Fassets%2Fhome%2Fstats%2Fdrytech-unit-01-and-02-images.png&w=1920&q=95",
  customers: "https://www.drytechindia.com/_next/image?url=%2Fassets%2Fhome%2Fstats%2Fcustomers-image.png&w=3840&q=95",
  factory: "https://www.drytechindia.com/_next/image?url=%2Fassets%2Fhome%2Fstats%2Fimage-of-factory-new.png&w=1920&q=95",
  products: "https://www.drytechindia.com/_next/image?url=%2Fassets%2Fhome%2Fstats%2Fproducts.png&w=3840&q=95",
  drinks: "https://www.drytechindia.com/_next/image?url=%2Fassets%2Fhome%2Fstats%2Fdrinks-image.png&w=3840&q=95"
};

// Versatility Cards
const VERSATILITY_ITEMS = [
  {
    title: "Health and nutraceuticals",
    desc: "Enabling bioavailability and compliance in health-forward formulations.",
    img: "https://www.drytechindia.com/assets/home/versatility/health-and-nutraceuticals-new.png"
  },
  {
    title: "Baking and confectionery",
    desc: "Elevating indulgence with consistent flavor, color, and texture.",
    img: "https://www.drytechindia.com/assets/home/versatility/baking-and-confectionery.png"
  },
  {
    title: "Dairy",
    desc: "Transforming freshness into stable longevity with nutrition retention.",
    img: "https://www.drytechindia.com/assets/home/versatility/dairy_product.jpeg"
  },
  {
    title: "Beverages",
    desc: "Ensuring solubility, stability, and taste in every sip.",
    img: "https://www.drytechindia.com/assets/home/versatility/beverages.png"
  },
  {
    title: "Pharmaceuticals and cosmetics",
    desc: "Empowering efficacy with encapsulation, stability, and compliance excellence.",
    img: "https://www.drytechindia.com/assets/home/versatility/pharmaceuticals-and-cosmetics.jpg"
  },
  {
    title: "Frozen desserts",
    desc: "Freezing texture, stability, and indulgence for delightful bites and scoops.",
    img: "https://www.drytechindia.com/assets/home/versatility/frozen-desserts.jpg"
  },
  {
    title: "Seasonings",
    desc: "Adding aroma, flavor, and functionality to tasteful blends.",
    img: "https://www.drytechindia.com/assets/home/versatility/seasonings_.png"
  },
  {
    title: "Snacks and savories",
    desc: "Enhancing taste, texture, and shelf stability.",
    img: "https://www.drytechindia.com/assets/home/versatility/snacks-and-savories.png"
  },
  {
    title: "Convenience foods",
    desc: "Driving taste, goodness, and performance in RTC and RTE treats.",
    img: "https://www.drytechindia.com/assets/home/versatility/convenience-foods.png"
  }
];

// Product Formulations Data
const PRODUCTS_DATA = [
  {
    id: "fat-bases",
    name: "Fat Bases",
    img: "https://www.drytechindia.com/assets/home/products/fat-bases.png",
    desc: "High-stability spray-dried fat powders engineered for creamy mouthfeel, emulsion stability, and optimal solubility in dry premixes."
  },
  {
    id: "caseinates",
    name: "Caseinates",
    img: "https://www.drytechindia.com/assets/home/products/caseinates.png",
    desc: "Premium dairy proteins offering superior emulsification, water binding, and nutritional fortification in dietetic and clinical nutrition."
  },
  {
    id: "non-dairy-creamer",
    name: "Non-dairy Creamer",
    img: "https://www.drytechindia.com/assets/home/products/kremadel-non-dairy-creamer.png",
    desc: "Instant dissolvable spray-dried creamer delivering rich, velvety texture to coffee, tea, and dry beverage mixes."
  },
  {
    id: "instant-fat-filled",
    name: "Instant Fat-filled Powder",
    img: "https://www.drytechindia.com/assets/home/products/instant-fat-filled-powder.png",
    desc: "Cost-effective, highly soluble dairy alternative with balanced dairy solids and refined vegetable oils."
  },
  {
    id: "beverage-whitener",
    name: "Beverage Whitener",
    img: "https://www.drytechindia.com/assets/home/products/beverage-whitener.png",
    desc: "Specially formulated for hot beverages, providing brilliant whiteness and smooth dissolution without curdling."
  },
  {
    id: "liposomes",
    name: "Liposomes",
    img: "https://www.drytechindia.com/assets/home/products/liposomes.png",
    desc: "Advanced functional delivery systems encapsulating active nutraceutical ingredients for enhanced bio-absorption."
  },
  {
    id: "phosphates",
    name: "Phosphates",
    img: "https://www.drytechindia.com/assets/home/products/maxap-phosphates-new.png",
    desc: "Functional phosphate systems providing acidity regulation, moisture retention, and mineral fortification."
  },
  {
    id: "encapsulated-acids",
    name: "Encapsulated Acids",
    img: "https://www.drytechindia.com/assets/home/products/encapsulated-acids.png",
    desc: "Controlled-release organic acids engineered for bakery leavening, confection gummies, and extended shelf freshness."
  },
  {
    id: "tomato-powder",
    name: "Tomato Powder",
    img: "https://www.drytechindia.com/assets/home/products/drytang-tomato-powder.png",
    desc: "Spray-dried from ripe field tomatoes, delivering authentic tang, rich lycopene color, and umami depth for seasonings and soups."
  },
  {
    id: "gum-arabic",
    name: "Gum Arabic",
    img: "https://www.drytechindia.com/assets/home/products/gum-arabic-powders-new.png",
    desc: "Asia's leading spray-dried acacia gum, acting as a natural soluble fiber, flavor fixative, and emulsion stabilizer."
  },
  {
    id: "cheese-powder",
    name: "Cheese Powder",
    img: "https://www.drytechindia.com/assets/home/products/cheese-powder.png",
    desc: "The flavor of authentic farm-fresh cheese in free-flowing powder form for convenience, extended shelf-life, and functionality excellence."
  },
  {
    id: "fruit-powders",
    name: "Fruit Powders",
    img: "https://www.drytechindia.com/assets/home/products/fruit-powders.png",
    desc: "Pure spray-dried fruit purees preserving natural volatiles, sweet acidity, and vitamins across mango, citrus, and berries."
  },
  {
    id: "natural-colorants",
    name: "Natural Colorants",
    img: "https://www.drytechindia.com/assets/home/products/natural-colorants.png",
    desc: "Clean-label vibrant pigments derived from beetroot and caramel, offering heat-stable natural hues for food and pharma."
  },
  {
    id: "hvp",
    name: "Hydrolyzed Vegetable Protein Powder",
    img: "https://www.drytechindia.com/assets/home/products/hydrolized-vegetable-protein-powder.png",
    desc: "Natural savory flavor enhancer providing deep savory bouillon notes for snack seasonings, broths, and sauces."
  },
  {
    id: "tamarind-powder",
    name: "Tamarind Powder",
    img: "https://www.drytechindia.com/assets/home/products/tamarind-powder.png",
    desc: "Tangy, tart spray-dried tamarind extract with authentic fruity tartness for instant chutneys, seasonings, and marinades."
  }
];

// Impact Cards
const IMPACT_CARDS = [
  {
    title: "32+ years in the market and counting",
    desc: "We have been pioneering spray-dried innovation since 1992. From being India’s first manufacturer of spray-dried tomato powder to becoming Asia’s largest manufacturer of spray-dried Gum Arabic, our universe continues to expand.",
    img: "https://www.drytechindia.com/assets/home/impact/frame-01.png"
  },
  {
    title: "Backed by research, confirmed with application",
    desc: "From concept to launch, reason guides every ingredient’s creation. While research ensures technical rigor, a dedicated application lab tests viability, enabling performance-driven solutions at scale.",
    img: "https://www.drytechindia.com/assets/home/impact/frame-02.png"
  },
  {
    title: "Going the extra mile with contract manufacturing",
    desc: "Be it function-specific formulations or regulation-based composition, we leverage our expertise and technology to create shelf-ready products for customers. With contract manufacturing, customers gain reliable solutions, at scale, with precision.",
    img: "https://www.drytechindia.com/assets/home/impact/frame-03-new.png"
  },
  {
    title: "Sustainability",
    desc: "Embedding conscious choices into our DNA, we ensure that every ingredient we create nourishes not only consumers but also the world we share.",
    metrics: [
      "1,350 kVA of daily clean energy generation from solar panels",
      "4.6 ML of monthly water recycling capacity"
    ],
    img: "https://www.drytechindia.com/assets/home/impact/sustainability.png"
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(10); // default to Cheese Powder
  const [activeUnit, setActiveUnit] = useState<1 | 2>(1);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Horizontal scroll container ref for Versatility
  const versatilityScrollRef = useRef<HTMLDivElement>(null);

  const scrollVersatility = (direction: 'left' | 'right') => {
    if (versatilityScrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      versatilityScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const selectedProduct = PRODUCTS_DATA[selectedProductIndex];

  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans antialiased overflow-x-hidden selection:bg-[#0093cb] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#f0f0f0] transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img 
              src={LOGO_DARK} 
              alt="Drytech Logo" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#424242]">
            
            {/* Products Dropdown Trigger */}
            <div 
              className="relative py-4 cursor-pointer group"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <div className="flex items-center gap-1.5 hover:text-[#0093cb] transition-colors">
                <span>Products</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right rotate-90 w-4 h-4 text-slate-500">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>

              {/* Mega Dropdown Menu */}
              {productsDropdownOpen && (
                <div className="absolute top-full -left-20 w-[880px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 grid grid-cols-3 gap-6 animate-in fade-in duration-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <img src={BRAND_LOGOS.nutritif} alt="Nutritif" className="h-4 w-auto" />
                      <span className="font-display font-semibold text-sm text-[#052d3d]">Nutrition</span>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li className="hover:text-[#0093cb] cursor-pointer">Fat Bases</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Caseinates</li>
                    </ul>

                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 pt-3">
                      <img src={BRAND_LOGOS.kremadel} alt="Kremadel" className="h-4 w-auto" />
                      <span className="font-display font-semibold text-sm text-[#052d3d]">Creaming Solutions</span>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li className="hover:text-[#0093cb] cursor-pointer">Non-dairy Creamer</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Instant Fat-filled Powder</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Beverage Whitener</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <img src={BRAND_LOGOS.liposharp} alt="Liposharp" className="h-4 w-auto" />
                      <span className="font-display font-semibold text-sm text-[#052d3d]">Functional Delivery Systems</span>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li className="hover:text-[#0093cb] cursor-pointer">Liposomes</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Phosphates</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Encapsulated Acids</li>
                    </ul>

                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 pt-3">
                      <img src={BRAND_LOGOS.frutinov} alt="Frutinov" className="h-4 w-auto" />
                      <span className="font-display font-semibold text-sm text-[#052d3d]">Natural Ingredients</span>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li className="hover:text-[#0093cb] cursor-pointer">Gum Arabic</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Fruit Powders</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <img src={BRAND_LOGOS.drytang} alt="Drytang" className="h-4 w-auto" />
                      <span className="font-display font-semibold text-sm text-[#052d3d]">Seasoning Ingredients</span>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li className="hover:text-[#0093cb] cursor-pointer">Tomato Powder</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Cheese Powder</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Hydrolyzed Vegetable Protein</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Tamarind Powder</li>
                    </ul>

                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 pt-3">
                      <span className="font-display font-semibold text-sm text-[#052d3d]">Natural Colorants</span>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600">
                      <li className="hover:text-[#0093cb] cursor-pointer">Beetroot Powder</li>
                      <li className="hover:text-[#0093cb] cursor-pointer">Caramel Powder</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <a href="#contract-manufacturing" className="hover:text-[#0093cb] transition-colors">Contract Manufacturing</a>
            <a href="#rd" className="hover:text-[#0093cb] transition-colors">R&amp;D</a>
            <a href="#about" className="hover:text-[#0093cb] transition-colors">About us</a>
            <a href="#careers" className="hover:text-[#0093cb] transition-colors">Careers</a>
            <a href="#contact" className="hover:text-[#0093cb] transition-colors">Contact us</a>
          </div>

          {/* Contact Button */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-6 py-3 rounded-full bg-[#0093cb] hover:bg-[#007cad] text-white text-sm font-semibold tracking-wide flex items-center gap-2 transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              <span>Contact us</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-800"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                <path d="M4 5h16"></path>
                <path d="M4 12h16"></path>
                <path d="M4 19h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-base font-medium">
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">Products</a>
            <a href="#contract-manufacturing" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">Contract Manufacturing</a>
            <a href="#rd" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">R&amp;D</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">About us</a>
            <a href="#careers" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">Careers</a>
            <button
              onClick={() => { setMobileMenuOpen(false); setContactModalOpen(true); }}
              className="w-full py-3 mt-4 rounded-full bg-[#0093cb] text-white text-center font-semibold text-sm"
            >
              Contact us
            </button>
          </div>
        )}
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-8 xl:px-14 bg-gradient-to-b from-[#052d3d] via-[#08465e] to-[#052d3d] text-white overflow-hidden text-center">
        
        {/* Background Image / Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url('https://www.drytechindia.com/assets/home/impact/background.jpg')` }}
        ></div>

        {/* Big Rotating Circular Gradient Vector from Drytech Design */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[674px] h-[340px] sm:h-[500px] md:h-[674px] pointer-events-none select-none">
          <svg 
            className="w-full h-full animate-spin-slow opacity-60" 
            viewBox="0 0 674 674" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              opacity="0.35" 
              d="M336.575 0.950166C151.217 0.95015 0.952135 151.404 0.952119 337C0.952103 522.596 151.217 673.05 336.575 673.05C521.934 673.05 672.198 522.596 672.198 337C672.198 151.404 521.934 0.950248 336.575 0.950166Z" 
              stroke="url(#paint0_linear_hero)" 
              strokeWidth="1.9"
            />
            <defs>
              <linearGradient id="paint0_linear_hero" x1="673.148" y1="337" x2="0.00167952" y2="337" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2889C" stopOpacity="0" />
                <stop offset="0.666756" stopColor="#F2889C" />
                <stop offset="0.755213" stopColor="#D6CB75" />
                <stop offset="0.850962" stopColor="#80D3F6" />
                <stop offset="1" stopColor="#80D3F6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          
          <div className="space-y-4">
            <h1 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.15] tracking-tight text-white">
              Helping customers create<br />
              <span className="font-bold">market-winning formulations</span><br />
              with <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-200">spray-dried innovation</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed">
              Explore high-quality spray-dried ingredients for F&amp;B, pharma &amp; nutritional applications, trusted by 1,000+ global brands for performance &amp; consistency at scale.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#products"
              className="px-8 py-4 rounded-full bg-[#0093cb] hover:bg-[#007cad] text-white text-sm font-semibold tracking-wide flex items-center gap-2 shadow-lg shadow-cyan-900/40 transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore products</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </a>

            <button
              onClick={() => setContactModalOpen(true)}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold tracking-wide backdrop-blur-xs transition-all cursor-pointer"
            >
              Contact us
            </button>
          </div>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SECTION: TRUSTED BY INDUSTRY LEADERS
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100 overflow-hidden">
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14 flex items-center justify-between mb-12">
          
          {/* Left Decorative Hatched Lines SVG */}
          <div className="hidden md:block">
            <svg className="w-[100px] lg:w-[130px] 2xl:w-[185px] shrink-0" viewBox="0 0 185 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M91.168 -217.516L325.202 6.15307" stroke="#6CC18E" />
              <path d="M81.4951 -207.395L315.529 16.2741" stroke="#80D3F6" />
              <path d="M71.8223 -197.273L418.831 134.366" stroke="#D6CB75" />
              <path d="M62.1494 -187.152L409.158 144.488" stroke="#FABB75" />
              <path d="M52.4766 -177.031L399.485 154.609" stroke="#F2889C" />
              <path d="M42.8037 -166.91L389.812 164.73" stroke="#6CC18E" />
              <path d="M33.1309 -156.789L380.139 174.851" stroke="#80D3F6" />
              <path d="M23.458 -146.668L370.467 184.972" stroke="#D6CB75" />
              <rect x="0.393904" y="0.393904" width="184.212" height="139.212" stroke="url(#paint_hatched_left)" strokeWidth="0.787807" />
              <defs>
                <linearGradient id="paint_hatched_left" x1="0" y1="70" x2="185" y2="70" gradientUnits="userSpaceOnUse">
                  <stop offset="0.125" stopColor="#F2889C" />
                  <stop offset="0.480769" stopColor="#D6CB75" />
                  <stop offset="0.850962" stopColor="#80D3F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="text-center mx-auto">
            <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-[#052d3d] tracking-tight">
              Trusted by <span className="font-bold">industry leaders</span>
            </h2>
          </div>

          {/* Right Decorative Hatched Lines SVG */}
          <div className="hidden md:block">
            <svg className="w-[100px] lg:w-[130px] 2xl:w-[185px] shrink-0 transform scale-x-[-1]" viewBox="0 0 185 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M91.168 -217.516L325.202 6.15307" stroke="#6CC18E" />
              <path d="M81.4951 -207.395L315.529 16.2741" stroke="#80D3F6" />
              <path d="M71.8223 -197.273L418.831 134.366" stroke="#D6CB75" />
              <path d="M62.1494 -187.152L409.158 144.488" stroke="#FABB75" />
              <path d="M52.4766 -177.031L399.485 154.609" stroke="#F2889C" />
              <rect x="0.393904" y="0.393904" width="184.212" height="139.212" stroke="url(#paint_hatched_right)" strokeWidth="0.787807" />
              <defs>
                <linearGradient id="paint_hatched_right" x1="0" y1="70" x2="185" y2="70" gradientUnits="userSpaceOnUse">
                  <stop offset="0.125" stopColor="#F2889C" />
                  <stop offset="0.480769" stopColor="#D6CB75" />
                  <stop offset="0.850962" stopColor="#80D3F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

        </div>

        {/* Client Logos Marquee Row 1 */}
        <div className="relative w-full overflow-hidden flex items-center mb-6">
          <div className="animate-marquee flex items-center gap-12 sm:gap-16 whitespace-nowrap">
            {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, idx) => (
              <div key={idx} className="h-12 sm:h-14 w-32 sm:w-40 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all">
                <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos Marquee Row 2 (Reverse) */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee-reverse flex items-center gap-12 sm:gap-16 whitespace-nowrap">
            {CLIENT_LOGOS.slice().reverse().concat(CLIENT_LOGOS).map((logo, idx) => (
              <div key={idx} className="h-12 sm:h-14 w-32 sm:w-40 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all">
                <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECTION: A GROWING LEGACY IN SPRAY-DRIED INGREDIENTS
      ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 sm:py-28 max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-[46px] leading-[1.18] text-[#052d3d] tracking-tight">
              A growing legacy<br />
              <span className="font-bold">in spray-dried ingredients</span>
            </h2>

            <div className="space-y-4 text-slate-600 text-[15px] sm:text-base leading-relaxed font-normal">
              <p>
                Welcome to <strong>Drytech</strong>—your partner for steadfast and versatile spray-dried ingredients.
              </p>
              <p>
                We have been shaping and enriching consumer experiences with innovation and consistency <strong>since 1992</strong>. With more than <strong>50 high-quality spray-dried ingredients</strong>, we address the formulation needs of our customers <strong>across 52+ countries</strong>.
              </p>
              <p>
                Our team’s drive for value-added solutions, coupled with a commitment to purity and sustainability, has enabled us to become a global leader in the spray-dried specialty ingredients space.
              </p>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setContactModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-[#0093cb] hover:bg-[#007cad] text-white text-sm font-semibold tracking-wide flex items-center gap-2 shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
              >
                <span>Know more</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column Bento Metrics Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Bento 1: 50 acre manufacturing unit with Unit 1 & Unit 2 */}
            <div className="relative rounded-2xl overflow-hidden min-h-[260px] bg-slate-900 group shadow-md">
              <img 
                src={STATS_IMAGES.unit} 
                alt="50 acre manufacturing unit" 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button 
                  onClick={() => setActiveUnit(1)} 
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all ${activeUnit === 1 ? 'bg-[#0093cb] text-white' : 'bg-black/50 text-slate-300'}`}
                >
                  Unit 1
                </button>
                <button 
                  onClick={() => setActiveUnit(2)} 
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all ${activeUnit === 2 ? 'bg-[#0093cb] text-white' : 'bg-black/50 text-slate-300'}`}
                >
                  Unit 2
                </button>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-white">50</div>
                <div className="text-sm font-semibold tracking-wide text-cyan-200 mt-1">acre manufacturing unit</div>
              </div>
            </div>

            {/* Bento 2: 1500+ happy customers worldwide */}
            <div className="relative rounded-2xl overflow-hidden min-h-[260px] bg-slate-900 group shadow-md">
              <img 
                src={STATS_IMAGES.customers} 
                alt="1500+ happy customers worldwide" 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-white">1,500<span className="text-cyan-400">+</span></div>
                <div className="text-sm font-semibold tracking-wide text-cyan-200 mt-1">happy customers worldwide</div>
              </div>
            </div>

            {/* Bento 3: 100000 MT p.a. production capacity */}
            <div className="sm:col-span-2 relative rounded-2xl overflow-hidden min-h-[260px] bg-slate-900 group shadow-md">
              <img 
                src={STATS_IMAGES.factory} 
                alt="100,000 MT p.a. production capacity" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white z-10 max-w-md">
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-white">100,000 <span className="text-xl sm:text-2xl font-medium text-cyan-300">MT p.a.</span></div>
                <div className="text-sm font-semibold tracking-wide text-slate-200 mt-1">production capacity (spray-dried ingredients)</div>
              </div>
            </div>

            {/* Bento 4: 15 million PET jars */}
            <div className="relative rounded-2xl overflow-hidden min-h-[260px] bg-slate-900 group shadow-md">
              <img 
                src={STATS_IMAGES.products} 
                alt="15 million PET jars" 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-white">15 <span className="text-lg font-medium text-cyan-300">million</span></div>
                <div className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 mt-1">PET jars p.a. capacity for infant &amp; clinical nutrition</div>
              </div>
            </div>

            {/* Bento 5: 65 million liters UHT beverages */}
            <div className="relative rounded-2xl overflow-hidden min-h-[260px] bg-slate-900 group shadow-md">
              <img 
                src={STATS_IMAGES.drinks} 
                alt="65 million liters UHT beverages" 
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-white">65 <span className="text-lg font-medium text-cyan-300">million</span></div>
                <div className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 mt-1">liters p.a. packing capacity for UHT beverages</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SECTION: DRIVEN BY VERSATILITY, CURATED FOR VALUE
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#f7f7f7] border-t border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-[46px] leading-tight text-[#052d3d] tracking-tight">
                Driven by <span className="font-bold">versatility</span>, curated for <span className="font-bold">value</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-2">
                Applications across <strong className="text-slate-900">food, pharma,</strong> and <strong className="text-slate-900">beyond</strong>.
              </p>
            </div>

            {/* Arrow Controls using exact SVGs from prompt */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollVersatility('left')}
                className="w-12 h-12 rounded-full bg-white border border-slate-300 hover:border-[#0093cb] hover:text-[#0093cb] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                title="Scroll Left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left w-6 h-6">
                  <path d="M6 8L2 12L6 16"></path>
                  <path d="M2 12H22"></path>
                </svg>
              </button>

              <button
                onClick={() => scrollVersatility('right')}
                className="w-12 h-12 rounded-full bg-white border border-slate-300 hover:border-[#0093cb] hover:text-[#0093cb] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                title="Scroll Right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right w-6 h-6">
                  <path d="M18 8L22 12L18 16"></path>
                  <path d="M2 12H22"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Slider */}
          <div 
            ref={versatilityScrollRef}
            className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory"
          >
            {VERSATILITY_ITEMS.map((item, idx) => (
              <div 
                key={idx}
                className="w-[300px] sm:w-[360px] shrink-0 bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-cyan-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group snap-start"
              >
                <div>
                  <div className="h-[230px] w-full overflow-hidden bg-slate-100">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-display font-bold text-xl text-[#052d3d] group-hover:text-[#0093cb] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setContactModalOpen(true)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#0093cb] hover:text-[#007cad] flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore formulations</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. SECTION: TRANSFORMING CUSTOMER NEEDS INTO MARKET BREAKTHROUGHS
      ───────────────────────────────────────────────────────────── */}
      <section id="products" className="py-24 max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading, Paragraphs & Product Selector List */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-[46px] leading-[1.18] text-[#052d3d] tracking-tight">
                Transforming<br />
                <span className="font-bold">customer needs</span> into<br />
                <span className="font-bold text-[#0093cb]">market breakthroughs</span>
              </h2>

              <div className="mt-4 space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Ever-changing market trends and consumer needs are redefining markets globally. With sustainable choices, health consciousness, and stringent regulations, customer acquisition and retention for brands are more difficult than ever.
                </p>
                <p>
                  At <strong>Drytech</strong>, we convert these challenges into market-winning formulations for customers with our <strong>spray-dried ingredients</strong>. We transform raw ingredients into stable, functional powders that deliver great experiences at scale with a sharp focus on versatility, market trends, and consumer preferences.
                </p>
              </div>
            </div>

            {/* Interactive Product Selection Pills Grid */}
            <div className="space-y-3">
              <div className="text-xs uppercase font-mono tracking-widest text-slate-500 font-semibold">Select Formulation:</div>
              <div className="flex flex-wrap gap-2">
                {PRODUCTS_DATA.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProductIndex(idx)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      selectedProductIndex === idx
                        ? 'bg-[#0093cb] text-white shadow-md shadow-cyan-600/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {prod.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Featured Product Card / Bowl Display */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 rounded-3xl bg-gradient-to-br from-cyan-50/70 to-blue-50/50 border border-cyan-100 p-8 sm:p-10 shadow-xl space-y-6 text-center">
              
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
                {/* Rotating subtle halo */}
                <div className="absolute inset-0 rounded-full border border-cyan-200/60 animate-spin-slow"></div>
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.name}
                  className="w-56 h-56 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-white font-bold text-[#0093cb] shadow-2xs">
                  Spray-Dried Specialty
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#052d3d]">
                  {selectedProduct.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                  {selectedProduct.desc}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-[#0093cb] hover:bg-[#007cad] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mx-auto shadow-md transition-all cursor-pointer"
                >
                  <span>Know more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SECTION: BEYOND INGREDIENTS. FOR IMPACT.
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#052d3d] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14">
          
          <div className="max-w-3xl space-y-4 mb-16">
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-[46px] leading-tight text-white tracking-tight">
              Beyond ingredients.<br />
              <span className="font-bold text-cyan-300">For impact.</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              When you share a challenge with us, we see beyond products. We aim to create <strong className="text-white">memorable experiences</strong> and <strong className="text-white">associations</strong>—the building blocks of lasting brand equity.
            </p>
          </div>

          {/* 4 Impact Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {IMPACT_CARDS.map((card, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xs hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-64 sm:h-72 w-full overflow-hidden bg-black/30">
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 sm:p-8 space-y-3">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {card.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {card.desc}
                    </p>

                    {card.metrics && (
                      <div className="pt-2 space-y-2 text-xs font-medium text-cyan-200">
                        {card.metrics.map((m, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <button 
                    onClick={() => setContactModalOpen(true)}
                    className="text-xs font-semibold uppercase tracking-wider text-cyan-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Read more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. SECTION: A NEVER-FADING COMMITMENT TO TRUST & COMPLIANCE
      ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-[46px] text-[#052d3d] tracking-tight">
              A never-fading commitment<br />
              <span className="font-bold">to trust and compliance</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Certified by premier international standards to ensure quality, safety, and traceability.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center">
            
            <div className="flex items-center justify-center border border-slate-200 rounded-xl p-6 h-28 hover:shadow-md transition-all">
              <img 
                src="https://www.drytechindia.com/_next/image?url=%2Fassets%2Fhome%2Ftrused-by%2Ffssai.png&w=384&q=95" 
                alt="FSSAI" 
                className="max-h-12 w-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-center border border-slate-200 rounded-xl p-6 h-28 hover:shadow-md transition-all">
              <img 
                src="https://www.drytechindia.com/_next/image?url=%2Fassets%2Fhome%2Ftrused-by%2Fiso-9001.png&w=384&q=95" 
                alt="ISO 9001" 
                className="max-h-12 w-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-center border border-slate-200 rounded-xl p-6 h-28 hover:shadow-md transition-all">
              <span className="font-display font-bold text-sm text-[#052d3d] tracking-wider">ISO 14001</span>
            </div>

            <div className="flex items-center justify-center border border-slate-200 rounded-xl p-6 h-28 hover:shadow-md transition-all">
              <span className="font-display font-bold text-sm text-[#052d3d] tracking-wider">ISO 22000</span>
            </div>

            <div className="flex items-center justify-center border border-slate-200 rounded-xl p-6 h-28 hover:shadow-md transition-all">
              <span className="font-display font-bold text-sm text-[#052d3d] tracking-wider">HACCP</span>
            </div>

            <div className="flex items-center justify-center border border-slate-200 rounded-xl p-6 h-28 hover:shadow-md transition-all">
              <span className="font-display font-bold text-sm text-[#052d3d] tracking-wider">HALAL &amp; KOSHER</span>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. SECTION: GIVE YOUR PRODUCTS THE EDGE OF INNOVATION (CTA)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-gradient-to-b from-[#052d3d] to-[#08465e] text-white text-center relative overflow-hidden">
        
        {/* Animated Circular Gradient Rings from Drytech */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] pointer-events-none select-none">
          <svg 
            className="w-full h-full animate-spin-slow opacity-40" 
            viewBox="0 0 674 674" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M337.427 0.554719C151.849 0.554703 1.40819 151.186 1.40817 337C1.40816 522.814 151.849 673.445 337.427 673.445C523.004 673.445 673.445 522.814 673.445 337C673.445 151.186 523.004 0.554801 337.427 0.554719Z" 
              stroke="url(#paint0_cta)" 
              strokeWidth="1.10911"
            />
            <defs>
              <linearGradient id="paint0_cta" x1="674" y1="337" x2="0.853242" y2="337" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2889C" stopOpacity="0" />
                <stop offset="0.125" stopColor="#F2889C" />
                <stop offset="0.480769" stopColor="#D6CB75" />
                <stop offset="0.850962" stopColor="#80D3F6" />
                <stop offset="1" stopColor="#80D3F6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-8">
          <h2 className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Give your products the<br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-200">
              edge of innovation
            </span>
          </h2>

          <div className="pt-2">
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-10 py-4 rounded-full bg-[#0093cb] hover:bg-[#007cad] text-white text-base font-semibold tracking-wide shadow-xl shadow-cyan-900/50 hover:shadow-cyan-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Contact us
            </button>
          </div>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#052d3d] text-slate-300 text-xs border-t border-cyan-950">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14 py-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            
            {/* Col 1: Logo & Company Address */}
            <div className="lg:col-span-4 space-y-6">
              <img 
                src={LOGO_WHITE} 
                alt="Drytech Logo" 
                className="h-10 w-auto object-contain"
              />

              <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                <div>
                  <strong className="text-white block font-medium">Drytech Processes (India) Private Limited</strong>
                  <div className="text-slate-400 mt-1">Corporate Office:</div>
                  <div>T/13-14, ‘B’ Wing, 3rd Floor, Pinnacle Business Park, Mahakali Caves Road, Andheri East, Mumbai, Maharashtra—400093.</div>
                </div>

                <div className="space-y-1">
                  <div><strong className="text-white">Email:</strong> <a href="mailto:marketing@drytechindia.com" className="text-cyan-300 hover:underline">marketing@drytechindia.com</a></div>
                  <div><strong className="text-white">Phone:</strong> +91 22 6859 24 01/03</div>
                </div>

                <div className="pt-2 border-t border-cyan-900/60">
                  <div className="text-slate-400">Manufacturing Unit:</div>
                  <div>Nagpur Road, Pandhurna, Madhya Pradesh—480334.</div>
                  <div><strong className="text-white">Phone:</strong> +91 97 5241 34 26/27/47</div>
                </div>
              </div>

              {/* Social Icons from Prompt */}
              <div className="pt-2 flex items-center gap-4">
                <a 
                  href="https://www.linkedin.com/company/drytech-processes-india-pvt-ltd/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-cyan-600 flex items-center justify-center text-white transition-colors"
                  title="LinkedIn"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>

                <a 
                  href="https://www.facebook.com/drytechprocesses" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-cyan-600 flex items-center justify-center text-white transition-colors"
                  title="Facebook"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h5 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-cyan-200">
                Quick Links
              </h5>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-cyan-300 transition-colors">Home</a></li>
                <li><a href="#contract-manufacturing" className="hover:text-cyan-300 transition-colors">Contract Manufacturing</a></li>
                <li><a href="#rd" className="hover:text-cyan-300 transition-colors">R&amp;D</a></li>
                <li><a href="#about" className="hover:text-cyan-300 transition-colors">About Us</a></li>
                <li><a href="#careers" className="hover:text-cyan-300 transition-colors">Careers</a></li>
                <li><a href="#contact" onClick={() => setContactModalOpen(true)} className="hover:text-cyan-300 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Col 3: Products Part 1 */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-cyan-200">
                Nutrition &amp; Creaming
              </h5>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Fat Bases</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Caseinates</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Non-dairy Creamer</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Instant Fat-filled Powder</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Beverage Whitener</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Liposomes &amp; Delivery Systems</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Functional Phosphates</a></li>
              </ul>
            </div>

            {/* Col 4: Products Part 2 */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-display font-semibold text-white text-sm uppercase tracking-wider text-cyan-200">
                Ingredients &amp; Seasonings
              </h5>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Gum Arabic Powders</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Pure Fruit Powders</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Tomato Powder</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Cheese Powder</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Hydrolyzed Vegetable Protein</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Tamarind Powder</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Natural Colorants (Beetroot/Caramel)</a></li>
              </ul>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-cyan-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
            <div>
              &copy; 2026 Drytech Processes (India) Private Limited. All Rights Reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-cyan-300 transition-colors">Privacy Policy</a>
              <span>·</span>
              <a href="#" className="hover:text-cyan-300 transition-colors">Terms of Use</a>
              <span>·</span>
              <a href="#" className="hover:text-cyan-300 transition-colors">Sitemap</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          CONTACT MODAL
      ───────────────────────────────────────────────────────────── */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 relative max-h-[92vh] overflow-y-auto shadow-2xl">
            
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0093cb] font-bold">
                Drytech Global Trade
              </span>
              <h3 className="font-display font-bold text-2xl text-[#052d3d] mt-1">
                Get in touch with us
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Speak to our formulation specialists for custom spray-dried solutions and sample requests.
              </p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! Your inquiry has been recorded.');
                setContactModalOpen(false);
              }}
              className="space-y-4 pt-2"
            >
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. David Richardson" 
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">Company</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Global Foods Ltd." 
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">Email *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="procurement@brand.com" 
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">Product Area of Interest</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600 bg-white">
                  <option>Nutrition &amp; Fat Bases</option>
                  <option>Creaming Solutions &amp; Dairy Whiteners</option>
                  <option>Functional Liposomes &amp; Delivery Systems</option>
                  <option>Spray-Dried Gum Arabic</option>
                  <option>Seasoning Powders (Tomato, Cheese, HVP)</option>
                  <option>Contract Manufacturing &amp; Spray Drying</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">Your Requirements / Message *</label>
                <textarea 
                  rows={3} 
                  required 
                  placeholder="Tell us about your formulation goals, desired quantities, or technical specs." 
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#0093cb] hover:bg-[#007cad] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Submit Inquiry
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
