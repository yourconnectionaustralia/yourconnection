import { useState, useRef, useEffect, createContext, useContext } from "react";
import { supabase } from "./supabase";
import {
  Droplets, ChevronRight, ChevronLeft, ChevronDown, Search,
  CheckCircle2, AlertCircle, X, Bell, Star,
  TrendingUp, TrendingDown,
  ThermometerSun, Sun, Beaker, Zap,
  Phone, ShoppingBag, BarChart3, Home, MapPin,
  HelpCircle, AlertTriangle, Activity,
  Lightbulb, Wrench, CircleDot, Navigation, Clock, Store,
  Camera, Image, User, Edit3, Save, Share2, FileText, Plus, Trash2,
  Moon, SunMedium, Mail, ArrowRight, Shield, Sparkles, LogIn, LogOut
} from "lucide-react";
import { XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, Area, AreaChart } from "recharts";

/* ═══════════════════════════════════════════════════════════════
   THEME SYSTEM — Brand Guidelines v1.1
   Light-first (consumer outdoor use) with brand dark mode toggle
   ═══════════════════════════════════════════════════════════════ */
const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

const THEMES = {
  light: {
    // Brand palette adapted for light/outdoor consumer use
    pri: "#0077B6",       // Ocean — primary brand blue
    priL: "#E6F3FA",      // Ocean at 10% on white
    priD: "#03045E",      // Deep — contrast punches
    acc: "#00B4D8",       // Sky — primary CTAs, highlights
    accL: "#E5F6FB",      // Sky at 10%
    ok: "#10B981",        // Green (slightly deeper for light bg contrast)
    okL: "#ECFDF5",
    okB: "#A7F3D0",
    warn: "#F4A261",      // Gold — warm highlights
    warnL: "#FEF3E2",
    warnB: "#FCDCB0",
    bad: "#FF6B6B",       // Coral — alerts
    badL: "#FEE9E9",
    badB: "#FDB5B5",
    tx: "#03045E",        // Deep navy text (high contrast for sun)
    tx2: "#4A6070",       // muted
    tx3: "#8899A6",       // tertiary
    bg: "#F4F7FA",        // cool near-white
    bgS: "#E8EDF2",       // slightly darker
    card: "#FFFFFF",
    cardH: "#FAFCFF",     // brand white on hover
    brd: "#DAE2EA",
    brdL: "#EDF1F5",
    hdr: "rgba(244,247,250,0.92)",
    shadow: "rgba(3,4,94,0.06)",
    shadowH: "rgba(3,4,94,0.12)",
    overlay: "rgba(3,4,94,0.4)",
    inputBg: "#FFFFFF",
    chartGrid: "#DAE2EA",
    // Glass surfaces (light mode uses subtle ocean tints)
    glass1: "rgba(0,119,182,0.04)",
    glass2: "rgba(0,119,182,0.07)",
    glass3: "rgba(0,180,216,0.10)",
    glass4: "rgba(0,119,182,0.14)",
    // CTA button uses Sky per brand rules
    cta: "#00B4D8",
    ctaHover: "#00A0C2",
    starCol: "#F4A261",
  },
  dark: {
    // Brand dark — primary canvas as specified in guidelines
    pri: "#00B4D8",       // Sky becomes primary in dark (higher visibility)
    priL: "rgba(0,180,216,0.12)",   // glass-3
    priD: "#90E0EF",      // Foam for emphasis text on dark
    acc: "#00B4D8",       // Sky
    accL: "rgba(0,180,216,0.12)",
    ok: "#6EE7B7",        // Brand green
    okL: "rgba(110,231,183,0.12)",
    okB: "rgba(110,231,183,0.25)",
    warn: "#F4A261",      // Gold
    warnL: "rgba(244,162,97,0.12)",
    warnB: "rgba(244,162,97,0.25)",
    bad: "#FF6B6B",       // Coral
    badL: "rgba(255,107,107,0.12)",
    badB: "rgba(255,107,107,0.25)",
    tx: "#FAFCFF",        // Brand white
    tx2: "#90A4B8",
    tx3: "#5E7687",
    bg: "#081428",        // Brand dark background
    bgS: "#0D1B30",       // Slightly lighter
    card: "rgba(255,255,255,0.04)",   // glass-1
    cardH: "rgba(255,255,255,0.08)",  // glass-2
    brd: "rgba(255,255,255,0.08)",
    brdL: "rgba(255,255,255,0.04)",
    hdr: "rgba(8,20,40,0.92)",
    shadow: "rgba(0,0,0,0.3)",
    shadowH: "rgba(0,0,0,0.5)",
    overlay: "rgba(0,0,0,0.6)",
    inputBg: "rgba(255,255,255,0.06)",
    chartGrid: "rgba(255,255,255,0.08)",
    glass1: "rgba(255,255,255,0.04)",
    glass2: "rgba(255,255,255,0.08)",
    glass3: "rgba(0,180,216,0.12)",
    glass4: "rgba(0,119,182,0.15)",
    cta: "#00B4D8",
    ctaHover: "#00C8F0",
    starCol: "#F4A261",
  }
};

// Brand typography: Outfit for display (clean, warm, professional), DM Sans for body/UI
const FONT = "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const FONT_HEAD = "'Outfit', 'DM Sans', -apple-system, sans-serif";

/* ═══════════════════════════════════════════════════════════════
   BRAND LOGO — Droplet Node (from brand guidelines SVG)
   ═══════════════════════════════════════════════════════════════ */
function DropletNodeIcon({ size = 32 }) {
  // Cropped viewBox: content spans x:17-103, y:8-110
  return (
    <svg width={size} height={size * (102/86)} viewBox="17 8 86 102" fill="none">
      <defs>
        <linearGradient id="pc-grad" x1="60" y1="10" x2="60" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00B4D8"/>
          <stop offset="100%" stopColor="#0077B6"/>
        </linearGradient>
      </defs>
      <path d="M60 10 C60 10,26 46,22 70 C19 88,36 108,60 108 C84 108,101 88,98 70 C94 46,60 10,60 10Z" fill="url(#pc-grad)"/>
      <line x1="60" y1="72" x2="60" y2="40" stroke="#FAFCFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
      <line x1="60" y1="72" x2="36" y2="62" stroke="#FAFCFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
      <line x1="60" y1="72" x2="84" y2="62" stroke="#FAFCFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
      <line x1="60" y1="72" x2="42" y2="90" stroke="#FAFCFF" strokeWidth="1.2" opacity="0.35" strokeLinecap="round"/>
      <line x1="60" y1="72" x2="78" y2="90" stroke="#FAFCFF" strokeWidth="1.2" opacity="0.35" strokeLinecap="round"/>
      <circle cx="60" cy="40" r="5" fill="#FAFCFF"/>
      <circle cx="36" cy="62" r="4" fill="#FAFCFF"/>
      <circle cx="84" cy="62" r="4" fill="#FAFCFF"/>
      <circle cx="42" cy="90" r="3" fill="#90E0EF"/>
      <circle cx="78" cy="90" r="3" fill="#90E0EF"/>
      <circle cx="60" cy="72" r="7" fill="#FAFCFF"/>
      <circle cx="60" cy="72" r="3.5" fill="#00B4D8"/>
    </svg>
  );
}

function BrandWordmark({ size = 16 }) {
  const T = useTheme();
  return <span style={{ fontSize: size, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: FONT_HEAD }}><span style={{ color: T.tx }}>Pool</span><span style={{ color: "#00B4D8" }}>Connection</span></span>;
}

/* ═══════════════════════════════════════════════════════════════
   RESPONSIVE SYSTEM
   ═══════════════════════════════════════════════════════════════ */
const LayoutCtx = createContext({ w: 480, desk: false, wide: false });
const useLayout = () => useContext(LayoutCtx);

function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 480);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { w, desk: w >= 768, wide: w >= 1024 };
}

/* ═══════════════════════════════════════════════════════════════
   CHEMISTRY ENGINE
   ═══════════════════════════════════════════════════════════════ */
const TARGETS = {
  ph: { min: 7.2, max: 7.6, ideal: 7.4, label: "pH", unit: "" },
  fc: { min: 1, max: 3, ideal: 2, label: "Free Chlorine", unit: "ppm" },
  ta: { min: 80, max: 120, ideal: 100, label: "Total Alkalinity", unit: "ppm" },
  ch: { min: 200, max: 400, ideal: 300, label: "Calcium Hardness", unit: "ppm" },
  cya: { min: 30, max: 50, ideal: 40, label: "CYA (Stabiliser)", unit: "ppm" },
  salt: { min: 4000, max: 6000, ideal: 5000, label: "Salt Level", unit: "ppm" },
};
const CHEMICALS = { acid: "dry acid (sodium bisulphate) or hydrochloric acid", sodaAsh: "soda ash (sodium carbonate)", bicarb: "sodium bicarbonate (bicarb soda)", liquidChlor: "liquid chlorine (sodium hypochlorite)", granularChlor: "granular chlorine (calcium hypochlorite)", shock: "pool shock treatment", algaecide: "algaecide", salt: "pool-grade salt", stabiliser: "cyanuric acid (stabiliser)", calcIncreaser: "calcium chloride (hardness increaser)" };

function calcDosages(test, volumeL) {
  const f = volumeL / 10000; const a = [];
  if (test.ph > TARGETS.ph.max) { const amt = Math.round((test.ph - TARGETS.ph.ideal) * 200 * f); a.push({ param: "pH", status: "high", value: test.ph, target: `${TARGETS.ph.min}–${TARGETS.ph.max}`, severity: test.ph > 8.0 ? "high" : "med", action: `Add ${amt}g of ${CHEMICALS.acid}`, why: `At ${test.ph}, chlorine loses effectiveness. Add with pump running, wait 4 hours, re-test.` }); }
  else if (test.ph < TARGETS.ph.min) { const amt = Math.round((TARGETS.ph.ideal - test.ph) * 150 * f); a.push({ param: "pH", status: "low", value: test.ph, target: `${TARGETS.ph.min}–${TARGETS.ph.max}`, severity: test.ph < 7.0 ? "high" : "med", action: `Add ${amt}g of ${CHEMICALS.sodaAsh}`, why: `At ${test.ph}, water is acidic — can corrode equipment and irritate skin.` }); }
  else { a.push({ param: "pH", status: "ok", value: test.ph, target: `${TARGETS.ph.min}–${TARGETS.ph.max}`, severity: "ok", action: "No action needed", why: "pH is in the ideal range." }); }
  if (test.fc < TARGETS.fc.min) { const amt = ((TARGETS.fc.ideal - test.fc) * 0.1 * f).toFixed(1); a.push({ param: "Free Chlorine", status: "low", value: `${test.fc} ppm`, target: `${TARGETS.fc.min}–${TARGETS.fc.max} ppm`, severity: test.fc < 0.5 ? "high" : "med", action: `Add ${amt}L of ${CHEMICALS.liquidChlor}`, why: `At ${test.fc} ppm, bacteria and algae can grow. Add in the evening.` }); }
  else if (test.fc > 5) { a.push({ param: "Free Chlorine", status: "high", value: `${test.fc} ppm`, target: `${TARGETS.fc.min}–${TARGETS.fc.max} ppm`, severity: "med", action: "Wait for it to drop", why: `At ${test.fc} ppm, avoid swimming until below 4 ppm.` }); }
  else { a.push({ param: "Free Chlorine", status: "ok", value: `${test.fc} ppm`, target: `${TARGETS.fc.min}–${TARGETS.fc.max} ppm`, severity: "ok", action: "No action needed", why: "Chlorine is healthy." }); }
  if (test.ta < TARGETS.ta.min) { const amt = Math.round((TARGETS.ta.ideal - test.ta) * 18 * f); a.push({ param: "Total Alkalinity", status: "low", value: `${test.ta} ppm`, target: `${TARGETS.ta.min}–${TARGETS.ta.max} ppm`, severity: test.ta < 60 ? "high" : "med", action: `Add ${amt}g of ${CHEMICALS.bicarb}`, why: `Low alkalinity means pH bounces. Fix this BEFORE adjusting pH.` }); }
  else if (test.ta > TARGETS.ta.max) { a.push({ param: "Total Alkalinity", status: "high", value: `${test.ta} ppm`, target: `${TARGETS.ta.min}–${TARGETS.ta.max} ppm`, severity: "med", action: `Add ${CHEMICALS.acid} gradually and aerate`, why: `High alkalinity makes pH drift upward.` }); }
  else { a.push({ param: "Total Alkalinity", status: "ok", value: `${test.ta} ppm`, target: `${TARGETS.ta.min}–${TARGETS.ta.max} ppm`, severity: "ok", action: "No action needed", why: "Alkalinity is balanced." }); }
  if (test.salt != null) {
    if (test.salt < TARGETS.salt.min) { const kg = Math.round(((TARGETS.salt.ideal - test.salt) * volumeL) / 1000000); a.push({ param: "Salt", status: "low", value: `${test.salt} ppm`, target: `${TARGETS.salt.min}–${TARGETS.salt.max} ppm`, severity: test.salt < 3000 ? "high" : "med", action: `Add ${kg}kg of ${CHEMICALS.salt}`, why: `Chlorinator needs adequate salt. Allow 24 hours to dissolve.` }); }
    else if (test.salt > TARGETS.salt.max + 500) { a.push({ param: "Salt", status: "high", value: `${test.salt} ppm`, target: `${TARGETS.salt.min}–${TARGETS.salt.max} ppm`, severity: "med", action: "Partially drain and refill", why: `Salt only reduces by dilution. Drain 10-15%.` }); }
    else { a.push({ param: "Salt", status: "ok", value: `${test.salt} ppm`, target: `${TARGETS.salt.min}–${TARGETS.salt.max} ppm`, severity: "ok", action: "No action needed", why: "Salt level is good." }); }
  }
  return a;
}

