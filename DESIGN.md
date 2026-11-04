# Design System & UI Specification: DrSons International

> **Version:** 1.0.0  
> **Target:** DrSons International Official Web Platform & Future Portals  
> **Status:** Active / Canonical Source of Truth for UI & Frontend Development  

---

## 1. Brand Identity & Design Philosophy

The DrSons International design language reflects an **industrial-grade, modern agri-food enterprise**. It bridges traditional commercial reliability with contemporary, high-performance digital aesthetics.

### Core Tenets
1. **Trust & Industrial Rigor:** Clean lines, deliberate geometry, and deep organic tones inspire trust in commercial partners, supply chain institutions, and wholesale clients.
2. **High Information Clarity:** Uncluttered whitespace, clear typographic hierarchy, and unambiguous calls to action (CTAs).
3. **Frictionless Direct Trade:** Direct trade touchpoints (WhatsApp hotline, official email, phone numbers) are prominent and prioritized across every view.
4. **Subtle Motion & Precision:** Micro-animations (pulsing server LEDs, scanning lasers, rotating machinery gears) evoke active engineering and forward momentum without distracting from content.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Primary Brand Colors
| Token / Name | Hex | Tailwind Equivalent | Role / Usage |
| :--- | :--- | :--- | :--- |
| **Deep Forest** | `#081f14` | `text-[#081f14]` | Primary headlines, extreme-contrast text |
| **DrSons Dark Green** | `#0d281c` | `bg-[#0d281c]` | Toast notifications, active dark containers |
| **DrSons British Racing Green** | `#143e2b` | `bg-[#143e2b]` | Primary buttons, navbar actions, brand CTAs |
| **Corporate Green Hover** | `#0c271b` | `hover:bg-[#0c271b]` | Hover state for primary buttons |
| **Emerald Accent** | `#10b981` / `#059669` | `emerald-600` / `emerald-700` | Success badges, check icons, active trade links |
| **Emerald Light** | `#4ade80` | `fill-[#4ade80]` / `text-emerald-400` | Illustration status monitors, LED glowing lights |

### 2.2 Backgrounds & Tints
| Token / Name | Hex / Class | Role / Usage |
| :--- | :--- | :--- |
| **Pure Canvas** | `#ffffff` / `bg-white` | Main page background, card surfaces |
| **Soft Surface** | `#fbfdfb` | Form input backgrounds, secondary surfaces |
| **Emerald Tint** | `bg-emerald-50` / `bg-emerald-50/60` | Notification panels, modal scope category pills |
| **Selection Highlight** | `selection:bg-[#143e2b] selection:text-white` | Global text highlight styling |

### 2.3 Neutrals & Borders
| Token / Name | Hex / Class | Role / Usage |
| :--- | :--- | :--- |
| **Slate Dark** | `#0f2318` / `#14221a` | Body base font color |
| **Text Primary** | `text-neutral-900` | High-emphasis body, field labels |
| **Text Secondary** | `text-neutral-600` | Subtitles, descriptions, captions |
| **Text Muted** | `text-neutral-400` | Metadata, microcopy, placeholder text |
| **Border Subtle** | `border-neutral-100` | Dividers, footer separators |
| **Border Neutral** | `border-neutral-200` / `border-neutral-300` | Input outlines, button borders, card contours |
| **Border Focus** | `focus:border-emerald-800` | Input focus outline state |

### 2.4 Industrial Accent Colors (Used in Illustrations & Badges)
| Color | Hex | Role / Usage |
| :--- | :--- | :--- |
| **Safety Orange** | `#f97316` | Technician uniforms, operational activity indicators |
| **Warm Peach / Skin** | `#fed7aa` / `#fbcfe8` | Character illustration tones |
| **Slate Rack Dark** | `#0f172a` / `#1e293b` | Structural hardware, server chassis, footwear |
| **Structural Wireframe**| `#94a3b8` / `#cbd5e1` | Ladders, desk frames, floor grid baselines |

---

## 3. Typography System

