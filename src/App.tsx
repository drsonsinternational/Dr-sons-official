import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Copy, 
  Mail, 
  ArrowRight, 
  MessageSquare, 
  ExternalLink,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award,
  Factory,
  Droplet,
  Flame,
  Leaf,
  Package,
  Layers,
  Search,
  Menu,
  X,
  ChevronRight,
  Clock,
  TrendingUp,
  Globe,
  Users,
  FileText,
  Send,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'dehydrated' | 'concentrates' | 'dairy' | 'water';
  tagline: string;
  description: string;
  forms: string[];
  shelfLife: string;
  applications: string[];
  features: string[];
  badge?: string;
  imageColor: string;
}

const PRODUCTS: ProductItem[] = [
  // Dehydrated Vegetables & Herbs
  {
    id: 'onion',
    name: 'Dehydrated Onion',
    hindiName: 'निर्जलित प्याज (Onion Powder & Flakes)',
    category: 'dehydrated',
    tagline: '100% Natural, Pungent & Pure',
    description: 'Produced from selected high-solid white and red onions through controlled low-temperature dehydration. Retains intense natural flavor, pungency, and vital nutrients without sulfur dioxide or chemical preservatives.',
    forms: ['Fine Powder (80-100 Mesh)', 'Minced (1-3mm)', 'Chopped / Granules', 'Toasted & Fried Flakes'],
    shelfLife: '12 Months (Moisture < 5%)',
    applications: ['Seasoning & Spice Mixes', 'Instant Noodles & Soups', 'Gravies & Curries', 'Extruded Snacks'],
    features: ['Zero Preservatives', 'No Clumping', 'Instant Rehydration', 'High Pungency Index'],
    badge: 'High Demand',
    imageColor: 'from-amber-100 to-orange-100 border-amber-200 text-amber-800'
  },
  {
    id: 'garlic',
    name: 'Dehydrated Garlic',
    hindiName: 'निर्जलित लहसुन (Garlic Powder & Flakes)',
    category: 'dehydrated',
    tagline: 'Authentic Aroma & High Allicin Retention',
    description: 'Hygienically peeled, graded, and dehydrated garlic cloves engineered for industrial seasoning blends, spice tastemakers, and culinary convenience.',
    forms: ['Fine Powder (100 Mesh)', 'Granules (40-60 Mesh)', 'Minced', 'Flakes'],
    shelfLife: '12 Months',
    applications: ['Sauces & Ketchups', 'Marinades & Rubs', 'Garlic Breads & Bakery', 'Chutneys & Pickles'],
    features: ['High Allicin Content', '100% Natural Garlic', 'Rich Pungent Aroma', 'Consistent Color'],
    badge: 'Popular',
    imageColor: 'from-yellow-100 to-amber-100 border-yellow-200 text-amber-900'
  },
  {
    id: 'tomato',
    name: 'Spray-Dried & Dehydrated Tomato',
    hindiName: 'टमाटर पाउडर (Tomato Powder)',
    category: 'dehydrated',
    tagline: 'Vibrant Natural Lycopene & Tangy Flavor',
    description: 'Manufactured from ripe, field-fresh farm tomatoes. Offers excellent flowability, authentic red coloration, and rich umami acidity for commercial soup bases and snack coatings.',
    forms: ['Spray Dried Soluble Powder', 'Dehydrated Tomato Powder', 'Tomato Flakes (1-2mm)'],
    shelfLife: '12 Months',
    applications: ['Snack Seasonings & Chips', 'Instant Tomato Soups', 'Pasta & Pizza Sauces', 'Dry Premixes'],
    features: ['Natural Red Color', '100% Soluble Options', 'Balanced Sweet & Sour Acidity', 'Non-GMO'],
    badge: 'Best Seller',
    imageColor: 'from-rose-100 to-red-100 border-rose-200 text-red-800'
  },
  {
    id: 'ginger',
    name: 'Dehydrated Ginger',
    hindiName: 'अदरक पाउडर (Ginger Powder / Sonth)',
    category: 'dehydrated',
    tagline: 'High Gingerol Content & Warm Pungency',
    description: 'Pure sun-sorted and oven-dehydrated ginger root powder, pulverized to precise micrometric fineness for pharmaceutical, tea premixes, and culinary formulations.',
    forms: ['Fine Micronized Powder', 'Crushed / Flakes'],
    shelfLife: '12 Months',
    applications: ['Chai Masala & Tea Bags', 'Bakery & Gingerbread', 'Ayurvedic Formulations', 'Curry Powders'],
    features: ['Potent Bioactive Zingiberene', 'Clean White-Yellow Tint', 'Low Fiber Residue', 'Export Quality'],
    imageColor: 'from-stone-100 to-amber-100 border-amber-200 text-amber-800'
  },
  {
    id: 'chilli',
    name: 'Green & Red Chilli Powder',
    hindiName: 'हरी व लाल मिर्च पाउडर (Chilli Powder & Flakes)',
    category: 'dehydrated',
    tagline: 'Standardized Heat Units & Vivid Color',
    description: 'Dehydrated green and red chillies with standardized SHU capsaicin ratings, suitable for pizza flakes, spicy snack coatings, and export seasoning formulas.',
    forms: ['Crushed Chilli Flakes', 'Fine Powder (80 Mesh)'],
    shelfLife: '12 Months',
    applications: ['Pizza & Pasta Seasonings', 'Namkeen & Savory Snacks', 'Pickles & Relishes'],
    features: ['Controlled SHU Heat', 'Vibrant Natural Color', 'Sterilized & Microbe-Tested'],
    imageColor: 'from-emerald-100 to-green-100 border-emerald-200 text-emerald-800'
  },
  {
    id: 'vegetable-powders',
    name: 'Superfood & Veg Powders (Beetroot, Spinach, Carrot, Moringa)',
    hindiName: 'सुपरफूड व सब्जी पाउडर (Beetroot, Spinach, Moringa)',
    category: 'dehydrated',
    tagline: 'Nutrient-Dense Natural Colorants & Fortifiers',
    description: 'Comprehensive library of specialty dehydrated vegetable powders including Beetroot (vivid natural pink/red), Spinach & Mint (chlorophyll green), Carrot (beta-carotene), and Moringa.',
    forms: ['Ultra-Fine Soluble Powder (100 Mesh)'],
    shelfLife: '12 Months',
    applications: ['Health Supplements & Shakes', 'Bakery Natural Coloring', 'Baby & Infant Foods', 'Smoothies & Beverages'],
    features: ['100% Plant-Based', 'Zero Artificial Dyes', 'Vitamin & Mineral Retention', 'Gentle Dehydration'],
    badge: 'Superfood',
    imageColor: 'from-fuchsia-100 to-purple-100 border-purple-200 text-purple-900'
  },

  // Concentrates & Squashes
  {
    id: 'concentrates',
    name: 'Fruit & Vegetable Concentrates',
    hindiName: 'फल व सब्जी का अर्क (Fruit Concentrates)',
    category: 'concentrates',
    tagline: 'High Brix Pure Fruit Extracts for Commercial Beverages',
    description: 'Concentrated purees and clarified juices from mango, guava, citrus, and tomato. Produced under vacuum evaporation to preserve true volatile aroma profiles for commercial bottlers.',
    forms: ['High Brix Paste (28-36° Brix)', 'Clarified Liquid Concentrate', 'Aseptic Bag-in-Box / Drums'],
    shelfLife: '18 Months (Aseptic Cold Storage)',
    applications: ['Juice & Nectar Bottling', 'Jams & Fruit Fillings', 'Confectionery Centers', 'Flavored Yogurts'],
    features: ['Standardized Brix', 'Preserved Fruit Aromatics', 'Aseptic Bulk Packaging', 'Export Compliant'],
    imageColor: 'from-amber-100 to-yellow-200 border-amber-300 text-amber-900'
  },
  {
    id: 'squashes-starch',
    name: 'Commercial Squashes & Natural Starches',
    hindiName: 'स्क्वैश व शुद्ध स्टार्च (Squashes & Pure Starch)',
    category: 'concentrates',
    tagline: 'Traditional Formulations & Functional Texturizers',
    description: 'High-yield commercial squash cordials and extracted natural starches engineered for food consistency, binding, and refreshing domestic and institutional beverage supply.',
    forms: ['Commercial Liquid Squash Premix', 'Refined Starch Powder (Food Grade)'],
    shelfLife: '12-18 Months',
    applications: ['Hospitality & Caterers', 'Instant Refreshment Drinks', 'Texturizing & Binding in Foods'],
    features: ['High Dilution Ratio', 'Consistent Viscosity', 'Pure Extraction Process'],
    imageColor: 'from-cyan-100 to-blue-100 border-cyan-200 text-cyan-900'
  },

  // Dairy Formulations
  {
    id: 'dairy-powders',
    name: 'Commercial Dairy Formulations & Powders',
    hindiName: 'डेयरी पाउडर व फॉर्मूलेशन (Dairy Formulations Library)',
    category: 'dairy',
    tagline: '100+ Commercial Dairy Concepts for FMCG & Ice Cream',
    description: 'Comprehensive commercial dairy formulations library covering Skimmed Milk Powder (SMP), Whole Milk Powder (WMP), dairy whiteners, and specialized functional bases.',
    forms: ['Agglomerated Instant Powder', 'Standard Spray Dried Dairy Base', 'Bulk 25kg Kraft Bags'],
    shelfLife: '12 Months',
    applications: ['Ice Cream & Frozen Desserts', 'Flavoured Milk & Shakes', 'Bakery & Confectionery', 'Chocolates & Fillings'],
    features: ['Consistent Protein & Fat Content', 'Superb Emulsification', 'Smooth Creamy Mouthfeel', 'Hygienic Spray Drying'],
    badge: '100+ Formulations',
    imageColor: 'from-sky-100 to-indigo-100 border-sky-200 text-sky-900'
  },
  {
    id: 'icecream-beverages',
    name: 'Ice Cream Mixes & Flavoured Milk Bases',
    hindiName: 'आइसक्रीम मिक्स व पेय आधार (Ice Cream Bases)',
    category: 'dairy',
    tagline: 'Complete Turnkey Formulations for Dairies & Parlors',
    description: 'Ready-to-use stabilizer blends, ice cream soft-serve bases, yogurt cultures, and flavored beverage mixes engineered for commercial scale processing.',
    forms: ['Dry Premix Powder', 'Concentrated Liquid Dairy Base'],
    shelfLife: '9-12 Months',
    applications: ['Soft Serve & Hard Scoop Ice Cream', 'Flavoured Milk Plants', 'Yogurt & Lassi Manufacturing'],
    features: ['High Overrun Stability', 'Heat-Shock Resistance', 'Clean Flavor Release'],
    imageColor: 'from-blue-100 to-teal-100 border-teal-200 text-teal-900'
  },

  // Packaged Drinking Water
  {
    id: 'packaged-water',
    name: 'Packaged Drinking Water & Beverage Bottling',
    hindiName: 'पैकेज्ड ड्रिंकिंग वाटर (Packaged Drinking Water)',
    category: 'water',
    tagline: 'Multi-Stage RO, UV & Ozonated Mineral Water',
    description: 'Processed at our Bhojpur (Agra) manufacturing facility through multi-barrier micron filtration, reverse osmosis, UV irradiation, and ozonation. Bottled under sterile conditions for Uttar Pradesh and neighboring states.',
    forms: ['20L Institutional Jars', '1000ml / 500ml Retail PET Bottles', '250ml Event Cups'],
    shelfLife: '6 Months',
    applications: ['State & Regional Supply', 'Horeca & Corporate Distribution', 'Retail FMCG Distribution', 'Events & Hospitality'],
    features: ['Balanced Essential Minerals (TDS Calibrated)', 'Bacteriologically Tested Daily', 'Zero Odor & Crystal Pure Taste', 'State Certified & Compliant'],
    badge: 'Regional Distribution',
    imageColor: 'from-sky-100 to-cyan-100 border-cyan-200 text-cyan-900'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dehydrated' | 'concentrates' | 'dairy' | 'water'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [activeApplicationTab, setActiveApplicationTab] = useState<'snacks' | 'instant' | 'dairy' | 'bakery'>('snacks');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    category: 'Dehydrated Vegetable & Fruit Powders',
    volume: '1 - 5 Metric Tons',
    packaging: 'Commercial 25kg Bulk Food Grade Bags',
    location: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filtered products
  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.message) return;

    const messageLines = [
      `*🌟 Commercial Inquiry - D.R. and Sons International Pvt. Ltd.*`,
      `*Client:* ${formData.fullName}`,
      `*Company:* ${formData.company || 'Not Specified'}`,
      `*Phone:* ${formData.phone}`,
      `*Email:* ${formData.email || 'N/A'}`,
      `*Location:* ${formData.location || 'India'}`,
      `*Product Category:* ${formData.category}`,
      `*Target Volume:* ${formData.volume}`,
      `*Packaging Preference:* ${formData.packaging}`,
      `*Specifications & Requirements:*`,
      `${formData.message}`,
      `---`,
      `_Sent from drsonsinternational.com official portal_`
    ];

    const encoded = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/919411268879?text=${encoded}`;
    
    setFormSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  const handleQuickProductInquiry = (product: ProductItem) => {
    setFormData(prev => ({
      ...prev,
      category: product.name,
      message: `I am interested in receiving technical specifications, COA, and commercial quotes for ${product.name} (${product.tagline}). Target requirements: `
    }));
    setSelectedProduct(null);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#0093cb] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          TOP ANNOUNCEMENT / CORPORATE CREDENTIALS BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#052d3d] text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-cyan-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              FMCG &amp; Commercial Processing
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              Manufacturing Facility: Village- Bhojpur, Kagarol, Tahsil- Kheragarh, Agra (UP) - 283119
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs font-mono">
            <a 
              href="https://wa.me/919411268879" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +91 9411268879</span>
            </a>
            <span className="text-slate-600">·</span>
            <a 
              href="mailto:contact@drsonsinternational.com" 
              className="text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">contact@drsonsinternational.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STICKY HEADER / NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Legal Entity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0093cb] to-[#052d3d] flex items-center justify-center text-white shadow-md shadow-cyan-900/10 p-2">
              <Factory className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl sm:text-2xl text-[#052d3d] tracking-tight leading-none group-hover:text-[#0093cb] transition-colors">
                DrSons <span className="text-[#0093cb]">International</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-1">
                D.R. and Sons International Pvt. Ltd.
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a href="#about" className="hover:text-[#0093cb] transition-colors">About Us</a>
            <a href="#products" className="hover:text-[#0093cb] transition-colors">Product Verticals</a>
            <a href="#process" className="hover:text-[#0093cb] transition-colors">Manufacturing Process</a>
            <a href="#applications" className="hover:text-[#0093cb] transition-colors">Applications</a>
            <a href="#distributor" className="hover:text-[#0093cb] transition-colors">Dealership Program</a>
            <a href="#certifications" className="hover:text-[#0093cb] transition-colors">Quality &amp; Safety</a>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://wa.me/919411268879" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-2xs hover:bg-emerald-50/50"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-[#0093cb] hover:bg-[#007cad] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              <span>Commercial Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-slate-700 hover:text-cyan-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-sm font-medium">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-800 hover:text-cyan-600 border-b border-slate-100"
            >
              About Company
            </a>
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-800 hover:text-cyan-600 border-b border-slate-100"
            >
              Product Verticals
            </a>
            <a 
              href="#process" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-800 hover:text-cyan-600 border-b border-slate-100"
            >
              5-Stage Manufacturing Process
            </a>
            <a 
              href="#applications" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-800 hover:text-cyan-600 border-b border-slate-100"
            >
              Commercial Applications
            </a>
            <a 
              href="#distributor" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-800 hover:text-cyan-600 border-b border-slate-100"
            >
              Pan-India Dealership Program
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); setInquiryModalOpen(true); }}
                className="w-full py-3 bg-[#0093cb] text-white text-center rounded-lg text-xs font-semibold uppercase tracking-wider"
              >
                Send Commercial Inquiry
              </button>
              <a
                href="https://wa.me/919411268879"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 border border-emerald-600 text-emerald-700 text-center rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Open WhatsApp (+91 9411268879)</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (High-Impact Industrial Precision)
      ───────────────────────────────────────────────────────────── */}
      <header className="relative bg-gradient-to-b from-[#052d3d] via-[#08465e] to-[#005f85] text-white pt-16 pb-24 px-4 sm:px-8 overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3dc8ff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        {/* Glowing backdrop blur spots */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Kicker badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-medium tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Commercial Manufacturing &amp; Global Export Standards</span>
              </div>

              {/* Main Headline (Inspired by Design Reference) */}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-white">
                Helping brands create market-winning formulations with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-300">precision ingredients</span>.
              </h1>

              {/* Company descriptive lead */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                <strong>Dropa Ramgopal &amp; Sons International Private Limited</strong> is a premier industrial manufacturer based in Agra (UP), specializing in 100% natural dehydrated vegetable &amp; fruit powders, concentrates, starch, commercial dairy formulations, and packaged drinking water for Pan-India supply and international export.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#products"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00b7ff] to-[#0093cb] hover:from-[#3dc8ff] hover:to-[#007cad] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-900/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Explore Product Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 backdrop-blur-sm transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-300" />
                  <span>Request Specifications</span>
                </button>

                <a
                  href="https://wa.me/919411268879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white transition-colors ml-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Trade Desk: 9411268879</span>
                </a>
              </div>

              {/* Bullet highlights */}
              <div className="pt-4 border-t border-cyan-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>100% Natural Purity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>12-Month Shelf Life</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Zero Preservatives</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>FSSAI Compliant</span>
                </div>
              </div>

            </div>

            {/* Right Visual Card: Manufacturing Hub Overview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-200">
                      Operational Plant Profile
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300">Agra, UP, India</span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="p-4 rounded-xl bg-black/25 border border-white/10">
                    <div className="text-[11px] text-cyan-300 uppercase font-mono tracking-wider">Registered Entity</div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      Dropa Ramgopal and Sons International Pvt. Ltd.
                    </div>
                    <div className="text-xs text-slate-300 mt-1 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Village- Bhojpur, P.O.- Kagarol, Tahsil- Kheragarh, Agra (UP) - 283119</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-bold font-display text-white">100+</div>
                      <div className="text-[11px] text-slate-300 font-medium mt-0.5">Commercial Formulations</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl font-bold font-display text-white">&lt; 5%</div>
                      <div className="text-[11px] text-slate-300 font-medium mt-0.5">Residual Moisture Target</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 border border-emerald-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-300">Pan-India &amp; Global Supply</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Active</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Equipped for high-volume contract packaging (25kg bags, bulk drums) and retail private labeling with guaranteed batch consistency.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-[#00b7ff] hover:bg-[#3dc8ff] text-[#052d3d] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Initiate Commercial Trade Inquiry</span>
                </button>

              </div>
            </div>

          </div>
        </div>

      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. INDUSTRY SECTORS & CLIENT TRUST MARQUEE
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-200 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-3 text-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 font-mono">
            Supplying Food Processors · Institutional Exporters · FMCG Brands · Regional Distributorships
          </p>
        </div>

        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee flex items-center gap-10 whitespace-nowrap text-slate-600 text-sm font-semibold tracking-wide">
            <span className="flex items-center gap-2"><Leaf className="w-4 h-4 text-emerald-600" /> Seasoning &amp; Spice Blenders</span>
            <span className="text-slate-300">★</span>
            <span className="flex items-center gap-2"><Package className="w-4 h-4 text-cyan-600" /> Instant Noodle &amp; Soup Manufacturers</span>
            <span className="text-slate-300">★</span>
            <span className="flex items-center gap-2"><Flame className="w-4 h-4 text-orange-600" /> Extruded Snacks &amp; Namkeen Formulators</span>
            <span className="text-slate-300">★</span>
            <span className="flex items-center gap-2"><Droplet className="w-4 h-4 text-blue-600" /> Dairy &amp; Ice Cream Plants</span>
            <span className="text-slate-300">★</span>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-teal-600" /> International Ingredient Importers</span>
            <span className="text-slate-300">★</span>
            <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-purple-600" /> Packaged Drinking Water Network</span>
            <span className="text-slate-300">★</span>
            <span className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-600" /> Commercial Caterers &amp; Horeca</span>
            <span className="text-slate-300">★</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. BENTO GRID METRICS: A GROWING LEGACY OF PURITY & SCALE
      ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Mission & Company Overview */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#0093cb]">
              <Factory className="w-4 h-4" />
              <span>Manufacturing Legacy</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#052d3d] tracking-tight leading-tight">
              A growing legacy of manufacturing that translates into market leadership.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Incorporated with registered operations in <strong>Bhojpur, Agra (Uttar Pradesh)</strong>, D.R. and Sons International Pvt. Ltd. was founded to modernize India’s post-harvest agro-processing and beverage supply chains.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              By deploying energy-efficient low-temperature dehydration, high-precision pulverizing, vacuum evaporation, and automated sterile bottling, we convert farm-fresh produce into shelf-stable, high-value ingredients that retain natural aroma, vibrant pigmentation, and nutritional integrity.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="px-5 py-3 rounded-lg bg-[#052d3d] hover:bg-[#08465e] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Partner with DrSons</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Impact Bento Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: 100+ Formulations */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50/60 border border-cyan-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#0093cb]/10 flex items-center justify-center text-[#0093cb]">
                <Layers className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#052d3d]">100+</div>
              <div className="font-semibold text-sm text-slate-800">Commercial Formulations</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extensive technical formulations covering dehydrated vegetables, fruit squashes, starch extracts, and dairy products.
              </p>
            </div>

            {/* Card 2: 12-Month Extended Shelf Life */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                <Clock className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-emerald-900">12 Months</div>
              <div className="font-semibold text-sm text-slate-800">Natural Ambient Shelf Life</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% preservative-free moisture reduction (&lt;5% moisture) keeping flavor, color, and aroma fresh all year round.
              </p>
            </div>

            {/* Card 3: Agro Manufacturing Facility */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-amber-950">Agra, UP</div>
              <div className="font-semibold text-sm text-slate-800">Bhojpur Production Plant</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategically positioned in Tahsil Kheragarh with direct farm access across the Indo-Gangetic agricultural belt.
              </p>
            </div>

            {/* Card 4: Pan-India & Export Supply */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <Globe className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-indigo-950">Pan-India</div>
              <div className="font-semibold text-sm text-slate-800">Domestic &amp; Export Grade</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full compliance with FSSAI, export phytosanitary documentation, and reliable multi-state cold &amp; dry logistics.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PRODUCT VERTICALS & INTERACTIVE CATALOG
      ───────────────────────────────────────────────────────────── */}
      <section id="products" className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0093cb]">
              Catalog &amp; Specifications
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#052d3d] tracking-tight">
              Discover versatility curated for all commercial needs.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our core product verticals engineered for food processors, FMCG co-packers, regional distributors, and beverage plants.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {[
              { key: 'all', label: 'All Products (100+)' },
              { key: 'dehydrated', label: 'Dehydrated Powders & Flakes' },
              { key: 'concentrates', label: 'Fruit Concentrates & Squashes' },
              { key: 'dairy', label: 'Dairy Formulations' },
              { key: 'water', label: 'Packaged Drinking Water' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key as any)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeCategory === tab.key
                    ? 'bg-[#0093cb] text-white shadow-md shadow-cyan-600/20'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-cyan-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header / Badge Banner */}
                  <div className={`p-5 bg-gradient-to-br ${product.imageColor} border-b relative`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/80 font-bold backdrop-blur-xs">
                        {product.category.toUpperCase()}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#052d3d] text-cyan-300">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-xl text-slate-900 mt-3 group-hover:text-[#0093cb] transition-colors">
                      {product.name}
                    </h3>
                    {product.hindiName && (
                      <p className="text-xs text-slate-600 font-medium mt-0.5">{product.hindiName}</p>
                    )}
                    <p className="text-xs font-semibold mt-1 opacity-90">{product.tagline}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 text-xs text-slate-600">
                    <p className="leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    <div>
                      <div className="font-semibold text-slate-800 uppercase tracking-wide text-[11px] mb-1.5 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Available Forms &amp; Mesh:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.forms.map((form, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-mono">
                            {form}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-slate-800 uppercase tracking-wide text-[11px] mb-1.5 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Key Attributes:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                        {product.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-1 truncate">
                            <span className="w-1 h-1 rounded-full bg-cyan-600 shrink-0"></span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-slate-100 flex items-center gap-2 mt-4">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 py-2.5 px-3 rounded-lg border border-slate-300 hover:border-cyan-600 hover:text-cyan-700 text-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => handleQuickProductInquiry(product)}
                    className="py-2.5 px-4 rounded-lg bg-[#0093cb] hover:bg-[#007cad] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice about Custom Formulations */}
          <div className="mt-12 p-6 rounded-2xl bg-cyan-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="font-display font-bold text-lg text-white">Need a Custom Formulation or Private Label Packaging?</h4>
              <p className="text-cyan-200 text-xs sm:text-sm max-w-2xl">
                We manufacture bespoke mesh sizes, blend tailored seasonings, formulate custom dairy bases, and package in branded retail foil pouches or 25kg / 50kg industrial food-grade bags.
              </p>
            </div>
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-white text-[#052d3d] hover:bg-cyan-100 text-xs font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer shadow-md"
            >
              Request Custom Batch Spec
            </button>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. 5-STAGE PRECISION MANUFACTURING PROCESS (From Image 4)
      ───────────────────────────────────────────────────────────── */}
      <section id="process" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0093cb]">
            Engineering &amp; Dehydration Pipeline
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#052d3d] tracking-tight">
            5-Stage Precision Manufacturing Process
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From farm-gate raw material selection to finished vacuum-sealed ingredients, our process ensures maximum nutrition retention, microbial safety, and exact mesh consistency.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          
          {[
            {
              step: '01',
              title: 'Raw Material Selection',
              desc: 'Rigorous inspection of field-harvested onions, garlic, tomatoes, and fruits. Only high-solid, fully matured crops are accepted into production.',
              icon: Leaf,
              color: 'text-emerald-600 bg-emerald-50'
            },
            {
              step: '02',
              title: 'Cleaning & Preparation',
              desc: 'Automated multi-stage bubbler washing, peeling, de-rooting, sorting, and high-precision stainless steel slicing for uniform dehydration.',
              icon: SlidersHorizontal,
              color: 'text-cyan-600 bg-cyan-50'
            },
            {
              step: '03',
              title: 'Controlled Dehydration',
              desc: 'Thermal dehydration under calibrated humidity & temperature curves, removing moisture while preserving volatile flavor compounds and natural color.',
              icon: Flame,
              color: 'text-amber-600 bg-amber-50'
            },
            {
              step: '04',
              title: 'Grinding & Mesh Sizing',
              desc: 'Milling in hygienic cryogenic / hammer pulverizers, passed through vibratory sieve separators to achieve standard 40 to 100 mesh fineness.',
              icon: Factory,
              color: 'text-indigo-600 bg-indigo-50'
            },
            {
              step: '05',
              title: 'Finished Sealed Packaging',
              desc: 'Metal detection, QA moisture testing (&lt;5%), and nitrogen-sealed packing in multi-layer barrier bags or drums for 12+ months shelf life.',
              icon: Package,
              color: 'text-rose-600 bg-rose-50'
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-lg hover:border-cyan-400 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">STAGE {item.step}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-cyan-700 font-semibold">
                <Check className="w-3.5 h-3.5 text-cyan-600" />
                <span>QA Monitored</span>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. TRANSFORMING CONCEPTS INTO MARKET BREAKTHROUGHS
      ───────────────────────────────────────────────────────────── */}
      <section id="applications" className="py-20 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0093cb]">
              Application Engineering
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#052d3d] tracking-tight">
              Transforming customer concepts into market breakthroughs.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our ingredients power consumer favorite food items across snacks, instant meals, baked goods, and dairy beverages.
            </p>
          </div>

          {/* Interactive Application Segment Tabs */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="flex border-b border-slate-200 justify-center gap-4 sm:gap-8 overflow-x-auto pb-2">
              {[
                { id: 'snacks', label: 'Snacks & Seasonings' },
                { id: 'instant', label: 'Instant Soups & Noodles' },
                { id: 'dairy', label: 'Dairy & Ice Cream Mixes' },
                { id: 'bakery', label: 'Bakery & Confectionery' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveApplicationTab(tab.id as any)}
                  className={`pb-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeApplicationTab === tab.id
                      ? 'border-[#0093cb] text-[#0093cb]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Application Detail View */}
            <div className="mt-8 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-cyan-100 text-cyan-800 font-semibold">
                  {activeApplicationTab.toUpperCase()} SPECIALIZATION
                </span>

                <h3 className="font-display font-bold text-2xl text-slate-900">
                  {activeApplicationTab === 'snacks' && 'Dusting Seasonings, Chips & Extruded Namkeens'}
                  {activeApplicationTab === 'instant' && 'Instant Soup Sachets, Tastemakers & Noodle Tastings'}
                  {activeApplicationTab === 'dairy' && 'Smooth Dairy Formulations, Milkshakes & Ice Cream'}
                  {activeApplicationTab === 'bakery' && 'Natural Colors, Herb Fillings & Savory Crackers'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeApplicationTab === 'snacks' && 'Our ultra-fine onion, garlic, tomato, and chilli powders adhere smoothly to potato chips, tortilla triangles, and roasted nuts, delivering immediate burst of authentic umami without artificial mouthfeel.'}
                  {activeApplicationTab === 'instant' && 'Quick-dissolving vegetable powders and dehydrated minces reconstitute in hot water within 60 seconds, maintaining authentic vegetable fiber texture and restaurant-grade flavor broth.'}
                  {activeApplicationTab === 'dairy' && 'Standardized spray-dried dairy powders, emulsified bases, and natural flavorings formulated to withstand pasteurization while providing superior mouthfeel and freeze-thaw stability in ice cream.'}
                  {activeApplicationTab === 'bakery' && 'Natural coloring agents (Beetroot, Spinach, Carrot) offer heat-stable, chemical-free pigmentation for sponges and fillings, while garlic and herbs create delectable savory bread profiles.'}
                </p>

                <div className="space-y-2 pt-2 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Free-flowing and anti-caking properties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Low microbial count &amp; Salmonella/E.coli free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Standardized batch-to-batch organoleptic profile</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-100 to-cyan-50 p-6 rounded-xl border border-slate-200 space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">Recommended DrSons Ingredients:</div>
                <div className="space-y-2">
                  {activeApplicationTab === 'snacks' && [
                    'Dehydrated Onion Powder (100 Mesh)',
                    'Spray Dried Tomato Powder',
                    'Toasted Garlic Granules',
                    'Crushed Red Chilli Flakes'
                  ].map((ing, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between">
                      <span>{ing}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                    </div>
                  ))}

                  {activeApplicationTab === 'instant' && [
                    'Dehydrated Chopped Onion & Garlic',
                    'Tomato Broth Concentrate',
                    'Dehydrated Green Chilli Minced',
                    'Dehydrated Ginger Root Powder'
                  ].map((ing, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between">
                      <span>{ing}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                    </div>
                  ))}

                  {activeApplicationTab === 'dairy' && [
                    'Skimmed Milk Powder (SMP) Agglomerated',
                    'Commercial Ice Cream Mix Base',
                    'Fruit Concentrates & Squashes',
                    'Functional Dairy Whitener'
                  ].map((ing, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between">
                      <span>{ing}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                    </div>
                  ))}

                  {activeApplicationTab === 'bakery' && [
                    'Spray Dried Beetroot Powder (Natural Red)',
                    'Spinach Leaf Powder (Natural Green)',
                    'Garlic Flakes for Bread Toppings',
                    'Refined Food Starch Binder'
                  ].map((ing, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between">
                      <span>{ing}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="w-full py-2.5 rounded-lg bg-[#0093cb] hover:bg-[#007cad] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request Sample Batch
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PAN-INDIA DEALERSHIP & DISTRIBUTOR PROGRAM (From Image 3)
      ───────────────────────────────────────────────────────────── */}
      <section id="distributor" className="py-20 bg-[#052d3d] text-white relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <span>Pan-India Opportunity</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>All States &amp; Export</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                Dealer &amp; Distributor Partners Wanted Across All India.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Join our rapidly expanding wholesale network for <strong>100% natural, preservative-free dehydrated vegetable powders</strong>, fruit concentrates, and dairy formulations. Tap into the explosive growth of clean-label convenience foods.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-semibold text-white text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Attractive Margin Structure</span>
                  </div>
                  <p className="text-xs text-slate-300">High-volume wholesale pricing ensuring healthy profitability for stockists and regional dealers.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-semibold text-white text-sm flex items-center gap-2">
                    <Package className="w-4 h-4 text-cyan-400" />
                    <span>Retail &amp; Bulk Formats</span>
                  </div>
                  <p className="text-xs text-slate-300">Available in stand-up retail zipper pouches (100g, 200g, 500g) as well as 25kg commercial bags.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-semibold text-white text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>Pan-India Supply Support</span>
                  </div>
                  <p className="text-xs text-slate-300">Logistics dispatch from our Agra hub with reliable transport networks across North, South, East &amp; West India.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="font-semibold text-white text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Full Brand Collateral</span>
                  </div>
                  <p className="text-xs text-slate-300">Comprehensive product brochures, POS standees, laboratory test certificates, and dealer training.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      category: 'Dealership / Distributorship Partnership',
                      message: 'We are interested in acquiring dealership/distributorship rights for DrSons products in our territory: '
                    }));
                    setInquiryModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-900/30"
                >
                  <Users className="w-4 h-4" />
                  <span>Apply for Dealership</span>
                </button>

                <a
                  href="https://wa.me/919411268879?text=Hello%2C%20I%20am%20interested%20in%20becoming%20a%20Dealer%2FDistributor%20for%20DrSons%20International%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Trade Helpline</span>
                </a>
              </div>

            </div>

            {/* Right Card: Immediate Registration Desk */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-700 font-bold">
                  Dealer Enrollment Desk
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Register Your Territory
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fill in your commercial details. Our distribution manager will connect directly to confirm territory availability.
                </p>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Your Name / Firm *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra / Agrotech Traders"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      City / State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Agra, UP"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Current Business &amp; Distribution Reach
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Briefly state your current retail network or wholesale distribution coverage."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#0093cb] hover:bg-[#007cad] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <span>Submit &amp; Open WhatsApp Chat</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. QUALITY, TESTING & COMPLIANCE
      ───────────────────────────────────────────────────────────── */}
      <section id="certifications" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0093cb]">
            Safety, Hygiene &amp; Standards
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#052d3d] tracking-tight">
            A never-ending commitment to quality and compliance.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every batch leaving our Agra facility undergoes strict quality control checks to meet domestic regulatory standards and global import guidelines.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-slate-900">FSSAI Registered</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fully compliant with Food Safety and Standards Authority of India manufacturing hygiene protocols.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-slate-900">100% Pure &amp; Natural</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No artificial colors, zero synthetic chemical preservatives, and no adulteration across any batch.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-slate-900">Moisture &lt; 5% Target</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rigid water activity and moisture analysis to ensure complete prevention of microbial spoilage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <Globe className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-slate-900">Export Traceability</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete batch records from farm lot numbers through processing, milling, and shipping container loading.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. CORPORATE FOOTER (With Exact Company Registration Details)
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#052d3d] text-slate-400 text-xs border-t border-cyan-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Col 1: Corporate Profile & Registered Office */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-white">DrSons International</div>
                  <div className="text-[10px] text-cyan-300 font-mono">D.R. and Sons International Pvt. Ltd.</div>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-xs">
                <strong>Dropa Ramgopal and Sons International private limited</strong> is a premier food processing and commercial manufacturing enterprise incorporated in November 2026.
              </p>

              <div className="space-y-2 pt-2 border-t border-cyan-900/60 text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Registered Office &amp; Works:</strong><br />
                    Village- Bhojpur, Post Office- Kagarol, Tahsil- Kheragarh, District- Agra, State- Uttar Pradesh, Pin- 283119, India.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trade Desk &amp; WhatsApp: <strong className="text-white font-mono">+91 9411268879</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Corporate Email: <a href="mailto:contact@drsonsinternational.com" className="text-cyan-300 hover:underline font-mono">contact@drsonsinternational.com</a></span>
                </div>
              </div>
            </div>

            {/* Col 2: Core Manufacturing Activities */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-display font-bold text-white text-sm uppercase tracking-wider text-cyan-200">
                Core Verticals
              </h5>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Dehydrated Onion Flakes &amp; Powder</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Dehydrated Garlic &amp; Granules</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Spray-Dried Tomato Powder</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Specialty Superfood Powders</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Fruit &amp; Vegetable Concentrates</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Pure Starch &amp; Squashes</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Dairy Formulations &amp; Powders</a></li>
                <li><a href="#products" className="hover:text-cyan-300 transition-colors">Packaged Drinking Water</a></li>
              </ul>
            </div>

            {/* Col 3: Business & Commercial Links */}
            <div className="lg:col-span-4 space-y-4">
              <h5 className="font-display font-bold text-white text-sm uppercase tracking-wider text-cyan-200">
                Commercial Scope
              </h5>
              <p className="text-slate-300 leading-relaxed text-xs">
                To carry on the business of fruit or vegetable concentrates, squashes or powder/starch supply throughout India and export globally. Packaged drinking water supply across Uttar Pradesh and neighboring states.
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] font-semibold text-white uppercase tracking-wide">
                  Instant Commercial Dispatch:
                </span>
                <p className="text-slate-300 text-[11px]">
                  Submit batch inquiries directly to our WhatsApp Trade Desk for instant quote generation.
                </p>
                <a
                  href="https://wa.me/919411268879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: 9411268879</span>
                </a>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-cyan-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Dropa Ramgopal and Sons International Private Limited. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#about" className="hover:text-cyan-300 transition-colors">About Us</a>
              <span>·</span>
              <a href="#products" className="hover:text-cyan-300 transition-colors">Products</a>
              <span>·</span>
              <a href="#distributor" className="hover:text-cyan-300 transition-colors">Dealership</a>
              <span>·</span>
              <button onClick={() => setInquiryModalOpen(true)} className="hover:text-cyan-300 transition-colors cursor-pointer">
                Inquiry Desk
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: PRODUCT SPECIFICATIONS DETAIL
      ───────────────────────────────────────────────────────────── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-cyan-100 text-cyan-800 font-bold">
                {selectedProduct.category.toUpperCase()} SPECIFICATION
              </span>
              <h3 className="font-display font-bold text-2xl text-slate-900 mt-2">
                {selectedProduct.name}
              </h3>
              {selectedProduct.hindiName && (
                <div className="text-xs text-slate-500 font-medium">{selectedProduct.hindiName}</div>
              )}
              <p className="text-xs font-semibold text-cyan-700 mt-1">{selectedProduct.tagline}</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed border-t border-b border-slate-100 py-3">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">Standard Mesh &amp; Forms:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedProduct.forms.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">Key Quality Metrics:</span>
                <ul className="space-y-1 text-slate-600">
                  <li><strong>Shelf Life:</strong> {selectedProduct.shelfLife}</li>
                  <li><strong>Moisture:</strong> &lt; 5.0% Standard</li>
                  <li><strong>Preservatives:</strong> 0% (Clean-Label)</li>
                  <li><strong>Origin:</strong> Agra, UP, India</li>
                </ul>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-800 block mb-1.5">Commercial Applications:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.applications.map((app, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-medium">
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
              <span className="text-xs font-mono text-slate-500">
                Helpline: <strong className="text-emerald-700">+91 9411268879</strong>
              </span>
              <button
                onClick={() => handleQuickProductInquiry(selectedProduct)}
                className="px-6 py-2.5 rounded-xl bg-[#0093cb] hover:bg-[#007cad] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: COMMERCIAL INQUIRY & WHATSAPP DISPATCH
      ───────────────────────────────────────────────────────────── */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 relative max-h-[92vh] overflow-y-auto shadow-2xl">
            
            <button
              onClick={() => { setInquiryModalOpen(false); setFormSubmitted(false); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-700 font-bold">
                DrSons Trade &amp; Export Desk
              </span>
              <h3 className="font-display font-bold text-2xl text-slate-900 mt-1">
                Commercial Manufacturing Inquiry
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Submitting routes your specifications directly to our official WhatsApp trade desk at <strong className="text-slate-900 font-mono">+91 9411268879</strong>.
              </p>
            </div>

            {!formSubmitted ? (
              <form onSubmit={handleInquirySubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Richardson / Amit Sharma"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Global Foods Ltd."
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9411268879"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="procurement@brand.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Product Vertical
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600 bg-white"
                    >
                      <option value="Dehydrated Onion Flakes & Powder">Dehydrated Onion (Powder/Flakes)</option>
                      <option value="Dehydrated Garlic Powder & Granules">Dehydrated Garlic (Powder/Flakes)</option>
                      <option value="Spray-Dried Tomato Powder">Spray-Dried Tomato Powder</option>
                      <option value="Specialty Veg Powders (Beetroot/Spinach/Moringa)">Specialty Veg Powders (Beetroot/Spinach)</option>
                      <option value="Fruit & Vegetable Concentrates">Fruit & Vegetable Concentrates</option>
                      <option value="Squashes & Refined Starch">Commercial Squashes & Starch</option>
                      <option value="Dairy Formulations & Powders">Dairy Formulations & Powders</option>
                      <option value="Packaged Drinking Water">Packaged Drinking Water</option>
                      <option value="OEM Private Label Partnership">OEM Private Label Partnership</option>
                      <option value="Dealership / Distributorship Partnership">Dealership / Distributorship Application</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Estimated Volume
                    </label>
                    <select
                      value={formData.volume}
                      onChange={e => setFormData({ ...formData, volume: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600 bg-white"
                    >
                      <option value="Sample / Pilot Batch (< 500kg)">Sample / Pilot Batch (&lt; 500kg)</option>
                      <option value="1 - 5 Metric Tons">1 - 5 Metric Tons</option>
                      <option value="5 - 20 Metric Tons">5 - 20 Metric Tons</option>
                      <option value="20+ Metric Tons / 20ft Container Export">20+ Metric Tons / 20ft Container Export</option>
                      <option value="Regular Monthly Retainer Supply">Regular Monthly Retainer Supply</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Requirements, Specs &amp; Delivery Destination *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Specify mesh size, target delivery port/city, packaging preference, or formulation details."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-cyan-600"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500">
                    Direct WhatsApp: <strong className="text-emerald-700 font-mono">9411268879</strong>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#0093cb] hover:bg-[#007cad] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <span>Submit &amp; Open WhatsApp</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-display font-bold text-lg text-emerald-950">Inquiry Prepared Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Redirecting your inquiry specifications to our WhatsApp trade desk. If WhatsApp did not launch automatically, click below:
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/919411268879`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#052d3d] hover:bg-[#08465e] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Open WhatsApp (+91 9411268879)</span>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
