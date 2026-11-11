import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Droplets,
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
  Factory,
  Settings2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Workflow,
  Layers,
  Sliders,
  Plus,
  Minus,
  Newspaper,
  ChevronUp,
  ArrowDown,
  Sparkles,
  AlertCircle,
  Loader2
} from 'lucide-react';
import MaintenancePage from './MaintenancePage';

interface NotificationState {
  type: 'success' | 'error' | null;
  message: string;
}

export default function App() {
  // Website is now officially LIVE for all public visitors!
  // Optional preview of maintenance screen available via ?maintenance=true
  const [showMaintenancePreview, setShowMaintenancePreview] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('maintenance') === 'true';
    }
    return false;
  });

  const [activeDivision, setActiveDivision] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [notification, setNotification] = useState<NotificationState>({ type: null, message: '' });
  
  // Legal & Regulatory Modal State: 'terms' | 'privacy' | 'statutory' | 'regulatory' | 'press' | null
  const [legalModalTab, setLegalModalTab] = useState<'terms' | 'privacy' | 'statutory' | 'regulatory' | 'press' | null>(null);

  // Mobile Dashboard Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Production Infrastructure & Cinematic Process Pipeline State
  const [selectedFacilityLine, setSelectedFacilityLine] = useState<number>(0);
  const [selectedFacilityStage, setSelectedFacilityStage] = useState<number>(0);
  const facilityTouchStart = useRef<{ x: number; y: number } | null>(null);

  const handleFacilityInquiry = (divisionName: string) => {
    setInquiryForm((prev) => ({ ...prev, division: divisionName }));
    const desk = document.getElementById('inquiry-desk');
    if (desk) {
      desk.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Concept Lab: Semi-Circle Rotary Divisions State
  const [rotaryDivision, setRotaryDivision] = useState<number>(0);
  const rotaryDivisionRef = useRef<number>(0);
  rotaryDivisionRef.current = rotaryDivision;

  const [rotaryAutoPlay, setRotaryAutoPlay] = useState<boolean>(false);
  const [desktopDivisionView, setDesktopDivisionView] = useState<'rotary' | 'classic'>('rotary');
  
  // Section Navigation Refs
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const rotarySectionRef = useRef<HTMLElement | null>(null);
  const facilitiesSectionRef = useRef<HTMLElement | null>(null);
  const arcContainerRef = useRef<HTMLDivElement | null>(null);
  const [arcHeight, setArcHeight] = useState<number>(() => 
    typeof window !== 'undefined' ? Math.max(480, window.innerHeight - 160) : 560
  );
  const isSectionTransitioningRef = useRef<boolean>(false);
  const currentScrollAnimationRef = useRef<number | null>(null);
  const arcDragStartY = useRef<number | null>(null);

  // Dynamically observe the semi-circle arc container's exact pixel height
  useEffect(() => {
    const updateHeight = () => {
      if (arcContainerRef.current) {
        const h = arcContainerRef.current.clientHeight;
        if (h > 0) setArcHeight(h);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && arcContainerRef.current) {
      ro = new ResizeObserver(updateHeight);
      ro.observe(arcContainerRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateHeight);
      if (ro) ro.disconnect();
    };
  }, []);

  // Cinematic smooth scroll interpolation using requestAnimationFrame & easeInOutCubic
  // Provides a luxurious, continuous glide between sections so the user never feels like they skipped content
  const smoothScrollTo = useCallback((targetY: number, duration = 850, onComplete?: () => void) => {
    if (currentScrollAnimationRef.current !== null) {
      cancelAnimationFrame(currentScrollAnimationRef.current);
      currentScrollAnimationRef.current = null;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;

    if (Math.abs(distance) < 3) {
      window.scrollTo(0, targetY);
      if (onComplete) onComplete();
      return;
    }

    const htmlEl = document.documentElement;
    const prevScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = 'auto';

    const startTime = performance.now();

    // easeInOutCubic: gentle onset, clear visible mid-glide, soft cushioned arrival
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, Math.round(startY + distance * eased));

      if (progress < 1) {
        currentScrollAnimationRef.current = requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        htmlEl.style.scrollBehavior = prevScrollBehavior;
        currentScrollAnimationRef.current = null;
        if (onComplete) onComplete();
      }
    };

    currentScrollAnimationRef.current = requestAnimationFrame(step);
  }, []);

  // Inquiry Form State & Strict Field Validation
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    division: 'Fruits, Vegetables Powder and starch',
    volume: 'Commercial Bulk Supply',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    privacy?: string;
  }>({});

  const [formTouched, setFormTouched] = useState<{
    name?: boolean;
    company?: boolean;
    email?: boolean;
    phone?: boolean;
    privacy?: boolean;
  }>({});

  const [privacyAccepted, setPrivacyAccepted] = useState(true);

  // Field Sanitizers (strict typing restrictions: filter invalid keystrokes in real time)
  const sanitizeName = (raw: string) => {
    // Only allow alphabetic characters, spaces, hyphens, and apostrophes
    return raw.replace(/[^a-zA-Z\s'-]/g, '').slice(0, 50);
  };

  const sanitizeEmail = (raw: string) => {
    // Disallow spaces and illegal characters
    return raw.replace(/\s+/g, '').replace(/[^a-zA-Z0-9._%+-@]/g, '').slice(0, 80);
  };

  const sanitizePhone = (raw: string) => {
    // Only allow leading '+', digits, spaces, hyphens, and parentheses
    let cleaned = raw.replace(/[^\d+()\s-]/g, '');
    if (cleaned.indexOf('+') > 0) {
      cleaned = cleaned.charAt(0) === '+'
        ? '+' + cleaned.slice(1).replace(/\+/g, '')
        : cleaned.replace(/\+/g, '');
    }
    return cleaned.slice(0, 20);
  };

  const sanitizeCompany = (raw: string) => {
    return raw.replace(/[^a-zA-Z0-9\s.,&'()-]/g, '').slice(0, 80);
  };

  const sanitizeMessage = (raw: string) => {
    return raw.replace(/[<>]/g, '').slice(0, 800);
  };

  // Field Validators
  const validateName = (name: string): string | null => {
    const trimmed = name.trim();
    if (!trimmed) return 'Full name is required.';
    if (trimmed.length < 2) return 'Full name must be at least 2 characters.';
    if (!/^[a-zA-Z][a-zA-Z\s'-]*[a-zA-Z]$/.test(trimmed) && trimmed.length > 1) {
      return 'Name must contain only alphabetic letters.';
    }
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const trimmed = email.trim();
    if (!trimmed) return 'Corporate email is required.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid business email address (e.g. name@company.com).';
    }
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    const trimmed = phone.trim();
    if (!trimmed) return null; // Optional field
    const digitsOnly = trimmed.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return 'Phone number must contain at least 10 digits.';
    }
    if (digitsOnly.length > 15) {
      return 'Phone number cannot exceed 15 digits.';
    }
    return null;
  };

  const validateCompany = (comp: string): string | null => {
    const trimmed = comp.trim();
    if (!trimmed) return null; // Optional
    if (trimmed.length < 2) return 'Company name must be at least 2 characters.';
    return null;
  };

  const validateAllFormFields = () => {
    const nameErr = validateName(inquiryForm.name);
    const emailErr = validateEmail(inquiryForm.email);
    const phoneErr = validatePhone(inquiryForm.phone);
    const companyErr = validateCompany(inquiryForm.company);
    const privacyErr = !privacyAccepted ? 'Please accept the privacy policy.' : null;

    const errors: typeof formErrors = {};
    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    if (phoneErr) errors.phone = phoneErr;
    if (companyErr) errors.company = companyErr;
    if (privacyErr) errors.privacy = privacyErr;

    return errors;
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: null, message: '' });
    }, 3500);
  };

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    showNotification('Corporate email copied to clipboard.');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to display validation indicators
    setFormTouched({
      name: true,
      company: true,
      email: true,
      phone: true,
      privacy: true
    });

    const errors = validateAllFormFields();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstError = errors.name || errors.email || errors.phone || errors.company || errors.privacy;
      showNotification(firstError || 'Please correct the highlighted fields before submitting.', 'error');
      return;
    }

    const textLines = [
      `*Commercial Inquiry - D R & Sons International Pvt. Ltd.*`,
      `*Entity:* D R & Sons International Private Limited`,
      `*Name:* ${inquiryForm.name.trim()}`,
      `*Company:* ${inquiryForm.company.trim() || 'Not Specified'}`,
      `*Email:* ${inquiryForm.email.trim()}`,
      `*Phone:* ${inquiryForm.phone.trim() || 'Not Specified'}`,
      `*Division:* ${inquiryForm.division}`,
      `*Order Volume:* ${inquiryForm.volume}`,
      `*Specifications:* ${inquiryForm.message.trim() || 'Standard Specifications'}`
    ];
    const encodedText = encodeURIComponent(textLines.join('\n'));
    const url = `https://wa.me/918077622461?text=${encodedText}`;

    setIsSubmittingInquiry(true);
    setTimeout(() => {
      setIsSubmittingInquiry(false);
      setWhatsappRedirectUrl(url);
      setInquirySubmitted(true);
      setRedirectCountdown(3);
      showNotification('Inquiry validated. Redirecting to WhatsApp desk...', 'success');

      setTimeout(() => {
        window.location.href = url;
      }, 2800);
    }, 600);
  };

  // Countdown timer for automatic redirect
  useEffect(() => {
    if (redirectCountdown === null || redirectCountdown <= 0) return;
    const timer = setTimeout(() => {
      setRedirectCountdown(redirectCountdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [redirectCountdown]);

  // Rotary Dial Auto-Rotate timer
  useEffect(() => {
    if (!rotaryAutoPlay) return;
    const interval = setInterval(() => {
      setRotaryDivision((prev) => (prev + 1) % divisionsData.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [rotaryAutoPlay]);

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

  const tickerItems = [
    'D R & Sons International Private Limited · Incorporated Enterprise (Since 2026)',
    'Fruits, Vegetables Powder and starch',
    'Fruit & Vegetable Flakes',
    'Drinking Mineral Water (250ml, 300ml, 500ml & 1L)',
    'Non-Alcoholic Drinks & Ice Creams',
    'Advanced Spray & Drum Drying',
    'Class 100 Cleanroom Bottling & RO Ozonation',
    'BIS IS 14543:2004 & FSSAI Certified Supply',
    'Direct WhatsApp: 8077622461'
  ];

  const divisionsData = [
    {
      id: 'powders',
      number: '01',
      shortName: 'Fruits, Veg Powder & Starch',
      title: 'Fruits, Vegetables Powder and starch',
      summary: 'Precision low-temperature spray drying, specialty food starches, and micro-milling yielding instant solubility and superior formulation consistency.',
      tagline: 'Pure fruit & vegetable powders, food starches, and calibrated formulation powders',
      image: '/assets/aistudio/file_000000007504820892cf49a02d280275_ad4da5f2.webp',
      icon: Apple,
      keyItems: ['Pink Guava Powder', 'Watermelon & Orange Powder', 'Native & Modified Starches', 'Tomato & Beetroot', 'Tapioca & Corn Starches'],
      specs: ['Low-temp spray dried', 'Instant ambient solubility', 'Industrial food-grade starches', 'Nitrogen-flushed barrier pack'],
      applications: 'Beverages, bakery, confectionery, instant soups, sauces & snack seasonings'
    },
    {
      id: 'flakes',
      number: '02',
      shortName: 'Fruit & Veg Flakes',
      title: 'Fruits and Vegetables Flakes',
      summary: 'Specialized drum drying and gentle hot-air dehydration creating crunchy, rapidly rehydrating flakes.',
      tagline: 'Dehydrated crispy flakes with instant rehydration & vibrant taste',
      image: '/assets/aistudio/image_449cc89f.webp',
      icon: PackageCheck,
      keyItems: ['Dehydrated Vegetable Flakes', 'Beetroot Flakes', 'Herbs & Greens', 'Crispy Onion Flakes'],
      specs: ['Continuous drum drying', 'Rapid water rehydration', 'Zero artificial preservatives', 'Hermetic moisture-proof drums'],
      applications: 'Cereals, muesli, instant noodles, soup mixes & snack bars'
    },
    {
      id: 'water',
      number: '03',
      shortName: 'Drinking Mineral Water',
      title: 'Drinking Mineral Water (250ml, 300ml, 500ml & 1L)',
      summary: 'Multi-stage reverse osmosis, ozonation, micron filtration, and calibrated electrolyte remineralization yielding crystal-clear pure drinking water packaged in 250ml, 300ml, 500ml, and 1L commercial categories.',
      tagline: 'Pure packaged drinking water certified under IS 14543 with balanced minerals and crisp taste',
      image: '/assets/aistudio/drinking_water_packaging.webp',
      icon: Droplets,
      keyItems: ['250ml Pocket & Event Pack', '300ml Hospitality & Dining Pack', '500ml Retail On-the-Go PET', '1 Litre Table & Family Pack', 'IS 14543 Certified'],
      specs: ['250ml, 300ml, 500ml & 1L Categories', 'Double-Pass RO & Ozonation', '100% Recyclable Virgin Food-Grade PET', 'Tamper-Evident Induction Sealing'],
      applications: 'Hospitality, airline catering, retail brands, corporate offices, railway transit & distributors'
    },
    {
      id: 'beverages',
      number: '04',
      shortName: 'Drinks & Ice Creams',
      title: 'Non-Alcoholic Drinks and Ice Creams',
      summary: 'Continuous pasteurization, automated cleanroom bottling, and commercial continuous freezing churn suites.',
      tagline: 'High-speed bottling and premium packaged frozen desserts',
      image: '/assets/aistudio/image_081c2200.webp',
      icon: Coffee,
      keyItems: ['Bottled Fruit Drinks', 'Packaged Ice Creams', 'Berry Blast & Mango Passion', 'Dairy & Fruit Confections'],
      specs: ['Continuous pasteurization', 'Cleanroom automated lines', 'Sub-zero frozen dispatch', 'Tamper-evident sealing'],
      applications: 'Retail brands, supermarket chains, hospitality & distributors'
    }
  ];

  const facilitiesData = [
    {
      id: 'powders-starch',
      number: '01',
      division: 'Fruits, Vegetables Powder and starch',
      title: 'Spray Drying & Starch Micro-Milling Suite',
      shortTitle: 'Powders & Starch Line',
      desc: 'Continuous low-temperature evaporators, high-torque atomization spray towers, and micro-milling lines producing nutrient-dense, free-flowing commercial food powders and starches.',
      image: '/assets/aistudio/file_000000007504820892cf49a02d280275_ad4da5f2.webp',
      icon: Apple,
      cleanroomClass: 'Class 10,000 / ISO 7 Cleanroom',
      capacity: '1,200 kg / Hour Output',
      equipment: 'Vacuum Evaporator, Centrifugal Atomizer & Fluid Bed Cooler',
      tags: ['Spray Towers', 'Starch Refining', 'Vacuum Evaporation', 'Micro-Milling'],
      stages: [
        {
          stepNumber: '01',
          stepLabel: 'Farm Ingestion',
          phase: 'PHASE 01 · RAW HARVEST INGESTION & COLD WASH',
          title: 'Farm-Gate Harvest Sorting & Sugar Brix Calibration',
          summary: 'Direct contracted harvest intake is subjected to dual-stage optical grading, debris elimination, sanitizing wash baths below 12°C, and digital refractometer testing to establish baseline natural sugar and dry-matter ratios before batch acceptance.',
          image: '/assets/factory/stages/line1_stage1_harvest_sorting.webp',
          telemetry: [
            { label: 'Thermal Window', value: '< 12°C Cold Wash Bath' },
            { label: 'Brix Grading', value: '10.5° – 14.5° Refractometer' },
            { label: 'Sorting Tolerance', value: '99.8% Optical Clearance' },
            { label: 'Ingestion Rate', value: '3,500 kg / Hr Intake' }
          ],
          qaStandard: 'HACCP Critical Control Point 1 · Optical Foreign Object Clearance',
          highlight: 'Gentle wash protocols prevent surface bruising and early enzymatic breakdown.'
        },
        {
          stepNumber: '02',
          stepLabel: 'Puree & Inactivation',
          phase: 'PHASE 02 · ASEPTIC PUREEING & FLASH ENZYME BLUNTING',
          title: 'Flash Thermal Deactivation & Viscosity Homogenization',
          summary: 'Produce is milled through sanitary 316L stainless steel blade suites followed by an 82°C brief thermal flash. This permanently deactivates polyphenol oxidases, preserving natural pigments and biological nutrients without caramelization.',
          image: '/assets/factory/stages/line1_stage2_thermal_pureeing.webp',
          telemetry: [
            { label: 'Flash Temperature', value: '82°C for 6 Seconds' },
            { label: 'Milling Caliper', value: 'Micro-Homogenized Slurry' },
            { label: 'Nutrient Retention', value: '> 95.4% Vitamin C & Phytos' },
            { label: 'Aseptic Line', value: 'Sanitary 316L Stainless Steel' }
          ],
          qaStandard: 'Enzyme Activity Index: 0.0 U/g · Zero Thermal Color Degradation',
          highlight: 'Stops oxidation immediately, locking in original harvest flavor and color.'
        },
        {
          stepNumber: '03',
          stepLabel: 'Vacuum Concentration',
          phase: 'PHASE 03 · NEGATIVE-PRESSURE MOLECULAR EVAPORATION',
          title: 'Low-Temperature Evaporative Pre-Concentration',
          summary: 'Slurry enters a falling-film vacuum chamber at 48°C–52°C. Under negative atmospheric pressure (-0.08 MPa), moisture is removed gently without exposing the ingredients to high heat, preserving volatile aromatic esters and essential solids.',
          image: '/assets/factory/stages/line1_stage3_vacuum_evaporator.webp',
          telemetry: [
            { label: 'Vacuum Pressure', value: '-0.08 MPa Negative Chamber' },
            { label: 'Operating Heat', value: '48°C – 52°C Gentle Extraction' },
            { label: 'Concentration Factor', value: '32% Total Solids Target' },
            { label: 'Evaporation Flow', value: '2,400 Litres / Hour' }
          ],
          qaStandard: 'Inline Refractometry & Solids Density Sensor Verification',
          highlight: 'Maintains heat-sensitive aromatics that conventional boiling destroys.'
        },
        {
          stepNumber: '04',
          stepLabel: 'Spray Atomization',
          phase: 'PHASE 04 · HIGH-TORQUE CENTRIFUGAL SPRAY DRYING',
          title: 'Vortex Atomization & Instantaneous 1.2s Desiccation',
          summary: 'Concentrated slurry is pumped into a 12,000 RPM rotary centrifugal atomizer head inside the drying tower. Dispersed into micron-sized droplets, it meets a vortex of clean dry air, desiccating into dry micro-spheres in 1.2 seconds flat.',
          image: '/assets/factory/stages/line1_stage4_spray_atomization.webp',
          telemetry: [
            { label: 'Atomizer Speed', value: '12,000 RPM Centrifugal Disc' },
            { label: 'Residence Time', value: '1.2 Seconds Desiccation' },
            { label: 'Final Moisture', value: '< 3.8% Controlled Bound Water' },
            { label: 'Particle Morphology', value: 'Free-Flowing Micro-Spheres' }
          ],
          qaStandard: 'Karl Fischer Coulometric Titration · Residual Moisture <4.0%',
          highlight: 'Ultra-fast desiccation ensures instant water solubility with zero clumping.'
        },
        {
          stepNumber: '05',
          stepLabel: 'Milling & Packing',
          phase: 'PHASE 05 · CYCLONE SCREENING & HERMETIC PACKING',
          title: '100-Mesh Vibratory Sifting & Nitrogen-Flushed Barrier Packaging',
          summary: 'Cooled powder passes through a rotary cyclone separator and 100-mesh vibratory sieve. It is automatically packaged in cleanroom conditions into 4-ply aluminum foil moisture-barrier kraft liners under a food-grade nitrogen blanket.',
          image: '/assets/factory/stages/line1_stage5_vibratory_packing.webp',
          telemetry: [
            { label: 'Screening Mesh', value: '80 – 120 Mesh Calibration' },
            { label: 'Residual Oxygen', value: '< 0.5% Nitrogen Blanket' },
            { label: 'Packaging Liner', value: '4-Ply Aluminum Hermetic Foil' },
            { label: 'Standard Bulk Units', value: '20kg & 25kg Net Weight Drums' }
          ],
          qaStandard: 'Continuous In-line Metal Detection & Sealed Microbial Swab Protocol',
          highlight: '24-month ambient shelf life with 100% protection against atmospheric moisture.'
        }
      ]
    },
    {
      id: 'flakes-dehydration',
      number: '02',
      division: 'Fruits and Vegetables Flakes',
      title: 'Double-Drum Dehydration & Flake Calibration Suite',
      shortTitle: 'Crispy Flakes Line',
      desc: 'Precision counter-rotating steam-heated drum dryers paired with cryogenic nitrogen cooling flakers, yielding crispy inclusions with rapid rehydration kinetics and vivid natural hues.',
      image: '/assets/aistudio/image_449cc89f.webp',
      icon: PackageCheck,
      cleanroomClass: 'Class 10,000 Clean Room',
      capacity: '800 kg / Hour Output',
      equipment: 'Counter-Rotating Steam Drums, Precision Doctor Blades & Rotary Calibrators',
      tags: ['Drum Rollers', 'Flake Calibration', 'Nitrogen Seal', 'Rapid Rehydration'],
      stages: [
        {
          stepNumber: '01',
          stepLabel: 'Harvest Intake',
          phase: 'PHASE 01 · OPTICAL SORTING & SLICING',
          title: 'Calibrated Slicing & Fiber Integrity Screening',
          summary: 'Raw fruits and vegetables are inspected on dual optical sorting belts to reject imperfect specimens, then precision-sliced to calibrated 1.2mm profiles to guarantee uniform drying kinetics across the entire batch.',
          image: '/assets/factory/stages/line2_stage1_calibrated_slicing.webp',
          telemetry: [
            { label: 'Slicing Caliper', value: '1.2mm ± 0.1mm Precision' },
            { label: 'Inspection Protocol', value: 'Dual-Spectrum Optical Sensor' },
            { label: 'Cold Intake', value: 'Insulated Refrigerated Transport' },
            { label: 'Sorting Efficiency', value: '99.9% Defect Rejection' }
          ],
          qaStandard: 'Visual Color Consistency Check & Geometry Calibration Tolerance',
          highlight: 'Uniform slice thickness ensures zero burnt or under-dried edges.'
        },
        {
          stepNumber: '02',
          stepLabel: 'Steam Pre-Treatment',
          phase: 'PHASE 02 · MILD ATMOSPHERIC BLANCHING',
          title: 'Steam-Conditioned Starch Gelatinization',
          summary: 'Slices travel through a 92°C saturated steam chamber for 18 seconds. This mild treatment gelatinizes surface starches, stabilizes cellular carotenoids, and primes the cellular walls for rapid subsequent moisture desorption.',
          image: '/assets/factory/stages/line2_stage2_steam_blanching.webp',
          telemetry: [
            { label: 'Steam Temperature', value: '92°C Atmospheric Chamber' },
            { label: 'Exposure Period', value: '18 Seconds Continuous' },
            { label: 'Enzyme Suppression', value: 'Peroxidase Negative Tested' },
            { label: 'Color Retention', value: 'Delta-E < 1.2 Spectro' }
          ],
          qaStandard: 'Spectrophotometric Chroma Analysis & Peroxidase Negative Titration',
          highlight: 'Locks in bright harvest color without requiring artificial colorants.'
        },
        {
          stepNumber: '03',
          stepLabel: 'Drum Dehydration',
          phase: 'PHASE 03 · TWIN-DRUM THERMAL FILM DEHYDRATION',
          title: 'Sub-Millimeter Film Transfer & Continuous Drying',
          summary: 'Conditioned produce is applied as an ultra-thin 0.18mm film onto twin counter-rotating cast-iron drums heated internally with dry steam at 118°C. In 8.5 seconds, moisture is removed and a flexible dehydrated sheet forms.',
          image: '/assets/factory/stages/line2_stage3_drum_dehydration.webp',
          telemetry: [
            { label: 'Drum Surface Heat', value: '118°C Superheated Steam' },
            { label: 'Film Thickness', value: '0.18mm Micrometric Spread' },
            { label: 'Rotation Speed', value: '4.2 RPM Continuous' },
            { label: 'Contact Duration', value: '8.5 Seconds Complete Cycle' }
          ],
          qaStandard: 'Infrared Pyrometer Continuous Drum Surface Temperature Log',
          highlight: 'Rapid contact drying gives flakes a delicate, crispy cellular structure.'
        },
        {
          stepNumber: '04',
          stepLabel: 'Chamber Cooling',
          phase: 'PHASE 04 · DEHUMIDIFIED NITROGEN CHILLING',
          title: 'Micro-Doctor Blade Shearing & Dry Cooling',
          summary: 'Hardened surgical stainless steel doctor blades shear the dried film from drum rollers. The sheet is instantly conveyed into a 14°C dehumidified positive-pressure tunnel where rotary flakers calibrate flake size to 3mm–8mm.',
          image: '/assets/factory/stages/line2_stage4_cooling_flaking.webp',
          telemetry: [
            { label: 'Chill Temperature', value: '14°C Controlled Atmosphere' },
            { label: 'Relative Humidity', value: '< 20% RH Positive Pressure' },
            { label: 'Flake Sizing', value: '3mm – 8mm Calibrated Sieve' },
            { label: 'Crispness Index', value: '4.8 N Peak Rupture Force' }
          ],
          qaStandard: 'Texture Analyzer Rupture Force & Rehydration Speed Verification',
          highlight: 'Rehydrates in hot water or liquid in under 45 seconds.'
        },
        {
          stepNumber: '05',
          stepLabel: 'Nitrogen Sealing',
          phase: 'PHASE 05 · AROMA-SEALED CONTAINERIZATION',
          title: 'Hermetic Nitrogen Packing for Cereal & Ready-Meal Inclusions',
          summary: 'Calibrated flakes are weighed in multi-head automated scale hoppers and sealed in high-barrier metallized pouches under positive nitrogen flush, providing 24 months of ambient storage stability without softening.',
          image: '/assets/factory/stages/line2_stage5_nitrogen_pouches.webp',
          telemetry: [
            { label: 'Residual Oxygen', value: '< 0.8% Modified Atmosphere' },
            { label: 'Water Activity (aw)', value: '0.22 aw Highly Stable' },
            { label: 'Rehydration Rate', value: '< 45s Instant Moisture Uptake' },
            { label: 'Shelf Integrity', value: '24 Months Ambient Barrier' }
          ],
          qaStandard: 'Hermetic Leak Decay Testing & Gas Chromatograph Headspace Oxygen Check',
          highlight: 'Ideal for breakfast cereals, soup mixes, seasoning blends, and snack formulations.'
        }
      ]
    },
    {
      id: 'mineral-water',
      number: '03',
      division: 'Drinking Mineral Water (250ml, 300ml, 500ml & 1L)',
      title: 'Double-Pass RO & Automated Cleanroom Bottling (250ml–1L)',
      shortTitle: 'Mineral Water Suite',
      desc: 'Multi-stage quartz and activated carbon filtration, dual thin-film composite reverse osmosis, calibrated remineralization, and high-speed touch-free Class 100 cleanroom rotary bottling across 250ml, 300ml, 500ml, and 1L commercial categories.',
      image: '/assets/aistudio/drinking_water_packaging.webp',
      icon: Droplets,
      cleanroomClass: 'Class 100 / ISO 5 Cleanroom Enclosure',
      capacity: '10,000 Litres / Hour Purification',
      equipment: 'Double-Pass RO Skid, Ozonator, 254nm UV Chamber & Monoblock Bottling',
      tags: ['250ml, 300ml, 500ml, 1L', 'IS 14543:2004', 'RO & Ozonation', 'Class 100'],
      stages: [
        {
          stepNumber: '01',
          stepLabel: 'Pre-Filtration',
          phase: 'PHASE 01 · MULTI-BED PHYSICAL PURIFICATION',
          title: 'Graded Quartz & High-Iodine Activated Carbon Filtration',
          summary: 'Raw spring intake passes through dual-gradient quartz sand filters (down to 10 microns) followed by 1050-iodine activated carbon beds to eliminate suspended matter, organic contaminants, odor, and chlorine precursors.',
          image: '/assets/factory/stages/line3_stage1_quartz_carbon_filtration.webp',
          telemetry: [
            { label: 'Filtration Depth', value: '10 Micron Quartz Media' },
            { label: 'Carbon Iodine Value', value: '1050 mg/g High Adsorption' },
            { label: 'Inlet Turbidity', value: '< 0.1 NTU Pure Clarity' },
            { label: 'Throughput Flow', value: '14,000 Litres / Hour' }
          ],
          qaStandard: 'Digital Turbidimeter Logging & Silt Density Index (SDI < 3.0)',
          highlight: 'Eliminates 99.9% of suspended solids before reverse osmosis membranes.'
        },
        {
          stepNumber: '02',
          stepLabel: 'Double-Pass RO',
          phase: 'PHASE 02 · THIN-FILM COMPOSITE OSMOSIS',
          title: 'Double-Pass Reverse Osmosis (0.0001 Micron)',
          summary: 'High-pressure multi-stage pumps push water through thin-film composite polyamide spiral membranes at 14.5 Bar. Over 99.4% of total dissolved solids, heavy metals, pesticides, and microbial pathogens are rejected.',
          image: '/assets/factory/stages/line3_stage2_double_pass_ro.webp',
          telemetry: [
            { label: 'Operating Pressure', value: '14.5 Bar Multi-Stage Pump' },
            { label: 'Pore Rating', value: '0.0001 Micron Polyamide' },
            { label: 'TDS Rejection', value: '99.4% Total Ion Removal' },
            { label: 'Permeate Quality', value: '< 5 ppm Pure Base Stream' }
          ],
          qaStandard: 'Continuous Inline Conductivity & Permeate TDS Sensors',
          highlight: 'Delivers an ultra-pure, crystal-clear water baseline free of chemical impurities.'
        },
        {
          stepNumber: '03',
          stepLabel: 'Remineralization',
          phase: 'PHASE 03 · CALIBRATED MINERAL ENRICHMENT',
          title: 'Precision Electrolyte & Mineral Re-Balancing',
          summary: 'Pure permeate is dosed with pharmaceutical food-grade calcium, magnesium, and potassium ions at a strict 3:1 ratio. Water passes through an inline static mixer to stabilize pH between 7.2 and 7.5, creating a crisp, refreshing mineral profile.',
          image: '/assets/factory/stages/line3_stage3_mineral_rebalancing.webp',
          telemetry: [
            { label: 'Target TDS', value: '95 – 120 ppm Optimal Mineral' },
            { label: 'pH Balance', value: '7.2 – 7.5 Alkaline-Neutral' },
            { label: 'Electrolyte Balance', value: 'Calcium : Magnesium 3:1' },
            { label: 'Sensory Score', value: 'Crisp & Refreshing Finish' }
          ],
          qaStandard: 'ICP Spectrometry Mineral Profiling & Automated Online pH Controller',
          highlight: 'Produces the exact mineral composition required for premier taste and hydration.'
        },
        {
          stepNumber: '04',
          stepLabel: 'UV & Ozonation',
          phase: 'PHASE 04 · DUAL BIOLOGICAL SANITIZATION',
          title: '254nm Ultraviolet Chamber & Dissolved O3 Barrier',
          summary: 'Water is exposed to high-intensity germicidal ultraviolet light (254nm UV-C) followed by micro-bubble ozone injection (0.2–0.4 ppm). Ozone provides residual sanitization inside the bottle before reverting cleanly to pure oxygen.',
          image: '/assets/factory/stages/line3_stage4_uv_ozone_barrier.webp',
          telemetry: [
            { label: 'UV-C Wavelength', value: '254nm High-Dose Chamber' },
            { label: 'Dissolved Ozone', value: '0.2 – 0.4 ppm In-Bottle Active' },
            { label: 'Microbial Count', value: '0 CFU / 100ml Pure Sterile' },
            { label: 'Byproduct Residue', value: 'Zero Chemical Residue' }
          ],
          qaStandard: 'Online Dissolved Ozone Analyzer & Daily Membrane Micro-Culture Swabs',
          highlight: 'Guarantees 100% biological purity without boiling or chemical taste.'
        },
        {
          stepNumber: '05',
          stepLabel: 'Rotary Bottling',
          phase: 'PHASE 05 · CLASS 100 MONOBLOCK PACKAGING',
          title: 'Touch-Free Rinser-Filler-Capper & Tamper Induction Sealing',
          summary: 'Bottling occurs within a laminar HEPA-filtered Class 100 cleanroom enclosure across four calibrated commercial retail categories: 250ml, 300ml, 500ml, and 1L. Bottles are air-rinsed with sterile ionized air, filled under gravity-flow isobaric nozzles, and capped with tamper-evident collar closures at 120 bottles/min.',
          image: '/assets/factory/stages/line3_stage5_rinser_filler_capper.webp',
          telemetry: [
            { label: 'Bottling Velocity', value: '120 Bottles / Minute Rotary' },
            { label: 'Cleanroom Enclosure', value: 'Class 100 / ISO 5 Positive' },
            { label: 'Volumetric Accuracy', value: '± 0.5 ml Laser Calibrated' },
            { label: 'Bottle Categories', value: '250ml, 300ml, 500ml & 1L PET' }
          ],
          qaStandard: 'Automated High-Speed Machine-Vision Fill-Level & Torque Inspection (IS 14543 / FSSAI)',
          highlight: 'Certified virgin food-grade PET across 250ml, 300ml, 500ml & 1L with tamper-evident induction security.'
        }
      ]
    },
    {
      id: 'beverages-churn',
      number: '04',
      division: 'Non-Alcoholic Drinks and Ice Creams',
      title: 'Aseptic Bottling & Continuous Churn Freeze Suites',
      shortTitle: 'Drinks & Ice Cream Line',
      desc: 'Sanitary jacketed 316L blending reactors, continuous plate UHT pasteurization suites, high-speed automated bottling lines, and sub-zero continuous churn ice cream freezers.',
      image: '/assets/factory/aamrit_bottling_line.webp',
      icon: Coffee,
      cleanroomClass: 'Class 1,000 Cleanroom Bottling Suite',
      capacity: '7,500 Bottles / Hour & 1,500 L / Hr Churn',
      equipment: '16-Head Rotary Bottler, Continuous Scraped Freezer & Blast Hardening Tunnel',
      tags: ['UHT Pasteurization', 'Auto-Capping', 'Cold-Chain Dispatch', 'Churn Freezers'],
      stages: [
        {
          stepNumber: '01',
          stepLabel: 'Sterile Blending',
          phase: 'PHASE 01 · VACUUM REACTOR BATCH FORMULATION',
          title: 'High-Shear Dispersion & Cold Homogenization',
          summary: 'Natural fruit purees, botanical extracts, and dairy bases are blended in 5,000-liter sanitary 316L reactors under vacuum deaeration to eliminate micro air bubbles, followed by high-pressure two-stage homogenization at 200 Bar.',
          image: '/assets/factory/stages/line4_stage1_shear_dispersion.webp',
          telemetry: [
            { label: 'Reactor Capacity', value: '5,000 Litres Sanitary 316L' },
            { label: 'Homogenizer Pressure', value: '200 Bar Two-Stage Impact' },
            { label: 'Deaeration Vacuum', value: '-0.06 MPa Bubble Removal' },
            { label: 'Brix Target Margin', value: '± 0.2° Automated Dosing' }
          ],
          qaStandard: 'Online Refractometer, Densitometer & Particle Size Distribution Check',
          highlight: 'Micro-homogenization prevents fat separation and ensures silky-smooth mouthfeel.'
        },
        {
          stepNumber: '02',
          stepLabel: 'UHT Pasteurization',
          phase: 'PHASE 02 · CONTINUOUS THERMAL STERILIZATION',
          title: 'Ultra-High Temperature Continuous Flow Pasteurization',
          summary: 'Formulations pass through a regenerative plate heat exchanger, heated to 108°C for 4 seconds, then rapidly chilled to 4°C using glycol loops. This guarantees a commercial 6-log pathogen reduction with zero scorched flavor notes.',
          image: '/assets/factory/stages/line4_stage2_uht_pasteurization.webp',
          telemetry: [
            { label: 'Pasteurization Temp', value: '108°C Flash Sterilization' },
            { label: 'Holding Period', value: '4 Seconds Continuous Flow' },
            { label: 'Rapid Chill Loop', value: '4°C Glycol Heat Exchanger' },
            { label: 'Energy Regeneration', value: '88% Thermal Recovery' }
          ],
          qaStandard: 'Automated Fail-Safe Divert Valve System & Continuous Thermocouple Log',
          highlight: 'Preserves the authentic fresh fruit aroma while guaranteeing commercial shelf stability.'
        },
        {
          stepNumber: '03',
          stepLabel: 'Automated Bottling',
          phase: 'PHASE 03 · 16-HEAD ROTARY FILLING & AUTO-CAPPING',
          title: 'Cleanroom Touch-Free Beverage Bottling Line',
          summary: 'Sterile beverage stream flows into an enclosed 16-head rotary filling carousel. Bottles receive nitrogen headspace dosing, automatic cap torque fastening, and tamper-evident shrink sleeve application at speeds up to 100+ BPM.',
          image: '/assets/factory/stages/line4_stage3_sterile_cold_filling.webp',
          telemetry: [
            { label: 'Filling Architecture', value: '16-Head Isobaric Rotary' },
            { label: 'HEPA Air Velocity', value: '0.45 m/s Laminar Airflow' },
            { label: 'Bottling Velocity', value: '100+ Bottles / Minute' },
            { label: 'Nitrogen Dosing', value: 'Headspace Inert Gas Seal' }
          ],
          qaStandard: 'Camera Vision Capper Torque & Fill Height Verification Gate',
          highlight: 'High-speed cleanroom filling ensures pristine product integrity without chemical preservatives.'
        },
        {
          stepNumber: '04',
          stepLabel: 'Continuous Freezing',
          phase: 'PHASE 04 · SCRAPED-SURFACE CHURN FREEZING',
          title: 'Micro-Overrun Churning & Ice Crystal Optimization',
          summary: 'For ice creams and frozen desserts, dairy mix enters a continuous scraped-surface cylinder freezer at -5.5°C. Micro-filtered sterile air is metered in to achieve exact overrun (40%–80%) while scraper blades keep ice crystals microscopic (<15µ).',
          image: '/assets/factory/stages/line4_stage4_continuous_churning.webp',
          telemetry: [
            { label: 'Extrusion Temp', value: '-5.5°C Semi-Solid State' },
            { label: 'Overrun Range', value: '40% – 85% Precision Metered' },
            { label: 'Scraper Velocity', value: '450 RPM Stainless Blades' },
            { label: 'Crystal Size Target', value: '< 15 Micron Velvety Body' }
          ],
          qaStandard: 'Mass Flow Overrun Sensor & Texture Penetrometer Body Check',
          highlight: 'Microscopic ice crystals deliver ultra-creamy, velvety scoop texture.'
        },
        {
          stepNumber: '05',
          stepLabel: 'Blast Tunnel & Cold Chain',
          phase: 'PHASE 05 · -35°C CRYOGENIC SPIRAL HARDENING',
          title: 'Blast Hardening & Sub-Zero Temperature-Logged Dispatch',
          summary: 'Filled containers pass through a -35°C forced-air cryogenic blast tunnel, reaching a core temperature of -18°C within 35 minutes. Products are palletized and transferred directly into cold-chain refrigerated dispatch reefers.',
          image: '/assets/factory/stages/line4_stage5_blast_hardening.webp',
          telemetry: [
            { label: 'Blast Tunnel Heat', value: '-35°C High-Velocity Air' },
            { label: 'Core Hardening Time', value: '35 Minutes to -18°C Core' },
            { label: 'Cold-Chain Dispatch', value: '-20°C Reefer Fleet Storage' },
            { label: 'Thermal Tracking', value: 'Real-Time GPS Thermologgers' }
          ],
          qaStandard: 'Continuous Cold-Chain Temperature Data Logging to Final Destination',
          highlight: 'Locks in structural stability and overrun for long-distance commercial distribution.'
        }
      ]
    }
  ];

  // Helper values for current facility line and stage
  const currentFacilityLine = facilitiesData[selectedFacilityLine] || facilitiesData[0];
  const currentFacilityStage = currentFacilityLine?.stages[selectedFacilityStage] || currentFacilityLine?.stages[0];
  const totalFacilityStages = currentFacilityLine?.stages.length || 5;

  const handlePrevFacilityStage = () => {
    setSelectedFacilityStage((prev) => Math.max(0, prev - 1));
  };

  const handleNextFacilityStage = () => {
    setSelectedFacilityStage((prev) => Math.min(totalFacilityStages - 1, prev + 1));
  };

  if (showMaintenancePreview) {
    return <MaintenancePage onUnlock={() => setShowMaintenancePreview(false)} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#fbfdfb] text-[#122218] flex flex-col font-sans selection:bg-[#143e2b] selection:text-white relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification.message && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-auto sm:bottom-6 z-50 text-white px-4 py-3 shadow-2xl border flex items-center gap-3 text-xs ${
              notification.type === 'error'
                ? 'bg-[#2a0e0e] border-red-700/60'
                : 'bg-[#0c2419] border-emerald-700/50'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
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
        href="https://wa.me/918077622461"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:bg-[#20ba59] active:scale-95 transition-all hover:shadow-emerald-500/30 group"
        title="Chat on WhatsApp (+91 8077622461)"
        aria-label="Chat on WhatsApp (+91 8077622461)"
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
            <div className="h-9 sm:h-11 flex items-center">
              <img 
                src="/assets/brand/drsons_logo.webp" 
                alt="D R & SONS INTERNATIONAL" 
                className="h-9 sm:h-11 w-auto aspect-square object-contain"
              />
            </div>
            <div className="border-l border-neutral-200 pl-2.5 hidden md:block">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-[#0a2318] block leading-none">
                D R &amp; SONS INTERNATIONAL PVT. LTD.
              </span>
              <span className="text-[9px] text-neutral-500 uppercase tracking-widest block mt-0.5">
                Food &amp; Beverage Manufacturing · Since 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-700">
            <a 
              href="#divisions"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('divisions');
                if (target) {
                  const targetY = target.getBoundingClientRect().top + window.scrollY - 64;
                  smoothScrollTo(targetY, 850);
                }
              }}
              className="hover:text-emerald-950 transition-colors cursor-pointer"
            >
              Divisions
            </a>
            <a 
              href="#facilities" 
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('facilities');
                if (target) {
                  const targetY = target.getBoundingClientRect().top + window.scrollY - 64;
                  smoothScrollTo(targetY, 850);
                }
              }}
              className="hover:text-emerald-950 transition-colors cursor-pointer"
            >
              Facilities
            </a>
            <button 
              onClick={() => setLegalModalTab('regulatory')}
              className="hover:text-emerald-950 transition-colors cursor-pointer text-neutral-600 font-medium"
            >
              Regulatory
            </button>
            <button 
              onClick={() => setLegalModalTab('press')}
              className="hover:text-emerald-950 transition-colors cursor-pointer text-neutral-600 font-medium"
            >
              Press
            </button>
            <button 
              onClick={() => setLegalModalTab('terms')}
              className="hover:text-emerald-950 transition-colors cursor-pointer text-neutral-600 font-medium"
            >
              Legal Terms
            </button>
          </nav>

          {/* Direct WhatsApp Callout & Primary CTA Button */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/918077622461"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 border border-emerald-900/15 text-xs font-medium rounded-md transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-800" />
              <span className="hidden sm:inline">WhatsApp:</span>
              <span className="font-mono tabular-nums font-semibold text-[11px] sm:text-xs">8077622461</span>
            </a>

            <a
              href="#inquiry-desk"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('inquiry-desk');
                if (target) {
                  const targetY = target.getBoundingClientRect().top + window.scrollY - 64;
                  smoothScrollTo(targetY, 850);
                }
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 bg-[#0a2318] hover:bg-[#143e2b] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3 h-3 text-[#c2a76f]" />
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
                      src="/assets/brand/drsons_logo.webp"
                      alt="D R & SONS INTERNATIONAL"
                      className="h-8 w-auto aspect-square object-contain"
                    />
                    <div>
                      <span className="text-xs font-bold tracking-tight text-[#0a2318] block leading-none">
                        D R &amp; SONS INTL
                      </span>
                      <span className="text-[9px] text-neutral-500 uppercase tracking-wider block mt-0.5">
                        Since 2026 · Navigation
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
                        <span>4 Manufacturing Divisions</span>
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

                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLegalModalTab('regulatory');
                        }}
                        className="flex items-center justify-between w-full p-2 text-xs text-neutral-700 hover:text-emerald-950 hover:bg-neutral-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Regulatory Terms (FSSAI &amp; BIS)</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLegalModalTab('press');
                        }}
                        className="flex items-center justify-between w-full p-2 text-xs text-neutral-700 hover:text-emerald-950 hover:bg-neutral-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Newspaper className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Corporate Press Releases</span>
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
                  href="https://wa.me/918077622461"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#143e2b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0c281c] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp: 8077622461</span>
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
      <section id="hero" ref={heroSectionRef} className="relative w-full h-[calc(100dvh-56px)] sm:h-[calc(100dvh-73px)] min-h-[580px] flex items-center justify-center overflow-hidden bg-[#0c2117]">
        
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

        {/* Animated Hero Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center flex flex-col items-center space-y-4 sm:space-y-6">

          {/* Clean Specific Heading (Unitalicized & Balanced) */}
          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance max-w-3xl"
          >
            Purity in Every Batch
          </motion.h1>

          {/* Clean Category Subline (Sans-serif, No Mono) */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base font-normal text-neutral-200 max-w-xl text-balance leading-relaxed"
          >
            Commercial food &amp; beverage manufacturing across fruit &amp; vegetable powders, produce flakes, packaged drinking water, and beverages.
          </motion.p>

          {/* Emphasized Primary CTA & Direct WhatsApp */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
          >
            <a
              href="#divisions"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('divisions');
                if (target) {
                  const targetY = target.getBoundingClientRect().top + window.scrollY - 64;
                  smoothScrollTo(targetY, 850);
                }
              }}
              className="px-7 py-3.5 bg-[#0a2318] hover:bg-[#143e2b] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl rounded-md flex items-center gap-2 border border-emerald-500/30 group cursor-pointer"
            >
              <span>Explore Divisions</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c2a76f] group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://wa.me/918077622461"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all rounded-md flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
              <span className="tabular-nums">WhatsApp: 8077622461</span>
            </a>
          </motion.div>

        </div>

        {/* Subtle Scroll Indicator Above Marquee */}
        <a 
          href="#divisions" 
          aria-label="Scroll down to divisions"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById('divisions');
            if (target) {
              const targetY = target.getBoundingClientRect().top + window.scrollY - 64;
              smoothScrollTo(targetY, 850);
            }
          }}
          className="absolute bottom-13 sm:bottom-15 left-1/2 -translate-x-1/2 z-20 hidden xs:flex items-center justify-center text-white/70 hover:text-white transition-colors group cursor-pointer"
        >
          <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400 group-hover:text-emerald-300" />
        </a>

        {/* Continuous Looping Operational Marquee (Integrated inside Hero Section) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 w-full border-t border-emerald-500/25 bg-[#071911]/90 backdrop-blur-md text-white py-2.5 sm:py-3 overflow-hidden select-none shadow-2xl">
          <div className="animate-marquee flex items-center gap-6 text-[10px] sm:text-[11px] font-medium uppercase tracking-widest">
            {tickerItems.map((item, idx) => (
              <div key={`hero-ticker-1-${idx}`} className="flex items-center gap-6 shrink-0">
                <span className="text-emerald-100">{item}</span>
                <span className="text-emerald-400 font-bold" aria-hidden="true">◆</span>
              </div>
            ))}
            {tickerItems.map((item, idx) => (
              <div key={`hero-ticker-2-${idx}`} className="flex items-center gap-6 shrink-0">
                <span className="text-emerald-100">{item}</span>
                <span className="text-emerald-400 font-bold" aria-hidden="true">◆</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: 4 CERTIFIED MANUFACTURING DIVISIONS (Unified Product Showcase) */}
      <section 
        id="divisions" 
        style={{ scrollMarginTop: '64px' }}
        className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white border-b border-neutral-200"
      >
        <div className="w-full max-w-7xl mx-auto space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block">
                Commercial Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 text-balance">
                Four Certified Manufacturing Divisions
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">
                Direct industrial processing and contract packaging across fruit &amp; vegetable powders, dehydrated produce flakes, certified packaged drinking water, and beverages.
              </p>
            </div>

            {/* Division Counter */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono tabular-nums text-neutral-500 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-md">
              <span className="text-emerald-900 font-bold">0{activeDivision + 1}</span>
              <span>/</span>
              <span>04</span>
              <span className="ml-1 text-neutral-400">DIVISIONS</span>
            </div>
          </div>

          {/* 4 Division Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {divisionsData.map((div, idx) => {
              const isActive = activeDivision === idx;
              return (
                <button
                  type="button"
                  key={`div-tab-${div.id}`}
                  onClick={() => setActiveDivision(idx)}
                  className={`p-3 sm:p-4 text-left transition-all duration-200 cursor-pointer rounded-lg relative border flex items-center gap-3 ${
                    isActive 
                      ? 'bg-[#0a2318] text-white border-[#0a2318] shadow-md ring-1 ring-emerald-500/20' 
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-emerald-800/40 hover:bg-[#f8faf8] shadow-2xs'
                  }`}
                >
                  {/* Active Indicator Top Stripe (Metallic Gold) */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#c2a76f] rounded-t-lg" />
                  )}

                  {/* Circular Product Thumbnail */}
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border transition-all ${
                    isActive ? 'border-[#c2a76f] ring-2 ring-[#c2a76f]/30' : 'border-neutral-200 bg-neutral-100'
                  }`}>
                    <img src={div.image} alt={div.shortName} className="w-full h-full object-cover" />
                  </div>

                  <div className="min-w-0">
                    <span className={`text-[10px] font-mono tabular-nums font-bold tracking-wider block ${
                      isActive ? 'text-[#c2a76f]' : 'text-emerald-800'
                    }`}>
                      DIVISION {div.number}
                    </span>
                    <h3 className={`text-xs sm:text-sm font-semibold truncate leading-tight mt-0.5 ${
                      isActive ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {div.shortName}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Showcase Console (Hero Product Column + Grouped Details Column) */}
          <div className="bg-[#fafbfa] border border-neutral-300 rounded-2xl p-4 sm:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              {(() => {
                const current = divisionsData[activeDivision];
                return (
                  <motion.div
                    key={`div-showcase-${current.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch"
                  >
                    
                    {/* Left Column: Enlarge the Main Feature & Show the Actual Product */}
                    <div className="lg:col-span-6 bg-white border border-neutral-200/90 rounded-xl overflow-hidden shadow-xs flex items-center justify-center p-4 sm:p-8 min-h-[340px] sm:min-h-[440px] relative group">
                      <img 
                        src={current.image} 
                        alt={current.title} 
                        className="w-full h-full max-h-[380px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      
                      {/* Subtle Corner Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-md shadow-2xs text-[11px] font-mono tabular-nums text-neutral-700">
                        <strong className="text-emerald-900">0{current.number}</strong> · Commercial Pack
                      </div>
                    </div>

                    {/* Right Column: Group with Spacing (No Empty Space!) */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                      
                      {/* Group 1: Identity & Value Proposition */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block">
                          Certified Industrial Wing
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-snug text-balance">
                          {current.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                          {current.summary}
                        </p>
                      </div>

                      {/* Group 2: Key Deliverables & Products */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                          Commercial Deliverables
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {current.keyItems.map((item, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 bg-white border border-neutral-200 rounded-md text-xs text-neutral-800 font-medium shadow-2xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Group 3: Verified Technical Specifications (2x2 Grid) */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                          Process Standards
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {current.specs.map((spec, i) => (
                            <div 
                              key={i} 
                              className="flex items-center gap-2 p-2.5 bg-white border border-neutral-200/80 rounded-md text-neutral-800 font-medium"
                            >
                              <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 stroke-[2]" />
                              <span className="truncate">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Group 4: Emphasized Primary CTA & Direct WhatsApp */}
                      <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleFacilityInquiry(current.title)}
                          className="px-6 py-3 bg-[#0a2318] hover:bg-[#143e2b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow-md rounded-md flex items-center gap-2 group cursor-pointer"
                        >
                          <span>Request Division Quote</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#c2a76f] group-hover:translate-x-1 transition-transform" />
                        </button>

                        <a
                          href={`https://wa.me/918077622461?text=${encodeURIComponent(`Hi D R & Sons Trade Desk, I am inquiring about Division ${current.number}: ${current.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 text-xs font-semibold uppercase tracking-wider transition-all rounded-md flex items-center gap-2 shadow-2xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                          <span>WhatsApp Desk</span>
                        </a>
                      </div>

                    </div>

                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* SECTION: PRODUCTION FACILITIES & CINEMATIC SPLIT-SCREEN PROCESS PIPELINE */}
      <section 
        id="facilities" 
        ref={facilitiesSectionRef}
        style={{ scrollMarginTop: '64px' }}
        className="w-full py-12 sm:py-20 px-3 sm:px-6 lg:px-12 bg-[#fafbfa] border-b border-neutral-200"
      >
        <div className="w-full max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold block">
                  Industrial Architecture
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 text-balance">
                Production Facilities &amp; Process Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                Explore our commercial manufacturing workflow across 4 industrial processing lines, tracing raw intake through precision thermal and mechanical transformation to sealed, certified commercial goods.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2.5 text-xs font-mono">
              <span className="px-3 py-1.5 bg-white border border-neutral-200 text-neutral-700 shadow-2xs rounded-md">
                Cleanroom Standard: <strong className="text-emerald-900 font-bold">{currentFacilityLine.cleanroomClass}</strong>
              </span>
            </div>
          </div>

          {/* DESKTOP & TABLET VIEW: Interactive Split-Screen Pipeline Console (hidden on mobile, visible on md+) */}
          <div className="hidden md:block space-y-6">
            
            {/* 4 Line Selector Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {facilitiesData.map((line, idx) => {
                const LineIcon = line.icon;
                const isSelected = selectedFacilityLine === idx;
                return (
                  <button
                    key={line.id}
                    type="button"
                    onClick={() => {
                      setSelectedFacilityLine(idx);
                      setSelectedFacilityStage(0);
                    }}
                    className={`p-4 border text-left transition-all duration-200 cursor-pointer relative rounded-xl ${
                      isSelected 
                        ? 'bg-[#0a2318] text-white border-[#0a2318] shadow-lg ring-1 ring-emerald-500/30' 
                        : 'bg-white text-neutral-800 border-neutral-200 hover:border-emerald-800/40 hover:bg-[#f6f9f7] shadow-xs'
                    }`}
                  >
                    {/* Active Indicator Top Stripe (Metallic Gold / Emerald Glow) */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c2a76f] via-emerald-400 to-[#c2a76f] rounded-t-xl" />
                    )}
                    
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-mono font-bold tracking-wider ${
                        isSelected ? 'text-[#c2a76f]' : 'text-emerald-800'
                      }`}>
                        LINE <span className="tabular-nums font-mono">{line.number}</span>
                      </span>
                      <div className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                        isSelected ? 'bg-white/10 text-emerald-300 border border-white/15' : 'bg-emerald-50 text-emerald-900 border border-emerald-900/10'
                      }`}>
                        <LineIcon className="w-3.5 h-3.5 stroke-[1.75]" />
                      </div>
                    </div>

                    <h3 className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {line.shortTitle}
                    </h3>
                    <p className={`text-[11px] mt-0.5 line-clamp-1 ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-600'
                    }`}>
                      {line.division}
                    </p>
                    <span className={`text-[10px] font-mono block mt-1.5 truncate tabular-nums ${
                      isSelected ? 'text-emerald-400 font-semibold' : 'text-neutral-500'
                    }`}>
                      {line.capacity}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Unified Console Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden">
              
              {/* Process Conduit Scrubber Bar (5 Stages) */}
              <div className="px-6 py-4 bg-[#f8faf8] border-b border-neutral-200">
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 uppercase">
                      Line <span className="tabular-nums">{currentFacilityLine.number}</span> Workflow:
                    </span>
                    <span className="text-emerald-800 font-semibold font-sans">
                      {currentFacilityLine.shortTitle}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-600">
                    Stage <strong className="tabular-nums font-mono text-neutral-900">{currentFacilityStage.stepNumber}</strong> of 05 · <strong className="text-neutral-900 font-sans">{currentFacilityStage.stepLabel}</strong>
                  </span>
                </div>

                {/* Scrubber Pipeline Progress Track & Nodes */}
                <div className="relative pt-1 pb-2">
                  {/* Connecting Line Track */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-neutral-200 z-0">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-[#c2a76f]"
                      initial={false}
                      animate={{ 
                        width: `${(selectedFacilityStage / (totalFacilityStages - 1)) * 100}%` 
                      }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    />
                  </div>

                  {/* 5 Stage Nodes */}
                  <div className="relative z-10 flex items-center justify-between">
                    {currentFacilityLine.stages.map((stg, sIdx) => {
                      const isActive = selectedFacilityStage === sIdx;
                      const isPast = selectedFacilityStage > sIdx;

                      return (
                        <button
                          key={`conduit-node-${sIdx}`}
                          type="button"
                          onClick={() => setSelectedFacilityStage(sIdx)}
                          className="flex flex-col items-center group cursor-pointer focus:outline-none"
                        >
                          <div 
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-200 ${
                              isActive
                                ? 'bg-[#0a2318] text-white ring-4 ring-[#c2a76f]/40 shadow-md scale-110'
                                : isPast
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-white border-2 border-neutral-300 text-neutral-600 group-hover:border-emerald-600 group-hover:text-neutral-900'
                            }`}
                          >
                            {isPast ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <span className="tabular-nums">{stg.stepNumber}</span>}
                          </div>
                          
                          <span 
                            className={`text-[11px] mt-1.5 whitespace-nowrap transition-colors max-w-[120px] text-center truncate ${
                              isActive
                                ? 'text-emerald-950 font-bold'
                                : 'text-neutral-600 group-hover:text-neutral-900 font-medium'
                            }`}
                          >
                            {stg.stepLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Console Body Grid (Left: Narrative & HUD, Right: Cinematic Stage Media) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                
                {/* Left Column: Narrative, 4-chip HUD, QA Standard, and Actions (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200">
                  
                  {/* Top Meta & Content Transition Area */}
                  <div className="space-y-4">
                    {/* Phase Header Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-900/15 font-mono text-[10px] font-bold tracking-wider uppercase rounded-md">
                        {currentFacilityStage.phase}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-500 uppercase">
                        Stage <span className="tabular-nums font-bold text-neutral-800">{currentFacilityStage.stepNumber}</span> of 05
                      </span>
                    </div>

                    {/* Animated Stage Narrative Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`content-${selectedFacilityLine}-${selectedFacilityStage}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="space-y-3.5"
                      >
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-snug text-balance">
                          {currentFacilityStage.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                          {currentFacilityStage.summary}
                        </p>

                        {/* Highlight Callout */}
                        {currentFacilityStage.highlight && (
                          <div className="p-3 bg-emerald-50/70 border-l-2 border-emerald-700 text-xs text-emerald-950 font-medium leading-relaxed rounded-r-md">
                            {currentFacilityStage.highlight}
                          </div>
                        )}

                        {/* 4-Chip Technical Telemetry HUD */}
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          {currentFacilityStage.telemetry.map((t, tIdx) => (
                            <div 
                              key={`tel-${selectedFacilityLine}-${selectedFacilityStage}-${tIdx}`} 
                              className="p-2.5 sm:p-3 border border-neutral-200 bg-[#fafbfa] rounded-lg"
                            >
                              <div className="flex items-center justify-between gap-1 text-[10px] font-mono uppercase text-neutral-500">
                                <span className="truncate">{t.label}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              </div>
                              <span className="text-xs font-mono font-bold text-neutral-900 block mt-1 truncate tabular-nums">
                                {t.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* QA Standard Protocol */}
                        <div className="flex items-center gap-2 pt-2 text-xs font-mono text-neutral-700 border-t border-neutral-100">
                          <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                          <span className="truncate">QA Standard: <strong className="text-neutral-900">{currentFacilityStage.qaStandard}</strong></span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Bottom Console Controls (Prev / Next & Inquire) */}
                  <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 mt-6">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={selectedFacilityStage === 0}
                        onClick={handlePrevFacilityStage}
                        className={`px-3 py-1.5 text-xs font-mono border flex items-center gap-1.5 transition-all rounded-md ${
                          selectedFacilityStage === 0
                            ? 'opacity-30 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200'
                            : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 cursor-pointer shadow-2xs active:scale-95'
                        }`}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Prev Stage</span>
                      </button>

                      <span className="text-xs font-mono text-neutral-600 px-2 font-bold tabular-nums">
                        {currentFacilityStage.stepNumber} / 05
                      </span>

                      <button
                        type="button"
                        disabled={selectedFacilityStage === totalFacilityStages - 1}
                        onClick={handleNextFacilityStage}
                        className={`px-3 py-1.5 text-xs font-mono border flex items-center gap-1.5 transition-all rounded-md ${
                          selectedFacilityStage === totalFacilityStages - 1
                            ? 'opacity-30 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200'
                            : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 cursor-pointer shadow-2xs active:scale-95'
                        }`}
                      >
                        <span>Next Stage</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleFacilityInquiry(`${currentFacilityLine.division} - Stage ${currentFacilityStage.stepNumber}: ${currentFacilityStage.title}`)}
                      className="px-4 py-2 bg-[#0a2318] hover:bg-[#143e2b] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-xs rounded-md group"
                    >
                      <span>Inquire for Stage {currentFacilityStage.stepNumber}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#c2a76f] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </div>

                {/* Right Column: Cinematic High-Res Stage Imagery with Cross-Fade (5 cols) */}
                <div className="lg:col-span-5 relative bg-neutral-950 overflow-hidden flex flex-col justify-between min-h-[360px] sm:min-h-[460px]">
                  
                  {/* Photo Cross-fade Container */}
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={`img-${selectedFacilityLine}-${selectedFacilityStage}`}
                      src={currentFacilityStage.image || currentFacilityLine.image} 
                      alt={currentFacilityStage.title}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                    />
                  </AnimatePresence>

                  {/* Gradient Scrims for Readable Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

                  {/* Top Overlay Pill */}
                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-md">
                      STAGE <span className="tabular-nums font-mono">{currentFacilityStage.stepNumber}</span> / 05
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 font-mono text-[10px] uppercase font-bold tracking-wider rounded-md tabular-nums">
                      {currentFacilityLine.capacity}
                    </span>
                  </div>

                  {/* Bottom Overlay Facility Specs */}
                  <div className="relative z-10 p-5 sm:p-6 text-white font-mono text-xs space-y-1.5">
                    <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{currentFacilityLine.cleanroomClass}</span>
                    </div>
                    <div className="text-neutral-100 font-normal text-[11px] line-clamp-2 leading-relaxed">
                      {currentFacilityLine.equipment}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* MOBILE VIEW: Native In-Page Swipeable Stage Carousel (hidden on md+, visible on mobile) */}
          <div className="block md:hidden space-y-4">
            
            {/* 1. Horizontal Line Selector Pill Strip */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
              {facilitiesData.map((line, idx) => {
                const isSelected = selectedFacilityLine === idx;
                return (
                  <button
                    key={`mob-line-pill-${line.id}`}
                    type="button"
                    onClick={() => {
                      setSelectedFacilityLine(idx);
                      setSelectedFacilityStage(0);
                    }}
                    className={`px-3 py-2 text-xs font-mono whitespace-nowrap border shrink-0 transition-all rounded-lg cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#0a2318] text-white border-[#0a2318] font-bold shadow-xs'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <span className={`tabular-nums font-mono ${isSelected ? 'text-[#c2a76f]' : 'text-neutral-400 font-bold'}`}>
                      0{line.number}
                    </span>
                    <span className="font-sans font-medium">{line.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* 2. 5-Segment Touchable Progress Indicator Bar */}
            <div className="bg-white border border-neutral-200 p-3.5 rounded-xl shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium truncate">
                  Line <span className="tabular-nums font-mono font-bold">{currentFacilityLine.number}</span> · {currentFacilityLine.shortTitle}
                </span>
                <span className="text-emerald-900 font-bold shrink-0 font-mono text-[11px]">
                  Stage <span className="tabular-nums">{currentFacilityStage.stepNumber}</span> of 05
                </span>
              </div>

              {/* 5 Touchable Segment Bars */}
              <div className="grid grid-cols-5 gap-1.5 pt-0.5">
                {currentFacilityLine.stages.map((_, sIdx) => (
                  <button
                    key={`mob-seg-${sIdx}`}
                    type="button"
                    onClick={() => setSelectedFacilityStage(sIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      selectedFacilityStage === sIdx
                        ? 'bg-emerald-700 w-full ring-2 ring-emerald-500/30'
                        : sIdx < selectedFacilityStage
                        ? 'bg-emerald-400/70'
                        : 'bg-neutral-200'
                    }`}
                    aria-label={`Jump to stage ${sIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 3. Native In-Page Swipeable Stage Card */}
            <div
              className="bg-white border border-neutral-200 rounded-2xl shadow-md overflow-hidden select-none touch-pan-y"
              style={{ WebkitOverflowScrolling: 'touch' }}
              onTouchStart={(e) => {
                facilityTouchStart.current = {
                  x: e.touches[0].clientX,
                  y: e.touches[0].clientY
                };
              }}
              onTouchEnd={(e) => {
                if (!facilityTouchStart.current) return;
                const deltaX = facilityTouchStart.current.x - e.changedTouches[0].clientX;
                const deltaY = facilityTouchStart.current.y - e.changedTouches[0].clientY;
                // ONLY trigger stage flip if gesture was predominantly horizontal
                if (Math.abs(deltaX) > 36 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
                  if (deltaX > 0) {
                    handleNextFacilityStage();
                  } else {
                    handlePrevFacilityStage();
                  }
                }
                facilityTouchStart.current = null;
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`mob-stage-${selectedFacilityLine}-${selectedFacilityStage}`}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {/* Stage Photo */}
                  <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
                    <img
                      src={currentFacilityStage.image || currentFacilityLine.image}
                      alt={currentFacilityStage.title}
                      className="w-full h-full object-cover object-center pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-[#0a2318] text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-emerald-500/40 rounded-md shadow-xs">
                        STAGE <span className="tabular-nums">0{currentFacilityStage.stepNumber}</span> / 05
                      </span>
                      <span className="bg-black/70 backdrop-blur-md text-emerald-300 font-mono text-[9px] px-2 py-0.5 border border-white/20 rounded-md">
                        {currentFacilityStage.stepLabel}
                      </span>
                    </div>

                    {/* Bottom Line Details */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white font-mono text-[10px] flex items-center justify-between">
                      <span className="text-emerald-400 font-bold uppercase truncate tabular-nums">{currentFacilityLine.capacity}</span>
                      <span className="text-neutral-300 uppercase tracking-wide text-[9px] truncate ml-2">{currentFacilityLine.cleanroomClass}</span>
                    </div>
                  </div>

                  {/* Stage Narrative & Specs Body */}
                  <div className="p-4 space-y-3">
                    {/* Phase & Title */}
                    <div>
                      <span className="text-[10px] font-mono text-emerald-800 uppercase block font-bold tracking-wider">
                        {currentFacilityStage.phase}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 leading-snug mt-0.5 text-balance">
                        {currentFacilityStage.title}
                      </h4>
                      <p className="text-xs text-neutral-700 font-normal leading-relaxed mt-1">
                        {currentFacilityStage.summary}
                      </p>
                    </div>

                    {/* Highlight */}
                    {currentFacilityStage.highlight && (
                      <div className="p-2.5 bg-emerald-50/70 border-l-2 border-emerald-700 text-[11px] text-emerald-950 leading-relaxed font-medium rounded-r-md">
                        {currentFacilityStage.highlight}
                      </div>
                    )}

                    {/* 2x2 Telemetry Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      {currentFacilityStage.telemetry.map((tel, tIdx) => (
                        <div key={`mob-tel-${tIdx}`} className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg shadow-2xs">
                          <span className="text-[9px] font-mono uppercase text-neutral-500 block truncate font-medium">
                            {tel.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-neutral-900 block truncate mt-0.5 tabular-nums">
                            {tel.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* QA Standard Tag */}
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-700 pt-1 border-t border-neutral-200/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                      <span className="truncate">QA: <strong className="text-neutral-900">{currentFacilityStage.qaStandard}</strong></span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next & Inquire Bar */}
              <div className="p-3 border-t border-neutral-200 bg-[#f8faf8] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    disabled={selectedFacilityStage === 0}
                    onClick={handlePrevFacilityStage}
                    className={`px-3 py-1.5 font-mono text-xs border flex items-center gap-1.5 transition-all rounded-md ${
                      selectedFacilityStage === 0
                        ? 'opacity-30 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200'
                        : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 cursor-pointer shadow-2xs active:scale-95'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <span className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase text-center">
                    Swipe Left / Right
                  </span>

                  <button
                    type="button"
                    disabled={selectedFacilityStage === totalFacilityStages - 1}
                    onClick={handleNextFacilityStage}
                    className={`px-3 py-1.5 font-mono text-xs border flex items-center gap-1.5 transition-all rounded-md ${
                      selectedFacilityStage === totalFacilityStages - 1
                        ? 'opacity-30 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200'
                        : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 cursor-pointer shadow-2xs active:scale-95'
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleFacilityInquiry(`${currentFacilityLine.division} - Stage ${currentFacilityStage.stepNumber}: ${currentFacilityStage.title}`)}
                  className="w-full py-2.5 bg-[#0a2318] hover:bg-[#143e2b] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99] transition-transform rounded-md"
                >
                  <span>Inquire for {currentFacilityLine.shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c2a76f]" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION: COMMERCIAL QUOTATION & WHATSAPP ROUTING DESK (Modern Floating Card on Factory Facility) */}
      <section id="inquiry-desk" className="w-full py-12 sm:py-20 px-3 sm:px-6 lg:px-12 bg-[#f4f7f5]">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Main Visual Container with Rounded Frame & Background Image */}
          <div className="relative w-full rounded-3xl overflow-hidden min-h-[640px] sm:min-h-[700px] flex items-center justify-start shadow-xl border border-neutral-200/80 bg-neutral-900">
            
            {/* Background Facility Bottling Line Image */}
            <img 
              src="/assets/factory/aamrit_bottling_line.webp" 
              alt="D R & Sons Commercial Aamrit Mango Drink Bottling and Packaging Facility" 
              className="absolute inset-0 w-full h-full object-cover object-right sm:object-right"
            />
            
            {/* Subtle Gradient Scrim for Readability & Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent md:from-black/50 md:via-transparent md:to-black/10" />

            {/* Floating Minimalist Form Card on the Left */}
            <div className="relative z-10 w-full md:max-w-[490px] lg:max-w-[510px] m-4 sm:m-8 lg:m-12 md:mr-auto bg-white rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
              
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight text-balance">
                  Request a Commercial Manufacturing Quote
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed font-normal">
                  Direct commercial desk for contract packaging, bulk wholesale, and custom formulation specifications. Dedicated quote within 24 hours.
                </p>
              </div>

              {!inquirySubmitted ? (
                <form onSubmit={handleInquirySubmit} noValidate className="space-y-4">
                  
                  {/* Your name (Letters only, min 2 chars) */}
                  <div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={inquiryForm.name}
                        onChange={(e) => {
                          const sanitized = sanitizeName(e.target.value);
                          setInquiryForm((prev) => ({ ...prev, name: sanitized }));
                          if (formTouched.name) {
                            const err = validateName(sanitized);
                            setFormErrors((prev) => ({ ...prev, name: err || undefined }));
                          }
                        }}
                        onBlur={() => {
                          setFormTouched((prev) => ({ ...prev, name: true }));
                          const err = validateName(inquiryForm.name);
                          setFormErrors((prev) => ({ ...prev, name: err || undefined }));
                        }}
                        placeholder="Your full name *"
                        className={`w-full py-2.5 pr-8 border-b text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none transition-colors bg-transparent ${
                          formTouched.name && formErrors.name
                            ? 'border-red-500 focus:border-red-600'
                            : formTouched.name && !formErrors.name && inquiryForm.name.trim().length >= 2
                            ? 'border-emerald-600 focus:border-emerald-700'
                            : 'border-neutral-200 focus:border-neutral-900'
                        }`}
                      />
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                        {formTouched.name && formErrors.name && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        {formTouched.name && !formErrors.name && inquiryForm.name.trim().length >= 2 && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    {formTouched.name && formErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium"
                      >
                        <span>{formErrors.name}</span>
                      </motion.p>
                    )}
                  </div>

                  {/* Company / Organization (Optional) */}
                  <div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="company"
                        autoComplete="organization"
                        value={inquiryForm.company}
                        onChange={(e) => {
                          const sanitized = sanitizeCompany(e.target.value);
                          setInquiryForm((prev) => ({ ...prev, company: sanitized }));
                          if (formTouched.company) {
                            const err = validateCompany(sanitized);
                            setFormErrors((prev) => ({ ...prev, company: err || undefined }));
                          }
                        }}
                        onBlur={() => {
                          setFormTouched((prev) => ({ ...prev, company: true }));
                          const err = validateCompany(inquiryForm.company);
                          setFormErrors((prev) => ({ ...prev, company: err || undefined }));
                        }}
                        placeholder="Company / Organization (optional)"
                        className={`w-full py-2.5 pr-8 border-b text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none transition-colors bg-transparent ${
                          formTouched.company && formErrors.company
                            ? 'border-red-500 focus:border-red-600'
                            : formTouched.company && !formErrors.company && inquiryForm.company.trim().length >= 2
                            ? 'border-emerald-600 focus:border-emerald-700'
                            : 'border-neutral-200 focus:border-neutral-900'
                        }`}
                      />
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                        {formTouched.company && formErrors.company && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        {formTouched.company && !formErrors.company && inquiryForm.company.trim().length >= 2 && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    {formTouched.company && formErrors.company && (
                      <motion.p
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium"
                      >
                        <span>{formErrors.company}</span>
                      </motion.p>
                    )}
                  </div>

                  {/* Email (Strict RFC email validation, no spaces) */}
                  <div>
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={inquiryForm.email}
                        onChange={(e) => {
                          const sanitized = sanitizeEmail(e.target.value);
                          setInquiryForm((prev) => ({ ...prev, email: sanitized }));
                          if (formTouched.email) {
                            const err = validateEmail(sanitized);
                            setFormErrors((prev) => ({ ...prev, email: err || undefined }));
                          }
                        }}
                        onBlur={() => {
                          setFormTouched((prev) => ({ ...prev, email: true }));
                          const err = validateEmail(inquiryForm.email);
                          setFormErrors((prev) => ({ ...prev, email: err || undefined }));
                        }}
                        placeholder="Corporate email address *"
                        className={`w-full py-2.5 pr-8 border-b text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none transition-colors bg-transparent ${
                          formTouched.email && formErrors.email
                            ? 'border-red-500 focus:border-red-600'
                            : formTouched.email && !formErrors.email && inquiryForm.email.trim() && !validateEmail(inquiryForm.email)
                            ? 'border-emerald-600 focus:border-emerald-700'
                            : 'border-neutral-200 focus:border-neutral-900'
                        }`}
                      />
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                        {formTouched.email && formErrors.email && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        {formTouched.email && !formErrors.email && inquiryForm.email.trim() && !validateEmail(inquiryForm.email) && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    {formTouched.email && formErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium"
                      >
                        <span>{formErrors.email}</span>
                      </motion.p>
                    )}
                  </div>

                  {/* Phone number (Digits and phone symbols only, min 10 digits if entered) */}
                  <div>
                    <div className="relative flex items-center">
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={inquiryForm.phone}
                        onChange={(e) => {
                          const sanitized = sanitizePhone(e.target.value);
                          setInquiryForm((prev) => ({ ...prev, phone: sanitized }));
                          if (formTouched.phone) {
                            const err = validatePhone(sanitized);
                            setFormErrors((prev) => ({ ...prev, phone: err || undefined }));
                          }
                        }}
                        onBlur={() => {
                          setFormTouched((prev) => ({ ...prev, phone: true }));
                          const err = validatePhone(inquiryForm.phone);
                          setFormErrors((prev) => ({ ...prev, phone: err || undefined }));
                        }}
                        placeholder="Phone number (e.g. +91 80776 22461)"
                        className={`w-full py-2.5 pr-8 border-b text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none transition-colors bg-transparent ${
                          formTouched.phone && formErrors.phone
                            ? 'border-red-500 focus:border-red-600'
                            : formTouched.phone && !formErrors.phone && inquiryForm.phone.trim() && !validatePhone(inquiryForm.phone)
                            ? 'border-emerald-600 focus:border-emerald-700'
                            : 'border-neutral-200 focus:border-neutral-900'
                        }`}
                      />
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                        {formTouched.phone && formErrors.phone && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        {formTouched.phone && !formErrors.phone && inquiryForm.phone.trim() && !validatePhone(inquiryForm.phone) && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    {formTouched.phone && formErrors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium"
                      >
                        <span>{formErrors.phone}</span>
                      </motion.p>
                    )}
                  </div>

                  {/* Division Selection (Underline Styled Select) */}
                  <div className="relative">
                    <select
                      value={inquiryForm.division}
                      onChange={(e) => setInquiryForm({...inquiryForm, division: e.target.value})}
                      className="w-full py-2.5 border-b border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent appearance-none cursor-pointer pr-6"
                    >
                      <option value="Fruits, Vegetables Powder and starch">Fruits, Vegetables Powder and starch</option>
                      <option value="Fruits and Vegetables Flakes">Fruits and Vegetables Flakes</option>
                      <option value="Drinking Mineral Water (250ml, 300ml, 500ml & 1L)">Drinking Mineral Water (250ml, 300ml, 500ml &amp; 1L)</option>
                      <option value="Non-Alcoholic Drinks and Ice Creams">Non-Alcoholic Drinks and Ice Creams</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* How can we help? */}
                  <div>
                    <input
                      type="text"
                      value={inquiryForm.message}
                      onChange={(e) => {
                        const sanitized = sanitizeMessage(e.target.value);
                        setInquiryForm((prev) => ({ ...prev, message: sanitized }));
                      }}
                      placeholder="How can we help? (e.g. order volume, custom requirements)"
                      className="w-full py-2.5 border-b border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent"
                    />
                  </div>

                  {/* Privacy Agreement Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => {
                          setPrivacyAccepted(e.target.checked);
                          if (formTouched.privacy) {
                            setFormErrors((prev) => ({
                              ...prev,
                              privacy: !e.target.checked ? 'Please accept the privacy policy to submit.' : undefined
                            }));
                          }
                        }}
                        className="mt-0.5 w-3.5 h-3.5 rounded-sm accent-[#0a2318] border-neutral-300 text-neutral-900 focus:ring-neutral-800"
                      />
                      <span className="text-[11px] text-neutral-600 leading-snug">
                        By submitting this form, you agree to the processing of your personal data in accordance with our{' '}
                        <button
                          type="button"
                          onClick={() => setLegalModalTab('privacy')}
                          className="text-neutral-900 underline font-medium cursor-pointer hover:text-emerald-900"
                        >
                          Privacy Policy
                        </button>
                        .
                      </span>
                    </label>
                    {formTouched.privacy && formErrors.privacy && (
                      <motion.p
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium"
                      >
                        <span>{formErrors.privacy}</span>
                      </motion.p>
                    )}
                  </div>

                  {/* Send Message Button (Sharp Professional Button with Loading State) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingInquiry}
                      className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#0a2318] hover:bg-[#143e2b] disabled:opacity-80 disabled:cursor-wait text-white text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer group rounded-md w-full sm:w-auto"
                    >
                      {isSubmittingInquiry ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#c2a76f]" />
                          <span>Routing to WhatsApp Desk...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Commercial Quote</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#c2a76f] group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              ) : (
                <div className="p-6 bg-emerald-50 border border-emerald-800/30 text-neutral-900 space-y-3 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <Check className="w-4 h-4" />
                    <span>Inquiry Prepared</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Routing your inquiry directly to our WhatsApp Trade Desk (<strong className="font-mono tabular-nums">8077622461</strong>){redirectCountdown !== null && redirectCountdown > 0 ? (<span> in <strong className="tabular-nums font-mono">{redirectCountdown}s</strong>...</span>) : ' now.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={whatsappRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a2318] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#143e2b] transition-colors rounded-md shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#c2a76f]" />
                      <span>Open WhatsApp Now</span>
                      <ExternalLink className="w-3 h-3 text-[#c2a76f]" />
                    </a>
                    <button
                      onClick={() => {
                        setInquirySubmitted(false);
                        setRedirectCountdown(null);
                        setInquiryForm({ name: '', company: '', email: '', phone: '', division: 'Fruits, Vegetables Powder and starch', volume: 'Commercial Bulk Supply', message: '' });
                        setFormErrors({});
                        setFormTouched({});
                        setPrivacyAccepted(true);
                      }}
                      className="text-xs text-neutral-600 underline cursor-pointer hover:text-neutral-900"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Quick Trade Desk Details */}
              <div className="pt-3 border-t border-neutral-100 flex sm:hidden items-center justify-between text-[11px] text-neutral-500">
                <a 
                  href="https://wa.me/918077622461" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono font-semibold text-emerald-900 flex items-center gap-1 tabular-nums"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-700" />
                  <span>WhatsApp: 8077622461</span>
                </a>
                <button
                  onClick={() => setLegalModalTab('statutory')}
                  className="underline text-neutral-700"
                >
                  MCA Info
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ENTERPRISE CORPORATE FOOTER */}
      <footer className="w-full bg-[#f6f8f6] border-t border-neutral-200 text-neutral-600">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
          
          {/* Top Brand & Summary Row */}
          <div className="pb-10 border-b border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <a href="#" className="flex items-center gap-3">
                <img 
                  src="/assets/brand/drsons_logo.webp" 
                  alt="D R & SONS INTERNATIONAL" 
                  className="h-11 w-auto aspect-square object-contain"
                />
                <div className="border-l border-neutral-300 pl-3">
                  <span className="text-sm font-bold tracking-tight text-[#0a2318] block leading-none">
                    D R &amp; SONS INTERNATIONAL PVT. LTD.
                  </span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mt-1">
                    Commercial Food &amp; Beverage Manufacturing · Since 2026
                  </span>
                </div>
              </a>
              <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                Incorporated commercial enterprise specializing in fruits, vegetables powder and starch, dehydrated fruit &amp; vegetable flakes, packaged drinking mineral water, and non-alcoholic drinks and ice creams.
              </p>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-white border border-neutral-200 p-4 sm:p-5 space-y-2 shrink-0 lg:min-w-[320px] rounded-xl shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Direct Commercial Hotline
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                <a 
                  href="https://wa.me/918077622461" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-sm font-bold text-[#143e2b] hover:underline flex items-center gap-1.5 tabular-nums"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp: +91 8077622461</span>
                </a>
                <div className="flex items-center justify-between text-neutral-600 pt-1 border-t border-neutral-100">
                  <span className="font-mono text-[11px]">contact@drsonsinternational.com</span>
                  <button
                    onClick={() => handleCopyEmail('contact@drsonsinternational.com')}
                    className="p-1 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 cursor-pointer rounded-md transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Column Directory Grid (5 Columns on Desktop: Divisions, Facilities, Trade Desk, Corporate, Regulatory & Press) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-10">
            
            {/* Column 1: Core Manufacturing Divisions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#0a2318] uppercase tracking-wider">
                Manufacturing Divisions
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600">
                {divisionsData.map((div, idx) => (
                  <li key={`footer-div-${div.id}`}>
                    <button
                      onClick={() => {
                        scrollToDivision(idx);
                        const el = document.getElementById('divisions');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-[#143e2b] hover:underline transition-colors text-left cursor-pointer block"
                    >
                      {div.number}. {div.title}
                    </button>
                  </li>
                ))}
                <li className="pt-1">
                  <a 
                    href="#divisions" 
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#143e2b] hover:underline"
                  >
                    <span>Explore All Divisions</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Production Facilities */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#0a2318] uppercase tracking-wider">
                Production Facilities
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600">
                {facilitiesData.map((fac, idx) => (
                  <li key={`footer-fac-${idx}`}>
                    <a 
                      href="#facilities" 
                      className="hover:text-[#143e2b] hover:underline transition-colors block text-left"
                    >
                      Line {fac.number}. {fac.title}
                    </a>
                  </li>
                ))}
                <li className="pt-1">
                  <a 
                    href="#facilities" 
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#143e2b] hover:underline"
                  >
                    <span>View Infrastructure</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Commercial Desk */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#0a2318] uppercase tracking-wider">
                Commercial Trade Desk
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600">
                <li>
                  <a 
                    href="#inquiry-desk" 
                    className="hover:text-[#143e2b] hover:underline transition-colors block"
                  >
                    Submit Specifications &amp; RFQ
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/918077622461"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#143e2b] hover:underline transition-colors block font-mono text-[11px]"
                  >
                    WhatsApp: +91 8077622461
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => handleCopyEmail('contact@drsonsinternational.com')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left font-mono text-[11px] block"
                  >
                    contact@drsonsinternational.com
                  </button>
                </li>
                <li className="pt-1">
                  <a 
                    href="#inquiry-desk"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#143e2b] hover:underline"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Corporate Governance & Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#0a2318] uppercase tracking-wider">
                Corporate Governance
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600">
                <li>
                  <button 
                    onClick={() => setLegalModalTab('terms')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Terms of Commercial Supply
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalTab('privacy')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy (DPDP Act)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalTab('statutory')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left"
                  >
                    Statutory Company Details
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalTab('statutory')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left"
                  >
                    MCA &amp; FSSAI Compliance
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: Regulatory Compliance & Press Releases */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold text-[#0a2318] uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Regulatory &amp; Press</span>
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600">
                <li>
                  <button 
                    onClick={() => setLegalModalTab('regulatory')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-emerald-700"></span>
                    <span>Regulatory Terms (FSSAI)</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalTab('regulatory')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-emerald-700"></span>
                    <span>Packaged Water (250ml–1L)</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalTab('regulatory')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-emerald-700"></span>
                    <span>BIS IS 14543:2004 Norms</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalTab('regulatory')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-emerald-700"></span>
                    <span>Legal Metrology Act 2011</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalTab('press')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-emerald-700"></span>
                    <span>Official Press Releases</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModalTab('press')}
                    className="hover:text-[#143e2b] hover:underline transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-emerald-700"></span>
                    <span>Corporate Media Desk</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Statutory & Industry Compliance Strip (Strictly rectangular, high trust) */}
          <div className="py-6 border-t border-neutral-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Indian Industry &amp; Statutory Compliance Framework
                </span>
                <p className="text-xs text-neutral-600">
                  Operated in rigorous adherence to Indian food safety, Bureau of Indian Standards, corporate governance, and environmental legislation.
                </p>
              </div>

              {/* 6 Rectangular Compliance Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-left">
                <button
                  onClick={() => setLegalModalTab('regulatory')}
                  className="p-2.5 border border-neutral-200 bg-white hover:border-emerald-800 transition-colors text-left cursor-pointer group rounded-lg shadow-2xs"
                >
                  <div className="text-[9px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">FSSAI Act 2006</div>
                  <div className="text-[11px] font-bold text-neutral-900 group-hover:text-emerald-950">Food Safety Regs</div>
                </button>

                <button
                  onClick={() => setLegalModalTab('regulatory')}
                  className="p-2.5 border border-neutral-200 bg-white hover:border-emerald-800 transition-colors text-left cursor-pointer group rounded-lg shadow-2xs"
                >
                  <div className="text-[9px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">BIS IS 14543</div>
                  <div className="text-[11px] font-bold text-neutral-900 group-hover:text-emerald-950">Packaged Water</div>
                </button>

                <button
                  onClick={() => setLegalModalTab('regulatory')}
                  className="p-2.5 border border-neutral-200 bg-white hover:border-emerald-800 transition-colors text-left cursor-pointer group rounded-lg shadow-2xs"
                >
                  <div className="text-[9px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">Legal Metrology</div>
                  <div className="text-[11px] font-bold text-neutral-900 group-hover:text-emerald-950">250ml - 1L Pack</div>
                </button>

                <button
                  onClick={() => setLegalModalTab('privacy')}
                  className="p-2.5 border border-neutral-200 bg-white hover:border-emerald-800 transition-colors text-left cursor-pointer group rounded-lg shadow-2xs"
                >
                  <div className="text-[9px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">DPDP Act 2023</div>
                  <div className="text-[11px] font-bold text-neutral-900 group-hover:text-emerald-950">Data Governance</div>
                </button>

                <button
                  onClick={() => setLegalModalTab('statutory')}
                  className="p-2.5 border border-neutral-200 bg-white hover:border-emerald-800 transition-colors text-left cursor-pointer group rounded-lg shadow-2xs"
                >
                  <div className="text-[9px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">Companies Act</div>
                  <div className="text-[11px] font-bold text-neutral-900 group-hover:text-emerald-950">MCA Pvt. Ltd.</div>
                </button>

                <button
                  onClick={() => setLegalModalTab('regulatory')}
                  className="p-2.5 border border-neutral-200 bg-white hover:border-emerald-800 transition-colors text-left cursor-pointer group rounded-lg shadow-2xs"
                >
                  <div className="text-[9px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">SPCB / CPCB</div>
                  <div className="text-[11px] font-bold text-neutral-900 group-hover:text-emerald-950">Zero Discharge</div>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal Strip */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
            <div>
              &copy; {new Date().getFullYear()} D R &amp; Sons International Private Limited. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1">
              <span>Incorporated under Companies Act, 2013</span>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <span>MCA India</span>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <button 
                onClick={() => setLegalModalTab('regulatory')}
                className="hover:text-emerald-950 hover:underline transition-colors cursor-pointer font-medium"
              >
                Regulatory Terms (FSSAI &amp; BIS)
              </button>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <button 
                onClick={() => setLegalModalTab('press')}
                className="hover:text-emerald-950 hover:underline transition-colors cursor-pointer font-medium"
              >
                Press Releases
              </button>
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

      {/* LEGAL & REGULATORY TERMS MODAL (FOR PRIVATE LIMITED COMPANY) */}
      <AnimatePresence>
        {legalModalTab && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-neutral-200 w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden rounded-2xl"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-[#fafbfa]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 border border-emerald-900/20 bg-emerald-50 text-emerald-900 flex items-center justify-center rounded-lg">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                      Corporate Governance &amp; Regulatory Portal
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-mono">
                      D R &amp; Sons International Private Limited · Statutory &amp; Press Desk
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setLegalModalTab(null)}
                  className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer rounded-md"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Tabs */}
              <div className="flex border-b border-neutral-200 bg-white px-3 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setLegalModalTab('regulatory')}
                  className={`py-2 px-3 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer border-b-2 -mb-px flex items-center gap-1.5 ${
                    legalModalTab === 'regulatory'
                      ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Regulatory Terms</span>
                </button>
                <button
                  onClick={() => setLegalModalTab('press')}
                  className={`py-2 px-3 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer border-b-2 -mb-px flex items-center gap-1.5 ${
                    legalModalTab === 'press'
                      ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Newspaper className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Press Releases</span>
                </button>
                <button
                  onClick={() => setLegalModalTab('terms')}
                  className={`py-2 px-3 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer border-b-2 -mb-px flex items-center gap-1.5 ${
                    legalModalTab === 'terms'
                      ? 'border-emerald-800 text-emerald-950 bg-emerald-50/50'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-700" />
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
                  <Lock className="w-3.5 h-3.5 text-emerald-700" />
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
                  <Building className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Statutory Info</span>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-neutral-700 leading-relaxed max-h-[58vh]">
                
                {legalModalTab === 'regulatory' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-emerald-50 border border-emerald-900/15 text-[11px] text-emerald-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider">
                        <FileCheck className="w-4 h-4 text-emerald-800" />
                        <span>Indian Food &amp; Beverage Statutory Regulatory Framework</span>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">
                        D R &amp; Sons International Private Limited operates commercial manufacturing infrastructure in strict compliance with the Food Safety and Standards Authority of India (FSSAI), Bureau of Indian Standards (BIS), Legal Metrology (Packaged Commodities) Rules, 2011, and State Pollution Control Board environmental directives.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="border border-neutral-200 p-3 bg-white space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                            1. FSSAI Act, 2006 &amp; Central Licensing
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 text-neutral-700 border border-neutral-200">
                            FSSAI Standard
                          </span>
                        </div>
                        <p className="text-neutral-600 leading-relaxed">
                          All food processing operations—including spray-dried powders, starch isolation, continuous dehydration, and beverage processing—comply with the Food Safety and Standards Act, 2006 and the Food Safety and Standards (Licensing and Registration of Food Businesses) Regulations, 2011. Every production batch is subject to physical, chemical, and microbiological validation in compliance with prescribed Indian limits for pesticide residues, heavy metals, and bacterial counts.
                        </p>
                      </div>

                      <div className="border border-neutral-200 p-3 bg-white space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                            2. Packaged Drinking Water (IS 14543:2004) &amp; Commercial Categories
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-200">
                            BIS Mandatory ISI
                          </span>
                        </div>
                        <p className="text-neutral-600 leading-relaxed">
                          Our Drinking Mineral Water division adheres to mandatory Bureau of Indian Standards specification <strong>IS 14543:2004</strong> (Packaged Drinking Water Other Than Packaged Natural Mineral Water). Purification incorporates multi-stage sand filtration, high-iodine activated carbon, 0.0001µm reverse osmosis, UV irradiation, and ozonation.
                        </p>
                        <div className="pt-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5 font-semibold">
                            Authorized Commercial Selling Categories:
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-[11px]">
                            <div className="p-2 border border-emerald-900/20 bg-emerald-50/50">
                              <span className="font-bold text-emerald-950 block">250 ml</span>
                              <span className="text-[9px] text-neutral-500">Pocket &amp; Aviation Pack</span>
                            </div>
                            <div className="p-2 border border-emerald-900/20 bg-emerald-50/50">
                              <span className="font-bold text-emerald-950 block">300 ml</span>
                              <span className="text-[9px] text-neutral-500">Hospitality &amp; Dining Pack</span>
                            </div>
                            <div className="p-2 border border-emerald-900/20 bg-emerald-50/50">
                              <span className="font-bold text-emerald-950 block">500 ml</span>
                              <span className="text-[9px] text-neutral-500">Retail On-the-Go PET</span>
                            </div>
                            <div className="p-2 border border-emerald-900/20 bg-emerald-50/50">
                              <span className="font-bold text-emerald-950 block">1 Litre (1L)</span>
                              <span className="text-[9px] text-neutral-500">Family &amp; Table Pack</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border border-neutral-200 p-3 bg-white space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                            3. Legal Metrology (Packaged Commodities) Rules, 2011
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 text-neutral-700 border border-neutral-200">
                            Statutory Labeling
                          </span>
                        </div>
                        <p className="text-neutral-600 leading-relaxed">
                          All packaged products bear mandatory statutory labeling declarations: Net Quantity (calibrated to 250ml, 300ml, 500ml, 1L for liquids; net weight for dehydrated solids), Maximum Retail Price (MRP inclusive of all taxes), Month and Year of manufacture, Batch/Lot identification, Best Before duration, and Manufacturer Redressal Details (+91 8077622461 / contact@drsonsinternational.com).
                        </p>
                      </div>

                      <div className="border border-neutral-200 p-3 bg-white space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                            4. Environmental &amp; Pollution Control Compliance (SPCB &amp; CPCB)
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 text-neutral-700 border border-neutral-200">
                            ZLD &amp; EPR Norms
                          </span>
                        </div>
                        <p className="text-neutral-600 leading-relaxed">
                          Manufacturing units function under valid Consent to Establish (CTE) and Consent to Operate (CTO) granted by the State Pollution Control Board. We implement Zero Liquid Discharge (ZLD) effluent treatment, closed-loop water recovery, and strictly conform to Extended Producer Responsibility (EPR) regulations using 100% recyclable virgin food-grade PET preforms.
                        </p>
                      </div>

                      <div className="border border-neutral-200 p-3 bg-white space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                            5. Quality Assurance, COA &amp; Traceability
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 text-neutral-700 border border-neutral-200">
                            NABL Calibration
                          </span>
                        </div>
                        <p className="text-neutral-600 leading-relaxed">
                          Dispatches are accompanied by a lot-specific Certificate of Analysis (COA) confirming conformance with chemical, sensory, and microbiological parameters. Traceability records are cataloged per Indian food traceability guidelines to guarantee supply integrity.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {legalModalTab === 'press' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-emerald-50 border border-emerald-900/15 text-[11px] text-emerald-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider">
                        <Newspaper className="w-4 h-4 text-emerald-800" />
                        <span>Corporate Press Office &amp; Media Desk</span>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">
                        Official announcements, commissioning notices, and media releases issued by D R &amp; Sons International Private Limited. All releases are authentic public record under Indian corporate communications guidelines.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* PR 01 */}
                      <div className="border border-neutral-200 p-3.5 bg-white space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-neutral-400">
                          <span className="text-emerald-800 font-bold uppercase tracking-wider">PRESS RELEASE · PR-2026/01</span>
                          <span>October 2026 · Uttar Pradesh, India</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                          D R &amp; Sons International Private Limited Formally Commissions Multi-Line Commercial Food &amp; Beverage Processing Complex
                        </h4>
                        <p className="text-neutral-600 leading-relaxed">
                          D R &amp; Sons International Private Limited announced the successful commissioning of its modern food and beverage manufacturing complex. Built to international hygienic standards, the facility integrates four key production divisions: fruit and vegetable powders &amp; starch, dehydrated flakes, packaged mineral water, and non-alcoholic beverages. The operations emphasize farm-gate procurement, low-temperature thermal processing, and automated cleanroom bottling.
                        </p>
                      </div>

                      {/* PR 02 */}
                      <div className="border border-neutral-200 p-3.5 bg-white space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-neutral-400">
                          <span className="text-emerald-800 font-bold uppercase tracking-wider">PRESS RELEASE · PR-2026/02</span>
                          <span>November 2026 · Product Launch</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                          Commercial Rollout of Packaged Drinking Mineral Water in 250ml, 300ml, 500ml &amp; 1L Categories Under BIS IS 14543:2004
                        </h4>
                        <p className="text-neutral-600 leading-relaxed">
                          The company has launched commercial supply of packaged drinking mineral water across four standardized commercial categories: <strong>250ml pocket pack</strong>, <strong>300ml hospitality pack</strong>, <strong>500ml retail PET</strong>, and <strong>1 Litre family/institutional pack</strong>. Each category utilizes double-pass reverse osmosis, 254nm UV sterilization, controlled remineralization, and touch-free Class 100 cleanroom packaging in 100% recyclable virgin food-grade PET with tamper-evident induction sealing.
                        </p>
                      </div>

                      {/* PR 03 */}
                      <div className="border border-neutral-200 p-3.5 bg-white space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-neutral-400">
                          <span className="text-emerald-800 font-bold uppercase tracking-wider">PRESS RELEASE · PR-2026/03</span>
                          <span>November 2026 · Industrial B2B</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                          Continuous Dehydration &amp; Starch Processing Lines Commence Commercial B2B Contract Dispatches
                        </h4>
                        <p className="text-neutral-600 leading-relaxed">
                          Addressing rising industrial demand for shelf-stable ingredients, D R &amp; Sons International opened long-term B2B supply agreements for culinary dehydrated onion/garlic/vegetable flakes and spray-dried fruit starches with moisture controlled beneath 4.0%. All contracts feature batch COA certification under FSSAI criteria.
                        </p>
                      </div>

                      {/* Media Desk Box */}
                      <div className="border border-neutral-200 bg-[#fafbfa] p-3 space-y-1.5 text-[11px]">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                          Media &amp; Press Relations Desk
                        </span>
                        <p className="text-neutral-600">
                          Journalists, trade publications, and institutional procurement analysts seeking official press statements or facility access may contact our corporate communications desk:
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 font-mono">
                          <span className="text-neutral-800">Email: contact@drsonsinternational.com</span>
                          <span className="text-emerald-900 font-bold">WhatsApp: +91 8077622461</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
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
                        Submitted business inquiries are strictly used to fulfill manufacturing quotes, share specifications, and communicate via WhatsApp (+91 8077622461) or corporate email.
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
                        <span className="text-neutral-500">Incorporated:</span>
                        <span className="font-bold text-neutral-900">Since 2026</span>
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
                        <span className="font-bold text-emerald-900 tabular-nums font-mono">+91 8077622461</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-neutral-200 bg-[#fafbfa] flex items-center justify-end">
                <button
                  onClick={() => setLegalModalTab(null)}
                  className="px-4 py-1.5 bg-[#143e2b] hover:bg-[#0a2318] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer rounded-md transition-colors"
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