/* ═══════════════════════════════════════════════════════════════
   DIAGNOSTIC PROBLEMS (compact)
   ═══════════════════════════════════════════════════════════════ */
const PROBLEMS = [
  { id: "green", title: "Green or Cloudy Water", icon: "droplets", sev: "high", desc: "Water has turned green, cloudy, or tinted", qs: [{ q: "How green?", opts: ["Slightly hazy", "Green, can see bottom", "Dark green, can't see bottom", "Black-green swamp"] }, { q: "How long?", opts: ["Just today", "2–3 days", "About a week", "Over a week"] }, { q: "Pump running?", opts: ["Yes, normal", "Yes, reduced", "No", "Not sure"] }], getResult: (a) => { const bad = a[0] >= 2; return { title: bad ? "Algae Bloom — Act Now" : "Early Algae — Catch It Quick", urgent: bad, canDIY: a[0] < 3, steps: bad ? ["Brush ALL surfaces hard.", `Triple-shock: 3x normal dose of ${CHEMICALS.liquidChlor}.`, "Run pump 24/7 until clear.", "Backwash filter every 12 hours.", "Vacuum dead algae to waste.", `Add ${CHEMICALS.algaecide} after treatment.`, "Keep FC above 5 ppm until clear."] : ["Ensure FC is at least 3 ppm.", "Brush all surfaces.", `Shock with ${CHEMICALS.shock}.`, "Run pump 24 hours.", "Clean filter after 12 hours."], shopNeeded: a[0] >= 3, shopWhy: "A pool this green may need professional treatment.", products: [CHEMICALS.liquidChlor, CHEMICALS.shock, CHEMICALS.algaecide] }; } },
  { id: "eyes", title: "Eye or Skin Irritation", icon: "alert", sev: "med", desc: "Burning eyes, itchy skin, or strong chlorine smell", qs: [{ q: "Symptoms?", opts: ["Burning/red eyes", "Itchy skin", "Strong chlorine smell", "All of the above"] }], getResult: () => ({ title: "pH or Chloramine Issue", urgent: false, canDIY: true, steps: ["Strong chlorine smell = NOT ENOUGH free chlorine.", "Test pH and Free Chlorine.", `pH above 7.6? Add ${CHEMICALS.acid}.`, `FC below 1 ppm? Shock with ${CHEMICALS.shock}.`, "Run pump 8 hours. Wait 24 hours."], shopNeeded: false, products: [CHEMICALS.acid, CHEMICALS.shock] }) },
  { id: "pump", title: "Pump Problems", icon: "wrench", sev: "med", desc: "Noise, losing prime, not starting, or low flow", qs: [{ q: "What's happening?", opts: ["Grinding/screeching", "Low/no flow", "Won't start", "Starts then stops"] }, { q: "Checked pump basket?", opts: ["Yes, clear", "Was full, cleaned it", "Haven't checked", "Don't know how"] }], getResult: (a) => { const g = a[0] === 0, w = a[0] === 2; return { title: g ? "Likely Bearing Failure" : w ? "Electrical Issue" : "Flow Restriction", urgent: w, canDIY: !g && !w, steps: g ? ["Grinding = worn bearings. Turn pump off.", "Contact pool shop — ~$150–300.", "Full replacement ~$500–1,500."] : w ? ["Check circuit breaker.", "Humming = failed capacitor (~$50–100).", "Don't keep trying. Needs a tech."] : ["1. Check skimmer basket(s).", "2. Check pump basket.", "3. Inspect lid o-ring.", "4. Backwash if pressure high.", "5. Ensure valves open."], shopNeeded: g || w, shopWhy: "Needs professional diagnosis.", products: [] }; } },
  { id: "stain", title: "Pool Stains", icon: "circle", sev: "low", desc: "Brown, green, black spots or white scale", qs: [{ q: "Colour?", opts: ["Brown/rust", "Green/teal", "Black spots", "White/grey scale"] }], getResult: (a) => ({ title: a[0] === 3 ? "Calcium Scale" : a[0] === 0 ? "Iron Staining" : a[0] === 1 ? "Copper Staining" : "Black Algae / Manganese", urgent: false, canDIY: a[0] === 3, steps: a[0] === 3 ? ["Scale = high calcium or pH.", "Test Calcium Hardness.", `Lower pH with ${CHEMICALS.acid}.`, "Use tile & scale cleaner.", "Keep pH 7.2–7.4."] : ["Try Vitamin C test on stain.", "Lightens = metal. No change = organic.", "Take sample to pool shop.", "Do NOT shock metal stains."], shopNeeded: a[0] !== 3, shopWhy: "Metal staining needs analysis.", products: a[0] === 3 ? [CHEMICALS.acid] : [] }) },
  { id: "salt-cell", title: "Salt Chlorinator Issues", icon: "zap", sev: "med", desc: "Error lights or low chlorine output", qs: [{ q: "What's happening?", opts: ["'Low Salt' light", "'Check Cell' light", "Chlorine stays low", "Error code"] }, { q: "Last cell clean?", opts: ["Under 3 months", "3–6 months", "Over 6 months", "Never/not sure"] }], getResult: (a) => ({ title: a[0] === 0 ? "Salt Level Issue" : "Cell Needs Inspection", urgent: false, canDIY: a[1] < 3, steps: a[0] === 0 ? ["Test salt level.", "Most need 4,000–6,000 ppm.", `Add ${CHEMICALS.salt} if low.`, "24 hours to dissolve.", "Still warning? Sensor may be failing."] : ["Usually calcium scale on plates.", "Remove cell per manual.", "Soak in 1:10 acid:water, 5–10 min.", "Rinse and inspect plates.", "Worn = end of life (3–7 yrs)."], shopNeeded: a[1] >= 3, shopWhy: "Have a shop show you and check condition.", products: a[0] === 0 ? [CHEMICALS.salt] : [] }) },
];

/* ═══════════════════════════════════════════════════════════════
   SAMPLE DATA
   ═══════════════════════════════════════════════════════════════ */
const SAMPLE_HISTORY = [
  { date: "2026-01-10", ph: 7.5, fc: 2.1, ta: 95, ch: 280, cya: 35, salt: 4800, temp: 28, source: "home" },
  { date: "2026-01-17", ph: 7.6, fc: 1.8, ta: 100, ch: 280, cya: 35, salt: 4700, temp: 30, source: "home" },
  { date: "2026-01-24", ph: 7.8, fc: 1.2, ta: 110, ch: 290, cya: 38, salt: 4600, temp: 32, source: "shop", shopName: "AquaClear Hornsby" },
  { date: "2026-01-31", ph: 7.4, fc: 2.5, ta: 95, ch: 285, cya: 38, salt: 4800, temp: 29, source: "home" },
  { date: "2026-02-07", ph: 7.3, fc: 2.8, ta: 90, ch: 285, cya: 40, salt: 4900, temp: 27, source: "home" },
  { date: "2026-02-14", ph: 7.5, fc: 2.0, ta: 100, ch: 290, cya: 40, salt: 5000, temp: 31, source: "shop", shopName: "Poolwerx Pennant Hills" },
  { date: "2026-02-21", ph: 7.7, fc: 1.5, ta: 105, ch: 295, cya: 42, salt: 4800, temp: 33, source: "home" },
  { date: "2026-02-28", ph: 7.9, fc: 0.8, ta: 115, ch: 300, cya: 42, salt: 4600, temp: 35, source: "home" },
];
const INIT_EQUIPMENT = [
  { id: "eq-1", name: "Pool Pump", brand: "Astral", model: "CTX 280", installed: "2022-03-15", lifeYrs: 8, status: "good", lastService: "2025-09-10", photos: [], note: "" },
  { id: "eq-2", name: "Sand Filter", brand: "Astral", model: "FG 500", installed: "2022-03-15", lifeYrs: 7, status: "good", lastService: "2025-11-20", photos: [], note: "" },
  { id: "eq-3", name: "Salt Chlorinator", brand: "Hayward", model: "AquaRite Pro", installed: "2023-01-10", lifeYrs: 5, status: "attention", lastService: "2025-06-15", photos: [], note: "Cell approaching end of life" },
  { id: "eq-4", name: "Gas Heater", brand: "Pentair", model: "MasterTemp 200", installed: "2021-11-01", lifeYrs: 10, status: "good", lastService: "2025-04-20", photos: [], note: "" },
  { id: "eq-5", name: "Robotic Cleaner", brand: "Dolphin", model: "M600", installed: "2024-06-01", lifeYrs: 5, status: "good", lastService: null, photos: [], note: "" },
];
const INIT_PROFILE = {
  name: "Sam Mitchell", email: "sam@example.com", phone: "0412 345 678", address: "24 Waratah Ave, Hornsby NSW 2077",
  poolSize: "40,000", poolType: "In-ground", poolShape: "Kidney", poolSurface: "Pebblecrete",
  sanitisation: "Salt Chlorinator", filterType: "Glass Media", waterSource: "Town Water", poolAge: "12 years", cover: "Solar blanket",
  notes: [
    { id: "n1", date: "2025-11-20", text: "Filter media replaced — sand to glass media. Done by AquaClear." },
    { id: "n2", date: "2025-06-15", text: "Salt cell cleaned. Plates showing wear — 12–18 months left." },
    { id: "n3", date: "2025-04-20", text: "Annual gas heater service. New igniter fitted." },
  ],
  poolPhotos: [],
};
const NEARBY_SHOPS = [
  { id: "s1", name: "AquaClear Pool Supplies", address: "142 Pacific Hwy, Hornsby NSW 2077", phone: "02 9555 1234", rating: 4.7, reviews: 89, distance: "2.3 km", hours: "Mon–Fri 8am–5pm, Sat 8am–1pm", partner: true },
  { id: "s2", name: "Poolwerx Chatswood", address: "345 Victoria Ave, Chatswood NSW 2067", phone: "02 9411 8822", rating: 4.5, reviews: 124, distance: "4.1 km", hours: "Mon–Fri 8am–5:30pm, Sat 9am–3pm", partner: true },
  { id: "s3", name: "Clark Rubber Brookvale", address: "12 Chard Rd, Brookvale NSW 2100", phone: "02 9905 6677", rating: 4.2, reviews: 67, distance: "6.8 km", hours: "Mon–Fri 8:30am–5pm, Sat 9am–4pm, Sun 10am–3pm", partner: false },
  { id: "s4", name: "The Pool Shop Manly", address: "28 Belgrave St, Manly NSW 2095", phone: "02 9977 3344", rating: 4.8, reviews: 53, distance: "8.2 km", hours: "Mon–Sat 8am–5pm", partner: true },
  { id: "s5", name: "Swimart Lane Cove", address: "88 Longueville Rd, Lane Cove NSW 2066", phone: "02 9420 2211", rating: 4.3, reviews: 41, distance: "5.5 km", hours: "Mon–Fri 9am–5pm, Sat 9am–2pm", partner: false },
];
const SEASONAL_TIPS = [
  { tip: "Peak summer — algae grows 3–5x faster. Test chlorine twice weekly and run your pump 10+ hours daily." },
  { tip: "High UV burns through chlorine fast. Add in the evening for maximum effectiveness." },
  { tip: "Shower before swimming to reduce chloramines — they cause that 'chlorine smell', not the chlorine." },
];

/* ═══════════════════════════════════════════════════════════════
   SHARED UI — all theme-aware
   ═══════════════════════════════════════════════════════════════ */
