"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ShieldCheck, TrendingUp, 
  Zap, ChevronLeft, ChevronRight,
  Leaf, Users, Lightbulb, Sun, Wind,
  Landmark, Building2, Plus
} from 'lucide-react';
import Link from "next/link";
import Breadcrumbs from './Breadcrumbs';
import { cn } from '../lib/utils';
import { GradientCard } from './GradientCard';
import { TransactionPartiesGrid } from './TransactionParties';

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

export const AboutPage = () => {
  return (
    <main className="bg-white">
      <HeroSection />
      <StickySubNav />
      <AboutFundSection />
      <MacroProblemSection />
      <FundOverviewSection />
      <FundStructureSection />
      <TechnicalAssistanceSection />
      <MilestonesSection />
      <TeamSection />
      <ValuesAndImpactSection />
      <TargetInvestorsSection />
    </main>
  );
};

const StickySubNav = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'fund-overview', label: 'Fund Overview' },
    { id: 'structure', label: 'Fund Structure' },
    { id: 'track-record', label: 'Track Record' },
    { id: 'team', label: 'Leadership' },
    { id: 'values', label: 'Values & Impact' },
    { id: 'investors', label: 'Target Investors' },
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
  }, []);

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
              <span className="text-base">🏆</span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                Nigeria&apos;s First & Only Certified Green Fund
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight">
              <span className="text-white">Pioneering Local Currency</span> <br className="hidden lg:block" /> <span className="text-white/50">Climate Infrastructure Investments.</span>
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
              <source src="https://cdn.coverr.co/videos/coverr-solar-panels-in-a-field-5244/1080p.mp4" type="video/mp4" />
            </video>
            <img 
              src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2574&auto=format&fit=crop" 
              alt="Solar panels" 
              className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/30 z-10" />
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
            Bridging the $9.2 Billion market gap. We deliver risk-adjusted, stable returns for domestic institutional investors while driving Nigeria&apos;s energy transition—without FX exposure.
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

