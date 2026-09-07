import React, { useState } from "react";
import { 
  Scale, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Zap, Lock, 
  FileText, Landmark, Search, ShieldAlert, Check, ChevronDown, 
  ChevronUp, Globe, Cpu, ChevronRight, Layers, Gavel, 
  Briefcase, HeartHandshake, Receipt, AlertTriangle, HelpCircle,
  FolderLock, Compass, Shield, Share2, Workflow
} from "lucide-react";
import { ALL_PLANS } from "../data/pricingMaster";
import { LEGAL_DOMAIN_PACKS } from "../data/legalDomainPacks";
import { UnikornLogo } from "./UnikornLogo";
import { useLanguage, LanguageSelectorButton } from "../lib/languageContext";
import { PWAInstallButton } from "./PWAInstallButton";

interface LandingPageProps {
  onLogin: (options?: { useRedirect?: boolean }) => void;
  isLoading: boolean;
}

export function LandingPage({ onLogin, isLoading }: LandingPageProps) {
  const { t } = useLanguage();
  
  // Interactive Simulation State
  const [selectedDemoCase, setSelectedDemoCase] = useState<"inheritance_forgery" | "fema_nri_land">("inheritance_forgery");
  const [demoStep, setDemoStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>("all");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const domainList = Object.values(LEGAL_DOMAIN_PACKS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Architecture Badge */}
          <div className="flex items-center gap-3">
            <UnikornLogo size="lg" showText={true} />
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-700/60 text-[10px] font-black uppercase tracking-wider">
              <Cpu className="h-3 w-3 text-indigo-400" />
              Universal Legal360 Engine
            </span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
            <a href="#how-it-works" className="hover:text-amber-400 transition flex items-center gap-1">
              <span>{t("செயல்முறை", "How It Works")}</span>
            </a>
            <a href="#interactive-demo" className="hover:text-amber-400 transition">
              {t("AI டெமோ", "Interactive Demo")}
            </a>
            <a href="#domains" className="hover:text-amber-400 transition">
              {t("18 சட்டக் களங்கள்", "18 Legal Domains")}
            </a>
            <a href="#pricing" className="hover:text-amber-400 transition">
              {t("கட்டணம்", "Pricing")}
            </a>
            <a href="#faq" className="hover:text-amber-400 transition">
              {t("கேள்விகள்", "FAQ")}
            </a>
          </div>

          {/* Right Language Selector, PWA Install & Login Button */}
          <div className="flex items-center gap-3">
            <PWAInstallButton variant="header" />
            <LanguageSelectorButton variant="dark" />

            <button
              type="button"
              onClick={() => onLogin()}
              disabled={isLoading}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-200 cursor-pointer flex items-center gap-2 border border-indigo-400/30 active:scale-95"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t("உள்நுழைகிறது...", "Signing in...")}</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                  </svg>
                  <span>{t("கூகுள் மூலம் உள்நுழை", "Sign In with Google")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>


      {/* 2. HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top Pill - Core Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/40 text-xs font-bold text-indigo-300 shadow-xl mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-amber-400 font-black">LEGAL360 AI</span>
            <span className="text-slate-500">•</span>
            <span>{t("ஒரே AI. அனைத்து சட்டப் பிரச்சனைகளுக்கும்.", "One AI. Every Legal Problem.")}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-5xl mx-auto">
            {t("உங்கள் பிரச்சனையை சாதாரண வார்த்தைகளில் சொல்லுங்கள்.", "Tell us what happened.")} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-indigo-300 bg-clip-text text-transparent">
              {t("எந்த சட்டம் பொருந்தும் என்பதை AI தீர்மானிக்கும்.", "AI figures out which laws matter.")}
            </span>
          </h1>

          {/* Supporting Core Message */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 font-medium max-w-4xl mx-auto leading-relaxed">
            {t(
              "சட்டப் பிரிவுகளை நீங்கள் அறிந்திருக்க வேண்டிய அவசியமில்லை. உங்கள் வழக்கை இயல்பான தமிழில் அல்லது ஆங்கிலத்தில் விவரியுங்கள். Unikorn360 AI தானாகவே தொடர்புடைய சட்டக் களங்களை அடையாளம் கண்டு, தேவையான கேள்விகளை மட்டும் கேட்டு, சட்ட விதிகள், சான்றுகள், தீர்ப்புகள், அதிகார வரம்பு மற்றும் உத்திகளை ஒருங்கிணைத்து மதிப்பீடு செய்யும்.",
              "Tell Unikorn360 what happened in ordinary language. AI identifies the relevant legal domains, asks only the information required for those domains, and comprehensively analyzes applicable law, evidence, precedents, procedure, jurisdiction, remedies and strategy."
            )}
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onLogin()}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 border border-amber-300/50 hover:scale-[1.02] active:scale-95"
            >
              <Zap className="h-5 w-5 fill-current text-slate-950" />
              <span>{t("இலவசமாகத் தொடங்குங்கள் (2 Cases Free)", "Start Free (2 Cases Included)")}</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            <a
              href="#interactive-demo"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 font-bold text-sm uppercase tracking-wider border border-slate-800 transition-all duration-200 flex items-center justify-center gap-2 hover:border-indigo-500/50"
            >
              <Workflow className="h-4 w-4 text-indigo-400" />
              <span>{t("AI செயல்முறை மாதிரி (See How It Works)", "See How It Works")}</span>
            </a>
          </div>

          {/* Key Value Guarantee Bullets */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-extrabold text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>{t("2 வழக்குகள் இலவச AI பகுப்பாய்வு", "2 Cases Free Triage")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-300">
              <CheckCircle2 className="h-4 w-4" />
              <span>{t("18 சட்டக் களங்கள் ஒருங்கிணைப்பு", "18 Integrated Legal Domains")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <CheckCircle2 className="h-4 w-4" />
              <span>{t("தமிழ் & ஆங்கிலம் இருமொழி சட்ட மனு வரைவு", "Bilingual Tamil & English Drafting")}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CENTRAL USER JOURNEY PIPELINE (HOW IT WORKS) */}
      <section id="how-it-works" className="py-16 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-xs font-black uppercase tracking-wider">
              {t("முழுமையான AI சட்ட வழிமுறை", "THE INTELLIGENT CASE JOURNEY")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
              {t("ஒரு வழக்கின் தொடக்கம் முதல் தீர்வு அறிக்கை வரை", "From Problem Description to Complete Case Strategy")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-2">
              {t(
                "பயனர் சட்டப் பிரிவுகளை அறிய வேண்டியதில்லை. AI தானாகவே பல சட்டக் களங்களை ஒருங்கிணைத்து துல்லியமான வழிகாட்டலை உருவாக்குகிறது.",
                "The user never needs to pre-select legal acts or sections. The AI dynamically triages across multiple legal disciplines."
              )}
            </p>
          </div>

          {/* 7-Step Horizontal / Stacked Workflow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-mono text-xs font-black flex items-center justify-center">
                  01
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Step 1</span>
              </div>
              <h3 className="text-sm font-black text-white">{t("பிரச்சனையை விவரித்தல்", "User Describes Problem")}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("வழக்கறிஞர் சொற்கள் இன்றி என்ன நடந்தது என்பதை இயல்பான மொழியில் பதிவிடுங்கள்.", "Type what occurred in plain spoken Tamil or English with any key events or notice details.")}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/50 shadow-lg shadow-indigo-950/40 relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono text-xs font-black flex items-center justify-center">
                  02
                </span>
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">AI Triage</span>
              </div>
              <h3 className="text-sm font-black text-white">{t("சட்டக் களங்கள் கண்டறிதல்", "Identifies Primary + Secondary Domains")}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("ஒற்றை அல்லது பல சட்டக் களங்கள் (உதாரணம்: சொத்து + வாரிசு + மோசடி) தானாக வகைப்படுத்தப்படும்.", "Instant classification across 18 specialized domain packs with multi-law relevance scoring.")}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-xs font-black flex items-center justify-center">
                  03
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Step 3</span>
              </div>
              <h3 className="text-sm font-black text-white">{t("தொடர்புடைய கேள்விகள்", "Dynamic Contextual Questions")}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("தேர்ந்தெடுக்கப்பட்ட சட்டக் களங்களுக்குத் தேவையான குறிப்பிட்ட தகவல்கள் மட்டுமே கேட்கப்படும்.", "Only domain-relevant prompts appear (e.g. Survey No for Property, FIR for Criminal, AY for Tax).")}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-black flex items-center justify-center">
                  04
                </span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">12 Stages</span>
              </div>
              <h3 className="text-sm font-black text-white">{t("12-கட்ட முழு மதிப்பீடு & வரைவு", "Case Report, Strategy & Notice Draft")}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("சட்டப்பிரிவுகள், ஆதார தணிக்கை, முந்தைய தீர்ப்புகள், அதிகார வரம்பு, தீர்வுகள் மற்றும் மனு வரைவு தயார்.", "Synthesizes statutory law, court precedents, forum jurisdiction, evidence, and legal draft.")}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE DEMO: HOW UNIKORN360 UNDERSTANDS A LEGAL PROBLEM */}
      <section id="interactive-demo" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-full text-xs font-black uppercase tracking-wider">
              {t("நேரலை மாதிரி விளக்கம்", "INTERACTIVE AI DEMONSTRATION")}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              {t("Unikorn360 AI ஒரு சட்டப் பிரச்சனையை எவ்வாறு புரிந்து கொள்கிறது என்று பாருங்கள்", "See how Unikorn360 AI understands a legal problem")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-2">
              {t("கீழே உள்ள உண்மைச் சூழலைத் தேர்ந்தெடுத்து, AI எவ்வாறு பல சட்டக் களங்களை ஒரே நேரத்தில் கண்டறிந்து மதிப்பீடு செய்கிறது என்பதைக் காண்க.", "Select a multi-domain scenario below to explore how the AI classifies, questions, and synthesizes.")}
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-4 sm:p-7 shadow-2xl shadow-indigo-950/60 text-left">
            
            {/* Scenario Selection Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                type="button"
                onClick={() => { setSelectedDemoCase("inheritance_forgery"); setDemoStep(1); }}
                className={`flex-1 p-4 rounded-2xl text-left border transition cursor-pointer ${
                  selectedDemoCase === "inheritance_forgery"
                    ? "bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-950/40"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-500/20 text-indigo-300">Case Scenario 1</span>
                  <span className="text-xs font-bold text-slate-300">{t("பூர்வீகச் சொத்து & போலி உயில்", "Inherited Property & Forged Will")}</span>
                </div>
                <p className="text-xs font-mono text-slate-200 mt-1 line-clamp-2">
                  "My brother forged my father's will and transferred our inherited property."
                </p>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedDemoCase("fema_nri_land"); setDemoStep(1); }}
                className={`flex-1 p-4 rounded-2xl text-left border transition cursor-pointer ${
                  selectedDemoCase === "fema_nri_land"
                    ? "bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-950/40"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/20 text-amber-300">Case Scenario 2</span>
                  <span className="text-xs font-bold text-slate-300">{t("வெளிநாடு வாழ் இந்தியர் FEMA & விவசாய நிலம்", "FEMA NRI Land Notice")}</span>
                </div>
                <p className="text-xs font-mono text-slate-200 mt-1 line-clamp-2">
                  "ED issued a FEMA notice regarding agricultural land purchased while I was an NRI."
                </p>
              </button>
            </div>

            {/* Step Progress Pills */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-6">
              {[
                { s: 1, title: t("1. உள்ளீடு", "1. Input") },
                { s: 2, title: t("2. AI களங்கள்", "2. Domains") },
                { s: 3, title: t("3. தகவல்கள்", "3. Dynamic Intake") },
                { s: 4, title: t("4. பகுப்பாய்வு", "4. Synthesis") },
                { s: 5, title: t("5. உத்தி & வரைவு", "5. Strategy & Draft") }
              ].map(item => (
                <button
                  key={item.s}
                  type="button"
                  onClick={() => setDemoStep(item.s as any)}
                  className={`py-2 px-1 text-center rounded-xl text-[11px] font-black transition cursor-pointer ${
                    demoStep === item.s
                      ? "bg-amber-400 text-slate-950 shadow-xs"
                      : demoStep > item.s 
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700" 
                        : "bg-slate-950 text-slate-500"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Step Panel Details */}
            <div className="bg-slate-950 rounded-2xl p-5 sm:p-7 border border-slate-800 min-h-[320px] flex flex-col justify-between">
              
              {/* STEP 1: USER INPUT */}
              {demoStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                      {t("படி 1: பயனர் வழங்கிய இயல்பான விபரம்", "Step 1: User Natural Language Input")}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">Raw Narrative</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="text-sm font-mono text-amber-300 leading-relaxed">
                      {selectedDemoCase === "inheritance_forgery" 
                        ? `"My brother forged my father's will, registered a settlement deed without my knowledge, and got the patta transferred for our ancestral agricultural land in Madurai."`
                        : `"I am an NRI living in Singapore. The Enforcement Directorate has issued a summons under FEMA regarding agricultural land purchased in Tamil Nadu through NRO funds."`
                      }
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t(
                      "பயனர் எந்த சட்டப் பிரிவையும் குறிப்பிடவில்லை. AI இதனை 18 சட்டக் களங்களில் பொருத்தித் தணிக்கை செய்கிறது.",
                      "No statutory citations were provided by the user. Unikorn360 initiates instant cross-statute triage."
                    )}
                  </p>
                </div>
              )}

              {/* STEP 2: MULTI-DOMAIN DETECTION */}
              {demoStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
                      {t("படி 2: AI தானாகக் கண்டறிந்த சட்டக் களங்கள்", "Step 2: AI Detected Legal Domains")}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase">
                      Multi-Domain Classification
                    </span>
                  </div>

                  {selectedDemoCase === "inheritance_forgery" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-amber-400 font-black text-xs">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Property & Land Revenue</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {t("பட்டா மாற்றம், UTR பிழை, தமிழ்நாடு நில வருவாய் சட்டம் & நில அளவை.", "Patta transfer dispute, revenue inquiry, survey demarcation.")}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-indigo-400 font-black text-xs">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Succession & Wills</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {t("இந்திய வாரிசுரிமை சட்டம் பிரிவு 63, உயில் செல்லுபடித்தன்மை & பாகப்பிரிவினை உரிமை.", "Indian Succession Act Sec 63, testation validity, coparcenary rights.")}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-rose-400 font-black text-xs">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Criminal & Forgery</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {t("BNS சட்டப்பிரிவு 318/336 (மோசடி மற்றும் போலி ஆவணம் தயாரித்தல்), காவல் புகார்.", "Bharatiya Nyaya Sanhita (BNS) forgery, cheating & police complaint.")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-amber-400 font-black text-xs">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>FEMA & Cross-Border</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {t("FEMA பிரிவு 6(3)(h) & RBI NDE விதிகள் (விவசாய நிலக் கட்டுப்பாடு).", "FEMA Sec 6(3)(h) & RBI Non-Debt Instrument regulations.")}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-indigo-400 font-black text-xs">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Property & Land Revenue</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {t("பத்திரப்பதிவு செல்லுபடித்தன்மை, விவசாய நில வகைப்பாடு & பட்டா நிலை.", "Agricultural land classification, revenue records, SRO registration.")}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Banking & SARFAESI</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {t("NRO/NRE கணக்கு நிதி பரிவர்த்தனை ஆவணங்கள் & வங்கி ஆதாரங்கள்.", "NRO remittance audit, banking channels, outward repatriation verification.")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: DYNAMIC INTAKE QUESTIONS */}
              {demoStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                      {t("படி 3: AI கேட்கும் துல்லியமான கள வினாக்கள்", "Step 3: Dynamic Domain-Specific Intake Prompts")}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">Contextual Intake</span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedDemoCase === "inheritance_forgery" ? (
                      <>
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">1. {t("தந்தையின் இறப்புச் சான்றிதழ் மற்றும் சட்டப்பூர்வ வாரிசு சான்றிதழ் உள்ளதா?", "Do you have the legal heir certificate and original death certificate?")}</span>
                          <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px] font-bold">Succession</span>
                        </div>
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">2. {t("சர்வே எண் மற்றும் வட்டாட்சியர் அலுவலக பட்டா மனு நிலை என்ன?", "What is the Survey Number and current Tahsildar Patta inquiry stage?")}</span>
                          <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[10px] font-bold">Property</span>
                        </div>
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">3. {t("போலி உயிலுக்கு எதிராக காவல்நிலையத்தில் மனு அல்லது புகார் அளிக்கப்பட்டுள்ளதா?", "Has a formal police complaint or FIR been initiated regarding the forgery?")}</span>
                          <span className="px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded text-[10px] font-bold">Criminal BNS</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">1. {t("நிலம் வாங்கிய தேதியில் உங்கள் குடியுரிமை மற்றும் NRI அந்தஸ்து என்ன?", "What was your residential status under Section 2(v) when the land was acquired?")}</span>
                          <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[10px] font-bold">FEMA</span>
                        </div>
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">2. {t("ED நோட்டீஸ் பிரிவு (Section 13/16/37) மற்றும் பதில் அளிக்க வழங்கப்பட்ட கெடு என்ன?", "What is the specific notice section and the statutory response window?")}</span>
                          <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded text-[10px] font-bold">Procedure</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: MULTI-DOMAIN SYNTHESIS */}
              {demoStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
                      {t("படி 4: சட்டங்கள், தீர்ப்புகள் & அதிகார வரம்பு ஒருங்கிணைப்பு", "Step 4: AI Cross-Law Synthesis & Precedent Mapping")}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">
                      12-Stage Evaluation
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-bold text-amber-400 uppercase block">{t("பொருந்தும் சட்டப்பிரிவுகள்", "Applicable Statutes")}</span>
                      <p className="text-slate-300 font-medium">
                        {selectedDemoCase === "inheritance_forgery"
                          ? "BNS Sec 318(4) & 336(3) • TN Revenue Standing Orders 31(8) • Registration Act Sec 77A / Circular 2018"
                          : "FEMA 1999 Sec 6(3) • RBI Master Direction on Acquisition of Immovable Property • Compounding Rules 2000"
                        }
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase block">{t("முன்மாதிரி தீர்ப்புகள்", "Key Judicial Precedents")}</span>
                      <p className="text-slate-300 font-medium">
                        {selectedDemoCase === "inheritance_forgery"
                          ? "Supreme Court: Jagdish Chand Sharma (Proof of Will) • Madras HC: R. Shanmugam vs SRO (Fraudulent Registration Cancel)"
                          : "Supreme Court: F. Hoffman La Roche (FEMA Contravention vs Crime) • RBI Compounding Orders on NRI inheritances"
                        }
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase block">{t("சரியான மன்றம் / அதிகாரி", "Competent Jurisdiction")}</span>
                      <p className="text-slate-300 font-medium">
                        {selectedDemoCase === "inheritance_forgery"
                          ? "வட்டாட்சியர் (பட்டா நிறுத்தம்) • மாவட்ட பதிவாளர் (பத்திர ஆட்சேபனை) • உரிமையியல் நீதிமன்றம் (பாகப்பிரிவினை வழக்கு)"
                          : "Enforcement Directorate (Special Director / Adjudicating Authority) & RBI Foreign Exchange Department"
                        }
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-bold text-rose-400 uppercase block">{t("அச்சுறுத்தல் & கால வரம்பு", "Risk & Limitation Assessment")}</span>
                      <p className="text-slate-300 font-medium">
                        {selectedDemoCase === "inheritance_forgery"
                          ? "உயர் ஆபத்து: பட்டா உட்பிரிவு முடிவதற்குள் 15 நாட்களுக்குள் ஆட்சேபனை மனு தாக்கல் செய்ய வேண்டும்."
                          : "கால வரம்பு: ED சம்மன் கிடைத்த 14 நாட்களுக்குள் விரிவான சட்ட விளக்கம் மற்றும் வங்கி அறிக்கைகள் சமர்ப்பிக்க வேண்டும்."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: REMEDIES, STRATEGY & DRAFTING */}
              {demoStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                      {t("படி 5: உடனடி தீர்வு வழிகள் & இருமொழி மனு வரைவு", "Step 5: Action Plan, Remedies & Bilingual Draft")}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                      Ready to File
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                        {t("உடனடி நடவடிக்கை வரைவு (Bilingual Legal Draft)", "Instant Actionable Draft")}
                      </span>
                      <p className="text-xs font-mono text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                        {selectedDemoCase === "inheritance_forgery"
                          ? "✓ வட்டாட்சியர் ஆட்சேபனை மனு (தமிழ்) + சார்பதிவாளருக்கு பதிவுத் தடை நோட்டீஸ் (ஆங்கிலம்) தயாராக உள்ளது."
                          : "✓ Comprehensive Reply to ED Summons under Section 37 FEMA + Compounding Application Draft ready."
                        }
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">{t("பரிந்துரைக்கப்படும் உத்தி", "Strategic Options")}</span>
                        <p className="text-slate-200 font-bold mt-0.5">
                          {selectedDemoCase === "inheritance_forgery"
                            ? "இரட்டை அணுகுமுறை: வருவாய் பட்டா நிறுத்தம் + உரிமையியல் நீதிமன்றத்தில் இடைக்காலத் தடை (Stay) பெறுதல்."
                            : "முன்னெச்சரிக்கை அணுகுமுறை: ஆவண சமர்ப்பிப்புடன் கூடிய RBI Compounding மனு தாக்கல் செய்தல்."
                          }
                        </p>
                      </div>

                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">{t("முழு வழக்கு அறிக்கை", "Full Case Report")}</span>
                        <p className="text-emerald-400 font-bold mt-0.5">
                          {t("12-கட்ட சட்ட அறிக்கை + வாடிக்கையாளர் ஆலோசனை PDF பதிவிறக்கம் தயார்.", "12-Stage Legal Brief & Client Action Plan ready for instant PDF export.")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Nav Stepper Controls */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  disabled={demoStep === 1}
                  onClick={() => setDemoStep(prev => Math.max(1, prev - 1) as any)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                >
                  ← {t("முந்தைய படி", "Previous")}
                </button>

                <div className="text-[11px] font-mono text-slate-400">
                  Step {demoStep} of 5
                </div>

                {demoStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => setDemoStep(prev => Math.min(5, prev + 1) as any)}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/30"
                  >
                    <span>{t("அடுத்த படி", "Next Step")}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onLogin()}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/30"
                  >
                    <span>{t("உங்கள் வழக்கை சோதிக்கவும்", "Analyze Your Case Now")}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. 18 LEGAL DOMAIN PACKS SECTION */}
      <section id="domains" className="py-20 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-xs font-black uppercase tracking-wider">
              {t("ஒருங்கிணைந்த சட்டக் கட்டமைப்பு", "INTEGRATED LEGAL INTELLIGENCE")}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
              {t("18 சட்டக் களங்கள். ஒரே நுண்ணறிவு வழக்கு எஞ்சின்.", "18 Legal Domains. One Intelligent Case Engine.")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-2">
              {t(
                "இவை 18 தனித்தனி தயாரிப்புகள் அல்ல — உங்கள் வழக்கின் விபரங்களின்படி AI தானாகவே ஒன்று அல்லது பல களங்களை ஒரே நேரத்தில் ஒருங்கிணைத்து பகுப்பாய்வு செய்கிறது.",
                "These are not 18 isolated products. Unikorn360's single neural legal engine dynamically binds multiple domains into one unified case assessment."
              )}
            </p>
          </div>

          {/* Specialist Highlight: Property & Land Revenue */}
          <div className="max-w-6xl mx-auto mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border-2 border-amber-500/60 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    {t("சிறப்புத் களம்", "Specialist Domain")}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300">Property & Land Revenue</span>
                </div>
                <h3 className="text-xl font-black text-white">
                  {t("நிலம் & சொத்து வருவாய் — ஆழ்ந்த தமிழ்நாடு சிறப்புத் தணிக்கை", "Property & Land Revenue — Deep Tamil Nadu Revenue & Registration Specialization")}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {t(
                    "தமிழ்நாடு நில வருவாய் சட்டம், UTR பிழைகள், கூட்டுப் பட்டா உட்பிரிவு, FMB வரைபடம், சார்பதிவாளர் அலுவலகப் பிரிவு 68/77A போலிப் பதிவு ரத்து மற்றும் தாலுகா புலத்தணிக்கை விதிகளுக்கான முழுமையான சிறப்புத் தணிக்கை கட்டமைப்பு.",
                    "Deep-tier Tamil Nadu land administration auditing: UTR discrepancies, joint patta sub-divisions, FMB boundaries, SRO Section 68/77A cancellation petitions, and Tahsildar revenue inquiries."
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:flex-col shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-amber-300">
                  ✓ Revenue Standing Orders (RSO)
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-indigo-300">
                  ✓ SRO Sec 68 / 77A Petitions
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-bold text-emerald-300">
                  ✓ FMB & Taluk Boundary Audit
                </span>
              </div>
            </div>
          </div>

          {/* 18 Domain Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
            {domainList.map((domain) => (
              <div
                key={domain.id}
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{domain.shortCode}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                  </div>
                  <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition line-clamp-1">
                    {domain.nameTa}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 mt-0.5 line-clamp-1">
                    {domain.nameEn}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                  {domain.badge}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PRICING TIERS SECTION */}
      <section id="pricing" className="py-20 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-full text-xs font-black uppercase tracking-wider">
              {t("சேவை திட்டங்கள் & கட்டணங்கள்", "PRICING & PLANS")}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-4">
              {t("உங்கள் தேவைக்கேற்ற வெளிப்படையான கட்டணத் திட்டங்கள்", "Transparent Legal Intelligence Pricing")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-3">
              {t(
                "எவ்வித மறைமுகக் கட்டணமுமின்றி 2 வழக்குகளை 18 சட்டக் களங்களிலும் முற்றிலும் இலவசமாகச் சோதிக்கலாம்.",
                "Explore up to 2 complete cases across any of the 18 legal domains completely free of charge."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {ALL_PLANS.map((plan) => {
              const isPopular = plan.popular;

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-200 relative ${
                    isPopular
                      ? "bg-gradient-to-b from-indigo-950/90 to-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-900/40"
                      : "bg-slate-900/80 border border-slate-800"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                      ★ மிகவும் பிரபலம் ★
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-white text-lg">{plan.nameTamil}</h3>
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg">
                        {plan.badge}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{plan.priceTamil}</span>
                        <span className="text-xs font-bold text-slate-400">{plan.periodTamil}</span>
                      </div>
                      <span className="inline-block mt-2 px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[11px] font-bold">
                        {plan.caseLimitText}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium border-t border-slate-800/80 pt-4 leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                      <p className="text-[10px] font-black uppercase text-slate-400">உள்ளடங்கிய வசதிகள்:</p>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-300">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={() => onLogin()}
                      disabled={isLoading}
                      className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition duration-150 cursor-pointer flex items-center justify-center gap-2 ${
                        isPopular
                          ? "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md"
                      }`}
                    >
                      <span>கூகுள் மூலம் தொடங்குக</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">{t("அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQ)", "Frequently Asked Questions")}</h2>
            <p className="text-xs text-slate-400 font-medium mt-2">{t("Legal360 AI பயன்பாடு குறித்த தெளிவுகள்", "Everything you need to know about Unikorn360 Legal360 AI")}</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "எந்த சட்டப்பிரிவு பொருந்தும் என்று எனக்குத் தெரியாவிட்டாலும் நான் இதனைப் பயன்படுத்தலாமா?",
                a: "ஆம், நிச்சயமாக. நீங்கள் என்ன நடந்தது என்பதை இயல்பான தமிழில் அல்லது ஆங்கிலத்தில் விவரித்தால் போதும். AI தானாகவே 18 சட்டக் களங்களை ஒப்பிட்டு, தொடர்புடைய முதன்மை மற்றும் துணைச் சட்டங்களை அடையாளம் கண்டு பகுப்பாய்வு செய்யும்."
              },
              {
                q: "ஒரே வழக்கில் பல சட்டக் களங்கள் (உதாரணம்: சொத்து + வாரிசு + மோசடி) இருந்தால் AI எவ்வாறு கையாளும்?",
                a: "Unikorn360 இன் Multi-Domain Neural Engine ஒரே வழக்கில் உள்ள பல சட்டக் கூறுகளை ஒரே நேரத்தில் வகைப்படுத்தி, அவை ஒவ்வொன்றிற்கும் உரிய சட்டப்பிரிவுகள், முந்தைய தீர்ப்புகள், மற்றும் உரிய மன்றங்களை ஒருங்கிணைத்து ஒற்றை விரிவான வழிகாட்டுதல் அறிக்கையை உருவாக்கும்."
              },
              {
                q: "இலவசக் கணக்கில் எத்தனை வழக்குகளைப் பகுப்பாய்வு செய்யலாம்?",
                a: "ஒவ்வொரு பயனரும் முற்றிலும் இலவசமாக 2 வழக்குகளை 18 சட்டக் களங்களிலும் முழுமையாக AI தணிக்கை செய்து பயன்பெறலாம்."
              },
              {
                q: "உருவாக்கப்படும் மனு வரைவுகள் மற்றும் நோட்டீஸ்களை அச்சிடவோ பதிவிறக்கவோ முடியுமா?",
                a: "ஆம், உருவாக்கப்படும் மனு வரைவுகள், ஆட்சேபனைக் கடிதங்கள் மற்றும் சட்ட நோட்டீஸ்களை ஒரே கிளிக்கில் உயர் தர PDF ஆக பதிவிறக்கம் செய்யவோ அல்லது வாட்ஸ்அப் / மின்னஞ்சல் மூலமாகப் பகிரவோ முடியும்."
              }
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left font-black text-sm text-slate-200 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-850"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-amber-400 shrink-0" /> : <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 font-medium leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-indigo-950 via-slate-950 to-indigo-950 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {t("இன்றே உங்கள் சட்டப் பிரச்சனையை AI மூலம் பகுப்பாய்வு செய்யுங்கள்", "Assess Your Legal Case with Unikorn360 AI Today")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-3 max-w-xl mx-auto">
            {t("கூகுள் கணக்கு மூலம் 10 வினாடிகளில் உள்நுழைந்து 2 வழக்கு இலவச AI பகுப்பாய்வைப் பெறுங்கள்.", "Sign in with Google in 10 seconds to unlock 2 free comprehensive legal case evaluations.")}
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => onLogin()}
              disabled={isLoading}
              className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-400/20 transition cursor-pointer flex items-center gap-3 border border-amber-300"
            >
              <Zap className="h-5 w-5 fill-current" />
              <span>{t("இலவசமாக உள்நுழைக (Sign In Free)", "Sign In with Google — 2 Cases Free")}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="border-t border-slate-800 py-8 bg-slate-950 text-slate-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-mono font-bold text-slate-400">
            <UnikornLogo size="sm" showText={false} />
            <span>LEGAL360 AI © 2026 • Universal Legal Intelligence Powered by <strong className="text-indigo-400">AIEOS</strong> & <strong className="text-amber-300">UNIKORN360</strong></span>
          </div>
          <p className="text-[10px] text-slate-500 max-w-md">
            Unikorn360 Legal360 AI is an intelligent multi-domain legal assessment and drafting platform providing automated statutory mapping, precedent synthesis, and strategic action plans.
          </p>
        </div>
      </footer>

    </div>
  );
}