function Card({ children, style, onClick, hover }) {
  const T = useTheme();
  const [h, setH] = useState(false);
  return <div onClick={onClick} onMouseEnter={() => hover && setH(true)} onMouseLeave={() => hover && setH(false)} style={{ backgroundColor: h ? T.cardH : T.card, borderRadius: 14, border: `1px solid ${T.brd}`, padding: 20, cursor: onClick ? "pointer" : "default", transition: "all 0.2s", boxShadow: h ? `0 6px 24px ${T.shadowH}` : `0 1px 4px ${T.shadow}`, transform: h ? "translateY(-1px)" : "none", ...style }}>{children}</div>;
}
function Btn({ children, onClick, v = "primary", sz = "md", dis, full, style: s }) {
  const T = useTheme();
  const vs = { primary: { backgroundColor: T.cta, color: "#fff", border: "none" }, secondary: { backgroundColor: T.bgS, color: T.tx, border: `1px solid ${T.brd}` }, ghost: { backgroundColor: "transparent", color: T.pri, border: "none" }, success: { backgroundColor: T.ok, color: "#fff", border: "none" }, danger: { backgroundColor: T.bad, color: "#fff", border: "none" } };
  const szs = { sm: { padding: "9px 16px", fontSize: 13, minHeight: 38 }, md: { padding: "12px 22px", fontSize: 14, minHeight: 44 }, lg: { padding: "14px 28px", fontSize: 15, minHeight: 48 } };
  return <button onClick={onClick} disabled={dis} style={{ ...vs[v], ...szs[sz], borderRadius: 12, fontWeight: 700, cursor: dis ? "not-allowed" : "pointer", opacity: dis ? 0.45 : 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s", width: full ? "100%" : "auto", fontFamily: FONT, letterSpacing: "-0.01em", ...s }}>{children}</button>;
}
function Badge({ children, color, bg }) {
  const T = useTheme();
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, color: color || T.pri, backgroundColor: bg || T.priL, whiteSpace: "nowrap", letterSpacing: "0.01em" }}>{children}</span>;
}
function Back({ onClick, label = "Back" }) {
  const T = useTheme();
  return <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 4, border: "none", background: "none", color: T.tx3, fontSize: 13, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 16, fontFamily: FONT }}><ChevronLeft size={16} /> {label}</button>;
}
function Modal({ open, onClose, title, children }) {
  const T = useTheme();
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 40, paddingBottom: 40, overflowY: "auto" }} onClick={onClose}>
      <div style={{ position: "fixed", inset: 0, backgroundColor: T.overlay }} />
      <div style={{ position: "relative", backgroundColor: T.card, borderRadius: 20, boxShadow: `0 20px 60px ${T.shadowH}`, width: "100%", maxWidth: 480, maxHeight: "85vh", overflowY: "auto", margin: "0 16px" }} onClick={e => e.stopPropagation()}>
        <div style={{ position: "sticky", top: 0, backgroundColor: T.card, borderBottom: `1px solid ${T.brdL}`, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "20px 20px 0 0", zIndex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: T.tx, fontFamily: FONT_HEAD }}>{title}</h3>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: T.tx3 }}><X size={20} /></button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}
function PhotoGrid({ photos, onAdd, onRemove, label }) {
  const T = useTheme();
  const inputRef = useRef(null);
  const handleFile = (e) => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (ev) => onAdd({ id: `ph-${Date.now()}`, src: ev.target.result, date: new Date().toISOString().split("T")[0], name: file.name }); reader.readAsDataURL(file); e.target.value = ""; };
  return (
    <div>
      {label && <p style={{ fontSize: 11, fontWeight: 700, color: T.tx3, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {photos.map(p => (
          <div key={p.id} style={{ position: "relative", width: 80, height: 80, borderRadius: 10, overflow: "hidden", border: `1px solid ${T.brd}` }}>
            <img src={p.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {onRemove && <button onClick={(e) => { e.stopPropagation(); onRemove(p.id); }} style={{ position: "absolute", top: 3, right: 3, width: 20, height: 20, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.6)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={10} color="#fff" /></button>}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2px 4px", backgroundColor: "rgba(0,0,0,0.5)", fontSize: 8, color: "#fff", fontWeight: 600 }}>{p.date}</div>
          </div>
        ))}
        <button onClick={() => inputRef.current?.click()} style={{ width: 80, height: 80, borderRadius: 10, border: `2px dashed ${T.brd}`, backgroundColor: T.bgS, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer" }}>
          <Camera size={18} color={T.tx3} /><span style={{ fontSize: 9, color: T.tx3, fontWeight: 700 }}>Add Photo</span>
        </button>
        <input ref={inputRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={handleFile} />
      </div>
    </div>
  );
}
function SevIcon({ severity, size = 18 }) {
  const T = useTheme();
  if (severity === "ok") return <CheckCircle2 size={size} color={T.ok} />;
  if (severity === "high") return <AlertTriangle size={size} color={T.bad} />;
  return <AlertCircle size={size} color={T.warn} />;
}

/* ═══════════════════════════════════════════════════════════════
   ONBOARDING FLOW
   ═══════════════════════════════════════════════════════════════ */

// Google SVG icon (inline to avoid external dependency)
function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon({ size = 18, color = "#000" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}

function WelcomeScreen({ onAuth, onGuest }) {
  const T = useTheme();
  const { desk } = useLayout();
  const [emailMode, setEmailMode] = useState(null); // null, "login", "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [loading, setLoading] = useState(false);

  const features = [
    { icon: Beaker, text: "Test your water, get exact dosages" },
    { icon: HelpCircle, text: "Diagnose problems step-by-step" },
    { icon: BarChart3, text: "Track chemistry trends over time" },
    { icon: Store, text: "Find pool shops near you" },
  ];

  const handleEmail = async (isSignUp) => {
    setEmailErr(""); setLoading(true);
    try {
      const { error } = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
      if (error) setEmailErr(error.message);
      // Success is handled by onAuthStateChange in App
    } catch (e) { setEmailErr("Something went wrong. Try again."); }
    setLoading(false);
  };

  const iSty = { width: "100%", padding: "14px 16px", borderRadius: 12, border: `2px solid ${T.brd}`, fontSize: 15, fontWeight: 600, color: T.tx, outline: "none", fontFamily: FONT, boxSizing: "border-box", backgroundColor: T.inputBg, minHeight: 50 };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, padding: 20 }}>
      <div style={{ width: "100%", maxWidth: desk ? 440 : 400, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <DropletNodeIcon size={72} />
        </div>

        <h1 style={{ fontSize: 32, fontWeight: 700, color: T.tx, margin: "0 0 8px", letterSpacing: "-0.03em", fontFamily: FONT_HEAD }}><span style={{ color: T.tx }}>Pool</span><span style={{ color: "#00B4D8" }}>Connection</span></h1>
        <p style={{ fontSize: 17, color: T.tx2, margin: "0 0 36px", fontWeight: 500, lineHeight: 1.5 }}>Your pool care companion.<br />Clear water, no guesswork.</p>

        {!emailMode && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 36, textAlign: "left" }}>
              {features.map((f, i) => {
                const I = f.icon;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", backgroundColor: T.card, borderRadius: 12, border: `1px solid ${T.brdL}` }}>
                    <I size={18} color={T.pri} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.tx, lineHeight: 1.3 }}>{f.text}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              <button onClick={() => onAuth("google")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", padding: "14px 20px", borderRadius: 12, border: `2px solid ${T.brd}`, backgroundColor: T.card, fontSize: 15, fontWeight: 700, color: T.tx, cursor: "pointer", fontFamily: FONT, minHeight: 52, transition: "all 0.15s" }}>
                <GoogleIcon size={20} /> Continue with Google
              </button>

              <button onClick={() => setEmailMode("login")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", padding: "14px 20px", borderRadius: 12, border: `2px solid ${T.brd}`, backgroundColor: "transparent", fontSize: 15, fontWeight: 700, color: T.tx2, cursor: "pointer", fontFamily: FONT, minHeight: 52, transition: "all 0.15s" }}>
                <Mail size={18} /> Continue with Email
              </button>
            </div>

            <button onClick={onGuest} style={{ border: "none", background: "none", color: T.tx3, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT, padding: "8px 16px" }}>
              Try without an account <ArrowRight size={14} style={{ verticalAlign: "middle", marginLeft: 4 }} />
            </button>
          </>
        )}

        {emailMode && (
          <div style={{ textAlign: "left" }}>
            <button onClick={() => { setEmailMode(null); setEmailErr(""); }} style={{ display: "flex", alignItems: "center", gap: 4, border: "none", background: "none", color: T.tx3, fontSize: 13, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 20, fontFamily: FONT }}><ChevronLeft size={16} /> Back</button>

            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.tx, margin: "0 0 20px", fontFamily: FONT_HEAD }}>{emailMode === "signup" ? "Create account" : "Welcome back"}</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.tx3, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={iSty} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.tx3, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={emailMode === "signup" ? "At least 6 characters" : "Your password"} style={iSty} />
              </div>
            </div>

            {emailErr && <p style={{ fontSize: 13, color: T.bad, margin: "0 0 12px", fontWeight: 600 }}>{emailErr}</p>}

            <button onClick={() => handleEmail(emailMode === "signup")} disabled={loading || !email || !password} style={{ width: "100%", padding: "14px 20px", borderRadius: 12, border: "none", backgroundColor: (!loading && email && password) ? T.cta : T.brdL, fontSize: 15, fontWeight: 700, color: (!loading && email && password) ? "#fff" : T.tx3, cursor: (!loading && email && password) ? "pointer" : "not-allowed", fontFamily: FONT, minHeight: 52, transition: "all 0.15s" }}>
              {loading ? "Please wait..." : emailMode === "signup" ? "Create Account" : "Log In"}
            </button>

            <p style={{ fontSize: 14, color: T.tx3, margin: "16px 0 0", textAlign: "center" }}>
              {emailMode === "login" ? (
                <>Don't have an account? <button onClick={() => { setEmailMode("signup"); setEmailErr(""); }} style={{ border: "none", background: "none", color: T.cta, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>Sign up</button></>
              ) : (
                <>Already have an account? <button onClick={() => { setEmailMode("login"); setEmailErr(""); }} style={{ border: "none", background: "none", color: T.cta, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>Log in</button></>
              )}
            </p>
          </div>
        )}

        <p style={{ fontSize: 11, color: T.tx3, margin: "24px 0 0", lineHeight: 1.5 }}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

function PoolSetupScreen({ onComplete, onSkip }) {
  const T = useTheme();
  const { desk } = useLayout();
  const [poolSize, setPoolSize] = useState("");
  const [poolType, setPoolType] = useState("");
  const [sanitisation, setSanitisation] = useState("");
  const [step, setStep] = useState(0);

  const iSty = { width: "100%", padding: "14px 16px", borderRadius: 12, border: `2px solid ${T.brd}`, fontSize: 16, fontWeight: 700, color: T.tx, outline: "none", fontFamily: FONT, boxSizing: "border-box", backgroundColor: T.inputBg, minHeight: 52 };
  const optSty = (selected) => ({ width: "100%", textAlign: "left", padding: "14px 16px", borderRadius: 12, border: `2px solid ${selected ? T.pri : T.brd}`, backgroundColor: selected ? T.priL : T.card, fontSize: 15, fontWeight: selected ? 700 : 500, color: T.tx, cursor: "pointer", fontFamily: FONT, transition: "all 0.15s", minHeight: 50 });

  const steps = [
    // Step 0: Pool size
    <div key="size">
      <h2 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: "0 0 8px", fontFamily: FONT_HEAD }}>How big is your pool?</h2>
      <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 24px", lineHeight: 1.5 }}>We use this to calculate exact chemical dosages. Don't know? A typical Australian backyard pool is 40,000–50,000 litres.</p>
      <input type="text" value={poolSize} onChange={e => setPoolSize(e.target.value)} placeholder="e.g. 40,000" style={iSty} />
      <p style={{ fontSize: 12, color: T.tx3, margin: "8px 0 0" }}>Litres — check your pool builder's docs or ask your pool shop</p>
    </div>,
    // Step 1: Pool type
    <div key="type">
      <h2 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: "0 0 8px", fontFamily: FONT_HEAD }}>What type of pool?</h2>
      <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 24px" }}>This helps us give relevant advice.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {["In-ground", "Above-ground", "Plunge pool", "Swim spa"].map(opt => (
          <button key={opt} onClick={() => setPoolType(opt)} style={optSty(poolType === opt)}>{opt}</button>
        ))}
      </div>
    </div>,
    // Step 2: Sanitisation
    <div key="sanit">
      <h2 style={{ fontSize: 24, fontWeight: 700, color: T.tx, margin: "0 0 8px", fontFamily: FONT_HEAD }}>How do you sanitise?</h2>
      <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 24px" }}>This determines which chemicals and tests we recommend.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {["Salt Chlorinator", "Liquid Chlorine (manual)", "Chlorine Tablets", "Mineral System", "Not sure"].map(opt => (
          <button key={opt} onClick={() => setSanitisation(opt)} style={optSty(sanitisation === opt)}>{opt}</button>
        ))}
      </div>
    </div>,
  ];

  const canNext = step === 0 ? poolSize.trim() : step === 1 ? poolType : sanitisation;
  const isLast = step === steps.length - 1;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, padding: 20 }}>
      <div style={{ width: "100%", maxWidth: desk ? 480 : 420 }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i <= step ? T.pri : T.brdL, transition: "background-color 0.3s" }} />
          ))}
        </div>

        {steps[step]}

        {/* Navigation */}
        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} style={{ padding: "14px 20px", borderRadius: 12, border: `2px solid ${T.brd}`, backgroundColor: "transparent", fontSize: 15, fontWeight: 700, color: T.tx2, cursor: "pointer", fontFamily: FONT, minHeight: 52 }}>
              <ChevronLeft size={18} />
            </button>
          )}
          <button
            onClick={() => {
              if (isLast) onComplete({ poolSize: poolSize.trim() || "40,000", poolType: poolType || "In-ground", sanitisation: sanitisation || "Salt Chlorinator" });
              else setStep(step + 1);
            }}
            disabled={!canNext}
            style={{ flex: 1, padding: "14px 20px", borderRadius: 12, border: "none", backgroundColor: canNext ? T.pri : T.brdL, fontSize: 15, fontWeight: 700, color: canNext ? "#fff" : T.tx3, cursor: canNext ? "pointer" : "not-allowed", fontFamily: FONT, minHeight: 52, transition: "all 0.15s" }}>
            {isLast ? "Let's Go" : "Next"} {isLast ? <Sparkles size={16} style={{ verticalAlign: "middle", marginLeft: 4 }} /> : <ArrowRight size={16} style={{ verticalAlign: "middle", marginLeft: 4 }} />}
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button onClick={onSkip} style={{ border: "none", background: "none", color: T.tx3, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
            Skip for now — I'll add this later
          </button>
        </div>
      </div>
    </div>
  );
}

