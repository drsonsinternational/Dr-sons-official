import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Copy, 
  ArrowRight, 
  MessageSquare, 
  ExternalLink,
  Apple,
  Coffee,
  PackageCheck,
  Send,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  FileText,
  X,
  Building,
  Scale,
  Lock,
  FileCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUp,
  Award,
  Factory
} from 'lucide-react';

interface NotificationState {
  type: 'success' | null;
  message: string;
}

export default function App() {
  const [activeDivision, setActiveDivision] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [notification, setNotification] = useState<NotificationState>({ type: null, message: '' });
  
  // Legal Modal State: 'terms' | 'privacy' | 'statutory' | null
  const [legalModalTab, setLegalModalTab] = useState<'terms' | 'privacy' | 'statutory' | null>(null);

  // Mobile Dashboard Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Horizontal scroll container ref for facilities
  const facilitiesScrollRef = useRef<HTMLDivElement>(null);

  // Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    division: 'Fruits and Vegetable Powder',
    volume: 'Commercial Bulk Supply',
    message: ''
  });

  const showNotification = (message: string) => {
    setNotification({ type: 'success', message });
    setTimeout(() => {
      setNotification({ type: null, message: '' });
    }, 3200);
  };

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    showNotification('Corporate email copied to clipboard.');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email) return;

    const textLines = [
      `*Commercial Inquiry - D R & Sons International Pvt. Ltd.*`,
      `*Entity:* D R & Sons International Private Limited`,
      `*Name:* ${inquiryForm.name}`,
      `*Company:* ${inquiryForm.company || 'Not Specified'}`,
      `*Email:* ${inquiryForm.email}`,
      `*Phone:* ${inquiryForm.phone || 'Not Specified'}`,
      `*Division:* ${inquiryForm.division}`,
      `*Order Volume:* ${inquiryForm.volume}`,
      `*Specifications:* ${inquiryForm.message || 'Standard Specifications'}`
    ];
    const encodedText = encodeURIComponent(textLines.join('\n'));
    const url = `https://wa.me/919411268879?text=${encodedText}`;

    setWhatsappRedirectUrl(url);
    setInquirySubmitted(true);
    setRedirectCountdown(3);
    showNotification('Inquiry registered. Redirecting to WhatsApp desk...');

    setTimeout(() => {
      window.location.href = url;
    }, 2800);
  };

  // Countdown timer for automatic redirect
  useEffect(() => {
    if (redirectCountdown === null || redirectCountdown <= 0) return;
    const timer = setTimeout(() => {
      setRedirectCountdown(redirectCountdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [redirectCountdown]);

  // Touch swipe handling for buttery-smooth division sliding
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleDivisionTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleDivisionTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger horizontal slide if horizontal intent is clear
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swiped left -> next division
        setActiveDivision((prev) => Math.min(divisionsData.length - 1, prev + 1));
      } else {
        // Swiped right -> previous division
        setActiveDivision((prev) => Math.max(0, prev - 1));
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const scrollToDivision = (idx: number) => {
    setActiveDivision(idx);
  };

  const scrollFacilities = (direction: 'left' | 'right') => {
    if (facilitiesScrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      facilitiesScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const tickerItems = [
    'D R & Sons International Private Limited · Incorporated Enterprise',
    'Fruit & Vegetable Powders',
    'Non-Alcoholic Drinks & Ice Creams',
    'Fruit & Vegetable Flakes',
    'Advanced Spray & Drum Drying',
    'Cleanroom Bottling Lines',
    'FSSAI Certified Commercial Supply',
    'Direct WhatsApp: 9411268879'
  ];

  const divisionsData = [
    {
      id: 'powders',
      number: '01',
      shortName: 'Fruit & Veg Powders',
      title: 'Fruits and Vegetable Powder',
      summary: 'Precision low-temperature spray drying and micro-milling yielding instant solubility and pure natural aroma.',
      tagline: '100% natural fruit & vegetable powders with authentic flavor',
      image: '/assets/aistudio/file_000000007504820892cf49a02d280275_ad4da5f2.webp',
      icon: Apple,
      keyItems: ['Pink Guava Powder', 'Watermelon Powder', 'Orange Powder', 'Tomato & Beetroot'],
      specs: ['Low-temp spray dried', 'Instant ambient solubility', 'Standardized mesh sizes', 'Nitrogen-flushed barrier pack'],
      applications: 'Beverages, bakery, instant soups, snacks & baby foods'
    },
    {
      id: 'beverages',
      number: '02',
      shortName: 'Drinks & Ice Creams',
      title: 'Non-Alcoholic Drinks and Ice Creams',
      summary: 'Continuous pasteurization, automated cleanroom bottling, and commercial continuous freezing churn suites.',
      tagline: 'High-speed bottling and premium packaged frozen desserts',
      image: '/assets/aistudio/image_081c2200.webp',
      icon: Coffee,
      keyItems: ['Bottled Fruit Drinks', 'Packaged Ice Creams', 'Berry Blast & Mango Passion', 'Dairy & Fruit Confections'],
      specs: ['Continuous pasteurization', 'Cleanroom automated lines', 'Sub-zero frozen dispatch', 'Tamper-evident sealing'],
      applications: 'Retail brands, supermarket chains, hospitality & distributors'
    },
    {
      id: 'flakes',
      number: '03',
      shortName: 'Fruit & Veg Flakes',
      title: 'Fruits and Vegetables Flakes',
      summary: 'Specialized drum drying and gentle hot-air dehydration creating crunchy, rapidly rehydrating flakes.',
      tagline: 'Dehydrated crispy flakes with instant rehydration & vibrant taste',
      image: '/assets/aistudio/image_449cc89f.webp',
      icon: PackageCheck,
      keyItems: ['Dehydrated Vegetable Flakes', 'Beetroot Flakes', 'Herbs & Greens', 'Crispy Onion Flakes'],
      specs: ['Continuous drum drying', 'Rapid water rehydration', 'Zero artificial preservatives', 'Hermetic moisture-proof drums'],
      applications: 'Cereals, muesli, instant noodles, soup mixes & snack bars'
    }
  ];

  const facilitiesData = [
    {
      number: '01',
      division: 'Fruit & Vegetable Powders',
      title: 'Spray Drying & Micro-Milling',
      desc: 'Low-temperature evaporators & micro-milling suites producing free-flowing, nutrient-intact powders.',
      tags: ['Spray Towers', 'Vacuum Evaporation', 'Standard Mesh'],
      icon: Apple
    },
    {
      number: '02',
      division: 'Drinks & Ice Creams',
      title: 'Automated Bottling & Freezing',
      desc: 'Cleanroom UHT bottling lines and commercial continuous churn freeze suites for packaged retail goods.',
      tags: ['UHT Pasteurization', 'Auto-Capping', 'Cold-Chain Dispatch'],
      icon: Coffee
    },
    {
      number: '03',
      division: 'Fruit & Vegetable Flakes',
      title: 'Drum Drying & Dehydration',
      desc: 'Continuous drum dryers producing crispy inclusions and culinary flakes with instant rehydration.',
      tags: ['Drum Rollers', 'Flake Calibration', 'Nitrogen Seal'],
      icon: PackageCheck
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#fbfdfb] text-[#122218] flex flex-col font-sans selection:bg-[#143e2b] selection:text-white relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification.message && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-auto sm:bottom-6 z-50 bg-[#0c2419] text-white px-4 py-3 shadow-2xl border border-emerald-700/50 flex items-center gap-3 text-xs"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium tracking-wide flex-1">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP LOGO BUTTON ON BOTTOM LEFT */}
      <motion.a
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        href="https://wa.me/919411268879"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:bg-[#20ba59] active:scale-95 transition-all hover:shadow-emerald-500/30 group"
        title="Chat on WhatsApp (+91 9411268879)"
        aria-label="Chat on WhatsApp (+91 9411268879)"
      >
        {/* Subtle Online Ping Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* Authentic WhatsApp SVG Logo */}
        <svg 
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 drop-shadow-xs" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="w-full px-4 sm:px-8 lg:px-10 py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo Lockup */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="h-9 sm:h-12 flex items-center">
              <img 
                src="/assets/aistudio/Gemini_Generated_Image_pwmnjfpwmnjfpwmn__1__a830e598.webp" 
                alt="D R & SONS INTERNATIONAL" 
                className="h-9 sm:h-12 w-auto object-contain mix-blend-multiply"
              />
            </div>
            <div className="border-l border-neutral-200 pl-2.5 hidden md:block">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-[#0a2318] block leading-none">
                D R &amp; SONS INTERNATIONAL PVT. LTD.
              </span>
              <span className="text-[9px] text-neutral-500 uppercase tracking-widest block mt-0.5">
                Food &amp; Beverage Manufacturing
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-700">
            <a href="#divisions" className="hover:text-emerald-900 transition-colors">3 Divisions</a>
            <a href="#facilities" className="hover:text-emerald-900 transition-colors">Facilities</a>
            <button 
              onClick={() => setLegalModalTab('terms')}
              className="hover:text-emerald-900 transition-colors cursor-pointer text-neutral-600 font-medium"
            >
              Legal Terms
            </button>
            <a href="#inquiry-desk" className="hover:text-emerald-900 transition-colors">Trade Desk</a>
          </nav>

          {/* Direct WhatsApp Callout & Mobile Three-Bar Button */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919411268879"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-900/20 text-xs font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">WhatsApp:</span>
              <span className="font-mono font-semibold text-[11px] sm:text-xs">9411268879</span>
            </a>

            <a
              href="#inquiry-desk"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#143e2b] hover:bg-[#0c271b] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            {/* Three Bar Lines (Hamburger) in Top Right Corner */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex flex-col justify-center items-center gap-[4.5px] w-9 h-9 border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
              aria-label="Open Navigation Dashboard"
              title="Open Navigation Dashboard"
            >
              <span className="w-4 h-[2px] bg-neutral-900 rounded-full block"></span>
              <span className="w-4 h-[2px] bg-neutral-900 rounded-full block"></span>
              <span className="w-4 h-[2px] bg-neutral-900 rounded-full block"></span>
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAVIGATION DASHBOARD DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-out Dashboard Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-[86vw] max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-neutral-200"
            >
              {/* Drawer Top */}
              <div>
                {/* Header */}
                <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-[#fafbfa]">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/aistudio/Gemini_Generated_Image_pwmnjfpwmnjfpwmn__1__a830e598.webp"
                      alt="D R & SONS INTERNATIONAL"
                      className="h-8 w-auto object-contain mix-blend-multiply"
                    />
                    <div>
                      <span className="text-xs font-bold tracking-tight text-[#0a2318] block leading-none">
                        D R &amp; SONS INTL
                      </span>
                      <span className="text-[9px] text-neutral-500 uppercase tracking-wider block mt-0.5">
                        Navigation Dashboard
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer transition-colors"
                    aria-label="Close Dashboard"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Dashboard Status Pill */}
                <div className="px-4 py-2 bg-emerald-50/80 border-b border-emerald-900/10 flex items-center gap-2 text-[10px] font-mono text-emerald-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Incorporated Private Limited · FSSAI</span>
                </div>

                {/* Navigation Links */}
                <div className="p-4 space-y-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                    Core Dashboard
                  </div>

                  <nav className="space-y-1">
                    <a
                      href="#divisions"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 text-xs font-bold text-neutral-900 hover:bg-emerald-50/60 border border-transparent hover:border-emerald-800/20 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <Apple className="w-4 h-4 text-emerald-700" />
                        <span>3 Manufacturing Divisions</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    </a>

                    <div className="pl-6 pr-2 py-1 space-y-1.5 border-l-2 border-emerald-800/20 ml-4 my-1">
                      {divisionsData.map((div, idx) => (
                        <button
                          key={`drawer-div-${div.id}`}
                          onClick={() => {
                            scrollToDivision(idx);
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-2.5 w-full text-left py-1 text-xs text-neutral-700 hover:text-emerald-950 hover:bg-neutral-50 px-1.5 transition-colors cursor-pointer"
                        >
                          <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-neutral-200">
                            <img src={div.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium truncate">{div.title}</span>
                        </button>
                      ))}
                    </div>

                    <a
                      href="#facilities"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 text-xs font-bold text-neutral-900 hover:bg-emerald-50/60 border border-transparent hover:border-emerald-800/20 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <PackageCheck className="w-4 h-4 text-emerald-700" />
                        <span>Production Infrastructure</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    </a>

                    <a
                      href="#inquiry-desk"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 text-xs font-bold text-neutral-900 hover:bg-emerald-50/60 border border-transparent hover:border-emerald-800/20 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <Send className="w-4 h-4 text-emerald-700" />
                        <span>Commercial Inquiry Desk</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    </a>
                  </nav>

                  <div className="pt-3 border-t border-neutral-200">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold mb-2">
                      Legal Disclosures (Pvt Ltd)
                    </div>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLegalModalTab('terms');
                        }}
                        className="flex items-center justify-between w-full p-2 text-xs text-neutral-700 hover:text-emerald-950 hover:bg-neutral-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Terms of Commercial Supply</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLegalModalTab('privacy');
                        }}
                        className="flex items-center justify-between w-full p-2 text-xs text-neutral-700 hover:text-emerald-950 hover:bg-neutral-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Privacy Policy (DPDP Act)</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLegalModalTab('statutory');
                        }}
                        className="flex items-center justify-between w-full p-2 text-xs text-neutral-700 hover:text-emerald-950 hover:bg-neutral-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Statutory Company Details</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-neutral-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="p-4 border-t border-neutral-200 bg-[#fafbfa] space-y-2.5">
                <a
                  href="https://wa.me/919411268879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#143e2b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0c281c] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp: 9411268879</span>
                </a>

                <a
                  href="#inquiry-desk"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-4 bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-50"
                >
                  <span>Request Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <div className="pt-1 text-center text-[10px] text-neutral-400 font-mono">
                  D R &amp; Sons International Private Limited
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* HERO SECTION: Fullscreen Ambient Industrial Video Banner */}
      <section className="relative w-full h-[calc(100dvh-56px)] sm:h-[calc(100dvh-73px)] min-h-[580px] flex items-center justify-center overflow-hidden bg-[#0c2117]">
        
        {/* Background Ambient Industrial Video */}
        <video 
          ref={(el) => {
            if (el) {
              el.defaultMuted = true;
              el.muted = true;
              el.play().catch(() => {});
            }
          }}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source 
            src="https://www.drytechindia.com/assets/home/banner/drytech-banner-video.MP4" 
            type="video/mp4" 
          />
        </video>

        {/* Subtle High-Contrast Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071911]/90 via-[#071911]/50 to-[#071911]/35" />

        {/* Rotating Concentric Trajectory Ring */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-30">
          <svg 
            className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] animate-spin-slow" 
            viewBox="0 0 674 674" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="337" cy="337" r="335" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="6 8" />
            <circle cx="337" cy="337" r="260" stroke="#86efac" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="337" cy="337" r="180" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        {/* Animated Hero Content (Tightly spaced, minimal text) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center flex flex-col items-center space-y-4 sm:space-y-6">

          {/* Minimalist Look Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Purity in <span className="font-serif-brand italic font-normal text-[#86efac]">Every Batch</span>
          </motion.h1>

          {/* Minimal Category Subline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-300 max-w-lg"
          >
            Fruit &amp; Vegetable Powders · Drinks &amp; Ice Creams · Flakes
          </motion.p>

          {/* Minimal Dual CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-1"
          >
            <a
              href="#divisions"
              className="px-5 sm:px-7 py-2.5 sm:py-3 bg-[#22c55e] hover:bg-[#16a34a] text-[#071f14] text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg flex items-center gap-1.5"
            >
              <span>Explore Divisions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/919411268879"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-7 py-2.5 sm:py-3 bg-black/40 hover:bg-black/60 text-white border border-white/25 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp: 9411268879</span>
            </a>
          </motion.div>

        </div>

        {/* Subtle Scroll Indicator at Bottom of Hero */}
        <a 
          href="#divisions" 
          aria-label="Scroll down to divisions"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-300/80 group-hover:text-emerald-200">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400 group-hover:text-emerald-300" />
        </a>
      </section>

      {/* CONTINUOUS LOOPING OPERATIONAL MARQUEE */}
      <section className="w-full border-y border-neutral-200 bg-[#143e2b] text-white py-2.5 overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-6 text-[11px] font-medium uppercase tracking-widest">
          {tickerItems.map((item, idx) => (
            <div key={`ticker-1-${idx}`} className="flex items-center gap-6 shrink-0">
              <span className="text-emerald-100">{item}</span>
              <span className="text-emerald-400/60" aria-hidden="true">◆</span>
            </div>
          ))}
          {tickerItems.map((item, idx) => (
            <div key={`ticker-2-${idx}`} className="flex items-center gap-6 shrink-0">
              <span className="text-emerald-100">{item}</span>
              <span className="text-emerald-400/60" aria-hidden="true">◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: 3 CORE REGISTERED MANUFACTURING DIVISIONS (Horizontal Scroll Enabled) */}
      <section id="divisions" className="w-full py-10 sm:py-16 px-3 sm:px-6 lg:px-12 bg-white border-b border-neutral-200">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          
          {/* Header & Horizontal Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200 pb-4">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                Core Portfolio · 3 Registered Wings
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Manufacturing <span className="font-serif-brand italic text-emerald-900 font-normal">Divisions</span>
              </h2>
            </div>

            {/* Horizontal Swipe Affordance & Navigation */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-900/10">
                ← Swipe 3 Divisions →
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollToDivision(Math.max(0, activeDivision - 1))}
                  disabled={activeDivision === 0}
                  className="w-8 h-8 flex items-center justify-center border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Previous Division"
                >
                  <ChevronLeft className="w-4 h-4 text-neutral-700" />
                </button>
                <button
                  onClick={() => scrollToDivision(Math.min(divisionsData.length - 1, activeDivision + 1))}
                  disabled={activeDivision === divisionsData.length - 1}
                  className="w-8 h-8 flex items-center justify-center border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Next Division"
                >
                  <ChevronRight className="w-4 h-4 text-neutral-700" />
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE VIEW: Circle Images for Category Buttons */}
          <div className="flex sm:hidden items-center justify-around gap-2 py-2 px-1 border-b border-neutral-100">
            {divisionsData.map((div, idx) => {
              const isActive = activeDivision === idx;
              return (
                <button
                  type="button"
                  key={`mobile-circle-${div.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToDivision(idx);
                  }}
                  className="flex flex-col items-center gap-1.5 focus:outline-hidden cursor-pointer group flex-1 max-w-[105px]"
                  title={`Division ${div.number}: ${div.title}`}
                >
                  <div
                    className={`relative w-16 h-16 rounded-full p-[2.5px] transition-all duration-300 ${
                      isActive
                        ? 'ring-2 ring-emerald-700 ring-offset-2 scale-105 shadow-md bg-emerald-700'
                        : 'border-2 border-neutral-300 opacity-80 group-hover:opacity-100 group-hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 relative">
                      <img
                        src={div.image}
                        alt={div.shortName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-700 ring-2 ring-white" />
                    )}
                  </div>
                  <span
                    className={`text-[11px] text-center leading-tight line-clamp-2 px-0.5 transition-colors ${
                      isActive
                        ? 'text-emerald-950 font-bold'
                        : 'text-neutral-600 font-medium'
                    }`}
                  >
                    {div.shortName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP VIEW: Sleek Tabs with Thumbnail Circles & Numbers */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {divisionsData.map((div, idx) => {
              const isActive = activeDivision === idx;
              return (
                <button
                  type="button"
                  key={`desktop-tab-${div.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToDivision(idx);
                  }}
                  className={`shrink-0 px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-2.5 ${
                    isActive
                      ? 'border-emerald-800 text-emerald-950 bg-emerald-50 shadow-2xs'
                      : 'border-neutral-200 text-neutral-600 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-neutral-300 bg-neutral-100">
                    <img src={div.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-mono text-emerald-800">{div.number}.</span>
                  <span>{div.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* SILKY SMOOTH GPU-ACCELERATED SLIDING CARDS TRACK */}
          <div 
            className="overflow-hidden w-full relative select-none"
            onTouchStart={handleDivisionTouchStart}
            onTouchEnd={handleDivisionTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
              style={{ transform: `translateX(-${activeDivision * 100}%)` }}
            >
              {divisionsData.map((current, idx) => {
                const CurrentIcon = current.icon;
                return (
                  <div 
                    key={current.id}
                    className="w-full shrink-0 px-0.5 sm:px-1"
                  >
                    <div className="bg-[#fafbfa] border border-neutral-200/90 hover:border-emerald-900/30 p-5 sm:p-7 flex flex-col justify-between transition-all shadow-xs">
                      
                      {/* Card Header & Content */}
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                              <CurrentIcon className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Division {current.number} · D R &amp; Sons International</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mt-1">
                              {current.title}
                            </h3>
                          </div>
                          <span className="font-mono text-lg font-bold text-neutral-300">
                            {current.number}
                          </span>
                        </div>

                        {/* Image & Tagline Split */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                          <div className="sm:col-span-5 overflow-hidden border border-neutral-200 bg-white shadow-2xs">
                            <img 
                              src={current.image} 
                              alt={current.title} 
                              className="w-full aspect-16/9 sm:h-44 object-cover object-center hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="sm:col-span-7 space-y-2">
                            <p className="text-xs text-neutral-700 leading-relaxed">
                              {current.summary}
                            </p>
                            
                            {/* Compact Key Item Chips */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {current.keyItems.map((item, i) => (
                                <span key={i} className="px-2 py-0.5 bg-white border border-neutral-200 text-[11px] text-neutral-800 font-medium">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Technical Specs Tags */}
                        <div className="pt-2 border-t border-neutral-200/80">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                            Technical Highlights:
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-neutral-700">
                            {current.specs.map((spec, i) => (
                              <div key={i} className="flex items-center gap-1.5 bg-white px-2 py-1 border border-neutral-200/60">
                                <Check className="w-3 h-3 text-emerald-700 shrink-0" />
                                <span className="truncate">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Card Bottom Actions */}
                      <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
                        <a
                          href="#inquiry-desk"
                          onClick={() => setInquiryForm({...inquiryForm, division: current.title})}
                          className="px-4 py-2 bg-[#143e2b] hover:bg-[#0c271b] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Get Quote</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>

                        <a
                          href={`https://wa.me/919411268879?text=${encodeURIComponent(`Hi D R & Sons Trade Desk, I am inquiring about Division ${current.number}: ${current.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 hover:text-emerald-950"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                          <span>WhatsApp Desk</span>
                        </a>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Smooth Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {divisionsData.map((div, idx) => (
              <button
                type="button"
                key={`indicator-${div.id}`}
                onClick={() => scrollToDivision(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDivision === idx ? 'w-8 bg-emerald-700' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to Division ${div.number}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: PRODUCTION FACILITIES & INFRASTRUCTURE (Horizontal Scroll Track on Mobile) */}
      <section id="facilities" className="w-full py-10 sm:py-16 px-3 sm:px-6 lg:px-12 bg-[#fafbfa] border-b border-neutral-200">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200 pb-4">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                Facility &amp; Technical Suites
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Production <span className="font-serif-brand italic text-emerald-900 font-normal">Infrastructure</span>
              </h2>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <span className="text-[11px] font-mono text-neutral-500 bg-white px-2 py-1 border border-neutral-200">
                ← Swipe Facilities →
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollFacilities('left')}
                  className="w-7 h-7 flex items-center justify-center border border-neutral-200 bg-white hover:bg-neutral-100 cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollFacilities('right')}
                  className="w-7 h-7 flex items-center justify-center border border-neutral-200 bg-white hover:bg-neutral-100 cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Facilities Rail (Compact, responsive, zero excessive scrolling) */}
          <div 
            ref={facilitiesScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 no-scrollbar"
          >
            {facilitiesData.map((fac, idx) => {
              const FacIcon = fac.icon;
              return (
                <div 
                  key={idx}
                  className="snap-start shrink-0 w-[85vw] sm:w-[360px] lg:w-[390px] border border-neutral-200 bg-white p-5 space-y-3 shadow-2xs hover:border-emerald-800/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 bg-emerald-50 text-emerald-900 border border-emerald-900/15 flex items-center justify-center">
                      <FacIcon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-800">
                      LINE {fac.number}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                      {fac.division}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                      {fac.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {fac.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100">
                    {fac.tags.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 text-neutral-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION: COMMERCIAL QUOTATION & WHATSAPP ROUTING DESK (Streamlined, concise) */}
      <section id="inquiry-desk" className="w-full py-10 sm:py-16 px-3 sm:px-6 lg:px-12 bg-white">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-[#fafbfa] border border-neutral-200 p-5 sm:p-8 space-y-4 shadow-xs">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>WhatsApp Trade Desk · Direct Routing</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                Commercial Supply Inquiry
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Quick quote routing directly to WhatsApp: <strong className="font-semibold text-neutral-900">+91 9411268879</strong>
              </p>
            </div>

            {!inquirySubmitted ? (
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                      placeholder="David Richardson"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm({...inquiryForm, company: e.target.value})}
                      placeholder="Apex Global Foods"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                      placeholder="corporate@domain.com"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Phone / Mobile
                    </label>
                    <input
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                      placeholder="+91 / International"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Division
                    </label>
                    <select
                      value={inquiryForm.division}
                      onChange={(e) => setInquiryForm({...inquiryForm, division: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800"
                    >
                      <option value="Fruits and Vegetable Powder">Fruits and Vegetable Powder</option>
                      <option value="Non-Alcoholic Drinks and Ice Creams">Non-Alcoholic Drinks and Ice Creams</option>
                      <option value="Fruits and Vegetables Flakes">Fruits and Vegetables Flakes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Target Volume
                    </label>
                    <select
                      value={inquiryForm.volume}
                      onChange={(e) => setInquiryForm({...inquiryForm, volume: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800"
                    >
                      <option value="Commercial Bulk Supply">Commercial Wholesale / Bulk</option>
                      <option value="Semi-Bulk Regular Supply">Semi-Bulk Regular</option>
                      <option value="Sample Run">Trial Batch / Sample Run</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                    placeholder="Product specifics, custom packaging, or delivery timeline."
                    className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#143e2b] hover:bg-[#0c271b] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit &amp; Open WhatsApp</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 bg-emerald-50 border border-emerald-800/40 text-neutral-900 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Check className="w-4 h-4" />
                  <span>Inquiry Prepared</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Redirecting to WhatsApp (<strong className="font-mono">9411268879</strong>){redirectCountdown !== null && redirectCountdown > 0 ? ` in ${redirectCountdown}s...` : ' now.'}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={whatsappRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#143e2b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0c271b]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open WhatsApp (9411268879)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => {
                      setInquirySubmitted(false);
                      setRedirectCountdown(null);
                      setInquiryForm({ name: '', company: '', email: '', phone: '', division: 'Fruits and Vegetable Powder', volume: 'Commercial Bulk Supply', message: '' });
                    }}
                    className="text-xs text-neutral-600 underline cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Corporate Information Desk with Private Limited Identity */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 p-5 sm:p-8 space-y-5 shadow-xs">
            <div className="space-y-2.5">
              <div className="h-10 w-auto flex items-center">
                <img 
                  src="/assets/aistudio/Gemini_Generated_Image_pwmnjfpwmnjfpwmn__1__a830e598.webp" 
                  alt="D R & SONS INTERNATIONAL" 
                  className="h-10 w-auto object-contain mix-blend-multiply"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-neutral-900">
                  D R &amp; Sons International Private Limited
                </h4>
                <p className="text-xs text-neutral-500 font-mono">
                  Incorporated Pvt. Ltd. · Companies Act, 2013
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-neutral-500">Trade WhatsApp:</span>
                <a
                  href="https://wa.me/919411268879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-900 font-bold hover:underline flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-700" />
                  <span>+91 9411268879</span>
                </a>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-neutral-500">Corporate Email:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-neutral-800">contact@drsonsinternational.com</span>
                  <button
                    onClick={() => handleCopyEmail('contact@drsonsinternational.com')}
                    className="p-1 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-neutral-500">Statutory Status:</span>
                <span className="font-medium text-neutral-800">Private Limited · MCA India</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Compliance Terms:</span>
                <button
                  onClick={() => setLegalModalTab('terms')}
                  className="font-medium text-emerald-900 underline cursor-pointer text-xs"
                >
                  View Legal Terms
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-950 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Incorporated Pvt Ltd</span>
              </div>
              <button
                onClick={() => setLegalModalTab('statutory')}
                className="text-xs font-semibold text-emerald-900 hover:text-emerald-950 underline cursor-pointer"
              >
                Statutory View
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* COMPACT ENTERPRISE FOOTER */}
      <footer className="w-full bg-[#f8faf8] border-t border-neutral-200 text-neutral-700 py-6 sm:py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-5">
          
          {/* Main Compact Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            
            {/* Left: Brand Identification */}
            <div className="flex items-center gap-3 shrink-0">
              <img 
                src="/assets/aistudio/Gemini_Generated_Image_pwmnjfpwmnjfpwmn__1__a830e598.webp" 
                alt="D R & SONS INTERNATIONAL" 
                className="h-9 sm:h-10 w-auto object-contain mix-blend-multiply"
              />
              <div className="border-l border-neutral-300 pl-3">
                <span className="text-xs sm:text-sm font-bold tracking-tight text-[#0a2318] block leading-none">
                  D R &amp; SONS INTERNATIONAL PVT. LTD.
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mt-0.5">
                  Food &amp; Beverage Manufacturing · B2B Ingredients
                </span>
              </div>
            </div>

            {/* Center: Essential Navigation Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-600">
              <a href="#divisions" className="hover:text-[#143e2b] hover:underline transition-colors">
                3 Divisions
              </a>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <a href="#facilities" className="hover:text-[#143e2b] hover:underline transition-colors">
                Facilities
              </a>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <button 
                onClick={() => setLegalModalTab('terms')}
                className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer"
              >
                Terms of Supply
              </button>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <button 
                onClick={() => setLegalModalTab('privacy')}
                className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer"
              >
                Privacy Policy (DPDP)
              </button>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <button 
                onClick={() => setLegalModalTab('statutory')}
                className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer"
              >
                Statutory Details
              </button>
            </div>

            {/* Right: Direct Contact Desks */}
            <div className="flex flex-wrap items-center gap-4 text-xs shrink-0">
              <a 
                href="https://wa.me/919411268879" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-[#143e2b] font-bold hover:underline flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>WhatsApp: 9411268879</span>
              </a>

              <div className="flex items-center gap-1.5 text-neutral-700">
                <span className="font-mono text-[11px]">contact@drsonsinternational.com</span>
                <button
                  onClick={() => handleCopyEmail('contact@drsonsinternational.com')}
                  className="p-1 border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                  title="Copy Corporate Email"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Micro-Bar */}
          <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500">
            <div>
              &copy; {new Date().getFullYear()} D R &amp; Sons International Private Limited. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <span>Incorporated under Companies Act, 2013</span>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <span>MCA India</span>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <span>FSSAI Certified</span>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Back to top ↑
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* LEGAL TERMS MODAL (FOR PRIVATE LIMITED COMPANY) */}
      <AnimatePresence>
        {legalModalTab && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-neutral-200 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-[#fafbfa]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 border border-emerald-900/20 bg-emerald-50 text-emerald-900 flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                      Corporate Legal Terms
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-mono">
                      D R &amp; Sons International Private Limited
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setLegalModalTab(null)}
                  className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex border-b border-neutral-200 bg-white px-3 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setLegalModalTab('terms')}
                  className={`py-2 px-3 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer border-b-2 -mb-px flex items-center gap-1.5 ${
                    legalModalTab === 'terms'
                      ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <FileText className="w-3 h-3 text-emerald-700" />
                  <span>Terms of Supply</span>
                </button>
                <button
                  onClick={() => setLegalModalTab('privacy')}
                  className={`py-2 px-3 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer border-b-2 -mb-px flex items-center gap-1.5 ${
                    legalModalTab === 'privacy'
                      ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Lock className="w-3 h-3 text-emerald-700" />
                  <span>Privacy (DPDP)</span>
                </button>
                <button
                  onClick={() => setLegalModalTab('statutory')}
                  className={`py-2 px-3 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer border-b-2 -mb-px flex items-center gap-1.5 ${
                    legalModalTab === 'statutory'
                      ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Building className="w-3 h-3 text-emerald-700" />
                  <span>Statutory Info</span>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-neutral-700 leading-relaxed max-h-[55vh]">
                
                {legalModalTab === 'terms' && (
                  <div className="space-y-3.5">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                        1. Corporate Entity &amp; Application
                      </h4>
                      <p>
                        Governs commercial quotations, orders, and dispatches by <strong>D R &amp; Sons International Private Limited</strong> (incorporated under Companies Act, 2013, MCA India).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                        2. Orders, GST &amp; Invoicing
                      </h4>
                      <p>
                        Supplies require formal PO confirmation and official GST tax invoicing. Statutory levies applied as per Government of India schedules.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                        3. Quality Verification &amp; COA
                      </h4>
                      <p>
                        Dispatches are backed by Certificate of Analysis (COA) conforming to FSSAI food safety and physical/chemical compliance standards.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                        4. Perishables &amp; Cold-Chain
                      </h4>
                      <p>
                        Perishable goods are dispatched under temperature-controlled packaging. Transit risks transfer upon carrier handover unless insured logistics are booked.
                      </p>
                    </div>
                  </div>
                )}

                {legalModalTab === 'privacy' && (
                  <div className="space-y-3.5">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                        1. DPDP Act, 2023 Compliance
                      </h4>
                      <p>
                        Data handled in compliance with India&apos;s Digital Personal Data Protection Act, 2023.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                        2. Commercial Data Use
                      </h4>
                      <p>
                        Submitted business inquiries are strictly used to fulfill manufacturing quotes, share specifications, and communicate via WhatsApp (+91 9411268879) or corporate email.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                        3. Formulation Confidentiality
                      </h4>
                      <p>
                        Client custom recipes and specifications are maintained under strict corporate non-disclosure protocols.
                      </p>
                    </div>
                  </div>
                )}

                {legalModalTab === 'statutory' && (
                  <div className="space-y-3">
                    <div className="border border-neutral-200 bg-[#fafbfa] p-3 space-y-2 font-mono text-[11px]">
                      <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                        <span className="text-neutral-500">Legal Entity:</span>
                        <span className="font-bold text-neutral-900">D R &amp; Sons International Private Limited</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                        <span className="text-neutral-500">Category:</span>
                        <span className="font-bold text-neutral-900">Private Limited (Pvt. Ltd.)</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                        <span className="text-neutral-500">Authority:</span>
                        <span className="font-bold text-neutral-900">Ministry of Corporate Affairs (MCA)</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                        <span className="text-neutral-500">Standards:</span>
                        <span className="font-bold text-neutral-900">FSSAI Certified Facilities</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Direct Desk:</span>
                        <span className="font-bold text-emerald-900">+91 9411268879</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-neutral-200 bg-[#fafbfa] flex items-center justify-end">
                <button
                  onClick={() => setLegalModalTab(null)}
                  className="px-4 py-1.5 bg-[#143e2b] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