const FundOverviewSection = () => {
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
    <section id="fund-overview" className="py-24 lg:py-32 bg-[#050A15] text-white relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block">Fund Overview</span>
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
            <Link href="/fund" className="text-white hover:text-[var(--color-accent-green)] text-sm font-medium transition-colors flex items-center gap-2">
              Discover Fund <ArrowUpRight className="w-4 h-4" />
            </Link>
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

const AboutFundSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="overview" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Block A: Editorial Split */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-sm tracking-wide">About The Fund</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight mb-4">
              <span className="text-[#0A1224]">Pioneering Local Currency </span>
              <span className="text-slate-400">Climate Infrastructure Investments.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              A specialized alternative asset vehicle providing long-term Naira financing to eliminate exchange rate risks for sustainable infrastructure projects across Nigeria.
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
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop" 
              alt="Wind turbines" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Card 2: ₦15B */}
          <motion.div variants={fadeUp} className="group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">₦15B</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-[#0A1224] mb-2">Target Capital</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Series 2 capital raise secured for climate infrastructure.
              </p>
            </div>
          </motion.div>

          {/* Card 3: 100% */}
          <motion.div variants={fadeUp} className="group relative bg-white border border-[#0085CA]/20 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#0085CA]/40 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0085CA]/10 to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">100%</h3>
                <ArrowUpRight className="w-8 h-8 text-[#0085CA]/60 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0085CA]" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-[#0A1224] mb-2">Local Currency</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Eliminating currency mismatch by providing Naira financing.
              </p>
            </div>
          </motion.div>

          {/* Card 4: 21K */}
          <motion.div variants={fadeUp} className="group relative bg-white border border-[#50B848]/20 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#50B848]/40 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#50B848]/10 to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">21K</h3>
                <ArrowUpRight className="w-8 h-8 text-[#50B848]/60 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#50B848]" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-[#0A1224] mb-2">Tonnes CO₂</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Avoided annually through our sustainable investments.
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
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-sm tracking-wide">Our Approach</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h3 className="text-2xl md:text-3xl font-medium leading-tight mb-4 text-[#0A1224]">
              Strategic Focus & Value Creation.
            </h3>
            <div className="flex flex-col gap-4 text-lg text-gray-600 leading-relaxed">
              <p>
                We unlock domestic pension and insurance capital into high-impact clean energy infrastructure through strategic de-risking.
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
                      By providing strictly local currency (₦) funding, we insulate our investors from FX shocks. In collaboration with our development partners, we mobilize blended finance to aggressively de-risk assets, making climate-smart technologies highly lucrative for private capital.
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

const MacroProblemSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="challenge" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Block A: Editorial Split */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-sm tracking-wide">The Challenge</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight mb-4">
              <span className="text-[#0A1224]">The ₦4 Trillion Market Gap. </span>
              <span className="text-slate-400">Nigeria is the country with the largest number of people without energy access in the world.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
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
          <motion.div variants={fadeUp} className="group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">85M</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-[#0A1224] mb-2">People Unserved</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                People without access to reliable power (43% of the population).
              </p>
            </div>
          </motion.div>

          {/* Card 3: $14 Billion */}
          <motion.div variants={fadeUp} className="group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">$14B</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-[#0A1224] mb-2">Capital Drain</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Capital drained annually on fossil fuel generators.
              </p>
            </div>
          </motion.div>

          {/* Card 4: $9.2 Billion (Accent) */}
          <motion.div variants={fadeUp} className="group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">$9.2B</h3>
                <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-medium text-[#0A1224] mb-2">Market Opportunity</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
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
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-sm tracking-wide">The Solution</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h3 className="text-2xl md:text-3xl font-medium leading-tight mb-4 text-[#0A1224]">
              Integrated Investment & Collective Risk Management.
            </h3>
            <div className="flex flex-col gap-4 text-lg text-gray-600 leading-relaxed">
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

const AnimatedVerticalArrow = ({ direction, label, labelPosition, delay = 0, className = "" }: any) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {label && (
        <motion.span 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: delay + 0.5 }} viewport={{ once: false }}
          className={`absolute ${labelPosition} text-xs font-medium text-[#1E3A8A] leading-tight`}
        >
          {label}
        </motion.span>
      )}
      <div className="w-0.5 h-full relative flex items-center justify-center bg-gray-200">
        <motion.div 
          initial={{ height: 0 }} 
          whileInView={{ height: "100%" }} 
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay, ease: "easeInOut" as const }}
          className={`w-full bg-[#1E3A8A] absolute ${direction === 'down' ? 'top-0' : 'bottom-0'} overflow-hidden`}
        >
          {/* Flow animation */}
          <motion.div
            animate={{ top: direction === 'down' ? ['0%', '100%'] : ['100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay + 0.8 }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] absolute -left-[2px] shadow-[0_0_8px_2px_rgba(0,168,89,0.6)]"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: delay + 0.6 }} viewport={{ once: false }}
          className={`absolute -left-1.5 w-0 h-0 border-l-[7px] border-r-[7px] border-l-transparent border-r-transparent ${
            direction === 'down' 
              ? '-bottom-2 border-t-[10px] border-t-[#1E3A8A]' 
              : '-top-2 border-b-[10px] border-b-[#1E3A8A]'
          }`} 
        />
      </div>
    </div>
  );
};

const AnimatedHorizontalArrow = ({ direction, label, labelPosition, delay = 0, className = "" }: any) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {label && (
        <motion.span 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: delay + 0.5 }} viewport={{ once: false }}
          className={`absolute ${labelPosition} text-xs font-medium text-[#1E3A8A] leading-tight text-center`}
        >
          {label}
        </motion.span>
      )}
      <div className="h-0.5 w-full relative flex items-center justify-center bg-gray-200">
        <motion.div 
          initial={{ width: 0 }} 
          whileInView={{ width: "100%" }} 
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay, ease: "easeInOut" as const }}
          className={`h-full bg-[#1E3A8A] absolute ${direction === 'right' ? 'left-0' : 'right-0'} overflow-hidden`}
        >
          {/* Flow animation */}
          <motion.div
            animate={{ left: direction === 'right' ? ['0%', '100%'] : ['100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay + 0.8 }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] absolute -top-[2px] shadow-[0_0_8px_2px_rgba(0,168,89,0.6)]"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: delay + 0.6 }} viewport={{ once: false }}
          className={`absolute -top-1.5 w-0 h-0 border-t-[7px] border-b-[7px] border-t-transparent border-b-transparent ${
            direction === 'right' 
              ? '-right-2 border-l-[10px] border-l-[#1E3A8A]' 
              : '-left-2 border-r-[10px] border-r-[#1E3A8A]'
          }`} 
        />
      </div>
    </div>
  );
};

const FundStructureSection = () => {
  return (
    <section id="structure" className="py-24 lg:py-32 bg-[#f6f9fc] relative z-20 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Top Row: Editorial Split */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs uppercase tracking-[0.2em]">Indicative Fund Structure</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
              <span className="text-[#0A1224]">Institutional-Grade Capital Flow </span>
              <span className="text-slate-400">& Downside Protection</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              Our Blended Finance Model combines subordinated capital, guarantees, and senior institutional debt to deeply de-risk investments and attract long-term institutional capital.
            </p>
          </div>
        </motion.div>

        {/* Unified Card Container (Steps + Flowchart) */}
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col xl:flex-row mb-6 border border-gray-200/60">
          
          {/* Left Column: Steps (Image Background) */}
          <div className="w-full xl:w-[35%] relative p-10 lg:p-16 flex flex-col justify-center">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop" 
                alt="Clean Energy Infrastructure" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#0A1224]/90" /> {/* Dark overlay */}
            </div>
            
            <div className="relative z-10 border-l-2 border-white/20 ml-4 flex flex-col gap-12 py-2">
              {/* Animated Line */}
              <motion.div 
                initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: false }} transition={{ duration: 2, ease: "easeInOut" as const }}
                className="absolute left-[-2px] top-0 w-[2px] bg-[var(--color-accent-green)] origin-top z-0"
              />
              
              {[
                "Step 1: Investors Provide Capital",
                "Step 2: CeF Deploys Capital",
                "Step 3: Project SPVs Execute & Generate Yield",
                "Step 4: Returns Flow Back as Interest & Dividends"
              ].map((step, i) => {
                const [stepNum, stepText] = step.split(': ');
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: i * 0.4 + 0.5 }}
                    className="relative pl-10 z-10"
                  >
                    <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0A1224] border-2 border-[var(--color-accent-green)] flex items-center justify-center text-sm font-bold text-[var(--color-accent-green)] shadow-sm">
                      {i + 1}
                    </div>
                    <div className="pt-1">
                      <span className="text-xs font-bold text-[var(--color-accent-green)] uppercase tracking-wider block mb-1">{stepNum}</span>
                      <h4 className="text-lg font-medium text-white leading-snug">{stepText}</h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Flowchart (White Background) */}
          <div className="w-full xl:w-[65%] bg-white p-10 lg:p-16 flex items-center justify-center">
            <div className="w-full overflow-x-auto pb-8 no-scrollbar">
              <div className="min-w-[750px] w-full flex flex-col items-center font-sans">
                
                {/* Top Tier */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}
                  className="border border-dashed border-[#00A859] rounded-2xl p-5 flex gap-5 bg-white/50 backdrop-blur-sm relative"
                >
                  <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }} className="absolute inset-0 bg-[#00A859]/5 rounded-2xl -z-10" />
                  <div className="bg-[#00A859] text-white rounded-xl p-4 w-56 text-center text-xs font-medium shadow-lg flex items-center justify-center leading-relaxed">
                    Development Finance Institutions, Pension Fund, & Insurance Cos
                  </div>
                  <div className="bg-[#00A859] text-white rounded-xl p-4 w-56 text-center text-xs font-medium shadow-lg flex items-center justify-center leading-relaxed">
                    High Net Worth Individuals (HNIs)
                  </div>
                </motion.div>

                {/* Vertical Arrows 1 */}
                <div className="flex gap-12 h-24 relative my-2">
                  <AnimatedVerticalArrow direction="down" label="Interest" labelPosition="-left-16" delay={0.4} className="w-24" />
                  <AnimatedVerticalArrow direction="up" label="Dividends" labelPosition="-right-20" delay={0.6} className="w-24" />
                </div>

                {/* Middle Tier */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.8 }}
                  className="border-2 border-[#00A859] rounded-2xl px-8 py-5 bg-white shadow-xl z-10 flex items-center gap-4 relative"
                >
                  <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }} className="absolute inset-0 bg-[#00A859]/10 rounded-2xl blur-md -z-10" />
                  <Lightbulb className="w-8 h-8 text-[#1E3A8A]" />
                  <div className="flex flex-col">
                    <span className="text-[#1E3A8A] font-bold text-xl tracking-tight leading-none mb-1">CLEAN ENERGY</span>
                    <span className="text-[#00A859] font-medium text-sm leading-none">Local Currency Fund</span>
                  </div>
                </motion.div>

                {/* Vertical Arrows 2 */}
                <div className="flex gap-12 h-32 relative my-2">
                  <AnimatedVerticalArrow direction="down" label="Senior Debt, Securitised Debt, Mezzanine Instruments and Convertible Debt, Equity Commercial Funding" labelPosition="-left-[14rem] text-right w-52" delay={1.2} className="w-24" />
                  <AnimatedVerticalArrow direction="up" label="Dividends/Interest" labelPosition="-right-32" delay={1.4} className="w-24" />
                </div>

                {/* Bottom Tier */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 1.6 }}
                  className="flex items-center justify-center gap-3 w-full"
                >
                  {/* Left Box */}
                  <div className="bg-[#2391D2] text-white rounded-xl p-3 w-36 text-center text-sm font-medium shadow-lg h-20 flex items-center justify-center">
                    Investment
                  </div>

                  {/* Arrow Right 1 */}
                  <AnimatedHorizontalArrow direction="right" label="Credit Enhancement for Senior Debt by Other Institutional Investors" labelPosition="-bottom-12 w-48" delay={2.0} className="w-28 mx-10" />

                  {/* Center Box */}
                  <div className="border-2 border-[#00A859] rounded-2xl p-5 bg-white shadow-xl flex flex-col items-center w-64 relative z-10">
                    <div className="flex gap-2 mb-3 text-[#2391D2]">
                      <Sun className="w-8 h-8" strokeWidth={1.5} />
                      <Wind className="w-8 h-8" strokeWidth={1.5} />
                      <Zap className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <span className="text-center font-medium text-[#0A1224] text-sm">Eligible Off-grid Energy Projects</span>
                  </div>

                  {/* Arrows Right/Left 2 */}
                  <div className="relative w-28 flex flex-col justify-center gap-6 mx-4">
                    <AnimatedHorizontalArrow direction="right" label="Senior Debt Commercial Funding" labelPosition="-top-8 w-full" delay={2.2} className="w-full" />
                    <AnimatedHorizontalArrow direction="left" label="Interest" labelPosition="top-2 w-full" delay={2.4} className="w-full" />
                  </div>

                  {/* Right Box */}
                  <div className="bg-[#2391D2] text-white rounded-xl p-3 w-40 text-center text-sm font-medium shadow-lg h-20 flex items-center justify-center leading-tight">
                    Other Institutional Investors
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const TechnicalAssistanceSection = () => {
  return (
    <section className="w-full">
      {/* Top Tier: Technical Assistance */}
      <div className="bg-[#f0f5fd] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#00A859] font-bold tracking-[0.2em] uppercase mb-12 text-center lg:text-left text-sm">
            Strategic Partnership
          </h2>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
            {/* InfraCredit */}
            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:pr-10">
              <img 
                src="https://infracredit.ng/update/wp-content/uploads/2020/10/InfraCredit.svg" 
                alt="InfraCredit" 
                className="h-12 w-32 object-contain object-left shrink-0" 
                referrerPolicy="no-referrer" 
              />
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[#0A1224] text-sm mb-1">InfraCredit Partnership</span>
                <p className="text-sm text-[#0A1224] leading-relaxed">
                  Providing AAA-rated guarantees under the Clean Energy Funding Programme (CEFP), enabling pension funds to participate with absolute confidence.
                </p>
              </div>
            </div>
            
            {/* Divider */}
            <div className="hidden lg:block w-px bg-gray-400/50 self-stretch" />
            <div className="lg:hidden h-px w-full bg-gray-400/50" />

            {/* FundCo / SEC */}
            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:pl-10">
              <img 
                src="https://fundco.ng/wp-content/uploads//2021/07/Fundco.svg" 
                alt="FundCo Capital" 
                className="h-12 w-32 object-contain object-left shrink-0" 
                referrerPolicy="no-referrer" 
              />
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[#0A1224] text-sm mb-1">SEC Regulated</span>
                <p className="text-sm text-[#0A1224] leading-relaxed">
                  Managed by FundCo Capital Managers Limited, fully authorized and registered by the Nigeria Securities & Exchange Commission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tier: Rating Agencies */}
      <div className="bg-[#dae7fa] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Rating Agency 1 */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="text-[#003366] font-bold text-lg whitespace-nowrap">Rating Agency</span>
            <div className="flex items-center gap-4 border-l border-gray-400/50 pl-6">
              <div className="flex flex-col items-center">
                <span className="text-[#E3000F] font-bold text-4xl leading-none tracking-tighter">GCR</span>
                <span className="text-gray-500 text-[10px] tracking-[0.2em] mt-1">RATINGS</span>
              </div>
              <div className="text-[11px] text-gray-600 border-l border-gray-400/50 pl-4 leading-tight">
                An Affiliate<br/>of Moody&apos;s<br/>Investors Service
              </div>
            </div>
          </div>

          {/* Rating Agency 2 */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="text-[#003366] font-bold text-lg whitespace-nowrap">Green Verifier</span>
            <div className="flex flex-col gap-1 border-l border-gray-400/50 pl-6">
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-[2px]">
                  <div className="w-3 h-3 bg-[#003366]"></div>
                  <div className="w-3 h-3 bg-gray-400"></div>
                  <div className="w-3 h-3 bg-gray-400"></div>
                  <div className="w-3 h-3 bg-gray-400"></div>
                </div>
                <span className="text-[#003366] font-bold text-3xl tracking-tight">Agusto&Co.</span>
              </div>
              <div className="text-[10px] text-[#003366] italic ml-8">
                Research, Credit Ratings, Credit Risk Management
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};



const ValuesAndImpactSection = () => {
  return (
    <section id="values" className="py-24 lg:py-32 bg-white relative z-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              Values & Verified Impact
            </span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left: Headline */}
            <motion.div variants={fadeUp}>
              <h3 className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight text-[#0A1224]">
                Beyond Financial Returns: <br className="hidden lg:block" />
                <span className="text-gray-400">Measurable ESG Impact.</span>
              </h3>
            </motion.div>

            {/* Right: Description */}
            <motion.div variants={fadeUp} className="flex flex-col justify-start items-start">
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-8 max-w-xl">
                As Nigeria&apos;s only Climate Bonds Certified fund, our investments are strictly mapped to the UN Sustainable Development Goals. We don&apos;t just measure megawatts; we measure human advancement.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bento Grid Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]"
        >
          {/* Column 1, Row 1: 05 Gender Equality */}
          <GradientCard 
            variants={fadeUp}
            baseColor="255, 58, 33"
            mode="light"
            className="h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-light text-gray-300 font-sans">05</span>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#0A1224] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-medium text-[#0A1224] mb-4">Gender Equality</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FF3A21]/10 border border-[#FF3A21]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#FF3A21] flex items-center justify-center text-[9px] font-bold text-white">5</div>
                  <span className="text-[10px] font-medium text-[#FF3A21]">SDG 5</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-light leading-relaxed text-sm mt-auto">
              Actively seeking and structuring investments that aggressively empower women, promoting equal participation across the clean energy value chain.
            </p>
          </GradientCard>

          {/* Column 2, Row 1: Image */}
          <motion.div 
            variants={fadeUp}
            className="group relative border border-gray-200 rounded overflow-hidden bg-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop" 
              alt="Women in Clean Energy" 
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Column 3, Row 1: 08 Decent Work */}
          <GradientCard 
            variants={fadeUp}
            baseColor="162, 25, 66"
            mode="light"
            className="h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-light text-gray-300 font-sans">08</span>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#0A1224] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-medium text-[#0A1224] mb-4">Decent Work & Growth</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#A21942]/10 border border-[#A21942]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#A21942] flex items-center justify-center text-[9px] font-bold text-white">8</div>
                  <span className="text-[10px] font-medium text-[#A21942]">SDG 8</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-light leading-relaxed text-sm mt-auto">
              Promoting sustained, inclusive economic growth by channeling investments into clean energy projects that create high-paying local jobs.
            </p>
          </GradientCard>

          {/* Column 1, Row 2: 11 Sustainable Cities */}
          <GradientCard 
            variants={fadeUp}
            baseColor="253, 157, 36"
            mode="light"
            className="h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-light text-gray-300 font-sans">11</span>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#0A1224] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-medium text-[#0A1224] mb-4">Sustainable Cities</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FD9D24]/10 border border-[#FD9D24]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#FD9D24] flex items-center justify-center text-[9px] font-bold text-white">11</div>
                  <span className="text-[10px] font-medium text-[#FD9D24]">SDG 11</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-light leading-relaxed text-sm mt-auto">
              Supporting resilient infrastructure—including off-grid energy and clean cooking—that make communities inclusive, safe, and liveable.
            </p>
          </GradientCard>

          {/* Column 2, Row 2: Image */}
          <motion.div 
            variants={fadeUp}
            className="group relative border border-gray-200 rounded overflow-hidden bg-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=2574&auto=format&fit=crop" 
              alt="Clean Energy Infrastructure" 
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Column 3, Row 2: 13 Climate Action */}
          <GradientCard 
            variants={fadeUp}
            baseColor="63, 126, 68"
            mode="light"
            className="h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-light text-gray-300 font-sans">13</span>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#0A1224] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-medium text-[#0A1224] mb-4">Climate Action</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#3F7E44]/10 border border-[#3F7E44]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#3F7E44] flex items-center justify-center text-[9px] font-bold text-white">13</div>
                  <span className="text-[10px] font-medium text-[#3F7E44]">SDG 13</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-light leading-relaxed text-sm mt-auto">
              Confronting climate change head-on by accelerating private capital into climate-smart technologies for Nigeria&apos;s energy transition.
            </p>
          </GradientCard>

        </motion.div>
      </div>
    </section>
  );
};

const TargetInvestorsSection = () => {
  const investors = [
    { 
      title: "Pension Funds", 
      id: "1",
      icon: Landmark,
      desc: "Long-term liability matching with stable, inflation-hedged infrastructure yields.",
      img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop"
    },
    { 
      title: "Insurance Companies", 
      id: "2",
      icon: ShieldCheck,
      desc: "Diversification into real assets with strong downside protection and predictable cash flows.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
    },
    { 
      title: "Development Finance Institutions", 
      id: "3",
      icon: Building2,
      desc: "Catalytic capital deployment achieving measurable SDG impact and market building.",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
    },
    { 
      title: "High Net Worth Individuals", 
      id: "4",
      icon: Users,
      desc: "Access to institutional-grade climate assets with attractive risk-adjusted returns.",
      img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="investors" className="py-24 lg:py-32 bg-white relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start shrink-0 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">Target Investors</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-[#0A1224]">
            Partnering with <span className="text-gray-400">Institutional Capital</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Our fund is structured to meet the rigorous requirements of institutional investors, providing stable, climate-aligned returns while driving significant development impact across Nigeria.
          </p>
          <Link href="/investor-relations" className="bg-[var(--color-accent-green)] text-white hover:bg-[var(--color-accent)] px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 w-fit shadow-lg">
            Access Investor Relations <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right Grid */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {investors.map((investor, i) => {
              const Icon = investor.icon;
              return (
                <div 
                  key={i}
                  className="relative rounded-[8px] overflow-hidden h-[320px] group cursor-pointer"
                >
                  {/* Background Image */}
                  <img 
                    src={investor.img} 
                    alt={investor.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-[#050A15]/60 group-hover:bg-[#050A15]/80 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-transparent to-transparent opacity-90" />

                  {/* Top Icons */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-white/40 transition-colors">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-[var(--color-accent-green)] group-hover:border-[var(--color-accent-green)] transition-colors">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end h-full">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-3 block">
                        Target Investor
                      </span>
                      <h3 className="text-xl lg:text-2xl font-medium text-white leading-tight">
                        {investor.title}
                      </h3>
                      
                      {/* Hover Description */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                        <div className="overflow-hidden">
                          <p className="text-sm text-white/70 mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {investor.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

const MilestonesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const firstChild = container.children[0] as HTMLElement;
    if (!firstChild) return;
    
    // Calculate the width of one item including the gap (gap-5 = 20px)
    const itemWidth = firstChild.offsetWidth + 20; 
    const newIndex = Math.round(container.scrollLeft / itemWidth);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.children[0] as HTMLElement;
      const scrollAmount = firstChild ? firstChild.offsetWidth + 20 : 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nodes = [
    { title: "Fund Conceptualization", desc: "Strategic framework developed and backed by technical assistance from PIDG." },
    { title: "Series 1 Fully Subscribed", desc: "8 Tier-1 Institutional Investors successfully onboarded." },
    { title: "Green Certification", desc: "Achieved Nigeria's first Climate Bonds Standard Board programmatic certification." },
    { title: "Investment Grade Rating", desc: "Awarded a National Scale Fund Rating with a \"Stable\" outlook." },
    { title: "First Dividend Paid", desc: "₦330 Million successfully distributed to investors (Dec 2024)." },
    { title: "Second Dividend Paid", desc: "₦400 Million successfully distributed to investors (Sep 2025)." },
    { title: "Series 2 Raise Open", desc: "Scaling AUM for the next phase of climate infrastructure." },
  ];

  return (
    <section id="track-record" className="py-24 lg:py-32 bg-[#050A15] text-white relative z-20 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Intro */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: false }} variants={fadeUp}
            >
              <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6">
                <span className="text-white">The Journey So Far: </span>
                <span className="text-white/50">Unlocking Momentum & Yield</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                We don’t just project returns; we distribute them. Track our momentum from fund conceptualization to our current capital raise.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Horizontal Track */}
          <div className="lg:col-span-8 flex flex-col relative min-w-0">
            
            {/* The scrollable container */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-5 overflow-x-auto no-scrollbar px-6 -mx-6 sm:px-0 sm:mx-0 pb-12 pt-4 snap-x snap-mandatory items-center"
            >
              {nodes.map((node, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className={cn(
                      "w-[260px] md:w-[300px] shrink-0 snap-start rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 min-h-[260px]",
                      isActive 
                        ? "bg-[#0395db] border border-[#0395db] shadow-[0_0_25px_rgba(3,149,219,0.4)] scale-105 z-10" 
                        : "bg-white/5 border border-white/5 opacity-50 hover:opacity-70 scale-100"
                    )}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={cn(
                          "w-8 h-[2px] transition-colors duration-500",
                          isActive ? "bg-white" : "bg-white/20"
                        )} />
                        {isActive && (
                          <span className="relative flex h-3 w-3 ml-auto">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                          </span>
                        )}
                      </div>
                      <h3 className={cn(
                        "text-xl font-medium mb-3 transition-colors duration-500",
                        isActive ? "text-white" : "text-gray-400"
                      )}>{node.title}</h3>
                      <p className={cn(
                        "leading-relaxed mt-auto text-sm transition-colors duration-500",
                        isActive ? "text-white/90" : "text-gray-500"
                      )}>{node.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Track Line & Navigation */}
            <div className="mt-2 relative">
              {/* Continuous Line */}
              <div className="w-full h-px bg-white/10 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.5, ease: "easeInOut" as const }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0395db]/50 to-[#0395db]"
                />
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex items-center gap-4 mt-8">
                <button 
                  onClick={() => scroll('left')} 
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all text-white group"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button 
                  onClick={() => scroll('right')} 
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all text-white group"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const team = [
    { name: "David Humphrey", title: "Infrastructure & Energy Finance", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" },
    { name: "Welela Dawit", title: "Corporate Finance & Strategy", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
    { name: "Obinna Ihedioha", title: "Project Finance & Development", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
    { name: "Chizoba Onoh", title: "Infrastructure Consulting", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" },
    { name: "Ade Alli", title: "ESG & Infrastructure", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <section id="team" className="py-24 lg:py-32 bg-gray-50 relative z-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                Leadership & Governance
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6">
              <span className="text-[#0A1224]">Guided by 100+ Years of </span>
              <span className="text-slate-400">Institutional Experience</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Institutional capital requires institutional plumbing. Our Investment Committee and management team bring decades of rigorous underwriting, asset management, and ESG compliance from top-tier global and African financial institutions.
            </p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
            className="px-6 py-3 border border-gray-300 rounded-[8px] text-sm font-medium text-[#0A1224] hover:bg-gray-100 hover:border-gray-400 transition-colors whitespace-nowrap bg-white shadow-sm"
          >
            View Full Team Profiles
          </motion.button>
        </div>

        {/* Investment Committee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
          {team.map((member, i) => {
            const nameParts = member.name.split(' ');
            const firstName = nameParts.slice(0, -1).join(' ');
            const lastName = nameParts[nameParts.length - 1];

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-[8px] overflow-hidden mb-4 bg-black/5">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-bold text-lg text-[#0A1224]">
                  {firstName} <span className="text-[var(--color-accent-green)]">{lastName}</span>
                </h3>
                <p className="text-sm text-gray-500 mt-1">{member.title}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Transaction Parties - Removed from container styling to match requirement but keeping the component as is */}
        <TransactionPartiesGrid />

      </div>
    </section>
  );
};