function GuestBanner({ onSignUp }) {
  const T = useTheme();
  return (
    <div style={{ backgroundColor: T.warnL, border: `1px solid ${T.warnB}`, borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
      <Shield size={20} color={T.warn} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: T.tx, margin: 0 }}>You're browsing as a guest</p>
        <p style={{ fontSize: 12, color: T.tx2, margin: "2px 0 0" }}>Sign up to save your data and access all features.</p>
      </div>
      <button onClick={onSignUp} style={{ padding: "8px 14px", borderRadius: 10, border: "none", backgroundColor: T.pri, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap" }}>Sign Up</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — Bottom tabs on mobile, sidebar on desktop
   ═══════════════════════════════════════════════════════════════ */
function Sidebar({ active, go, dark, setDark, user, isGuest, onSignUp, onSignOut }) {
  const T = useTheme();
  const tabs = [{ id: "home", label: "Home", icon: Home }, { id: "test", label: "Test", icon: Beaker }, { id: "diagnose", label: "Fix", icon: HelpCircle }, { id: "shops", label: "Shops", icon: Store }, { id: "history", label: "History", icon: BarChart3 }, { id: "profile", label: "My Pool", icon: User }];
  return (
    <div style={{ width: 220, flexShrink: 0, position: "fixed", top: 0, left: 0, bottom: 0, backgroundColor: T.card, borderRight: `1px solid ${T.brd}`, display: "flex", flexDirection: "column", zIndex: 40, overflowY: "auto", overflowX: "hidden" }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${T.brdL}`, flexShrink: 0 }}>
        <div style={{ flexShrink: 0, width: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <DropletNodeIcon size={24} />
        </div>
        <BrandWordmark size={15} />
      </div>
      {/* Nav items */}
      <div style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {tabs.map(t => {
          const I = t.icon; const on = active === t.id;
          return (
            <button key={t.id} onClick={() => go(t.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: "none", borderRadius: 10, cursor: "pointer", backgroundColor: on ? T.priL : "transparent", transition: "all 0.15s", width: "100%", textAlign: "left", fontFamily: FONT }}>
              <I size={20} color={on ? T.pri : T.tx3} strokeWidth={on ? 2.3 : 1.7} />
              <span style={{ fontSize: 14, fontWeight: on ? 800 : 600, color: on ? T.pri : T.tx2 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
      {/* Bottom section */}
      <div style={{ padding: "12px 10px 20px", borderTop: `1px solid ${T.brdL}`, display: "flex", flexDirection: "column", gap: 2 }}>
        <button onClick={() => setDark(!dark)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: "none", borderRadius: 10, cursor: "pointer", backgroundColor: "transparent", width: "100%", textAlign: "left", fontFamily: FONT }}>
          {dark ? <SunMedium size={20} color={T.warn} /> : <Moon size={20} color={T.tx3} />}
          <span style={{ fontSize: 14, fontWeight: 600, color: T.tx2 }}>{dark ? "Light Mode" : "Dark Mode"}</span>
        </button>
        {isGuest ? (
          <button onClick={onSignUp} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: "none", borderRadius: 10, cursor: "pointer", backgroundColor: T.priL, width: "100%", textAlign: "left", fontFamily: FONT }}>
            <LogIn size={20} color={T.pri} />
            <span style={{ fontSize: 14, fontWeight: 700, color: T.pri }}>Sign Up / Log In</span>
          </button>
        ) : (
          <button onClick={onSignOut} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: "none", borderRadius: 10, cursor: "pointer", backgroundColor: "transparent", width: "100%", textAlign: "left", fontFamily: FONT }}>
            <LogOut size={20} color={T.tx3} />
            <span style={{ fontSize: 14, fontWeight: 600, color: T.tx2 }}>Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );
}

function TabBar({ active, go }) {
  const T = useTheme();
  const tabs = [{ id: "home", label: "Home", icon: Home }, { id: "test", label: "Test", icon: Beaker }, { id: "diagnose", label: "Fix", icon: HelpCircle }, { id: "shops", label: "Shops", icon: Store }, { id: "profile", label: "My Pool", icon: User }];
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: T.card, borderTop: `1px solid ${T.brd}`, display: "flex", justifyContent: "space-around", padding: "8px 0 max(8px, env(safe-area-inset-bottom))", zIndex: 50 }}>
      {tabs.map(t => { const I = t.icon; const on = active === t.id; return (
        <button key={t.id} onClick={() => go(t.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 12px", border: "none", background: "none", cursor: "pointer", minWidth: 52 }}>
          <I size={22} color={on ? T.pri : T.tx3} strokeWidth={on ? 2.4 : 1.7} />
          <span style={{ fontSize: 10, fontWeight: on ? 800 : 600, color: on ? T.pri : T.tx3, letterSpacing: "0.02em" }}>{t.label}</span>
        </button>
      ); })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════════ */
function HomePage({ history, equipment, go, linkedShop, profile, isGuest, onSignUp }) {
  const T = useTheme();
  const { desk } = useLayout();
  const latest = history[history.length - 1];
  const daysSince = latest ? Math.round((Date.now() - new Date(latest.date).getTime()) / 86400000) : 99;
  const issues = [];
  if (latest) {
    if (latest.ph > TARGETS.ph.max || latest.ph < TARGETS.ph.min) issues.push({ p: "pH", v: latest.ph, s: latest.ph > TARGETS.ph.max ? "high" : "low" });
    if (latest.fc < TARGETS.fc.min) issues.push({ p: "Chlorine", v: `${latest.fc} ppm`, s: "low" });
    if (latest.ta > TARGETS.ta.max || latest.ta < TARGETS.ta.min) issues.push({ p: "Alkalinity", v: `${latest.ta} ppm`, s: latest.ta > TARGETS.ta.max ? "high" : "low" });
  }
  const eqAlerts = equipment.filter(e => { const age = (Date.now() - new Date(e.installed).getTime()) / (365.25*24*60*60*1000); return age > e.lifeYrs * 0.8 || e.status === "attention"; });

  return (
    <div style={{ paddingBottom: 20 }}>
      {isGuest && <GuestBanner onSignUp={onSignUp} />}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 14, color: T.tx3, fontWeight: 600, margin: 0 }}>Welcome back{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}</p>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: T.tx, margin: "4px 0 0", letterSpacing: "-0.03em", fontFamily: FONT_HEAD }}>Your Pool</h1>
        {profile.poolSize && <p style={{ fontSize: 13, color: T.tx3, margin: "4px 0 0", fontWeight: 600 }}>{profile.poolSize}L · {profile.poolSurface} · {profile.sanitisation}</p>}
      </div>

      <Card style={{ marginBottom: 16, backgroundColor: daysSince > 5 ? T.warnL : T.priL, border: `1px solid ${daysSince > 5 ? T.warnB : T.brd}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: daysSince > 5 ? T.warnB : T.bgS, flexShrink: 0 }}>
            {daysSince > 5 ? <AlertCircle size={24} color={T.warn} /> : <Beaker size={24} color={T.pri} />}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: T.tx, margin: 0, fontFamily: FONT_HEAD }}>{daysSince > 5 ? "Time to test your water" : daysSince === 0 ? "Tested today ✓" : `Tested ${daysSince}d ago`}</p>
            <p style={{ fontSize: 13, color: T.tx2, margin: "3px 0 0", fontWeight: 500 }}>{daysSince > 5 ? "Weekly testing catches problems early." : "Weekly testing keeps your pool healthy."}</p>
          </div>
          <Btn v={daysSince > 5 ? "primary" : "secondary"} sz="sm" onClick={() => go("test")}>Test</Btn>
        </div>
      </Card>

      {issues.length > 0 && (
        <Card style={{ marginBottom: 16, borderColor: T.badB, backgroundColor: T.badL }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><AlertTriangle size={18} color={T.bad} /><span style={{ fontSize: 15, fontWeight: 700, color: T.bad, fontFamily: FONT_HEAD }}>{issues.length} need{issues.length === 1 ? "s" : ""} attention</span></div>
          {issues.map((iss, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", backgroundColor: T.card, borderRadius: 10, marginTop: i > 0 ? 6 : 0, border: `1px solid ${T.badB}` }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: T.tx }}>{iss.p}</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 14, fontWeight: 600, color: T.tx2 }}>{iss.v}</span><Badge color={T.bad} bg={T.badL}>{iss.s}</Badge></div>
            </div>
          ))}
          <Btn v="primary" sz="sm" full style={{ marginTop: 12 }} onClick={() => go("test")}>See What To Do</Btn>
        </Card>
      )}

      {latest && (
        <div style={{ display: desk ? "grid" : "block", gridTemplateColumns: desk ? "1fr 1fr" : "1fr", gap: desk ? 16 : 0 }}>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, fontFamily: FONT_HEAD, color: T.tx }}>Latest Readings</h3><span style={{ fontSize: 12, color: T.tx3, fontWeight: 600 }}>{latest.date}</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[{ l: "pH", v: latest.ph, ok: latest.ph >= TARGETS.ph.min && latest.ph <= TARGETS.ph.max }, { l: "Chlorine", v: latest.fc, u: "ppm", ok: latest.fc >= TARGETS.fc.min && latest.fc <= TARGETS.fc.max }, { l: "Alkalinity", v: latest.ta, u: "ppm", ok: latest.ta >= TARGETS.ta.min && latest.ta <= TARGETS.ta.max }, { l: "Salt", v: latest.salt, u: "ppm", ok: latest.salt >= TARGETS.salt.min && latest.salt <= TARGETS.salt.max }, { l: "Temp", v: `${latest.temp}°`, ok: true }, { l: "CYA", v: latest.cya, u: "ppm", ok: latest.cya >= TARGETS.cya.min && latest.cya <= TARGETS.cya.max }].map((r, i) => (
              <div key={i} style={{ textAlign: "center", padding: "12px 6px", backgroundColor: r.ok ? T.okL : T.badL, borderRadius: 12, border: `1px solid ${r.ok ? T.okB : T.badB}` }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: T.tx3, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{r.l}</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: r.ok ? T.ok : T.bad, margin: "4px 0 0", fontFamily: FONT_HEAD }}>{r.v}</p>
                {r.u && <p style={{ fontSize: 9, color: T.tx3, margin: 0 }}>{r.u}</p>}
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><Sun size={18} color={T.warn} /><h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: FONT_HEAD, color: T.tx }}>Summer Tips</h3></div>
          {SEASONAL_TIPS.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${T.brdL}` : "none" }}>
              <ThermometerSun size={15} color={T.warn} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: T.tx2, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{t.tip}</p>
            </div>
          ))}
        </Card>
        </div>
      )}

      {eqAlerts.length > 0 && (
        <Card style={{ marginBottom: 16 }} hover onClick={() => go("profile")}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Wrench size={18} color={T.warn} /><h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: FONT_HEAD, color: T.tx }}>Equipment Alerts</h3></div>
          {eqAlerts.map(e => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0" }}>
              <div><p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: T.tx }}>{e.name}</p><p style={{ fontSize: 12, color: T.tx3, margin: 0 }}>{e.brand} {e.model}</p></div>
              <Badge color={T.warn} bg={T.warnL}>Attention</Badge>
            </div>
          ))}
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Card hover onClick={() => go("diagnose")} style={{ textAlign: "center", padding: 18 }}>
          <HelpCircle size={28} color={T.pri} style={{ marginBottom: 8 }} />
          <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>Something Wrong?</p>
          <p style={{ fontSize: 12, color: T.tx3, margin: "3px 0 0" }}>Diagnose a problem</p>
        </Card>
        <Card hover onClick={() => go("shops")} style={{ textAlign: "center", padding: 18 }}>
          <Store size={28} color={T.acc} style={{ marginBottom: 8 }} />
          <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>Find a Pool Shop</p>
          <p style={{ fontSize: 12, color: T.tx3, margin: "3px 0 0" }}>Nearby experts</p>
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TEST PAGE — with Home Test + Shop Result Scan modes
   ═══════════════════════════════════════════════════════════════ */
function TestPage({ history, setHistory, poolVolume }) {
  const T = useTheme();
  const { desk } = useLayout();
  const [mode, setMode] = useState(null); // null = choose, "home" = manual, "shop" = photo scan
  const [r, setR] = useState({ ph: "", fc: "", ta: "", ch: "", cya: "", salt: "", temp: "" });
  const [done, setDone] = useState(false); const [actions, setActions] = useState([]); const [exp, setExp] = useState(null);
  const [shopPhoto, setShopPhoto] = useState(null);
  const [shopName, setShopName] = useState("");
  const photoRef = useRef(null);
  const vol = parseInt(String(poolVolume).replace(/,/g, "")) || 40000;

  const submit = (source) => {
    const p = { ph: parseFloat(r.ph) || 7.4, fc: parseFloat(r.fc) || 2.0, ta: parseInt(r.ta) || 100, ch: parseInt(r.ch) || 280, cya: parseInt(r.cya) || 40, salt: parseInt(r.salt) || 4800, temp: parseInt(r.temp) || 28 };
    setActions(calcDosages(p, vol)); setDone(true);
    const entry = { date: new Date().toISOString().split("T")[0], ...p, source: source || "home", shopName: shopName || null, photo: shopPhoto?.src || null, photoFile: shopPhoto?.file || null };
    setHistory(entry);
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setShopPhoto({ src: ev.target.result, name: file.name, date: new Date().toISOString().split("T")[0], file });
    reader.readAsDataURL(file); e.target.value = "";
  };

  const resetAll = () => { setMode(null); setDone(false); setExp(null); setR({ ph: "", fc: "", ta: "", ch: "", cya: "", salt: "", temp: "" }); setShopPhoto(null); setShopName(""); };

  const iSty = { width: "100%", padding: "13px 14px", borderRadius: 12, border: `2px solid ${T.brd}`, fontSize: 16, fontWeight: 700, color: T.tx, outline: "none", fontFamily: FONT, boxSizing: "border-box", backgroundColor: T.inputBg, minHeight: 48 };
  const lSty = { display: "block", fontSize: 11, fontWeight: 700, color: T.tx3, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" };

  // ── RESULTS VIEW (shared by both modes) ──
  if (done) {
    const issN = actions.filter(a => a.severity !== "ok").length;
    return (
      <div>
        <Back onClick={resetAll} label="New test" />
        <Card style={{ marginBottom: 20, backgroundColor: issN === 0 ? T.okL : T.warnL, border: `1px solid ${issN === 0 ? T.okB : T.warnB}`, textAlign: "center", padding: 28 }}>
          {issN === 0 ? <CheckCircle2 size={40} color={T.ok} /> : <AlertCircle size={40} color={T.warn} />}
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "10px 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>{issN === 0 ? "Looking Great!" : `${issN} Thing${issN > 1 ? "s" : ""} to Adjust`}</h2>
          <p style={{ fontSize: 14, color: T.tx2, margin: 0, fontWeight: 500 }}>{issN === 0 ? "All parameters in range." : "Follow the steps below."}</p>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {actions.sort((a, b) => (a.severity === "ok" ? 1 : 0) - (b.severity === "ok" ? 1 : 0)).map((a, i) => {
            const sc = a.severity === "ok" ? T.ok : a.severity === "high" ? T.bad : T.warn;
            return (
              <Card key={i} hover onClick={() => setExp(exp === i ? null : i)} style={{ borderLeft: `4px solid ${sc}`, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <SevIcon severity={a.severity} size={20} />
                    <div><p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>{a.param}</p><p style={{ fontSize: 13, color: T.tx2, margin: "3px 0 0", fontWeight: 500 }}>{a.action}</p></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 18, fontWeight: 700, color: sc, fontFamily: FONT_HEAD }}>{a.value}</span><ChevronDown size={14} color={T.tx3} style={{ transform: exp === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} /></div>
                </div>
                {exp === i && <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.brdL}` }}><p style={{ fontSize: 13, color: T.tx2, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>{a.why}</p><p style={{ fontSize: 12, color: T.tx3, margin: "8px 0 0", fontWeight: 600 }}>Target: {a.target}</p></div>}
              </Card>
            );
          })}
        </div>
        <Card style={{ marginTop: 16, backgroundColor: T.priL, border: `1px solid ${T.brd}` }}>
          <div style={{ display: "flex", gap: 12 }}><Lightbulb size={18} color={T.pri} style={{ flexShrink: 0 }} /><p style={{ fontSize: 13, color: T.priD, margin: 0, lineHeight: 1.6, fontWeight: 600 }}>Always adjust Alkalinity before pH. One chemical at a time, wait 4 hours with pump on, then re-test.</p></div>
        </Card>
      </div>
    );
  }

  // ── SHOP SCAN MODE ──
  if (mode === "shop") {
    const hasValues = r.ph || r.fc || r.ta;
    return (
      <div>
        <Back onClick={resetAll} label="Back" />
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>Shop Water Test</h2>
        <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 24px", fontWeight: 500, lineHeight: 1.5 }}>Photo your shop printout, then enter the results. We'll save both.</p>

        {/* Photo capture */}
        <Card style={{ marginBottom: 20 }}>
          <p style={lSty}>Test Result Photo</p>
          {shopPhoto ? (
            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
              <img src={shopPhoto.src} alt="Shop test result" style={{ width: "100%", maxHeight: 240, objectFit: "cover", borderRadius: 12 }} />
              <button onClick={() => setShopPhoto(null)} style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.6)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={14} color="#fff" /></button>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 12px", background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
                <p style={{ fontSize: 12, color: "#fff", margin: 0, fontWeight: 600 }}>Captured {shopPhoto.date}</p>
              </div>
            </div>
          ) : (
            <button onClick={() => photoRef.current?.click()} style={{ width: "100%", padding: "32px 20px", borderRadius: 12, border: `2px dashed ${T.brd}`, backgroundColor: T.bgS, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: T.priL, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Camera size={24} color={T.pri} />
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: T.tx }}>Take photo of shop results</span>
              <span style={{ fontSize: 13, color: T.tx3 }}>Thermal printout, screen, or report card</span>
            </button>
          )}
          <input ref={photoRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={handlePhoto} />
        </Card>

        {/* Shop name (optional) */}
        <div style={{ marginBottom: 20 }}>
          <label style={lSty}>Which shop? (optional)</label>
          <input value={shopName} onChange={e => setShopName(e.target.value)} placeholder="e.g. AquaClear Hornsby" style={iSty} />
        </div>

        {/* Values entry */}
        <Card style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Edit3 size={16} color={T.pri} />
            <p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>Enter the readings</p>
          </div>
          <p style={{ fontSize: 13, color: T.tx2, margin: "0 0 16px", lineHeight: 1.5 }}>Copy the values from your printout below. We'll calculate what to do next.</p>
          <div style={{ display: "grid", gridTemplateColumns: desk ? "1fr 1fr 1fr" : "1fr 1fr", gap: 14 }}>
            {[{ k: "ph", l: "pH", p: "7.4", s: "0.1" }, { k: "fc", l: "Free Chlorine", p: "2.0", s: "0.1" }, { k: "ta", l: "Alkalinity", p: "100", s: "10" }, { k: "ch", l: "Calcium", p: "300", s: "10" }, { k: "cya", l: "CYA", p: "40", s: "5" }, { k: "salt", l: "Salt", p: "5000", s: "100" }].map(f => (
              <div key={f.k}><label style={lSty}>{f.l}</label><input type="number" step={f.s} value={r[f.k]} onChange={e => setR(x => ({ ...x, [f.k]: e.target.value }))} placeholder={f.p} style={iSty} /></div>
            ))}
            <div style={{ gridColumn: "1 / -1" }}><label style={lSty}>Water Temp (°C)</label><input type="number" value={r.temp} onChange={e => setR(x => ({ ...x, temp: e.target.value }))} placeholder="28" style={iSty} /></div>
          </div>
        </Card>

        <Btn v="primary" sz="lg" full onClick={() => submit("shop")} dis={!hasValues}>
          <Store size={18} /> Save Shop Results
        </Btn>
        <p style={{ fontSize: 12, color: T.tx3, textAlign: "center", marginTop: 10, fontWeight: 500 }}>
          {shopPhoto ? "Photo + readings will be saved to your history" : "No photo? That's fine — just the numbers works too"}
        </p>
      </div>
    );
  }

  // ── HOME TEST MODE ──
  if (mode === "home") {
    return (
      <div>
        <Back onClick={resetAll} label="Back" />
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>Home Water Test</h2>
        <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 24px", fontWeight: 500 }}>Enter your test kit or strip readings</p>
        <div style={{ display: "grid", gridTemplateColumns: desk ? "1fr 1fr 1fr" : "1fr 1fr", gap: 14 }}>
          {[{ k: "ph", l: "pH", p: "7.4", s: "0.1" }, { k: "fc", l: "Free Chlorine (ppm)", p: "2.0", s: "0.1" }, { k: "ta", l: "Alkalinity (ppm)", p: "100", s: "10" }, { k: "ch", l: "Calcium (ppm)", p: "300", s: "10" }, { k: "cya", l: "CYA (ppm)", p: "40", s: "5" }, { k: "salt", l: "Salt (ppm)", p: "5000", s: "100" }].map(f => (
            <div key={f.k}><label style={lSty}>{f.l}</label><input type="number" step={f.s} value={r[f.k]} onChange={e => setR(x => ({ ...x, [f.k]: e.target.value }))} placeholder={f.p} style={iSty} /></div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}><label style={lSty}>Water Temp (°C)</label><input type="number" value={r.temp} onChange={e => setR(x => ({ ...x, temp: e.target.value }))} placeholder="28" style={iSty} /></div>
        </div>
        <Btn v="primary" sz="lg" full style={{ marginTop: 24 }} onClick={() => submit("home")}><Beaker size={18} /> Analyse My Water</Btn>
        <p style={{ fontSize: 12, color: T.tx3, textAlign: "center", marginTop: 10, fontWeight: 500 }}>Dosages for {vol.toLocaleString()}L pool</p>
      </div>
    );
  }

  // ── MODE SELECTOR ──
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>Log Water Test</h2>
      <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 24px", fontWeight: 500 }}>How are you testing today?</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Card hover onClick={() => setMode("home")} style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: T.priL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Beaker size={26} color={T.pri} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>Home Test</p>
              <p style={{ fontSize: 14, color: T.tx2, margin: "4px 0 0", lineHeight: 1.5 }}>Enter readings from your own test kit or strips</p>
            </div>
            <ChevronRight size={20} color={T.tx3} />
          </div>
        </Card>

        <Card hover onClick={() => setMode("shop")} style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: T.accL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Camera size={26} color={T.acc} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>Shop Test</p>
              <p style={{ fontSize: 14, color: T.tx2, margin: "4px 0 0", lineHeight: 1.5 }}>Photo your pool shop printout and log the results</p>
            </div>
            <ChevronRight size={20} color={T.tx3} />
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: 24, backgroundColor: T.priL, border: `1px solid ${T.brd}` }}>
        <div style={{ display: "flex", gap: 12 }}>
          <Lightbulb size={18} color={T.pri} style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 13, color: T.priD, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
            Test weekly at home, and take a water sample to your pool shop monthly for a full analysis. We'll track both in your history.
          </p>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DIAGNOSE PAGE
   ═══════════════════════════════════════════════════════════════ */
