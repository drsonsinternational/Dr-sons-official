import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Copy, 
  Mail, 
  ArrowRight, 
  MessageSquare, 
  ExternalLink,
  Apple,
  Coffee,
  PackageCheck,
  Send,
  X,
  FileText,
  ShieldCheck,
  Phone
} from 'lucide-react';

interface NotificationState {
  type: 'success' | null;
  message: string;
}

export default function App() {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');
  const [notification, setNotification] = useState<NotificationState>({ type: null, message: '' });

  // Live countdown timer state (hours : minutes : seconds)
  const [timeLeft, setTimeLeft] = useState({
    days: '02',
    hours: '14',
    minutes: '28',
    seconds: '45'
  });

  useEffect(() => {
    // Target 48 hours in future for realistic countdown
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(targetDate.getHours() + 14);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d < 10 ? `0${d}` : `${d}`,
          hours: h < 10 ? `0${h}` : `${h}`,
          minutes: m < 10 ? `0${m}` : `${m}`,
          seconds: s < 10 ? `0${s}` : `${s}`
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Inquiry form state
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    category: 'Commercial Manufacturing',
    message: ''
  });

  const showNotification = (message: string) => {
    setNotification({ type: 'success', message });
    setTimeout(() => {
      setNotification({ type: null, message: '' });
    }, 3500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setIsSubscribed(true);
    showNotification('Email registered for launch notification.');
  };

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    showNotification('Email copied to clipboard.');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) return;

    const textLines = [
      `*New Inquiry - DrSons International*`,
      `*Name:* ${inquiryForm.name}`,
      `*Company:* ${inquiryForm.company || 'Not Specified'}`,
      `*Email:* ${inquiryForm.email}`,
      `*Category:* ${inquiryForm.category}`,
      `*Message:* ${inquiryForm.message}`
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

  useEffect(() => {
    if (redirectCountdown === null || redirectCountdown <= 0) return;
    const timer = setTimeout(() => {
      setRedirectCountdown(redirectCountdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [redirectCountdown]);

  return (
    <div className="min-h-screen w-full bg-white text-[#0f2318] flex flex-col justify-between font-sans selection:bg-[#143e2b] selection:text-white relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {notification.message && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d281c] text-white px-4 py-3 shadow-xl border border-emerald-800/40 flex items-center gap-3 text-xs">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium tracking-wide">{notification.message}</span>
        </div>
      )}

      {/* Top Brand Logo Bar (matching reference top-left branding) */}
      <nav className="w-full px-6 sm:px-12 lg:px-16 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/aistudio/Gemini_Generated_Image_pda44spda44spda4_08fb44a5.png" 
            alt="DrSons International Logo" 
            className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply"
          />
        </div>

        {/* Top-Right Quick WhatsApp & Details Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowInquiryModal(true)}
            className="text-xs font-semibold uppercase tracking-wider text-emerald-900 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
          >
            Commercial Inquiry
          </button>
          <a
            href="https://wa.me/919411268879"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#143e2b] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#0c281c] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>

      {/* Main Hero Grid (Exact layout structure from reference image) */}
      <main className="w-full flex-1 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Bold Typography & Information */}
        <div className="lg:col-span-6 space-y-7 text-left">
          
          {/* Big Bold Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#081f14] leading-[1.08]">
              We are tidying up!
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-neutral-800">
              Sorry for the inconvenience!
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1 text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg">
            <p>
              Currently updating servers and digital infrastructure to launch our commercial manufacturing &amp; supply portal.
            </p>
            <p className="font-medium text-neutral-900">
              Thank you for your patience!
            </p>
          </div>

          {/* Countdown Clock (Matching reference styling) */}
          <div className="pt-2">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="text-sm sm:text-base text-neutral-700 font-medium">
                Your portal will be available in:
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-neutral-900 tracking-wider">
                {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-1">
              ESTIMATED LAUNCH WINDOW · Q3 SCHEDULED INITIALIZATION
            </div>
          </div>

          {/* Launch Email Notification Input */}
          <div className="pt-1 max-w-md">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter email for launch announcement"
                    required
                    className="flex-1 px-4 py-2.5 bg-[#fbfdfb] border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-emerald-800 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#143e2b] hover:bg-[#0c271b] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Notify Me</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-800/30 text-emerald-950 flex items-center gap-2 text-xs">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Notification registered for <strong className="font-mono text-neutral-900">{emailInput}</strong>.</span>
              </div>
            )}
          </div>

          {/* Direct Communication Channels (Matching reference: Visit us on social / direct) */}
          <div className="pt-4 space-y-2.5 border-t border-neutral-100">
            <div className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
              Direct Inquiries &amp; Trade Desk:
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* WhatsApp direct button */}
              <a
                href="https://wa.me/919411268879"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-neutral-300 hover:border-emerald-700 bg-white hover:bg-emerald-50 text-[#0f2e21] flex items-center justify-center transition-colors shadow-xs"
                title="Chat on WhatsApp (+91 9411268879)"
              >
                <MessageSquare className="w-4 h-4 text-emerald-800" />
              </a>

              {/* Email direct button */}
              <button
                onClick={() => handleCopyEmail('contact@drsonsinternational.com')}
                className="w-9 h-9 border border-neutral-300 hover:border-emerald-700 bg-white hover:bg-emerald-50 text-[#0f2e21] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                title="Copy Official Email (contact@drsonsinternational.com)"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-700" /> : <Mail className="w-4 h-4 text-neutral-700" />}
              </button>

              {/* Inquiry form launcher */}
              <button
                onClick={() => setShowInquiryModal(true)}
                className="px-3.5 py-2 border border-neutral-300 hover:border-emerald-800 bg-white text-xs font-medium text-neutral-800 hover:text-emerald-950 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-800" />
                <span>Manufacturing Inquiry Form</span>
              </button>

              <span className="text-xs font-mono text-emerald-900 font-medium ml-1">
                +91 9411268879
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Custom Animated Vector Server Rack & Technicians Illustration */}
        <div className="lg:col-span-6 flex items-center justify-center relative select-none">
          
          {/* Animated SVG Illustration based precisely on the reference image */}
          <div className="w-full max-w-[540px] aspect-[4/3] relative flex items-center justify-center">
            
            <svg 
              viewBox="0 0 600 480" 
              className="w-full h-full"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Foliage / Cloud Shapes */}
              <g opacity="0.45">
                <path 
                  d="M140 380 C110 320 90 220 150 160 C210 100 240 180 230 380 Z" 
                  fill="#e5eae6" 
                />
                <path 
                  d="M190 380 C210 280 250 140 310 110 C370 80 380 220 340 380 Z" 
                  fill="#dce5de" 
                />
                <path 
                  d="M440 380 C470 290 520 190 550 240 C580 290 540 350 490 380 Z" 
                  fill="#e3ebe5" 
                />
              </g>

              {/* Looping Mechanical Gears in Background */}
              <g className="origin-[500px_160px]" style={{ transformOrigin: '500px 160px' }}>
                <circle cx="500" cy="160" r="28" fill="#d2ded5" />
                <circle cx="500" cy="160" r="14" fill="#ffffff" />
                {/* Gear teeth */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <rect
                    key={`gear1-${i}`}
                    x="495"
                    y="126"
                    width="10"
                    height="8"
                    rx="1"
                    fill="#c0d1c4"
                    transform={`rotate(${angle} 500 160)`}
                  />
                ))}
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 500 160"
                  to="360 500 160"
                  dur="14s"
                  repeatCount="indefinite"
                />
              </g>

              <g className="origin-[535px_210px]" style={{ transformOrigin: '535px 210px' }}>
                <circle cx="535" cy="210" r="20" fill="#c3d5c7" />
                <circle cx="535" cy="210" r="9" fill="#ffffff" />
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <rect
                    key={`gear2-${i}`}
                    x="531"
                    y="186"
                    width="8"
                    height="6"
                    rx="1"
                    fill="#b2c8b7"
                    transform={`rotate(${angle} 535 210)`}
                  />
                ))}
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 535 210"
                  to="0 535 210"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </g>

              {/* Central Server Rack Tower */}
              {/* Main Outer Chassis */}
              <rect 
                x="340" 
                y="95" 
                width="145" 
                height="300" 
                rx="6" 
                fill="#364147" 
                stroke="#1f272a" 
                strokeWidth="3" 
              />
              <rect 
                x="345" 
                y="102" 
                width="135" 
                height="286" 
                rx="4" 
                fill="#273238" 
              />

              {/* 5 Rack Blade Units */}
              {[0, 1, 2, 3, 4].map((unitIdx) => {
                const yPos = 112 + unitIdx * 54;
                return (
                  <g key={`rack-${unitIdx}`}>
                    {/* Rack slot border */}
                    <rect 
                      x="353" 
                      y={yPos} 
                      width="119" 
                      height="46" 
                      rx="3" 
                      fill="#303d44" 
                      stroke="#485760" 
                      strokeWidth="1.5" 
                    />
                    
                    {/* Blinking Status LED Indicator */}
                    <circle cx="362" cy={yPos + 12} r="2.5" fill="#22c55e">
                      <animate 
                        attributeName="opacity" 
                        values="1;0.2;1" 
                        dur={`${1.8 + unitIdx * 0.4}s`} 
                        repeatCount="indefinite" 
                      />
                    </circle>

                    {/* Data / Activity Meter Bars */}
                    <g fill="#e2e8f0" opacity="0.9">
                      <rect x="372" y={yPos + 18} width="3" height="18" rx="1.5" />
                      <rect x="379" y={yPos + 12} width="3" height="24" rx="1.5" />
                      <rect x="386" y={yPos + 22} width="3" height="14" rx="1.5" />
                      <rect x="393" y={yPos + 14} width="3" height="22" rx="1.5" />
                      <rect x="400" y={yPos + 10} width="3" height="26" rx="1.5" />
                      <rect x="407" y={yPos + 16} width="3" height="20" rx="1.5" />
                      <rect x="414" y={yPos + 24} width="3" height="12" rx="1.5" />
                      <rect x="421" y={yPos + 8} width="3" height="28" rx="1.5" />
                      <rect x="428" y={yPos + 15} width="3" height="21" rx="1.5" />
                      <rect x="435" y={yPos + 20} width="3" height="16" rx="1.5" />
                      <rect x="442" y={yPos + 11} width="3" height="25" rx="1.5" />
                      <rect x="449" y={yPos + 17} width="3" height="19" rx="1.5" />
                    </g>

                    {/* Green scanning beam across blade */}
                    <rect x="370" y={yPos + 37} width="84" height="2" fill="#143e2b" opacity="0.6" />
                    <rect x="370" y={yPos + 37} width="24" height="2" fill="#4ade80">
                      <animate 
                        attributeName="x" 
                        values="370;430;370" 
                        dur={`${2.2 + unitIdx * 0.3}s`} 
                        repeatCount="indefinite" 
                      />
                    </rect>
                  </g>
                );
              })}

              {/* Step Ladder on the Right */}
              <g stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round">
                {/* Left and Right Rails */}
                <line x1="470" y1="395" x2="505" y2="270" />
                <line x1="535" y1="395" x2="520" y2="270" />
                {/* Rungs */}
                <line x1="477" y1="370" x2="532" y2="370" />
                <line x1="486" y1="340" x2="527" y2="340" />
                <line x1="495" y1="310" x2="523" y2="310" />
                <line x1="504" y1="280" x2="520" y2="280" />
              </g>

              {/* Technician Standing on the Ladder */}
              <g>
                {/* Head & Hair */}
                <circle cx="510" cy="148" r="9" fill="#fbcfe8" />
                <path d="M503 145 C504 139 514 138 518 143 C520 148 516 151 513 151 Z" fill="#1e293b" />
                {/* Torso in classic amber/orange top */}
                <path d="M499 157 L521 157 L524 195 L498 195 Z" fill="#f97316" rx="2" />
                {/* Legs in dark trousers */}
                <rect x="500" y="195" width="8" height="75" rx="3" fill="#1e293b" />
                <rect x="513" y="195" width="8" height="75" rx="3" fill="#1e293b" />
                {/* Shoes on ladder rung */}
                <ellipse cx="503" cy="272" rx="6" ry="3" fill="#0f172a" />
                <ellipse cx="518" cy="272" rx="6" ry="3" fill="#0f172a" />
                {/* Arms holding inspection tablet */}
                <path d="M501 165 L488 182 L498 186" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" />
                {/* Tablet / Clipboard */}
                <rect 
                  x="478" 
                  y="166" 
                  width="22" 
                  height="28" 
                  rx="2" 
                  fill="#0f172a" 
                  transform="rotate(-15 478 166)" 
                />
                <rect 
                  x="481" 
                  y="169" 
                  width="16" 
                  height="22" 
                  rx="1" 
                  fill="#4ade80" 
                  transform="rotate(-15 481 169)" 
                  opacity="0.85" 
                />
              </g>

              {/* Work Desk Station on the Left */}
              <g stroke="#94a3b8" strokeWidth="2.5">
                {/* Desk Surface */}
                <line x1="240" y1="340" x2="360" y2="340" />
                {/* Desk Legs (crossed trestle design) */}
                <line x1="250" y1="340" x2="280" y2="395" />
                <line x1="280" y1="340" x2="250" y2="395" />
                <line x1="330" y1="340" x2="350" y2="395" />
              </g>

              {/* Technician Seated at Laptop Desk */}
              <g>
                {/* Chair Stool */}
                <line x1="295" y1="355" x2="295" y2="395" stroke="#94a3b8" strokeWidth="2.5" />
                <rect x="282" y="352" width="26" height="5" rx="2" fill="#cbd5e1" />

                {/* Head & Flowing Dark Hair */}
                <path d="M285 268 C278 274 278 288 286 292 C295 292 299 285 297 274 C296 266 289 265 285 268 Z" fill="#1e293b" />
                <circle cx="295" cy="275" r="7" fill="#fed7aa" />

                {/* Torso in Warm Orange/Salmon top */}
                <path d="M288 284 C288 284 304 282 308 300 L303 330 L287 330 Z" fill="#f97316" />

                {/* Seated Legs in Dark Slacks */}
                <path d="M292 330 L320 332 L324 370 L316 370 L313 340 L292 340 Z" fill="#1e293b" />
                {/* Shoes */}
                <ellipse cx="323" cy="372" rx="6" ry="3" fill="#0f172a" />

                {/* Laptop on desk */}
                <path d="M312 338 L340 338" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                <path d="M328 338 L320 318 L338 318 Z" fill="#1e293b" />
                <rect x="322" y="320" width="14" height="15" fill="#4ade80" opacity="0.8" />
              </g>

              {/* Floor Baseline */}
              <line x1="160" y1="395" x2="570" y2="395" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
            </svg>

          </div>
        </div>

      </main>

      {/* Clean Bottom Bar (Domain Secured, Manufacturing Scope & WhatsApp Direct) */}
      <footer className="w-full border-t border-neutral-100 bg-white py-4 px-6 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
        <div>
          &copy; {new Date().getFullYear()} DrSons International. Domain Secured &amp; Hosted.
        </div>
        <div className="flex items-center gap-6 text-[11px]">
          <span>Fresh &amp; Preserved Produce</span>
          <span aria-hidden="true">·</span>
          <span>Beverages &amp; Ice Cream</span>
          <span aria-hidden="true">·</span>
          <span>Specialty Foods</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-emerald-800 font-semibold">WhatsApp: 9411268879</span>
        </div>
      </footer>

      {/* POPUP / MODAL: Commercial Manufacturing Inquiry & Scope */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 relative shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold">
                DrSons International · Trade Desk
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mt-1">
                Commercial Manufacturing Inquiry
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Submitting this form immediately routes your specifications to our WhatsApp desk at <strong className="font-semibold text-neutral-900">+91 9411268879</strong>.
              </p>
            </div>

            {/* Scope Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2.5 bg-emerald-50/60 border border-emerald-900/10 text-emerald-950 flex items-center gap-2">
                <Apple className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Fresh &amp; Preserved Produce</span>
              </div>
              <div className="p-2.5 bg-emerald-50/60 border border-emerald-900/10 text-emerald-950 flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Beverages &amp; Ice Cream</span>
              </div>
              <div className="p-2.5 bg-emerald-50/60 border border-emerald-900/10 text-emerald-950 flex items-center gap-2">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Specialty Food Products</span>
              </div>
            </div>

            {!inquirySubmitted ? (
              <form onSubmit={handleInquirySubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-3.5 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm({...inquiryForm, company: e.target.value})}
                      placeholder="Apex Trading Ltd."
                      className="w-full px-3.5 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                      placeholder="corporate@domain.com"
                      className="w-full px-3.5 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Manufacturing Category
                    </label>
                    <select
                      value={inquiryForm.category}
                      onChange={(e) => setInquiryForm({...inquiryForm, category: e.target.value})}
                      className="w-full px-3.5 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800 transition-colors"
                    >
                      <option value="Commercial Manufacturing">Contract Manufacturing &amp; Supply</option>
                      <option value="Fresh Produce Processing">Fresh/Preserved Produce Processing</option>
                      <option value="Beverages & Icecream Production">Beverages &amp; Ice Cream Production</option>
                      <option value="Specialty Food Manufacturing">Specialty Food Products Manufacturing</option>
                      <option value="Raw Materials / Farm Vendor">Raw Materials / Farm Vendor Registration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    Requirements &amp; Specifications *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                    placeholder="Specify target volumes, batch packaging, or distribution requirements."
                    className="w-full px-3.5 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800 transition-colors"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-neutral-100">
                  <span className="text-[11px] text-neutral-500">
                    Connects directly to WhatsApp: <strong className="text-emerald-900 font-mono">9411268879</strong>
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#143e2b] hover:bg-[#0c271b] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit &amp; Open WhatsApp</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 bg-emerald-50 border border-emerald-800/40 text-neutral-900 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                  <Check className="w-4 h-4" />
                  <span>Inquiry Prepared</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Thank you, <strong className="font-semibold text-neutral-900">{inquiryForm.name}</strong>. Redirecting you to DrSons WhatsApp desk (<strong className="font-mono text-neutral-900">9411268879</strong>){redirectCountdown !== null && redirectCountdown > 0 ? ` in ${redirectCountdown}s...` : ' now.'}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={whatsappRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#143e2b] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0c271b] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open WhatsApp Directly (9411268879)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => {
                      setInquirySubmitted(false);
                      setRedirectCountdown(null);
                      setInquiryForm({ name: '', company: '', email: '', category: 'Commercial Manufacturing', message: '' });
                    }}
                    className="text-xs text-neutral-600 underline underline-offset-4 cursor-pointer hover:text-neutral-900"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