The platform combines an ultra-clean geometric sans-serif for UI clarity with an authoritative serif for editorial brand prestige and a monospace font for metrics and trade communications.

### 3.1 Font Families
- **Primary Sans:** `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
  - Loaded via Google Fonts CDN in `index.html`.
  - Used for body copy, buttons, labels, and primary navigation.
- **Editorial Serif:** `'Playfair Display', Georgia, serif` (`.font-serif-brand`)
  - Used for distinguished section headers, quotes, or corporate milestones.
- **Data Monospace:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` (`font-mono`)
  - Used for countdown timers, phone numbers, trade desk identifiers, and timestamps.

### 3.2 Type Scale & Hierarchy Reference
| Level | Font / Weight | Size & Leading | Tailwind Utility |
| :--- | :--- | :--- | :--- |
| **Hero Title (H1)** | Plus Jakarta Sans 700 | 48px – 60px / 1.08 | `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#081f14] leading-[1.08]` |
| **Hero Subtitle** | Plus Jakarta Sans 500 | 20px – 24px / 1.3 | `text-xl sm:text-2xl font-medium text-neutral-800` |
| **Section Title (H2)** | Plus Jakarta Sans 700 | 28px – 36px | `text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900` |
| **Modal / Card Title (H3)**| Plus Jakarta Sans 700 | 20px / 1.4 | `text-xl font-bold text-neutral-900` |
| **Body (Default)** | Plus Jakarta Sans 400 | 14px – 16px / 1.6 | `text-sm sm:text-base text-neutral-600 leading-relaxed` |
| **Button Text** | Plus Jakarta Sans 600 | 12px / Uppercase | `text-xs font-semibold uppercase tracking-wider` |
| **Form Label** | Plus Jakarta Sans 500 | 11px / Uppercase | `text-[11px] font-medium text-neutral-700 uppercase tracking-wide` |
| **Micro Kicker / Badge** | Monospace 600 | 11px / Uppercase | `text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold` |
| **Countdown Digits** | Monospace 700 | 20px – 24px | `font-mono text-xl sm:text-2xl font-bold text-neutral-900 tracking-wider` |

---

## 4. Spacing, Grid & Layout Rules

### 4.1 Page Canvas Container
- **Layout Paradigm:** Full-viewport sticky frame (`min-h-screen flex flex-col justify-between`).
- **Container Limit:** `max-w-7xl mx-auto`.
- **Horizontal Gutters:** `px-6 sm:px-12 lg:px-16`.
- **Vertical Rhythm:** 
  - Header padding: `pt-8 pb-4`
  - Main hero block: `py-6 md:py-10`
  - Footer bar: `py-4`

### 4.2 Component Grid System
- Standard page layouts utilize a **12-column responsive grid**:
  - `grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center`
  - **Left Content Column:** `lg:col-span-6 space-y-7`
  - **Right Visual / Illustration Column:** `lg:col-span-6 flex items-center justify-center`
- Form fields in modals / inputs:
  - Responsive 2-column fields: `grid grid-cols-1 sm:grid-cols-2 gap-4`

---

## 5. UI Component Library

### 5.1 Navigation Bar (`<nav>`)
- **Structure:** Left-aligned brand logo, right-aligned high-value action buttons.
- **Branding:** Logo image rendered with `mix-blend-multiply` on white surface at `h-10 sm:h-12 w-auto`.
- **Actions:** 
  - Text link: `text-xs font-semibold uppercase tracking-wider text-emerald-900 hover:text-emerald-950 underline underline-offset-4`.
  - WhatsApp Pill: `inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#143e2b] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#0c281c]`.

### 5.2 Primary & Secondary Action Buttons
- **Primary Solid CTA:**
  - Classes: `px-5 py-2.5 bg-[#143e2b] hover:bg-[#0c271b] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer`
  - Shape: Sharp rectangle (`rounded-none` or subtle `rounded-xs`).