function DiagnosePage({ go }) {
  const T = useTheme();
  const [sel, setSel] = useState(null); const [ans, setAns] = useState([]); const [result, setResult] = useState(null);
  const pick = (p) => { setSel(p); setAns([]); setResult(null); };
  const answer = (qi, ai) => { const na = [...ans]; na[qi] = ai; setAns(na); if (na.length === sel.qs.length && na.every(a => a != null)) setResult(sel.getResult(na)); };
  const icons = { droplets: Droplets, alert: AlertCircle, wrench: Wrench, circle: CircleDot, zap: Zap };

  if (sel && result) return (
    <div>
      <Back onClick={() => { setSel(null); setResult(null); }} />
      <Card style={{ marginBottom: 16, borderLeft: `4px solid ${result.urgent ? T.bad : T.warn}` }}><h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", fontFamily: FONT_HEAD, color: T.tx }}>{result.title}</h3><Badge color={result.urgent ? T.bad : T.warn} bg={result.urgent ? T.badL : T.warnL}>{result.urgent ? "Urgent" : "Moderate"}</Badge></Card>
      <Card style={{ marginBottom: 16 }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px", fontFamily: FONT_HEAD, color: T.tx }}>{result.canDIY ? "✅ You can fix this" : "🔧 May need professional help"}</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {result.steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: T.priL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, color: T.pri }}>{i + 1}</div>
              <p style={{ fontSize: 14, color: T.tx2, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>{s}</p>
            </div>
          ))}
        </div>
      </Card>
      {result.products.length > 0 && <Card style={{ marginBottom: 16 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><ShoppingBag size={16} color={T.pri} /><h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: T.tx }}>You'll need</h4></div>{result.products.map((p, i) => <div key={i} style={{ padding: "8px 0", borderTop: i > 0 ? `1px solid ${T.brdL}` : "none" }}><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.tx, textTransform: "capitalize" }}>{p}</p></div>)}<Btn v="secondary" sz="sm" full style={{ marginTop: 12 }} onClick={() => go("shops")}><Store size={14} /> Find a shop</Btn></Card>}
      {result.shopNeeded && <Card style={{ backgroundColor: T.priL, border: `1px solid ${T.brd}` }}><div style={{ display: "flex", gap: 12 }}><Store size={20} color={T.pri} style={{ flexShrink: 0, marginTop: 2 }} /><div><p style={{ fontSize: 15, fontWeight: 700, color: T.priD, margin: "0 0 4px", fontFamily: FONT_HEAD }}>Visit a pool shop</p><p style={{ fontSize: 13, color: T.priD, margin: "0 0 12px", fontWeight: 500, lineHeight: 1.6 }}>{result.shopWhy}</p><Btn v="primary" sz="sm" onClick={() => go("shops")}><MapPin size={14} /> Find Nearby</Btn></div></div></Card>}
    </div>
  );
  if (sel) return (
    <div>
      <Back onClick={() => setSel(null)} />
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>{sel.title}</h2>
      <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 20px" }}>Answer a few questions</p>
      {sel.qs.map((q, qi) => (
        <Card key={qi} style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: T.tx }}>{q.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.opts.map((o, oi) => <button key={oi} onClick={() => answer(qi, oi)} style={{ width: "100%", textAlign: "left", padding: "13px 16px", borderRadius: 10, border: `2px solid ${ans[qi] === oi ? T.pri : T.brd}`, backgroundColor: ans[qi] === oi ? T.priL : T.card, fontSize: 14, fontWeight: ans[qi] === oi ? 700 : 500, color: T.tx, cursor: "pointer", fontFamily: FONT, transition: "all 0.15s", minHeight: 46 }}>{o}</button>)}
          </div>
        </Card>
      ))}
    </div>
  );
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>What's Wrong?</h2>
      <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 20px" }}>Select the problem</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PROBLEMS.map(p => { const I = icons[p.icon] || HelpCircle; const sc = p.sev === "high" ? T.bad : p.sev === "med" ? T.warn : T.pri; const sb = p.sev === "high" ? T.badL : p.sev === "med" ? T.warnL : T.priL; return (
          <Card key={p.id} hover onClick={() => pick(p)}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, backgroundColor: sb, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I size={22} color={sc} /></div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>{p.title}</p><p style={{ fontSize: 13, color: T.tx2, margin: "3px 0 0" }}>{p.desc}</p></div>
              <ChevronRight size={18} color={T.tx3} />
            </div>
          </Card>
        ); })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHOPS PAGE
   ═══════════════════════════════════════════════════════════════ */
