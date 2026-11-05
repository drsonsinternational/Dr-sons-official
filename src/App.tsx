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
  Maximize2
} from 'lucide-react';
import MaintenancePage from './MaintenancePage';

interface NotificationState {
  type: 'success' | null;
  message: string;
}

export default function App() {
  // Secret Preview Mode State (default: false for public visitors)
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // 1. Check URL parameters: e.g. ?preview=drsons or ?preview=drsons2026 or ?dev=true
      const params = new URLSearchParams(window.location.search);
      const previewKey = params.get('preview') || params.get('dev') || params.get('key');
      if (previewKey && ['drsons', 'drsons2026', 'true', 'dev', 'admin', 'preview', 'secret'].includes(previewKey.toLowerCase())) {
        try {
          localStorage.setItem('drsons_preview_access', 'granted');
        } catch (e) {}
        return true;
      }
      // 2. Check persistent localStorage
      try {
        return localStorage.getItem('drsons_preview_access') === 'granted';
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const unlockPreview = () => {
    try {
      localStorage.setItem('drsons_preview_access', 'granted');
    } catch (e) {}
    setIsPreviewMode(true);
  };

  const lockPreview = () => {
    try {
      localStorage.removeItem('drsons_preview_access');
    } catch (e) {}
    const url = new URL(window.location.href);
    url.searchParams.delete('preview');
    url.searchParams.delete('dev');
    url.searchParams.delete('key');
    window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
    setIsPreviewMode(false);
  };

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

  // Interactive Production Infrastructure & Stacked Cards State
  const [selectedFacilityLine, setSelectedFacilityLine] = useState<number>(0);

  // Active Stage Image / Specimen Lightbox Modal State
  const [activeStageSpecimen, setActiveStageSpecimen] = useState<{
    title: string;
    phase: string;
    stepNumber: string;
    image: string;
    lineTitle: string;
    cleanroomClass: string;
    summary: string;
    telemetry: { label: string; value: string }[];
    qaStandard?: string;
  } | null>(null);

  const handleFacilityInquiry = (divisionName: string) => {
    setInquiryForm((prev) => ({ ...prev, division: divisionName }));
    const desk = document.getElementById('inquiry-desk');
    if (desk) {
      desk.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    division: 'Fruits, Vegetables Powder and starch',
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

  const tickerItems = [
    'D R & Sons International Private Limited · Incorporated Enterprise (Since 2026)',
    'Fruits, Vegetables Powder and starch',
    'Fruit & Vegetable Flakes',
    'Drinking Mineral Water',
    'Non-Alcoholic Drinks & Ice Creams',
    'Advanced Spray & Drum Drying',
    'Cleanroom Bottling & Water Purification',
    'FSSAI Certified Commercial Supply',
    'Direct WhatsApp: 9411268879'
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
      title: 'Drinking Mineral Water',
      summary: 'Multi-stage reverse osmosis, ozonation, micron filtration, and mineral remineralization yielding crystal-clear pure drinking water.',
      tagline: 'Pure packaged mineral water with essential minerals and crisp refreshing taste',
      image: '/assets/aistudio/drinking_water_packaging.webp',
      icon: Droplets,
      keyItems: ['Packaged Mineral Water (500ml & 1L)', 'Bulk Institutional Dispenser Jars', 'Mineral-Balanced Spring Formula', 'Touch-Free Cleanroom Bottling'],
      specs: ['Multi-stage RO & Ozonation', 'Touch-free bottling line', '100% Recyclable food-grade PET', 'Tamper-evident sealing'],
      applications: 'Retail brands, corporate offices, hospitality, airline catering & institutions'
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
      division: 'Drinking Mineral Water',
      title: 'Double-Pass RO & Automated Cleanroom Bottling',
      shortTitle: 'Mineral Water Suite',
      desc: 'Multi-stage quartz and activated carbon filtration, dual thin-film composite reverse osmosis, calibrated remineralization, and high-speed touch-free Class 100 cleanroom rotary bottling.',
      image: '/assets/aistudio/drinking_water_packaging.webp',
      icon: Droplets,
      cleanroomClass: 'Class 100 / ISO 5 Cleanroom Enclosure',
      capacity: '10,000 Litres / Hour Purification',
      equipment: 'Double-Pass RO Skid, Ozonator, 254nm UV Chamber & Monoblock Bottling',
      tags: ['RO & Ozonation', 'Cleanroom Bottling', 'Mineral Balance', 'Class 100'],
      stages: [
        {
          stepNumber: '01',
          stepLabel: 'Pre-Filtration',
          phase: 'PHASE 01 · MULTI-BED PHYSICAL PURIFICATION',
          title: 'Graded Quartz & High-Iodine Activated Carbon Filtration',
          summary: 'Raw spring intake passes through dual-gradient quartz sand filters (down to 10 microns) followed by 1050-iodine activated carbon beds to eliminate suspended matter, organic contaminants, odor, and chlorine precursors.',
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
          summary: 'Bottling occurs within a laminar HEPA-filtered Class 100 cleanroom enclosure. Bottles are air-rinsed with sterile ionized air, filled under gravity-flow isobaric nozzles, and capped with tamper-evident collar closures at 120 bottles/min.',
          telemetry: [
            { label: 'Bottling Velocity', value: '120 Bottles / Minute Rotary' },
            { label: 'Cleanroom Enclosure', value: 'Class 100 / ISO 5 Positive' },
            { label: 'Volumetric Accuracy', value: '± 0.5 ml Laser Calibrated' },
            { label: 'Container Types', value: '500ml, 1L PET & Bulk Jars' }
          ],
          qaStandard: 'Automated High-Speed Machine-Vision Fill-Level & Torque Inspection',
          highlight: '100% recyclable virgin food-grade PET with tamper-evident security collar.'
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

  if (!isPreviewMode) {
    return <MaintenancePage onUnlock={unlockPreview} />;
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
                src="/assets/brand/drsons_logo.webp" 
                alt="D R & SONS INTERNATIONAL" 
                className="h-9 sm:h-12 w-auto object-contain mix-blend-multiply"
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
            <a href="#divisions" className="hover:text-emerald-900 transition-colors">4 Divisions</a>
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
                      src="/assets/brand/drsons_logo.webp"
                      alt="D R & SONS INTERNATIONAL"
                      className="h-8 w-auto object-contain mix-blend-multiply"
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
            Fruits, Vegetables Powder and starch · Flakes · Drinking Mineral Water · Drinks &amp; Ice Creams
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

      {/* SECTION: 4 CORE REGISTERED MANUFACTURING DIVISIONS (Horizontal Scroll Enabled) */}
      <section id="divisions" className="w-full py-10 sm:py-16 px-3 sm:px-6 lg:px-12 bg-white border-b border-neutral-200">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          
          {/* Header & Horizontal Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200 pb-4">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                Core Portfolio · 4 Registered Wings
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Manufacturing <span className="font-serif-brand italic text-emerald-900 font-normal">Divisions</span>
              </h2>
            </div>

            {/* Horizontal Swipe Affordance & Navigation */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-900/10">
                ← Swipe 4 Divisions →
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
          <div className="flex sm:hidden items-center justify-between gap-1.5 py-2 px-1 border-b border-neutral-100 overflow-x-auto no-scrollbar">
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
                  className="flex flex-col items-center gap-1 focus:outline-hidden cursor-pointer group flex-1 min-w-[70px] max-w-[85px]"
                  title={`Division ${div.number}: ${div.title}`}
                >
                  <div
                    className={`relative w-14 h-14 rounded-full p-[2px] transition-all duration-300 ${
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

      {/* SECTION: PRODUCTION FACILITIES & STACKED STICKY CARDS WORKFLOW */}
      <section id="facilities" className="w-full py-12 sm:py-20 px-3 sm:px-6 lg:px-12 bg-[#fafbfa] border-b border-neutral-200">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                <Settings2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Industrial Workflow &amp; Technical Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Production <span className="font-serif-brand italic text-emerald-900 font-normal">Infrastructure &amp; Process Pipeline</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Explore our commercial manufacturing workflow across 4 industrial processing lines. Select any line below and scroll down through the 5 stacked production stages to trace raw intake through precision thermal/mechanical transformation to sealed, certified commercial goods.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 bg-white px-3 py-2 border border-neutral-200 shadow-2xs">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Scroll down to stack stages</span>
            </div>
          </div>

          {/* 4 Line Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {facilitiesData.map((line, idx) => {
              const LineIcon = line.icon;
              const isSelected = selectedFacilityLine === idx;
              return (
                <button
                  key={line.id}
                  onClick={() => setSelectedFacilityLine(idx)}
                  className={`p-4 border text-left transition-all cursor-pointer relative ${
                    isSelected 
                      ? 'bg-[#0a2318] text-white border-[#0a2318] shadow-md' 
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-emerald-800/40 hover:bg-[#f6f9f7]'
                  }`}
                >
                  {/* Active Indicator Top Stripe */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-400" />
                  )}
                  
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-bold tracking-wider ${
                      isSelected ? 'text-emerald-300' : 'text-emerald-800'
                    }`}>
                      LINE {line.number}
                    </span>
                    <div className={`w-7 h-7 flex items-center justify-center ${
                      isSelected ? 'bg-white/10 text-white' : 'bg-emerald-50 text-emerald-900 border border-emerald-900/10'
                    }`}>
                      <LineIcon className="w-3.5 h-3.5 stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {line.shortTitle}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-1 font-mono ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-500'
                  }`}>
                    {line.division}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Stacked Sticky Cards Track */}
          <div className="space-y-8 pb-12 pt-2">
            {facilitiesData[selectedFacilityLine].stages.map((stg, sIdx) => {
              return (
                <div
                  key={`stacked-card-${sIdx}`}
                  className="sticky bg-white border border-neutral-300 shadow-2xl p-6 sm:p-8 space-y-6 transition-transform"
                  style={{
                    top: `${80 + sIdx * 18}px`,
                    zIndex: 10 + sIdx,
                    marginBottom: `${(4 - sIdx) * 16}px`
                  }}
                >
                  {/* Top Bar on Stacked Card */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-[#0a2318] text-white font-mono text-xs font-bold">
                        STAGE {stg.stepNumber} / 05
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-900 uppercase">
                        LINE {facilitiesData[selectedFacilityLine].number} · {facilitiesData[selectedFacilityLine].shortTitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">
                      {stg.phase}
                    </span>
                  </div>

                  {/* Card Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Narrative & Metrics (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                        {stg.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                        {stg.summary}
                      </p>

                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        {stg.telemetry.map((t, tIdx) => (
                          <div key={`stacked-tel-${tIdx}`} className="p-3 border border-neutral-200 bg-neutral-50">
                            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                              {t.label}
                            </span>
                            <span className="text-xs font-mono font-bold text-neutral-900 block mt-0.5">
                              {t.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-[11px] font-mono text-neutral-600 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-800" />
                          <span>QA Protocol: <strong className="text-neutral-900">{stg.qaStandard}</strong></span>
                        </span>
                        <button
                          onClick={() => handleFacilityInquiry(facilitiesData[selectedFacilityLine].division)}
                          className="px-4 py-2 bg-[#0a2318] hover:bg-[#143e2b] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <span>Inquire for Stage {stg.stepNumber}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Right Photo in Card (5 cols) */}
                    <div 
                      onClick={() => {
                        const activeImg = (stg as any).image || facilitiesData[selectedFacilityLine].image;
                        setActiveStageSpecimen({
                          title: stg.title,
                          phase: stg.phase,
                          stepNumber: stg.stepNumber,
                          image: activeImg,
                          lineTitle: facilitiesData[selectedFacilityLine].title,
                          cleanroomClass: facilitiesData[selectedFacilityLine].cleanroomClass,
                          summary: stg.summary,
                          telemetry: stg.telemetry,
                          qaStandard: stg.qaStandard
                        });
                      }}
                      className="group cursor-pointer lg:col-span-5 border border-neutral-200 bg-neutral-900 overflow-hidden relative min-h-[260px] sm:min-h-[300px]"
                    >
                      <img 
                        src={(stg as any).image || facilitiesData[selectedFacilityLine].image} 
                        alt={stg.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity group-hover:opacity-90" />
                      
                      {/* Zoom badge indicator (sharp rectangular, strictly NO pills) */}
                      <div className="absolute top-3 right-3 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 border border-white/20 flex items-center gap-1.5 shadow-sm">
                        <Maximize2 className="w-3 h-3 text-emerald-400" />
                        <span>INSPECT SPEC</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white font-mono text-[11px] space-y-1">
                        <div className="text-emerald-400 font-bold uppercase">{facilitiesData[selectedFacilityLine].cleanroomClass}</div>
                        <div className="text-neutral-200 font-light truncate">{facilitiesData[selectedFacilityLine].equipment}</div>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION: COMMERCIAL QUOTATION & WHATSAPP ROUTING DESK (Modern Floating Card on Factory Facility) */}
      <section id="inquiry-desk" className="w-full py-12 sm:py-20 px-3 sm:px-6 lg:px-12 bg-[#f4f7f5]">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Main Visual Container with Rounded Frame & Background Image */}
          <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[640px] sm:min-h-[700px] flex items-center justify-end shadow-xl border border-neutral-200/80 bg-neutral-900">
            
            {/* Background Facility Bottling Line Image */}
            <img 
              src="/assets/factory/aamrit_bottling_line.webp" 
              alt="D R & Sons Commercial Aamrit Mango Drink Bottling and Packaging Facility" 
              className="absolute inset-0 w-full h-full object-cover object-left sm:object-center"
            />
            
            {/* Subtle Gradient Scrim for Readability & Contrast */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-black/10 md:from-black/40 md:via-transparent md:to-black/20" />

            {/* Floating Minimalist Form Card on the Right */}
            <div className="relative z-10 w-full md:max-w-[490px] lg:max-w-[510px] m-4 sm:m-8 lg:m-12 md:ml-auto bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-2xl space-y-6">
              
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
                  Start your production journey today
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
                  Complete the form and get a dedicated commercial specification &amp; quotation within 24 hours.
                </p>
              </div>

              {!inquirySubmitted ? (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  
                  {/* Your name */}
                  <div>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                      placeholder="Your name"
                      className="w-full py-2.5 border-b border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                      placeholder="Email"
                      className="w-full py-2.5 border-b border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent"
                    />
                  </div>

                  {/* Phone number */}
                  <div>
                    <input
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                      placeholder="Phone number"
                      className="w-full py-2.5 border-b border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent"
                    />
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
                      <option value="Drinking Mineral Water">Drinking Mineral Water</option>
                      <option value="Non-Alcoholic Drinks and Ice Creams">Non-Alcoholic Drinks and Ice Creams</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* How can we help? */}
                  <div>
                    <input
                      type="text"
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                      placeholder="How can we help? (e.g. order volume, custom requirements)"
                      className="w-full py-2.5 border-b border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent"
                    />
                  </div>

                  {/* Privacy Agreement Checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer pt-2 select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      required
                      className="mt-0.5 w-3.5 h-3.5 rounded-xs accent-[#0a2318] border-neutral-300 text-neutral-900 focus:ring-neutral-800"
                    />
                    <span className="text-[11px] text-neutral-500 leading-snug">
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

                  {/* Send Message Button (Sharp Professional Button) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#0a2318] hover:bg-[#143e2b] text-white text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <span>Send message</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </form>
              ) : (
                <div className="p-6 bg-emerald-50 border border-emerald-800/30 text-neutral-900 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <Check className="w-4 h-4" />
                    <span>Inquiry Prepared</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Routing your inquiry directly to our WhatsApp Trade Desk (<strong className="font-mono">9411268879</strong>){redirectCountdown !== null && redirectCountdown > 0 ? ` in ${redirectCountdown}s...` : ' now.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={whatsappRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a2318] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#143e2b] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Open WhatsApp Now</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => {
                        setInquirySubmitted(false);
                        setRedirectCountdown(null);
                        setInquiryForm({ name: '', company: '', email: '', phone: '', division: 'Fruits, Vegetables Powder and starch', volume: 'Commercial Bulk Supply', message: '' });
                      }}
                      className="text-xs text-neutral-600 underline cursor-pointer"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Quick Trade Desk Details */}
              <div className="pt-3 border-t border-neutral-100 flex sm:hidden items-center justify-between text-[11px] text-neutral-500">
                <a 
                  href="https://wa.me/919411268879" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono font-semibold text-emerald-900 flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-700" />
                  <span>WhatsApp: 9411268879</span>
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
                  className="h-10 w-auto object-contain mix-blend-multiply"
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
            <div className="bg-white border border-neutral-200 p-4 sm:p-5 space-y-2 shrink-0 lg:min-w-[320px]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Direct Commercial Hotline
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                <a 
                  href="https://wa.me/919411268879" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-sm font-bold text-[#143e2b] hover:underline flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp: +91 9411268879</span>
                </a>
                <div className="flex items-center justify-between text-neutral-600 pt-1 border-t border-neutral-100">
                  <span className="font-mono text-[11px]">contact@drsonsinternational.com</span>
                  <button
                    onClick={() => handleCopyEmail('contact@drsonsinternational.com')}
                    className="p-1 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Column Directory Grid (Strictly grounded in website content) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            
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
                    href="https://wa.me/919411268879"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#143e2b] hover:underline transition-colors block font-mono text-[11px]"
                  >
                    WhatsApp: +91 9411268879
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

          </div>

          {/* Bottom Copyright & Legal Strip */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
            <div>
              &copy; {new Date().getFullYear()} D R &amp; Sons International Private Limited. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
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

      {/* STAGE PROCESS SPECIMEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeStageSpecimen && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActiveStageSpecimen(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-950 border border-neutral-800 w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white"
            >
              {/* Header */}
              <div className="p-3.5 sm:p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 bg-emerald-600 text-white font-mono text-[11px] font-bold tracking-wider">
                    STAGE {activeStageSpecimen.stepNumber} / 05
                  </span>
                  <span className="text-xs font-mono text-neutral-300 font-semibold tracking-wide uppercase truncate max-w-[200px] sm:max-w-md">
                    {activeStageSpecimen.lineTitle}
                  </span>
                </div>
                <button
                  onClick={() => setActiveStageSpecimen(null)}
                  className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Close Specimen View"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* High-Res Image View */}
              <div className="relative bg-black flex items-center justify-center overflow-hidden min-h-[220px] max-h-[48vh] sm:max-h-[52vh] border-b border-neutral-800">
                <img 
                  src={activeStageSpecimen.image} 
                  alt={activeStageSpecimen.title} 
                  className="w-full h-full object-contain max-h-[48vh] sm:max-h-[52vh]"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs px-2.5 py-1 border border-white/15 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  {activeStageSpecimen.phase}
                </div>
              </div>

              {/* Specimen Telemetry & Action Footer */}
              <div className="p-4 sm:p-5 bg-neutral-950 space-y-3.5 overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {activeStageSpecimen.title}
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider shrink-0">
                    {activeStageSpecimen.cleanroomClass}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {activeStageSpecimen.summary}
                </p>

                {/* Telemetry Chips (sharp rectangular) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {activeStageSpecimen.telemetry.map((t, idx) => (
                    <div key={`modal-tel-${idx}`} className="p-2.5 bg-neutral-900 border border-neutral-800">
                      <span className="text-[9px] font-mono uppercase text-neutral-400 block tracking-wider">
                        {t.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-100 block mt-0.5">
                        {t.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions & QA Standard */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800">
                  <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>QA Standard: <strong className="text-neutral-200">{activeStageSpecimen.qaStandard || 'ISO 22000 / HACCP Verification'}</strong></span>
                  </span>
                  <button
                    onClick={() => {
                      const divName = facilitiesData[selectedFacilityLine].division;
                      setActiveStageSpecimen(null);
                      handleFacilityInquiry(divName);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Inquire for Stage {activeStageSpecimen.stepNumber}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

      {/* Floating Preview Mode Indicator for Client & Developers */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-[#0a2318]/95 backdrop-blur-md text-white text-xs px-4 py-2.5 shadow-2xl border border-emerald-500/40 select-none border-l-2 border-l-emerald-400">
        <span className="w-2 h-2 bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-neutral-100">Client Preview Active</span>
        <span className="text-white/40">·</span>
        <button
          onClick={lockPreview}
          className="text-emerald-300 hover:text-white underline cursor-pointer font-medium transition-colors"
          title="Return to Public Under-Construction Page"
        >
          Exit to Maintenance
        </button>
      </div>

    </div>
  );
}
