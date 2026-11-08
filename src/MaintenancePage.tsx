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
  Droplets,
  Send,
  X,
  FileText,
  ShieldCheck,
  Phone,
  Lock,
  Key,
  AlertCircle
} from 'lucide-react';

interface NotificationState {
  type: 'success' | 'error' | null;
  message: string;
}

interface MaintenancePageProps {
  onUnlock?: () => void;
}

export default function MaintenancePage({ onUnlock }: MaintenancePageProps) {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
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

  // Inquiry form state & validation
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    category: 'Fruits, Vegetables Powder and starch',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    company?: string;
    email?: string;
    message?: string;
  }>({});

  const [formTouched, setFormTouched] = useState<{
    name?: boolean;
    company?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});

  // Strict Sanitizers
  const sanitizeName = (raw: string) => {
    return raw.replace(/[^a-zA-Z\s'-]/g, '').slice(0, 50);
  };

  const sanitizeEmail = (raw: string) => {
    return raw.replace(/\s+/g, '').replace(/[^a-zA-Z0-9._%+-@]/g, '').slice(0, 80);
  };

  const sanitizeCompany = (raw: string) => {
    return raw.replace(/[^a-zA-Z0-9\s.,&'()-]/g, '').slice(0, 80);
  };

  const sanitizeMessage = (raw: string) => {
    return raw.replace(/[<>]/g, '').slice(0, 800);
  };

  // Validators
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
      return 'Please enter a valid email address (e.g. name@company.com).';
    }
    return null;
  };

  const validateCompany = (comp: string): string | null => {
    const trimmed = comp.trim();
    if (!trimmed) return null; // Optional
    if (trimmed.length < 2) return 'Company name must be at least 2 characters.';
    return null;
  };

  const validateMessage = (msg: string): string | null => {
    const trimmed = msg.trim();
    if (!trimmed) return 'Please specify your requirements or batch volumes.';
    if (trimmed.length < 5) return 'Message must be at least 5 characters.';
    return null;
  };

  const validateMaintenanceForm = () => {
    const errors: typeof formErrors = {};
    const nameErr = validateName(inquiryForm.name);
    const emailErr = validateEmail(inquiryForm.email);
    const compErr = validateCompany(inquiryForm.company);
    const msgErr = validateMessage(inquiryForm.message);

    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    if (compErr) errors.company = compErr;
    if (msgErr) errors.message = msgErr;

    return errors;
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: null, message: '' });
    }, 3500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      showNotification('Please enter a valid email address (e.g. name@domain.com).', 'error');
      return;
    }
    setIsSubscribed(true);
    showNotification('Email registered for launch notification.', 'success');
  };

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    showNotification('Email copied to clipboard.');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    if (['drsons', 'drsons2026', 'admin', 'preview', 'dev', 'secret'].includes(clean)) {
      if (onUnlock) onUnlock();
    } else {
      setPasscodeError(true);
      setTimeout(() => setPasscodeError(false), 2500);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormTouched({
      name: true,
      company: true,
      email: true,
      message: true
    });

    const errors = validateMaintenanceForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstError = errors.name || errors.email || errors.company || errors.message;
      showNotification(firstError || 'Please correct the highlighted fields.', 'error');
      return;
    }

    const textLines = [
      `*New Inquiry - D R & Sons International*`,
      `*Name:* ${inquiryForm.name.trim()}`,
      `*Company:* ${inquiryForm.company.trim() || 'Not Specified'}`,
      `*Email:* ${inquiryForm.email.trim()}`,
      `*Category:* ${inquiryForm.category}`,
      `*Message:* ${inquiryForm.message.trim()}`
    ];
    const encodedText = encodeURIComponent(textLines.join('\n'));
    const url = `https://wa.me/919411268879?text=${encodedText}`;

    setWhatsappRedirectUrl(url);
    setInquirySubmitted(true);
    setRedirectCountdown(3);
    showNotification('Inquiry registered. Redirecting to WhatsApp desk...', 'success');

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
        <div className={`fixed bottom-6 right-6 z-50 text-white px-4 py-3 shadow-xl border flex items-center gap-3 text-xs ${
          notification.type === 'error'
            ? 'bg-[#2a0e0e] border-red-700/60'
            : 'bg-[#0d281c] border-emerald-800/40'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="font-medium tracking-wide">{notification.message}</span>
        </div>
      )}

      {/* Top Brand Logo Bar */}
      <nav className="w-full px-6 sm:px-12 lg:px-16 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/brand/drsons_logo.webp" 
            alt="D R & SONS INTERNATIONAL" 
            className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply"
          />
          <div className="border-l border-neutral-300 pl-3 hidden xs:block">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-[#0a2318] block leading-none">
              D R &amp; SONS INTERNATIONAL
            </span>
            <span className="text-[10px] text-neutral-500 font-medium block mt-0.5 leading-none">
              FOOD &amp; BEVERAGE MANUFACTURING · SINCE 2026
            </span>
          </div>
        </div>

        {/* Top-Right Quick WhatsApp & Client Login Action */}
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
            <span>WhatsApp Desk</span>
          </a>
          <button
            onClick={() => setShowPasscodeModal(true)}
            className="p-1.5 text-neutral-400 hover:text-[#0a2318] hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
            title="Authorized Staff / Client Preview"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Main Hero Grid */}
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

          {/* Countdown Clock */}
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
              ESTIMATED LAUNCH WINDOW · SCHEDULED INITIALIZATION
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
                    onChange={(e) => setEmailInput(sanitizeEmail(e.target.value))}
                    placeholder="Enter business email for launch announcement"
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

          {/* Direct Communication Channels */}
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
          
          {/* Animated SVG Illustration */}
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
                <line x1="470" y1="395" x2="505" y2="270" />
                <line x1="535" y1="395" x2="520" y2="270" />
                <line x1="477" y1="370" x2="532" y2="370" />
                <line x1="486" y1="340" x2="527" y2="340" />
                <line x1="495" y1="310" x2="523" y2="310" />
                <line x1="504" y1="280" x2="520" y2="280" />
              </g>

              {/* Technician Standing on the Ladder */}
              <g>
                <circle cx="510" cy="148" r="9" fill="#fbcfe8" />
                <path d="M503 145 C504 139 514 138 518 143 C520 148 516 151 513 151 Z" fill="#1e293b" />
                <path d="M499 157 L521 157 L524 195 L498 195 Z" fill="#f97316" rx="2" />
                <rect x="500" y="195" width="8" height="75" rx="3" fill="#1e293b" />
                <rect x="513" y="195" width="8" height="75" rx="3" fill="#1e293b" />
                <ellipse cx="503" cy="272" rx="6" ry="3" fill="#0f172a" />
                <ellipse cx="518" cy="272" rx="6" ry="3" fill="#0f172a" />
                <path d="M501 165 L488 182 L498 186" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" />
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
                <line x1="240" y1="340" x2="360" y2="340" />
                <line x1="250" y1="340" x2="280" y2="395" />
                <line x1="280" y1="340" x2="250" y2="395" />
                <line x1="330" y1="340" x2="350" y2="395" />
              </g>

              {/* Technician Seated at Laptop Desk */}
              <g>
                <line x1="295" y1="355" x2="295" y2="395" stroke="#94a3b8" strokeWidth="2.5" />
                <rect x="282" y="352" width="26" height="5" rx="2" fill="#cbd5e1" />
                <path d="M285 268 C278 274 278 288 286 292 C295 292 299 285 297 274 C296 266 289 265 285 268 Z" fill="#1e293b" />
                <circle cx="295" cy="275" r="7" fill="#fed7aa" />
                <path d="M288 284 C288 284 304 282 308 300 L303 330 L287 330 Z" fill="#f97316" />
                <path d="M292 330 L320 332 L324 370 L316 370 L313 340 L292 340 Z" fill="#1e293b" />
                <ellipse cx="323" cy="372" rx="6" ry="3" fill="#0f172a" />
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

      {/* Clean Bottom Bar */}
      <footer className="w-full border-t border-neutral-100 bg-white py-4 px-6 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
        <div>
          &copy; {new Date().getFullYear()} D R &amp; Sons International Private Limited. Domain Secured &amp; Hosted.
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span>Fruits, Vegetables Powder &amp; Starch</span>
          <span aria-hidden="true">·</span>
          <span>Flakes</span>
          <span aria-hidden="true">·</span>
          <span>Mineral Water</span>
          <span aria-hidden="true">·</span>
          <span>Beverages</span>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => setShowPasscodeModal(true)}
            className="text-neutral-400 hover:text-emerald-900 flex items-center gap-1 cursor-pointer transition-colors"
            title="Preview Full Site"
          >
            <Key className="w-3 h-3" />
            <span>Staff Preview</span>
          </button>
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
                D R &amp; Sons International · Trade Desk
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mt-1">
                Commercial Manufacturing Inquiry
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Submitting this form immediately routes your specifications to our WhatsApp desk at <strong className="font-semibold text-neutral-900">+91 9411268879</strong>.
              </p>
            </div>

            {/* 4 Official Division Scope Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div className="p-2 bg-emerald-50/60 border border-emerald-900/10 text-emerald-950 flex flex-col items-center text-center gap-1">
                <Apple className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-medium text-[10px] leading-tight">Powder &amp; Starch</span>
              </div>
              <div className="p-2 bg-emerald-50/60 border border-emerald-900/10 text-emerald-950 flex flex-col items-center text-center gap-1">
                <PackageCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-medium text-[10px] leading-tight">Produce Flakes</span>
              </div>
              <div className="p-2 bg-emerald-50/60 border border-emerald-900/10 text-emerald-950 flex flex-col items-center text-center gap-1">
                <Droplets className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-medium text-[10px] leading-tight">Mineral Water</span>
              </div>
              <div className="p-2 bg-emerald-50/60 border border-emerald-900/10 text-emerald-950 flex flex-col items-center text-center gap-1">
                <Coffee className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-medium text-[10px] leading-tight">Drinks &amp; Ice Cream</span>
              </div>
            </div>

            {!inquirySubmitted ? (
              <form onSubmit={handleInquirySubmit} noValidate className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Full Name *
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="name"
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
                        placeholder="Your Name"
                        className={`w-full px-3.5 py-2 pr-8 bg-white border text-xs text-neutral-900 focus:outline-none transition-colors ${
                          formTouched.name && formErrors.name
                            ? 'border-red-500 focus:border-red-600'
                            : formTouched.name && !formErrors.name && inquiryForm.name.trim().length >= 2
                            ? 'border-emerald-700 focus:border-emerald-800'
                            : 'border-neutral-300 focus:border-emerald-800'
                        }`}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        {formTouched.name && formErrors.name && (
                          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        )}
                        {formTouched.name && !formErrors.name && inquiryForm.name.trim().length >= 2 && (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    {formTouched.name && formErrors.name && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Company / Organization
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="company"
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
                        placeholder="Company Name (optional)"
                        className={`w-full px-3.5 py-2 pr-8 bg-white border text-xs text-neutral-900 focus:outline-none transition-colors ${
                          formTouched.company && formErrors.company
                            ? 'border-red-500 focus:border-red-600'
                            : formTouched.company && !formErrors.company && inquiryForm.company.trim().length >= 2
                            ? 'border-emerald-700 focus:border-emerald-800'
                            : 'border-neutral-300 focus:border-emerald-800'
                        }`}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        {formTouched.company && formErrors.company && (
                          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        )}
                        {formTouched.company && !formErrors.company && inquiryForm.company.trim().length >= 2 && (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    {formTouched.company && formErrors.company && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Email Address *
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        name="email"
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
                        placeholder="corporate@domain.com"
                        className={`w-full px-3.5 py-2 pr-8 bg-white border text-xs text-neutral-900 focus:outline-none transition-colors ${
                          formTouched.email && formErrors.email
                            ? 'border-red-500 focus:border-red-600'
                            : formTouched.email && !formErrors.email && !validateEmail(inquiryForm.email)
                            ? 'border-emerald-700 focus:border-emerald-800'
                            : 'border-neutral-300 focus:border-emerald-800'
                        }`}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        {formTouched.email && formErrors.email && (
                          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        )}
                        {formTouched.email && !formErrors.email && inquiryForm.email.trim() && !validateEmail(inquiryForm.email) && (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    {formTouched.email && formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                      Manufacturing Division
                    </label>
                    <select
                      value={inquiryForm.category}
                      onChange={(e) => setInquiryForm({...inquiryForm, category: e.target.value})}
                      className="w-full px-3.5 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800 transition-colors cursor-pointer"
                    >
                      <option value="Fruits, Vegetables Powder and starch">Fruits, Vegetables Powder and starch</option>
                      <option value="Fruits and Vegetables Flakes">Fruits and Vegetables Flakes</option>
                      <option value="Drinking Mineral Water">Drinking Mineral Water</option>
                      <option value="Non-Alcoholic Drinks and Ice Creams">Non-Alcoholic Drinks and Ice Creams</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-700 uppercase tracking-wide mb-1">
                    Requirements &amp; Specifications *
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryForm.message}
                    onChange={(e) => {
                      const sanitized = sanitizeMessage(e.target.value);
                      setInquiryForm((prev) => ({ ...prev, message: sanitized }));
                      if (formTouched.message) {
                        const err = validateMessage(sanitized);
                        setFormErrors((prev) => ({ ...prev, message: err || undefined }));
                      }
                    }}
                    onBlur={() => {
                      setFormTouched((prev) => ({ ...prev, message: true }));
                      const err = validateMessage(inquiryForm.message);
                      setFormErrors((prev) => ({ ...prev, message: err || undefined }));
                    }}
                    placeholder="Specify target volumes, batch packaging, or distribution requirements."
                    className={`w-full px-3.5 py-2 bg-white border text-xs text-neutral-900 focus:outline-none transition-colors ${
                      formTouched.message && formErrors.message
                        ? 'border-red-500 focus:border-red-600'
                        : formTouched.message && !formErrors.message && inquiryForm.message.trim().length >= 5
                        ? 'border-emerald-700 focus:border-emerald-800'
                        : 'border-neutral-300 focus:border-emerald-800'
                    }`}
                  />
                  {formTouched.message && formErrors.message && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.message}</p>
                  )}
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
                      setInquiryForm({ name: '', company: '', email: '', category: 'Fruits, Vegetables Powder and starch', message: '' });
                      setFormErrors({});
                      setFormTouched({});
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

      {/* POPUP / MODAL: Staff & Client Passcode Preview Access */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 w-full max-w-sm p-6 space-y-4 relative shadow-2xl rounded-xl">
            <button
              onClick={() => { setShowPasscodeModal(false); setPasscode(''); setPasscodeError(false); }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-emerald-900">
              <Lock className="w-5 h-5" />
              <h3 className="text-base font-bold text-neutral-900">
                Staff &amp; Client Preview
              </h3>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Enter your authorized access passkey (or use the link <code className="bg-neutral-100 px-1 py-0.5 font-mono text-emerald-900 text-[11px]">?preview=drsons</code>) to view the live website in development.
            </p>

            <form onSubmit={handlePasscodeSubmit} className="space-y-3 pt-1">
              <div>
                <input
                  type="password"
                  autoFocus
                  required
                  value={passcode}
                  onChange={(e) => { setPasscode(e.target.value); setPasscodeError(false); }}
                  placeholder="Enter Passkey (e.g. drsons)"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-emerald-800 transition-colors rounded-lg font-mono"
                />
                {passcodeError && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">
                    Incorrect passkey. Please try again or use the secret link.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#143e2b] hover:bg-[#0c271b] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer rounded-lg flex items-center justify-center gap-2"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Unlock Live Site</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