function ShopsPage({ linkedShop, setLinkedShop }) {
  const T = useTheme();
  const [search, setSearch] = useState(""); const [selShop, setSelShop] = useState(null);
  const filtered = NEARBY_SHOPS.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.address.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>Pool Shops</h2>
      <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 20px" }}>Find expert help near you</p>
      {linkedShop && (
        <Card style={{ marginBottom: 18, backgroundColor: T.priL, border: `1px solid ${T.brd}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><CheckCircle2 size={14} color={T.pri} /><span style={{ fontSize: 11, fontWeight: 700, color: T.pri, textTransform: "uppercase", letterSpacing: "0.04em" }}>Your Linked Shop</span></div>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>{linkedShop.name}</h3>
          <p style={{ fontSize: 13, color: T.tx2, margin: "0 0 3px" }}>{linkedShop.address}</p>
          <p style={{ fontSize: 13, color: T.tx2, margin: "0 0 12px" }}>{linkedShop.hours}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Btn v="primary" sz="sm"><Phone size={14} /> Call</Btn>
            <Btn v="secondary" sz="sm"><Navigation size={14} /> Directions</Btn>
            <Btn v="ghost" sz="sm" onClick={() => setLinkedShop(null)} s={{ color: T.tx3 }}>Unlink</Btn>
          </div>
        </Card>
      )}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.tx3 }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or suburb..." style={{ width: "100%", padding: "13px 14px 13px 44px", borderRadius: 12, border: `2px solid ${T.brd}`, fontSize: 14, fontWeight: 600, color: T.tx, outline: "none", fontFamily: FONT, boxSizing: "border-box", backgroundColor: T.inputBg, minHeight: 48 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(shop => (
          <Card key={shop.id} hover onClick={() => setSelShop(shop)}>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, backgroundColor: shop.partner ? T.priL : T.bgS, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Store size={22} color={shop.partner ? T.pri : T.tx3} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}><p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>{shop.name}</p>{shop.partner && <Badge>Partner</Badge>}</div>
                <p style={{ fontSize: 13, color: T.tx2, margin: "3px 0 0" }}>{shop.address}</p>
                <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={13} color={T.starCol} fill={T.starCol} /><span style={{ fontSize: 13, fontWeight: 700, color: T.tx }}>{shop.rating}</span><span style={{ fontSize: 12, color: T.tx3 }}>({shop.reviews})</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} color={T.tx3} /><span style={{ fontSize: 13, color: T.tx2, fontWeight: 600 }}>{shop.distance}</span></div>
                </div>
              </div>
              <ChevronRight size={18} color={T.tx3} style={{ alignSelf: "center" }} />
            </div>
          </Card>
        ))}
      </div>
      <Modal open={!!selShop} onClose={() => setSelShop(null)} title={selShop?.name || ""}>
        {selShop && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {selShop.partner && <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", backgroundColor: T.priL, borderRadius: 10 }}><CheckCircle2 size={16} color={T.pri} /><span style={{ fontSize: 13, fontWeight: 700, color: T.priD }}>PoolConnection Partner</span></div>}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Star size={18} color={T.starCol} fill={T.starCol} /><span style={{ fontSize: 20, fontWeight: 700, fontFamily: FONT_HEAD, color: T.tx }}>{selShop.rating}</span><span style={{ fontSize: 14, color: T.tx2 }}>({selShop.reviews} reviews)</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 10 }}><MapPin size={16} color={T.tx3} style={{ flexShrink: 0, marginTop: 2 }} /><div><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.tx }}>{selShop.address}</p><p style={{ fontSize: 12, color: T.tx3, margin: "2px 0 0" }}>{selShop.distance} away</p></div></div>
              <div style={{ display: "flex", gap: 10 }}><Phone size={16} color={T.tx3} /><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.tx }}>{selShop.phone}</p></div>
              <div style={{ display: "flex", gap: 10 }}><Clock size={16} color={T.tx3} /><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.tx }}>{selShop.hours}</p></div>
            </div>
            <div style={{ display: "flex", gap: 8 }}><Btn v="primary" sz="md" full><Phone size={16} /> Call</Btn><Btn v="secondary" sz="md" full><Navigation size={16} /> Directions</Btn></div>
            {linkedShop?.id !== selShop.id && selShop.partner && <div style={{ borderTop: `1px solid ${T.brdL}`, paddingTop: 16 }}><p style={{ fontSize: 13, color: T.tx2, margin: "0 0 12px", lineHeight: 1.6 }}>Link for personalised product recommendations.</p><Btn v="success" sz="md" full onClick={() => { setLinkedShop(selShop); setSelShop(null); }}><CheckCircle2 size={16} /> Link to {selShop.name}</Btn></div>}
            {linkedShop?.id === selShop.id && <div style={{ padding: "12px 14px", backgroundColor: T.okL, borderRadius: 10, border: `1px solid ${T.okB}`, textAlign: "center" }}><p style={{ fontSize: 14, fontWeight: 700, color: T.ok, margin: 0 }}>✓ Your linked shop</p></div>}
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HISTORY PAGE
   ═══════════════════════════════════════════════════════════════ */
function HistoryPage({ history }) {
  const T = useTheme();
  const { desk } = useLayout();
  const [active, setActive] = useState("ph");
  const params = [{ k: "ph", l: "pH", u: "", ...TARGETS.ph, c: T.pri }, { k: "fc", l: "Chlorine", u: "ppm", ...TARGETS.fc, c: T.acc }, { k: "ta", l: "Alkalinity", u: "ppm", ...TARGETS.ta, c: T.ok }, { k: "salt", l: "Salt", u: "ppm", ...TARGETS.salt, c: T.warn }];
  const p = params.find(x => x.k === active);
  const data = history.slice(-12).map(h => ({ date: h.date.slice(5), value: h[active] }));
  const trend = data.length >= 3 ? (() => { const d = data.slice(-3); const t = d[2].value - d[0].value; return t > 0.3 ? "rising" : t < -0.3 ? "falling" : "stable"; })() : null;

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>Water History</h2>
      <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 20px" }}>Trends over time</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto" }}>
        {params.map(x => <button key={x.k} onClick={() => setActive(x.k)} style={{ padding: "8px 16px", borderRadius: 20, border: `2px solid ${active === x.k ? x.c : T.brd}`, backgroundColor: active === x.k ? T.priL : T.card, fontSize: 13, fontWeight: 700, color: active === x.k ? x.c : T.tx3, cursor: "pointer", whiteSpace: "nowrap", fontFamily: FONT, minHeight: 38 }}>{x.l}</button>)}
      </div>
      <Card style={{ marginBottom: 18, padding: "24px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px", marginBottom: 12 }}><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, fontFamily: FONT_HEAD, color: T.tx }}>{p.l}</h3><span style={{ fontSize: 12, color: T.tx3, fontWeight: 600 }}>Target: {p.min}–{p.max} {p.u}</span></div>
        <ResponsiveContainer width="100%" height={desk ? 280 : 190}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs><linearGradient id={`g-${active}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={p.c} stopOpacity={0.3} /><stop offset="100%" stopColor={p.c} stopOpacity={0.03} /></linearGradient></defs>
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: T.tx3, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis domain={[p.min * 0.9, p.max * 1.15]} tick={{ fontSize: 11, fill: T.tx3, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${T.brd}`, fontSize: 13, fontWeight: 700, backgroundColor: T.card, color: T.tx }} formatter={v => [`${v} ${p.u}`, p.l]} />
            <ReferenceLine y={p.min} stroke={T.ok} strokeDasharray="4 4" strokeOpacity={0.4} />
            <ReferenceLine y={p.max} stroke={T.ok} strokeDasharray="4 4" strokeOpacity={0.4} />
            <Area type="monotone" dataKey="value" stroke={p.c} strokeWidth={2.5} fill={`url(#g-${active})`} dot={{ r: 4, fill: p.c, strokeWidth: 2, stroke: T.card }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      {trend && (
        <Card style={{ marginBottom: 18, backgroundColor: trend === "stable" ? T.okL : T.warnL, border: `1px solid ${trend === "stable" ? T.okB : T.warnB}` }}>
          <div style={{ display: "flex", gap: 12 }}>
            {trend === "rising" ? <TrendingUp size={20} color={T.warn} /> : trend === "falling" ? <TrendingDown size={20} color={T.warn} /> : <Activity size={20} color={T.ok} />}
            <div><p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>{p.l} is {trend}</p><p style={{ fontSize: 13, color: T.tx2, margin: "3px 0 0", lineHeight: 1.5 }}>{trend === "stable" ? "Consistent — nice work." : trend === "rising" ? `Trending up. Watch near ${p.max}.` : "Trending down. May need a boost."}</p></div>
          </div>
        </Card>
      )}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ backgroundColor: T.bgS }}>{["Date", "Source", "pH", "FC", "TA", "Salt", "°C"].map(h => <th key={h} style={{ padding: "12px 8px", textAlign: "left", fontWeight: 700, color: T.tx3, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>)}</tr></thead>
          <tbody>
            {[...history].reverse().slice(0, 12).map((h, i) => {
              const isShop = h.source === "shop";
              return (
                <tr key={i} style={{ borderTop: `1px solid ${T.brdL}` }}>
                  <td style={{ padding: "10px 8px", fontWeight: 700, color: T.tx, whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {h.photo && <Camera size={11} color={T.tx3} />}
                      {h.date.slice(5)}
                    </div>
                  </td>
                  <td style={{ padding: "10px 8px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10, color: isShop ? T.acc : T.tx3, backgroundColor: isShop ? T.accL : T.bgS, whiteSpace: "nowrap" }}>
                      {isShop ? <Store size={9} /> : <Beaker size={9} />}{isShop ? "Shop" : "Home"}
                    </span>
                  </td>
                  <td style={{ padding: "10px 8px", fontWeight: 700, color: h.ph >= TARGETS.ph.min && h.ph <= TARGETS.ph.max ? T.ok : T.bad }}>{h.ph}</td>
                  <td style={{ padding: "10px 8px", fontWeight: 700, color: h.fc >= TARGETS.fc.min && h.fc <= TARGETS.fc.max ? T.ok : T.bad }}>{h.fc}</td>
                  <td style={{ padding: "10px 8px", fontWeight: 700, color: h.ta >= TARGETS.ta.min && h.ta <= TARGETS.ta.max ? T.ok : T.bad }}>{h.ta}</td>
                  <td style={{ padding: "10px 8px", fontWeight: 700, color: h.salt >= TARGETS.salt.min && h.salt <= TARGETS.salt.max ? T.ok : T.bad }}>{h.salt}</td>
                  <td style={{ padding: "10px 8px", fontWeight: 600, color: T.tx2 }}>{h.temp}°</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROFILE PAGE (pool details, equipment, notes, share)
   ═══════════════════════════════════════════════════════════════ */
function ProfilePage({ profile, setProfile, equipment, setEquipment, go, linkedShop, addNote, deleteNote }) {
  const T = useTheme();
  const { desk } = useLayout();
  const [view, setView] = useState("main");
  const [selEq, setSelEq] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [newNote, setNewNote] = useState("");
  const [shareConfirm, setShareConfirm] = useState(false);
  const pct = (e) => { const a = (Date.now() - new Date(e.installed).getTime()) / (365.25*24*60*60*1000); return Math.min(100, Math.round((a / e.lifeYrs) * 100)); };
  const pctCol = (p) => p > 80 ? T.bad : p > 60 ? T.warn : T.ok;
  const iSty = { width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${T.brd}`, fontSize: 14, fontWeight: 600, color: T.tx, outline: "none", fontFamily: FONT, boxSizing: "border-box", backgroundColor: T.inputBg, minHeight: 46 };
  const lSty = { display: "block", fontSize: 11, fontWeight: 700, color: T.tx3, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" };

  if (view === "editPool") {
    const fields = [{ k: "name", l: "Your Name" }, { k: "email", l: "Email" }, { k: "phone", l: "Phone" }, { k: "address", l: "Address" }, { k: "poolSize", l: "Pool Volume (L)" }, { k: "poolType", l: "Pool Type", opts: ["In-ground", "Above-ground", "Semi in-ground", "Lap pool", "Plunge pool", "Swim spa"] }, { k: "poolShape", l: "Shape", opts: ["Rectangular", "Kidney", "Oval", "Freeform", "L-shaped", "Round", "Other"] }, { k: "poolSurface", l: "Surface", opts: ["Pebblecrete", "Quartzon", "Fibreglass", "Vinyl Liner", "Concrete (unpainted)", "Painted Concrete", "Fully Tiled", "Other"] }, { k: "sanitisation", l: "Sanitisation", opts: ["Salt Chlorinator", "Liquid Chlorine", "Chlorine Tablets", "Mineral System", "Ozone + Chlorine", "UV + Chlorine", "Other"] }, { k: "filterType", l: "Filter", opts: ["Sand Media", "Glass Media", "Cartridge", "DE", "Other"] }, { k: "waterSource", l: "Water Source", opts: ["Town Water", "Bore Water", "Tank Water", "Mixed"] }, { k: "poolAge", l: "Pool Age" }, { k: "cover", l: "Cover", opts: ["Solar blanket", "Automatic cover", "Manual cover", "Leaf net only", "None"] }];
    return (
      <div>
        <Back onClick={() => setView("main")} label="My Pool" />
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px", fontFamily: FONT_HEAD, color: T.tx }}>Edit Pool Details</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {fields.map(f => (<div key={f.k}><label style={lSty}>{f.l}</label>{f.opts ? <select value={editFields[f.k] ?? profile[f.k] ?? ""} onChange={e => setEditFields(x => ({ ...x, [f.k]: e.target.value }))} style={{ ...iSty }}><option value="">Select...</option>{f.opts.map(o => <option key={o} value={o}>{o}</option>)}</select> : <input value={editFields[f.k] ?? profile[f.k] ?? ""} onChange={e => setEditFields(x => ({ ...x, [f.k]: e.target.value }))} style={iSty} />}</div>))}
          <PhotoGrid photos={profile.poolPhotos || []} onAdd={(p) => setProfile(pr => ({ ...pr, poolPhotos: [...(pr.poolPhotos || []), p] }))} onRemove={(id) => setProfile(pr => ({ ...pr, poolPhotos: (pr.poolPhotos || []).filter(x => x.id !== id) }))} label="Pool Photos" />
        </div>
        <Btn v="primary" sz="lg" full style={{ marginTop: 24 }} onClick={() => { setProfile(p => ({ ...p, ...editFields })); setEditFields({}); setView("main"); }}><Save size={16} /> Save Changes</Btn>
      </div>
    );
  }
  if (view === "equipDetail" && selEq) {
    const eq = equipment.find(e => e.id === selEq);
    if (!eq) { setView("equipment"); return null; }
    const p2 = pct(eq); const c = pctCol(p2); const age = ((Date.now() - new Date(eq.installed).getTime()) / (365.25*24*60*60*1000)).toFixed(1);
    return (
      <div>
        <Back onClick={() => { setView("equipment"); setSelEq(null); }} label="Equipment" />
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px", fontFamily: FONT_HEAD, color: T.tx }}>{eq.name}</h2>
        <Card style={{ marginBottom: 16 }}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{[["Brand", eq.brand], ["Model", eq.model], ["Installed", eq.installed], ["Last Service", eq.lastService || "—"], ["Age", `${age} yrs`], ["Life", `${eq.lifeYrs} yrs`]].map(([l, v]) => <div key={l}><p style={{ fontSize: 11, fontWeight: 700, color: T.tx3, margin: "0 0 3px", textTransform: "uppercase" }}>{l}</p><p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: T.tx }}>{v}</p></div>)}</div></Card>
        <Card style={{ marginBottom: 16 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 13, fontWeight: 700, color: T.tx }}>Lifecycle</span><span style={{ fontSize: 13, fontWeight: 700, color: c }}>{p2}%</span></div><div style={{ height: 10, backgroundColor: T.bgS, borderRadius: 5 }}><div style={{ height: "100%", width: `${p2}%`, backgroundColor: c, borderRadius: 5, transition: "width 0.3s" }} /></div>{p2 > 75 && <p style={{ fontSize: 13, color: T.warn, margin: "10px 0 0", fontWeight: 600 }}>Approaching end of expected life.</p>}</Card>
        <Card style={{ marginBottom: 16 }}><h4 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 8px", color: T.tx3, textTransform: "uppercase", letterSpacing: "0.05em" }}>Notes</h4><textarea value={eq.note || ""} onChange={e => setEquipment(eqs => eqs.map(x => x.id === eq.id ? { ...x, note: e.target.value } : x))} placeholder="Serial number, warranty, repairs..." style={{ ...iSty, minHeight: 80, resize: "vertical" }} /></Card>
        <Card style={{ marginBottom: 16 }}><PhotoGrid label="Equipment Photos" photos={eq.photos || []} onAdd={(ph) => setEquipment(eqs => eqs.map(x => x.id === eq.id ? { ...x, photos: [...(x.photos || []), ph] } : x))} onRemove={(phId) => setEquipment(eqs => eqs.map(x => x.id === eq.id ? { ...x, photos: (x.photos || []).filter(p => p.id !== phId) } : x))} /><p style={{ fontSize: 12, color: T.tx3, margin: "8px 0 0" }}>Snap serial plates, installations, damage.</p></Card>
        {p2 > 70 && <Card style={{ backgroundColor: T.priL }}><p style={{ fontSize: 13, color: T.priD, margin: "0 0 10px", lineHeight: 1.6 }}>Getting older — visit a shop to discuss replacement.</p><Btn v="primary" sz="sm" onClick={() => go("shops")}><Store size={14} /> Find a Shop</Btn></Card>}
      </div>
    );
  }
  if (view === "equipment") return (
    <div>
      <Back onClick={() => setView("main")} label="My Pool" />
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px", fontFamily: FONT_HEAD, color: T.tx }}>My Equipment</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {equipment.map(e => { const p2 = pct(e); const c = pctCol(p2); return (
          <Card key={e.id} hover onClick={() => { setSelEq(e.id); setView("equipDetail"); }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, backgroundColor: e.status === "attention" ? T.warnL : T.priL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                {(e.photos || []).length > 0 ? <img src={e.photos[0].src} alt="" style={{ width: 46, height: 46, objectFit: "cover" }} /> : <Wrench size={20} color={e.status === "attention" ? T.warn : T.pri} />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: T.tx, fontFamily: FONT_HEAD }}>{e.name}</p>
                <p style={{ fontSize: 12, color: T.tx3, margin: "2px 0 0" }}>{e.brand} {e.model}</p>
                <div style={{ marginTop: 8, height: 6, backgroundColor: T.bgS, borderRadius: 3 }}><div style={{ height: "100%", width: `${p2}%`, backgroundColor: c, borderRadius: 3 }} /></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}><span style={{ fontSize: 11, color: T.tx3 }}>{((Date.now() - new Date(e.installed).getTime()) / (365.25*24*60*60*1000)).toFixed(1)} yrs</span><div style={{ display: "flex", gap: 6, alignItems: "center" }}>{(e.photos || []).length > 0 && <><Image size={10} color={T.tx3} /><span style={{ fontSize: 10, color: T.tx3 }}>{e.photos.length}</span></>}<span style={{ fontSize: 11, fontWeight: 700, color: c }}>{p2}%</span></div></div>
              </div>
              <ChevronRight size={18} color={T.tx3} />
            </div>
          </Card>
        ); })}
      </div>
    </div>
  );
  if (view === "notes") return (
    <div>
      <Back onClick={() => setView("main")} label="My Pool" />
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px", fontFamily: FONT_HEAD, color: T.tx }}>Notes & Repairs</h2>
      <Card style={{ marginBottom: 18 }}><textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add a note — repairs, observations..." style={{ ...iSty, minHeight: 70, resize: "vertical", marginBottom: 10 }} /><Btn v="primary" sz="sm" dis={!newNote.trim()} onClick={() => { if (addNote) addNote(newNote.trim()); else setProfile(p => ({ ...p, notes: [{ id: `n-${Date.now()}`, date: new Date().toISOString().split("T")[0], text: newNote.trim() }, ...p.notes] })); setNewNote(""); }}><Plus size={14} /> Add Note</Btn></Card>
      {profile.notes.length === 0 && <div style={{ textAlign: "center", padding: 32 }}><FileText size={32} color={T.tx3} /><p style={{ fontSize: 14, color: T.tx3, margin: "8px 0 0" }}>No notes yet</p></div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {profile.notes.map(n => (
          <Card key={n.id}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div style={{ flex: 1 }}><p style={{ fontSize: 11, fontWeight: 700, color: T.tx3, margin: "0 0 4px" }}>{n.date}</p><p style={{ fontSize: 14, color: T.tx, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{n.text}</p></div><button onClick={() => { if (deleteNote) deleteNote(n.id); else setProfile(p => ({ ...p, notes: p.notes.filter(x => x.id !== n.id) })); }} style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: T.tx3 }}><Trash2 size={14} /></button></div></Card>
        ))}
      </div>
    </div>
  );
  if (view === "share") return (
    <div>
      <Back onClick={() => { setView("main"); setShareConfirm(false); }} label="My Pool" />
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>Share Pool Info</h2>
      <p style={{ fontSize: 14, color: T.tx2, margin: "0 0 20px", lineHeight: 1.6 }}>Share details with your shop for better advice.</p>
      <Card style={{ marginBottom: 16 }}><h4 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: T.tx }}>Shared</h4>{["Pool size, type, surface", "Equipment with photos", "Notes & repair history", "Recent water tests"].map((item, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0" }}><CheckCircle2 size={15} color={T.ok} /><span style={{ fontSize: 14, fontWeight: 500, color: T.tx }}>{item}</span></div>)}</Card>
      <Card style={{ marginBottom: 16 }}><h4 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 10px", color: T.tx }}>NOT Shared</h4>{["Contact details (unless you choose)", "Payment info", "Location data"].map((item, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0" }}><X size={15} color={T.bad} /><span style={{ fontSize: 14, fontWeight: 500, color: T.tx }}>{item}</span></div>)}</Card>
      {!linkedShop ? <Card style={{ backgroundColor: T.warnL, border: `1px solid ${T.warnB}` }}><p style={{ fontSize: 14, color: T.warn, margin: "0 0 10px", fontWeight: 600 }}>Link a shop first.</p><Btn v="primary" sz="sm" onClick={() => go("shops")}><Store size={14} /> Find a Shop</Btn></Card> : shareConfirm ? <Card style={{ backgroundColor: T.okL, border: `1px solid ${T.okB}`, textAlign: "center", padding: 28 }}><CheckCircle2 size={38} color={T.ok} /><h3 style={{ fontSize: 18, fontWeight: 700, margin: "8px 0 4px", fontFamily: FONT_HEAD, color: T.tx }}>Shared!</h3><p style={{ fontSize: 14, color: T.tx2, margin: 0 }}>Sent to {linkedShop.name}.</p></Card> : <Btn v="primary" sz="lg" full onClick={() => setShareConfirm(true)}><Share2 size={16} /> Share with {linkedShop.name}</Btn>}
    </div>
  );

  const detailRows = [["Volume", profile.poolSize ? `${profile.poolSize}L` : "—"], ["Type", profile.poolType || "—"], ["Shape", profile.poolShape || "—"], ["Surface", profile.poolSurface || "—"], ["Sanitisation", profile.sanitisation || "—"], ["Filter", profile.filterType || "—"], ["Water", profile.waterSource || "—"], ["Age", profile.poolAge || "—"], ["Cover", profile.cover || "—"]];
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 20px", fontFamily: FONT_HEAD, color: T.tx }}>My Pool</h2>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: 'linear-gradient(135deg, #0077B6, #00B4D8)', display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><User size={24} color="#fff" /></div>
          <div><p style={{ fontSize: 18, fontWeight: 700, margin: 0, fontFamily: FONT_HEAD, color: T.tx }}>{profile.name || "Add your name"}</p><p style={{ fontSize: 13, color: T.tx3, margin: "3px 0 0" }}>{profile.address || "Add address"}</p></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: desk ? "1fr 1fr 1fr" : "1fr 1fr", gap: 8 }}>
          {detailRows.map(([l, v]) => <div key={l} style={{ padding: "9px 12px", backgroundColor: T.bgS, borderRadius: 10 }}><p style={{ fontSize: 10, fontWeight: 700, color: T.tx3, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</p><p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: T.tx }}>{v}</p></div>)}
        </div>
        {(profile.poolPhotos || []).length > 0 && <div style={{ marginTop: 14 }}><div style={{ display: "flex", gap: 8, overflowX: "auto" }}>{profile.poolPhotos.map(p => <img key={p.id} src={p.src} alt="" style={{ width: 70, height: 70, borderRadius: 10, objectFit: "cover" }} />)}</div></div>}
        <Btn v="secondary" sz="sm" full style={{ marginTop: 16 }} onClick={() => setView("editPool")}><Edit3 size={14} /> Edit Pool Details</Btn>
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[{ v: "equipment", icon: Wrench, c: T.pri, bg: T.priL, t: "My Equipment", d: `${equipment.length} items · Photos & lifecycle` }, { v: "notes", icon: FileText, c: T.acc, bg: T.accL, t: "Notes & Repairs", d: `${profile.notes.length} entries` }, { v: "history_ext", icon: BarChart3, c: T.ok, bg: T.okL, t: "Water History", d: `${SAMPLE_HISTORY.length} tests` }].map(item => (
          <Card key={item.v} hover onClick={() => item.v === "history_ext" ? go("history") : setView(item.v)}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}><item.icon size={22} color={item.c} /></div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: FONT_HEAD, color: T.tx }}>{item.t}</p><p style={{ fontSize: 13, color: T.tx3, margin: "3px 0 0" }}>{item.d}</p></div>
              <ChevronRight size={18} color={T.tx3} />
            </div>
          </Card>
        ))}
        <Card hover onClick={() => setView("share")} style={{ backgroundColor: T.priL, border: `1px solid ${T.brd}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, backgroundColor: T.bgS, display: "flex", alignItems: "center", justifyContent: "center" }}><Share2 size={22} color={T.pri} /></div>
            <div style={{ flex: 1 }}><p style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: FONT_HEAD, color: T.priD }}>Share with Pool Shop</p><p style={{ fontSize: 13, color: T.priD, margin: "3px 0 0" }}>{linkedShop ? `Linked to ${linkedShop.name}` : "Link a shop first"}</p></div>
            <ChevronRight size={18} color={T.pri} />
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("home");
  const [history, setHistory] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [linkedShop, setLinkedShop] = useState(null);
  const [profile, setProfile] = useState(INIT_PROFILE);

  // Auth state: null = loading, false = show welcome, "guest" = guest, {user object} = signed in
  const [authState, setAuthState] = useState(null);
  const [onboardStep, setOnboardStep] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const T = dark ? THEMES.dark : THEMES.light;
  const layout = useWidth();
  const { desk } = layout;
  const go = (p) => setPage(p);

  const isGuest = authState === "guest";
  const isAuthed = authState && authState !== "guest" && typeof authState === "object";

  // ── Listen for auth state changes ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthState(session.user);
        setOnboardStep("loading");
      } else {
        setAuthState(false);
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuthState(session.user);
        // Check if user has profile data (returning user vs new)
        setOnboardStep("loading");
      } else {
        setAuthState(false);
        setOnboardStep(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Load user data from Supabase when authenticated ──
  useEffect(() => {
    if (!isAuthed || onboardStep !== "loading") return;

    const load = async () => {
      const uid = authState.id;

      // Load profile
      const { data: prof } = await supabase.from("profiles").select("*").eq("id", uid).single();
      if (prof) {
        setProfile(p => ({
          ...p,
          name: prof.name || "",
          address: prof.address || "",
          poolSize: prof.pool_size || "",
          poolType: prof.pool_type || "",
          poolShape: prof.pool_shape || "",
          poolSurface: prof.pool_surface || "Pebblecrete",
          sanitisation: prof.sanitisation || "Salt Chlorinator",
          filterType: prof.filter_type || "Sand Filter",
          waterSource: prof.water_source || "Town Water",
          poolAge: prof.pool_age || "",
          cover: prof.cover || "No",
        }));
        // If they have pool_size set, they've done onboarding — go straight in
        if (prof.pool_size) {
          setOnboardStep("done");
        } else {
          setOnboardStep("setup");
        }
      } else {
        setOnboardStep("setup");
      }

      // Load water tests
      const { data: tests } = await supabase.from("water_tests").select("*").eq("user_id", uid).order("tested_at", { ascending: true });
      if (tests && tests.length > 0) {
        setHistory(tests.map(t => ({
          id: t.id, date: t.tested_at, ph: Number(t.ph), fc: Number(t.fc), ta: t.ta, ch: t.ch, cya: t.cya, salt: t.salt, temp: t.temp,
          source: t.source || "home", shopName: t.shop_name, photo: t.photo_url,
        })));
      } else {
        setHistory(SAMPLE_HISTORY); // Show sample data for new users
      }

      // Load equipment
      const { data: eqs } = await supabase.from("equipment").select("*").eq("user_id", uid).order("created_at");
      if (eqs && eqs.length > 0) {
        setEquipment(eqs.map(e => ({
          id: e.id, name: e.name, brand: e.brand, model: e.model, installed: e.installed, lifeYrs: e.life_years || 8,
          status: e.status || "good", lastService: e.last_service, photos: [], note: e.note || "",
        })));
      } else {
        setEquipment(INIT_EQUIPMENT);
      }

      // Load notes
      const { data: nts } = await supabase.from("notes").select("*").eq("user_id", uid).order("created_at", { ascending: false });
      if (nts) {
        setProfile(p => ({ ...p, notes: nts.map(n => ({ id: n.id, date: n.noted_at, text: n.text })) }));
      }
    };

    load();
  }, [isAuthed, authState?.id, onboardStep === "loading"]);

  // ── Supabase auth handlers ──
  const handleAuth = async (method) => {
    if (method === "google") {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
    }
    // Email auth is handled inside WelcomeScreen directly
  };

  const handleGuest = () => {
    setAuthState("guest");
    setOnboardStep("done");
    setHistory(SAMPLE_HISTORY);
    setEquipment(INIT_EQUIPMENT);
  };

  const handlePoolSetup = async (poolData) => {
    setProfile(p => ({ ...p, ...poolData }));
    setOnboardStep("done");
    // Save to Supabase if authenticated
    if (isAuthed) {
      await supabase.from("profiles").update({
        pool_size: poolData.poolSize,
        pool_type: poolData.poolType,
        sanitisation: poolData.sanitisation,
        updated_at: new Date().toISOString(),
      }).eq("id", authState.id);
    }
  };

  const handleSkipSetup = () => {
    setOnboardStep("done");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthState(false);
    setOnboardStep(null);
    setPage("home");
    setHistory([]);
    setEquipment([]);
    setProfile(INIT_PROFILE);
  };

  const handleSignUp = () => {
    setAuthState(false);
    setOnboardStep(null);
  };

  // ── Wrapped setHistory that also persists to Supabase ──
  const addTest = async (newEntry) => {
    setHistory(h => [...h, newEntry]);
    if (isAuthed) {
      const row = {
        user_id: authState.id,
        tested_at: newEntry.date,
        ph: newEntry.ph, fc: newEntry.fc, ta: newEntry.ta, ch: newEntry.ch, cya: newEntry.cya, salt: newEntry.salt, temp: newEntry.temp,
        source: newEntry.source || "home",
        shop_name: newEntry.shopName || null,
        photo_url: newEntry.photo || null,
      };
      // Upload photo if present
      if (newEntry.photoFile) {
        const ext = newEntry.photoFile.name?.split(".").pop() || "jpg";
        const path = `${authState.id}/${Date.now()}.${ext}`;
        const { data: upload } = await supabase.storage.from("test-photos").upload(path, newEntry.photoFile);
        if (upload) {
          const { data: urlData } = supabase.storage.from("test-photos").getPublicUrl(path);
          row.photo_url = urlData?.publicUrl || null;
        }
      }
      await supabase.from("water_tests").insert(row);
    }
  };

  // ── Wrapped setProfile that persists ──
  const updateProfile = async (updater) => {
    const newProfile = typeof updater === "function" ? updater(profile) : updater;
    setProfile(newProfile);
    if (isAuthed) {
      await supabase.from("profiles").update({
        name: newProfile.name, address: newProfile.address,
        pool_size: newProfile.poolSize, pool_type: newProfile.poolType, pool_shape: newProfile.poolShape,
        pool_surface: newProfile.poolSurface, sanitisation: newProfile.sanitisation,
        filter_type: newProfile.filterType, water_source: newProfile.waterSource,
        pool_age: newProfile.poolAge, cover: newProfile.cover,
        updated_at: new Date().toISOString(),
      }).eq("id", authState.id);
    }
  };

  // ── Add note with persistence ──
  const addNote = async (text) => {
    const note = { id: `n-${Date.now()}`, date: new Date().toISOString().split("T")[0], text };
    setProfile(p => ({ ...p, notes: [note, ...p.notes] }));
    if (isAuthed) {
      const { data } = await supabase.from("notes").insert({ user_id: authState.id, noted_at: note.date, text }).select().single();
      if (data) setProfile(p => ({ ...p, notes: p.notes.map(n => n.id === note.id ? { ...n, id: data.id } : n) }));
    }
  };

  const deleteNote = async (noteId) => {
    setProfile(p => ({ ...p, notes: p.notes.filter(n => n.id !== noteId) }));
    if (isAuthed) {
      await supabase.from("notes").delete().eq("id", noteId);
    }
  };

  // ── LOADING ──
  if (authLoading) {
    return (
      <ThemeCtx.Provider value={T}>
        <div style={{ minHeight: "100vh", backgroundColor: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT }}>
          <div style={{ textAlign: "center" }}>
            <DropletNodeIcon size={56} />
            <p style={{ fontSize: 15, color: T.tx3, marginTop: 16, fontWeight: 600 }}>Loading...</p>
          </div>
        </div>
      </ThemeCtx.Provider>
    );
  }

  // ── WELCOME SCREEN ──
  if (authState === false) {
    return (
      <ThemeCtx.Provider value={T}>
        <LayoutCtx.Provider value={layout}>
          <WelcomeScreen onAuth={handleAuth} onGuest={handleGuest} />
        </LayoutCtx.Provider>
      </ThemeCtx.Provider>
    );
  }

  // ── POOL SETUP (after sign-in, not for guests) ──
  if (onboardStep === "setup") {
    return (
      <ThemeCtx.Provider value={T}>
        <LayoutCtx.Provider value={layout}>
          <PoolSetupScreen onComplete={handlePoolSetup} onSkip={handleSkipSetup} />
        </LayoutCtx.Provider>
      </ThemeCtx.Provider>
    );
  }

  // ── STILL LOADING DATA ──
  if (onboardStep === "loading") {
    return (
      <ThemeCtx.Provider value={T}>
        <div style={{ minHeight: "100vh", backgroundColor: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT }}>
          <div style={{ textAlign: "center" }}>
            <DropletNodeIcon size={56} />
            <p style={{ fontSize: 15, color: T.tx3, marginTop: 16, fontWeight: 600 }}>Loading your pool data...</p>
          </div>
        </div>
      </ThemeCtx.Provider>
    );
  }

  // ── MAIN APP ──
  return (
    <ThemeCtx.Provider value={T}>
      <LayoutCtx.Provider value={layout}>
        <div style={{ minHeight: "100vh", backgroundColor: T.bg, fontFamily: FONT, display: desk ? "flex" : "block" }}>
          {desk && <Sidebar active={page} go={go} dark={dark} setDark={setDark} user={isAuthed ? authState : null} isGuest={isGuest} onSignUp={handleSignUp} onSignOut={handleSignOut} />}

          <div style={{ flex: 1, marginLeft: desk ? 220 : 0, minHeight: "100vh" }}>
            {!desk && (
              <div style={{ position: "sticky", top: 0, backgroundColor: T.hdr, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: `1px solid ${T.brdL}`, padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flexShrink: 0, width: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <DropletNodeIcon size={22} />
                  </div>
                  <BrandWordmark size={15} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => setDark(!dark)} style={{ border: "none", background: "none", cursor: "pointer", padding: 6, display: "flex", borderRadius: 8, backgroundColor: dark ? T.bgS : "transparent" }} title={dark ? "Light mode" : "Dark mode"}>
                    {dark ? <SunMedium size={19} color={T.warn} /> : <Moon size={19} color={T.tx3} />}
                  </button>
                  {isGuest ? (
                    <button onClick={handleSignUp} style={{ border: "none", background: "none", cursor: "pointer", padding: 6, display: "flex" }}>
                      <LogIn size={19} color={T.pri} />
                    </button>
                  ) : (
                    <button onClick={() => go("profile")} style={{ border: "none", background: "none", cursor: "pointer", padding: 6, display: "flex" }}>
                      <User size={19} color={T.tx3} />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div style={{ maxWidth: desk ? 900 : 480, margin: "0 auto", padding: desk ? "32px 40px 40px" : "24px 20px 110px" }}>
              {page === "home" && <HomePage history={history} equipment={equipment} go={go} linkedShop={linkedShop} profile={profile} isGuest={isGuest} onSignUp={handleSignUp} />}
              {page === "test" && <TestPage history={history} setHistory={addTest} poolVolume={profile.poolSize} />}
              {page === "diagnose" && <DiagnosePage go={go} />}
              {page === "shops" && <ShopsPage linkedShop={linkedShop} setLinkedShop={setLinkedShop} />}
              {page === "history" && <HistoryPage history={history} />}
              {page === "profile" && <ProfilePage profile={profile} setProfile={updateProfile} equipment={equipment} setEquipment={setEquipment} go={go} linkedShop={linkedShop} addNote={addNote} deleteNote={deleteNote} />}
            </div>
          </div>

          {!desk && <TabBar active={page} go={go} />}
        </div>
      </LayoutCtx.Provider>
    </ThemeCtx.Provider>
  );
}
