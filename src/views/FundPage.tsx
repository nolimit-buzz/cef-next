"use client";
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ShieldCheck, Leaf, TrendingUp, PieChart,
  Banknote, Sun, BatteryCharging, Wind, ArrowRightLeft, Plus
} from 'lucide-react';
import { usePathname } from "next/navigation";

import Link from "next/link";
import Breadcrumbs from '../components/Breadcrumbs';
import { cn } from '../lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const FundPage = () => {
  const pathname = usePathname();
  const location = typeof window !== 'undefined' ? window.location : { hash: '', pathname };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main className="bg-white">
      <HeroSection />
      <StickySubNav />
      <OverviewSection />
      <ChallengeSection />
      <InvestmentStrategySection />
      <AimOfFundsSection />
      <ImpactSDGsSection />
    </main>
  );
};

const StickySubNav = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'The Challenge' },
    { id: 'strategy', label: 'Investment Strategy' },
    { id: 'aim-of-funds', label: 'Aim of Funds' },
    { id: 'impact', label: 'Impact & SDGs' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for sticky nav

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100; // Offset for sticky nav
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[64px] z-40 w-full bg-[#dae7fa]/80 backdrop-blur-md border-b border-gray-200 py-4 hidden md:block transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto no-scrollbar">
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border",
              activeSection === item.id 
                ? "bg-[#32a99f] border-transparent text-white shadow-sm" 
                : "bg-transparent border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative bg-[var(--color-background)] flex flex-col border-b border-white/5 lg:h-screen lg:min-h-[700px] lg:max-h-[1080px]">
      {/* Top Tier: Split Hero */}
      <div className="flex flex-col lg:flex-row w-full lg:flex-1 pt-24 lg:pt-28">
        {/* Left Column: Dark Background */}
        <div className="w-full lg:w-[55%] bg-[var(--color-background)] flex flex-col justify-center px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12 py-12 lg:py-0 relative z-20">
          <div className="mb-8 hidden lg:block">
            <Breadcrumbs />
          </div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full pr-4"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6 lg:mb-8 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full">
              <span className="text-base">🌍</span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                The Fund
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight">
              <span className="text-white">Powering Nigeria&apos;s</span> <br className="hidden lg:block" /> <span className="text-white/50">Clean Energy Future.</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Column: Image/Video Background */}
        <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              poster="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2574&auto=format&fit=crop"
              className="w-full h-full object-cover motion-reduce:hidden"
            >
              <source src="https://cdn.coverr.co/videos/coverr-wind-turbines-in-the-distance-5233/1080p.mp4" type="video/mp4" />
            </video>
            <img 
              src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2574&auto=format&fit=crop" 
              alt="Clean Energy Wind Turbines" 
              className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent z-10 lg:block hidden" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Tier: 3-Column Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 z-20 relative shrink-0">
        {/* Column 1: Sub-headline */}
        <div className="lg:col-span-2 bg-white p-8 lg:py-12 xl:py-14 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12 border-t border-r border-gray-200 flex items-center">
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-[#0A1224] text-lg leading-relaxed font-light"
          >
            A specialized alternative asset vehicle providing long-term Naira financing to eliminate exchange rate risks for sustainable infrastructure projects.
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <Leaf className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">Climate Bonds<br/>Standard Certified</span>
          </motion.div>
          <div className="w-full h-px bg-white/20" />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">SEC Nigeria<br/>Registered</span>
          </motion.div>
        </div>

        {/* Column 3: Light Block */}
        <div className="bg-[#32a99f] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#32a99f]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">National Scale Rating</span>
              <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">Investment Grade: Stable</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const OverviewSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="overview" className="py-24 lg:py-32 bg-[#050A15] text-white relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block">Overview</span>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-5/12 flex flex-col justify-start"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight mb-8">
            Strategic Focus &<br />Value Creation
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-md">
            A specialized alternative asset vehicle providing long-term Naira financing to eliminate exchange rate risks for sustainable infrastructure projects across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button className="w-full sm:w-auto bg-white text-[#050A15] hover:bg-gray-100 px-8 py-4 rounded text-sm font-medium transition-colors">
              Download Fact Sheet
            </button>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="w-full lg:w-7/12 flex flex-col justify-start"
        >
          {/* Item 1 */}
          <motion.div variants={itemVariants} className="border-b border-white/10 py-10 first:pt-0 flex flex-col md:flex-row gap-6 md:gap-12">
            <h3 className="text-2xl font-medium w-full md:w-1/2">Local Currency Climate<br />Infrastructure Funding</h3>
            <p className="text-white/60 leading-relaxed w-full md:w-1/2">Eliminating currency mismatch by providing long-term Naira financing for climate-aligned developers and investors.</p>
          </motion.div>
          {/* Item 2 */}
          <motion.div variants={itemVariants} className="border-b border-white/10 py-10 flex flex-col md:flex-row gap-6 md:gap-12">
            <h3 className="text-2xl font-medium w-full md:w-1/2">Mobilizing Domestic<br />Institutional Capital</h3>
            <p className="text-white/60 leading-relaxed w-full md:w-1/2">Unlocking domestic pension and insurance capital into high-impact clean energy infrastructure through strategic de-risking.</p>
          </motion.div>
          {/* Item 3 */}
          <motion.div variants={itemVariants} className="py-10 pb-0 flex flex-col md:flex-row gap-6 md:gap-12">
            <h3 className="text-2xl font-medium w-full md:w-1/2">Inclusive Economic Impact</h3>
            <p className="text-white/60 leading-relaxed w-full md:w-1/2">Driving sustainable development by creating jobs, supporting SMEs, and expanding reliable energy access to underserved communities across the region.</p>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

const ChallengeSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="challenge" className="py-24 lg:py-32 bg-[#0A1224] text-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Block A: Editorial Split */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-white/60 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-sm tracking-wide">The Challenge</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight mb-4">
              <span className="text-white/90">The ₦4 Trillion Market Gap. </span>
              <span className="text-[var(--color-accent-green)]">Nigeria is the country with the largest number of people without energy access in the world.</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
              Sustainable Development Goal 7 cannot be globally achieved without significant, institutional-level progress in Nigeria.
            </p>
          </div>
        </motion.div>

        {/* Block B: Bento Grid */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {/* Card 1: Image */}
          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden min-h-[280px] lg:min-h-[320px] h-full">
            <img 
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop" 
              alt="Solar installation" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Card 2: 85 Million */}
          <motion.div variants={fadeUp} className="group relative bg-white/5 border border-white/10 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-white/20 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-white/90 tracking-tight">85M</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-white/90 mb-2">People Unserved</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                People without access to reliable power (43% of the population).
              </p>
            </div>
          </motion.div>

          {/* Card 3: $14 Billion */}
          <motion.div variants={fadeUp} className="group relative bg-white/5 border border-white/10 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-white/20 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-white/90 tracking-tight">$14B</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-white/90 mb-2">Capital Drain</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Capital drained annually on fossil fuel generators.
              </p>
            </div>
          </motion.div>

          {/* Card 4: $9.2 Billion (Accent) */}
          <motion.div variants={fadeUp} className="group relative bg-white/5 border border-white/10 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-white/20 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-white/90 tracking-tight">$9.2B</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-white/90 mb-2">Market Opportunity</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                The immediate, untapped clean energy market opportunity.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Block C: Editorial Split (Solution) */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-white/60 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-sm tracking-wide">The Solution</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h3 className="text-2xl md:text-3xl font-medium leading-tight mb-4 text-white/90">
              Integrated Investment & Collective Risk Management.
            </h3>
            <div className="flex flex-col gap-4 text-lg text-white/70 leading-relaxed">
              <p>
                While the demand for clean energy infrastructure is unprecedented, domestic institutional investors have historically been sidelined by foreign exchange (FX) risks and fragmented project structuring.
              </p>
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[var(--color-accent-green)] font-medium text-left hover:text-[var(--color-accent)] transition-colors w-fit flex items-center gap-1 text-base mt-2"
              >
                {isExpanded ? "View less" : "View more"}
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4">
                      The Clean Energy Local Currency Fund (CeF) was engineered to solve this. We utilize an Integrated Investment Approach—structuring transactions around the specific risks of each asset. By providing strictly local currency (₦) funding, we insulate our investors from FX shocks. In collaboration with our development partners, we mobilize blended finance to aggressively de-risk assets, making climate-smart technologies highly lucrative for private capital.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};


const InvestmentStrategySection = () => {
  return (
    <section id="strategy" className="py-24 lg:py-32 bg-[#F8F9FA] text-[#0A1224] relative z-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Standardized 2-Column Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 lg:w-7/12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Investment Strategy
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">Disciplined approach.</span><br />
              <span className="text-gray-400">Measurable results.</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 lg:w-5/12 md:flex md:justify-end"
          >
            <p className="text-lg text-gray-600 leading-relaxed max-w-md md:text-right">
              We target climate-aligned infrastructure projects with predictable cash flows, employing a multi-layered risk management framework to protect investor downside.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {/* Investment Thesis */}
          <motion.div variants={fadeUp} className="bg-white border border-gray-100 p-8 md:p-10 rounded-[8px] flex flex-col">
             <h3 className="text-2xl font-medium mb-4 text-[#0A1224]">Investment Thesis</h3>
             <p className="text-slate-600 font-light leading-relaxed mb-8">
               We target climate-aligned infrastructure projects with predictable cash flows. By providing long-term, local currency financing, we eliminate FX volatility for both project sponsors and domestic institutional investors.
             </p>
             
             {/* Custom Dashboard Widget: Line Chart */}
             <div className="mt-auto border border-gray-100 rounded-[8px] p-6 relative overflow-hidden bg-gray-50/50">
               <div className="flex justify-between items-center mb-6">
                 <h4 className="text-sm font-semibold text-[#0A1224]">Predictable Cash Flows</h4>
                 <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">Forecast</span>
               </div>
               <div className="relative h-40 w-full">
                 {/* Y-axis labels */}
                 <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-400">
                   <span>30</span>
                   <span>20</span>
                   <span>10</span>
                 </div>
                 {/* X-axis labels */}
                 <div className="absolute left-8 right-0 bottom-0 flex justify-between text-[10px] text-gray-400 px-4">
                   <span>Q1</span>
                   <span>Q2</span>
                   <span>Q3</span>
                   <span>Q4</span>
                 </div>
                 
                 {/* Chart Area */}
                 <div className="absolute left-8 right-0 top-2 bottom-8">
                   <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                     {/* Grid lines */}
                     <line x1="0" y1="0" x2="400" y2="0" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                     <line x1="0" y1="50" x2="400" y2="50" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                     <line x1="0" y1="100" x2="400" y2="100" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                     
                     {/* Dashed Line (Target) */}
                     <motion.path 
                       d="M 0 60 C 50 60, 80 40, 130 40 C 180 40, 220 70, 270 70 C 320 70, 360 30, 400 30"
                       fill="none"
                       stroke="#cbd5e1"
                       strokeWidth="2"
                       strokeDasharray="6 6"
                       initial={{ pathLength: 0 }}
                       whileInView={{ pathLength: 1 }}
                       transition={{ duration: 1.5, ease: "easeInOut" as const }}
                     />
                     
                     {/* Solid Line (Actual) */}
                     <motion.path 
                       d="M 0 80 C 60 80, 90 20, 150 20 C 200 20, 240 50, 290 50 C 340 50, 370 10, 400 10"
                       fill="none"
                       stroke="var(--color-accent-green)"
                       strokeWidth="3"
                       initial={{ pathLength: 0 }}
                       whileInView={{ pathLength: 1 }}
                       transition={{ duration: 1.5, ease: "easeInOut" as const, delay: 0.2 }}
                     />

                     {/* Tooltip Marker */}
                     <motion.g 
                       initial={{ opacity: 0, scale: 0 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 1.5, duration: 0.3 }}
                     >
                       <line x1="150" y1="20" x2="150" y2="100" stroke="var(--color-accent-green)" strokeWidth="1" strokeDasharray="4 4" />
                       <circle cx="150" cy="20" r="4" fill="white" stroke="var(--color-accent-green)" strokeWidth="2" />
                       <rect x="110" y="-15" width="80" height="24" rx="12" fill="#0A1224" />
                       <text x="150" y="0" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">Actual</text>
                     </motion.g>
                   </svg>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Risk Mitigation Strategies */}
          <motion.div variants={fadeUp} className="bg-white border border-gray-100 p-8 md:p-10 rounded-[8px] flex flex-col">
             <h3 className="text-2xl font-medium mb-4 text-[#0A1224]">Risk Mitigation Strategies</h3>
             <p className="text-slate-600 font-light leading-relaxed mb-8">
               Capital preservation is paramount. We employ a multi-layered risk management framework to protect investor downside while capturing upside potential.
             </p>
             
             {/* Custom Dashboard Widget: Area Chart */}
             <div className="mt-auto border border-gray-100 rounded-[8px] p-6 relative overflow-hidden bg-gray-50/50">
               <div className="flex justify-between items-center mb-6">
                 <h4 className="text-sm font-semibold text-[#0A1224]">Capital Preservation</h4>
                 <div className="flex items-center gap-2">
                   <span className="text-2xl font-bold text-[#0A1224]">100%</span>
                   <span className="text-[10px] font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Local Currency</span>
                 </div>
               </div>
               
               <div className="relative h-40 w-full">
                 {/* X-axis labels */}
                 <div className="absolute left-0 right-0 bottom-0 flex justify-between text-[10px] text-gray-400 px-2">
                   <span>2020</span>
                   <span>2021</span>
                   <span>2022</span>
                   <span>2023</span>
                   <span>2024</span>
                 </div>
                 
                 {/* Chart Area */}
                 <div className="absolute left-0 right-0 top-2 bottom-8">
                   <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                     {/* Grid lines */}
                     <line x1="0" y1="25" x2="400" y2="25" stroke="#e5e7eb" strokeWidth="1" />
                     <line x1="0" y1="50" x2="400" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                     <line x1="0" y1="75" x2="400" y2="75" stroke="#e5e7eb" strokeWidth="1" />
                     
                     {/* Area Gradient */}
                     <defs>
                       <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="var(--color-accent-green)" stopOpacity="0.2" />
                         <stop offset="100%" stopColor="var(--color-accent-green)" stopOpacity="0" />
                       </linearGradient>
                     </defs>
                     
                     <motion.path 
                       d="M 0 80 L 80 80 L 120 50 L 200 50 L 240 30 L 320 30 L 360 10 L 400 10 L 400 100 L 0 100 Z"
                       fill="url(#areaGradient)"
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 1, delay: 0.2 }}
                     />
                     
                     {/* Solid Line */}
                     <motion.path 
                       d="M 0 80 L 80 80 L 120 50 L 200 50 L 240 30 L 320 30 L 360 10 L 400 10"
                       fill="none"
                       stroke="var(--color-accent-green)"
                       strokeWidth="3"
                       strokeLinejoin="round"
                       initial={{ pathLength: 0 }}
                       whileInView={{ pathLength: 1 }}
                       transition={{ duration: 1.5, ease: "easeOut" as const }}
                     />
                   </svg>
                 </div>
               </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const AimOfFundsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const aims = [
    {
      icon: Banknote,
      title: "Provide long-term funding",
      text: "to climate aligned projects",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: Sun,
      title: "Support small-scale",
      text: "clean energy generation",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: BatteryCharging,
      title: "Support low-carbon",
      text: "energy infrastructure",
      img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: Wind,
      title: "Support alternative",
      text: "clean energy infrastructure",
      img: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: ArrowRightLeft,
      title: "Reduce FX exposure by providing",
      text: "long-term local currency financing",
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: PieChart,
      title: "Create a diversified portfolio",
      text: "of investments (across multiple value-chains)",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="aim-of-funds" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Standardized 2-Column Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 lg:w-7/12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Our Objectives
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">The Fund</span> <span className="text-gray-400">Aims To:</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 lg:w-5/12 md:flex md:justify-end"
          >
            <p className="text-lg text-gray-600 leading-relaxed max-w-md md:text-right">
              Strategic goals driving our commitment to sustainable infrastructure and stable, risk-adjusted returns.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-12 gap-6"
        >
          {aims.map((aim, idx) => {
            const Icon = aim.icon;
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants} 
                className="col-span-12 md:col-span-6 lg:col-span-4 relative rounded-[8px] overflow-hidden min-h-[280px] group cursor-pointer"
              >
                {/* Background Image */}
                <img 
                  src={aim.img} 
                  alt={aim.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#050A15]/60 group-hover:bg-[#050A15]/80 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-transparent to-transparent opacity-90" />

                {/* Top Icons */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-white/40 transition-colors">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-[var(--color-accent-green)] group-hover:border-[var(--color-accent-green)] transition-colors">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end h-full">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-3 block">
                      IMPACT
                    </span>
                    <h4 className="text-lg lg:text-xl font-medium text-white leading-tight">
                      {aim.title}
                    </h4>
                    
                    {/* Hover Description */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <p className="text-base text-white/70 mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {aim.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="mt-12 flex justify-center lg:justify-end"
        >
          <Link href="/investor-relations#highlights" className="group flex items-center gap-3 bg-white border border-gray-200 text-[#0A1224] px-8 py-4 rounded font-medium transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm">
            View Fund Performance
            <ArrowUpRight className="w-4 h-4 text-gray-500 transition-transform group-hover:rotate-45 group-hover:text-[#0A1224]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ImpactSDGsSection = () => {
  return (
    <section id="impact" className="py-24 lg:py-32 bg-[#0A1224] text-white relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Standardized 2-Column Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 lg:w-7/12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                Impact & SDGs
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-white">Measurable</span> <span className="text-white/60">Climate Action</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 lg:w-5/12 md:flex md:justify-end"
          >
            <p className="text-lg text-white/70 leading-relaxed max-w-md md:text-right">
              Our investments are strictly mapped to the UN SDGs, ensuring that every Naira deployed drives both financial returns and tangible human advancement.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder Cards */}
          {[
            { sdg: '7', title: 'Affordable and Clean Energy', color: '#FCC30B', rgb: '252, 195, 11' },
            { sdg: '8', title: 'Decent Work and Economic Growth', color: '#A21942', rgb: '162, 25, 66' },
            { sdg: '9', title: 'Industry, Innovation and Infrastructure', color: '#FD6925', rgb: '253, 105, 37' },
            { sdg: '13', title: 'Climate Action', color: '#3F7E44', rgb: '63, 126, 68' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-[#0A1224] border border-white/10 rounded-lg p-8 flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:border-[var(--card-color)] hover:shadow-[0_8px_30px_var(--card-glow)]"
              style={{ '--card-color': `rgba(${item.rgb}, 0.5)`, '--card-glow': `rgba(${item.rgb}, 0.15)` } as React.CSSProperties}
            >
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at top right, rgba(${item.rgb}, 0.15) 0%, transparent 60%)` }}
              />
              <div className="absolute top-0 left-0 w-full h-[2px] transition-all duration-500 opacity-50 group-hover:opacity-100" style={{ backgroundColor: item.color }} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl font-light text-white/20 font-sans">{'0' + (i + 1)}</span>
                  <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white/80 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
                </div>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div 
                      className="relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                      style={{ backgroundColor: `rgba(${item.rgb}, 0.1)`, borderColor: `rgba(${item.rgb}, 0.2)` }}
                    >
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: item.color, color: item.sdg === '7' ? 'black' : 'white' }}>{item.sdg}</div>
                      <span className="text-[10px] font-medium" style={{ color: item.color }}>SDG {item.sdg}</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-medium text-white">{item.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