- **Icon Square Action Button (Social / Direct Desk):**
  - Classes: `w-9 h-9 border border-neutral-300 hover:border-emerald-700 bg-white hover:bg-emerald-50 text-[#0f2e21] flex items-center justify-center transition-colors shadow-xs`
- **Secondary Outlined Pill:**
  - Classes: `px-3.5 py-2 border border-neutral-300 hover:border-emerald-800 bg-white text-xs font-medium text-neutral-800 hover:text-emerald-950 transition-colors flex items-center gap-1.5`

### 5.3 Form Inputs & Select Controls
- **Text Inputs & Textareas:**
  - Background: Pure white `bg-white` or subtle `bg-[#fbfdfb]`
  - Borders: `border border-neutral-300`
  - Focus Ring: `focus:outline-none focus:border-emerald-800`
  - Text: `text-xs text-neutral-900 placeholder-neutral-400`
  - Sizing: `px-3.5 py-2` or `px-4 py-2.5`
- **Select Dropdown:**
  - Matching text input styling with clean native arrow styling.

### 5.4 Modals & Dialog Overlays
- **Backdrop:** `fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4`
- **Modal Card:** `bg-white border border-neutral-200 w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 relative shadow-2xl`
- **Header:** Uppercase green badge kicker (`text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold`) + Bold title + helper subtitle.

### 5.5 Notification Toasts
- **Position:** `fixed bottom-6 right-6 z-50`
- **Style:** `bg-[#0d281c] text-white px-4 py-3 shadow-xl border border-emerald-800/40 flex items-center gap-3 text-xs`
- **Icon:** `Check` icon in `text-emerald-400`.

---

## 6. Iconography & Visual Assets

### 6.1 Icon Library
All interface icons are sourced strictly from **Lucide React** (`lucide-react`):
- `Check` — Affirmations, copy confirmations, success states.
- `Copy` / `Mail` — Trade desk communications, email clipboard interactions.
- `MessageSquare` / `Phone` — WhatsApp, direct customer communication channels.
- `ArrowRight` / `Send` — Action dispatch and form submission.
- `Apple`, `Coffee`, `PackageCheck` — Sector category identifiers (Produce, Beverages, Specialty Food).
- `FileText`, `ShieldCheck` — Specifications, inquiries, regulatory compliance.

### 6.2 Icon Sizing Standard
- Button icons: `w-3.5 h-3.5` or `w-4 h-4`
- Card badge icons: `w-3.5 h-3.5 text-emerald-700 shrink-0`
- Toast / Modal icons: `w-4 h-4`

---

## 7. Motion & Animation Standards

Defined in `src/index.css`:
1. **Pulse Glow (`animate-pulse-glow`):**
   - Timing: `3s ease-in-out infinite`
   - Purpose: Status indicators, hardware lights, live counters.
2. **Scan Beam (`animate-scan`):**
   - Timing: `2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite`
   - Purpose: Diagnostic radar, horizontal telemetry lasers.
3. **Marquee Loop (`animate-marquee`):**
   - Timing: `32s linear infinite` (pauses on hover via `hover:animation-play-state: paused`)
   - Purpose: Partner badges, ticker lines, certification rails.

---

## 8. Principles for Future Feature Development

When extending DrSons International into full product catalogs, client dashboards, or supply-chain management tools:

1. **Retain the Forest Green Heritage:** Never substitute the deep green (`#081f14` / `#143e2b`) with generic blues or purples. Green represents agriculture, vitality, and DrSons heritage.
2. **Keep the Box Geometry Clean:** Avoid overly rounded bubbly cards (`rounded-3xl`); maintain sharp or tailored corners (`rounded-none`, `rounded-sm`, or `rounded-md` max) to preserve the corporate industrial aesthetic.
3. **Visible Trade Hotline:** Always keep the WhatsApp / phone number (`+91 9411268879`) accessible in headers, footers, and modal CTAs.
4. **Export-Grade Precision:** Every data point, volume specification, and pricing tier should feature tabular typography (`font-mono`) and clean border dividers.

