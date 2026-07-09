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
import { getStrapiURL } from '../lib/strapi';
import type {
  FundPageSection,
  HeroSection as HeroSectionData,
  StickySubNavSection as StickySubNavSectionData,
  OverviewSection as OverviewSectionData,
  ChallengeSection as ChallengeSectionData,
  InvestmentStrategySection as InvestmentStrategySectionData,
  AimOfFundsSection as AimOfFundsSectionData,
  ImpactSdgsSection as ImpactSdgsSectionData,
} from '../types/fund';

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

function renderLines(text: string) {
  const parts = text.split('\n');
  return parts.map((line, i) => (
    <span key={i}>{line}{i < parts.length - 1 && <br />}</span>
  ));
}

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

const SECTION_IDS = ['overview', 'challenge', 'strategy', 'aim-of-funds', 'impact'];
const AIM_ICONS = [Banknote, Sun, BatteryCharging, Wind, ArrowRightLeft, PieChart];

interface FundPageProps {
  sections: FundPageSection[];
}

export const FundPage = ({ sections }: FundPageProps) => {
  const pathname = usePathname();
  const location = typeof window !== 'undefined' ? window.location : { hash: '', pathname };

  const hero = sections.find((s): s is HeroSectionData => s.__component === 'fund-page.hero-section');
  const stickyNav = sections.find((s): s is StickySubNavSectionData => s.__component === 'fund-page.sticky-sub-nav-section');
  const overview = sections.find((s): s is OverviewSectionData => s.__component === 'fund-page.overview-section');
  const challenge = sections.find((s): s is ChallengeSectionData => s.__component === 'fund-page.challenge-section');
  const strategy = sections.find((s): s is InvestmentStrategySectionData => s.__component === 'fund-page.investment-strategy-section');
  const aimOfFunds = sections.find((s): s is AimOfFundsSectionData => s.__component === 'fund-page.aim-of-funds-section');
  const impactSdgs = sections.find((s): s is ImpactSdgsSectionData => s.__component === 'fund-page.impact-sdgs-section');

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
      {hero && <HeroSection data={hero} />}
      {stickyNav && <StickySubNav data={stickyNav} />}
      {overview && <OverviewSection data={overview} />}
      {challenge && <ChallengeSection data={challenge} />}
      {strategy && <InvestmentStrategySection data={strategy} />}
      {aimOfFunds && <AimOfFundsSection data={aimOfFunds} />}
      {impactSdgs && <ImpactSDGsSection data={impactSdgs} />}
    </main>
  );
};

const StickySubNav = ({ data }: { data: StickySubNavSectionData }) => {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);

  const navItems = data.navItems.map((item, i) => ({
    id: SECTION_IDS[i] ?? item.label.toLowerCase().replace(/\s+/g, '-'),
    label: item.label,
  }));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
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
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
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

const HeroSection = ({ data }: { data: HeroSectionData }) => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const [badgeIcon, ...badgeRest] = data.badge.split(' ');
  const badgeText = badgeRest.join(' ');

  return (
    <section className="relative bg-[var(--color-background)] flex flex-col  lg:h-screen lg:min-h-[700px] lg:max-h-[1080px]">
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
              <span className="text-base">{badgeIcon}</span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                {badgeText}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight">
              <span className="text-white">{data.headingPrimary}</span> <br className="hidden lg:block" /> <span className="text-white/50">{data.headingSecondary}</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Column: Video Background */}
        <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
            {data.video ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover motion-reduce:hidden"
              >
                <source src={getStrapiURL(data.video.url)} type={data.video.mime ?? 'video/mp4'} />
              </video>
            ) : (
              <div className="w-full h-full bg-[var(--color-background)]" />
            )}
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
            {data.subheadline}
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <Leaf className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">
              {renderLines(data.credential1)}
            </span>
          </motion.div>
          <div className="w-full h-px bg-white/20" />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">
              {renderLines(data.credential2)}
            </span>
          </motion.div>
        </div>

        {/* Column 3: Light Block */}
        <div className="bg-[#32a99f] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#32a99f]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">{data.ratingLabel}</span>
              <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">{data.ratingValue}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const OverviewSection = ({ data }: { data: OverviewSectionData }) => {
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
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block">{data.sectionLabel}</span>
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
              {data.heading}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-md">
              {data.intro}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto bg-white text-[#050A15] hover:bg-gray-100 px-8 py-4 rounded text-sm font-medium transition-colors">
                {data.ctaLabel}
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
            {data.items.map((item, idx) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cn(
                  "py-10 flex flex-col md:flex-row gap-6 md:gap-12",
                  idx < data.items.length - 1 ? "border-b border-white/10" : "pb-0"
                )}
              >
                <h3 className="text-2xl font-medium w-full md:w-1/2">{item.title}</h3>
                <p className="text-white/60 leading-relaxed w-full md:w-1/2">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ChallengeSection = ({ data }: { data: ChallengeSectionData }) => {
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
              <span className="text-sm tracking-wide">{data.sectionLabel}</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight mb-4">
              <span className="text-white/90">{data.headingPrimary} </span>
              <span className="text-[var(--color-accent-green)]">{data.headingSecondary}</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
              {data.supportingText}
            </p>
          </div>
        </motion.div>

        {/* Block B: Bento Grid */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {/* Card 1: Image */}
          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden min-h-[280px] lg:min-h-[320px] h-full bg-white/5">
            {data.challengeImage && (
              <img
                src={getStrapiURL(data.challengeImage.url)}
                alt={data.challengeImage.alternativeText ?? 'Challenge image'}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>

          {/* Stat Cards */}
          {data.challengeStats.map((stat) => (
            <motion.div key={stat.id} variants={fadeUp} className="group relative bg-white/5 border border-white/10 p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-white/20 hover:-translate-y-0.5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-5xl lg:text-6xl font-light text-white/90 tracking-tight">{stat.value}</h3>
                  <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-medium text-white/90 mb-2">{stat.label}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Block C: Editorial Split (Solution) */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-white/60 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-sm tracking-wide">{data.solutionLabel}</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h3 className="text-2xl md:text-3xl font-medium leading-tight mb-4 text-white/90">
              {data.solutionHeading}
            </h3>
            <div className="flex flex-col gap-4 text-lg text-white/70 leading-relaxed">
              <p>{data.solutionBody}</p>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[var(--color-accent-green)] font-medium text-left hover:text-[var(--color-accent)] transition-colors w-fit flex items-center gap-1 text-base mt-2"
              >
                {isExpanded ? data.viewLessLabel : data.viewMoreLabel}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4">{data.solutionExpandedBody}</p>
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

const InvestmentStrategySection = ({ data }: { data: InvestmentStrategySectionData }) => {
  return (
    <section id="strategy" className="py-24 lg:py-32 bg-[#F8F9FA] text-[#0A1224] relative z-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
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
                {data.sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{data.headingPrimary}</span><br />
              <span className="text-gray-400">{data.headingSecondary}</span>
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
              {data.subheading}
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
            <h3 className="text-2xl font-medium mb-4 text-[#0A1224]">{data.thesisTitle}</h3>
            <p className="text-slate-600 font-light leading-relaxed mb-8">{data.thesisBody}</p>

            <div className="mt-auto border border-gray-100 rounded-[8px] p-6 relative overflow-hidden bg-gray-50/50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-semibold text-[#0A1224]">{data.thesisChartTitle}</h4>
                <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">{data.thesisForecastBadge}</span>
              </div>
              <div className="relative h-40 w-full">
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-400">
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                </div>
                <div className="absolute left-8 right-0 bottom-0 flex justify-between text-[10px] text-gray-400 px-4">
                  <span>Q1</span>
                  <span>Q2</span>
                  <span>Q3</span>
                  <span>Q4</span>
                </div>
                <div className="absolute left-8 right-0 top-2 bottom-8">
                  <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="400" y2="0" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                    <motion.path
                      d="M 0 60 C 50 60, 80 40, 130 40 C 180 40, 220 70, 270 70 C 320 70, 360 30, 400 30"
                      fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" as const }}
                    />
                    <motion.path
                      d="M 0 80 C 60 80, 90 20, 150 20 C 200 20, 240 50, 290 50 C 340 50, 370 10, 400 10"
                      fill="none" stroke="var(--color-accent-green)" strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" as const, delay: 0.2 }}
                    />
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, duration: 0.3 }}
                    >
                      <line x1="150" y1="20" x2="150" y2="100" stroke="var(--color-accent-green)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="150" cy="20" r="4" fill="white" stroke="var(--color-accent-green)" strokeWidth="2" />
                      <rect x="110" y="-15" width="80" height="24" rx="12" fill="#0A1224" />
                      <text x="150" y="0" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">{data.thesisActualLabel}</text>
                    </motion.g>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Mitigation */}
          <motion.div variants={fadeUp} className="bg-white border border-gray-100 p-8 md:p-10 rounded-[8px] flex flex-col">
            <h3 className="text-2xl font-medium mb-4 text-[#0A1224]">{data.riskTitle}</h3>
            <p className="text-slate-600 font-light leading-relaxed mb-8">{data.riskBody}</p>

            <div className="mt-auto border border-gray-100 rounded-[8px] p-6 relative overflow-hidden bg-gray-50/50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-semibold text-[#0A1224]">{data.riskChartTitle}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#0A1224]">{data.riskChartPercentage}</span>
                  <span className="text-[10px] font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{data.riskChartBadge}</span>
                </div>
              </div>
              <div className="relative h-40 w-full">
                <div className="absolute left-0 right-0 bottom-0 flex justify-between text-[10px] text-gray-400 px-2">
                  <span>2020</span>
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                </div>
                <div className="absolute left-0 right-0 top-2 bottom-8">
                  <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <line x1="0" y1="25" x2="400" y2="25" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="0" y1="75" x2="400" y2="75" stroke="#e5e7eb" strokeWidth="1" />
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
                    <motion.path
                      d="M 0 80 L 80 80 L 120 50 L 200 50 L 240 30 L 320 30 L 360 10 L 400 10"
                      fill="none" stroke="var(--color-accent-green)" strokeWidth="3" strokeLinejoin="round"
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

const AimOfFundsSection = ({ data }: { data: AimOfFundsSectionData }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="aim-of-funds" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
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
                {data.sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{data.headingPrimary}</span> <span className="text-gray-400">{data.headingSecondary}</span>
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
              {data.subheading}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-12 gap-6"
        >
          {data.aimCards.map((card, idx) => {
            const Icon = AIM_ICONS[idx] ?? Banknote;
            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                className="col-span-12 md:col-span-6 lg:col-span-4 relative rounded-[8px] overflow-hidden min-h-[280px] group cursor-pointer"
              >
                {card.image ? (
                  <img
                    src={getStrapiURL(card.image.url)}
                    alt={card.image.alternativeText ?? card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#050A15]" />
                )}
                <div className="absolute inset-0 bg-[#050A15]/60 group-hover:bg-[#050A15]/80 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-transparent to-transparent opacity-90" />

                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-white/40 transition-colors">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-[var(--color-accent-green)] group-hover:border-[var(--color-accent-green)] transition-colors">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end h-full">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-3 block">
                      {data.cardLabel}
                    </span>
                    <h4 className="text-lg lg:text-xl font-medium text-white leading-tight">
                      {card.title}
                    </h4>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <p className="text-base text-white/70 mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {card.hoverText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="mt-12 flex justify-center lg:justify-end"
        >
          <Link href={data.ctaHref} className="group flex items-center gap-3 bg-white border border-gray-200 text-[#0A1224] px-8 py-4 rounded font-medium transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm">
            {data.ctaLabel}
            <ArrowUpRight className="w-4 h-4 text-gray-500 transition-transform group-hover:rotate-45 group-hover:text-[#0A1224]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ImpactSDGsSection = ({ data }: { data: ImpactSdgsSectionData }) => {
  return (
    <section id="impact" className="py-24 lg:py-32 bg-[#0A1224] text-white relative z-20">
      <div className="max-w-7xl mx-auto px-6">
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
                {data.sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-white">{data.headingPrimary}</span> <span className="text-white/60">{data.headingSecondary}</span>
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
              {data.subheading}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.sdgCards.map((card, i) => {
            const rgb = hexToRgb(card.color);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-[#0A1224] border border-white/10 rounded-lg p-8 flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:border-[var(--card-color)] hover:shadow-[0_8px_30px_var(--card-glow)]"
                style={{ '--card-color': `rgba(${rgb}, 0.5)`, '--card-glow': `rgba(${rgb}, 0.15)` } as React.CSSProperties}
              >
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at top right, rgba(${rgb}, 0.15) 0%, transparent 60%)` }}
                />
                <div className="absolute top-0 left-0 w-full h-[2px] transition-all duration-500 opacity-50 group-hover:opacity-100" style={{ backgroundColor: card.color }} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl font-light text-white/20 font-sans">{'0' + (i + 1)}</span>
                    <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white/80 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div
                        className="relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                        style={{ backgroundColor: `rgba(${rgb}, 0.1)`, borderColor: `rgba(${rgb}, 0.2)` }}
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                          style={{ backgroundColor: card.color, color: parseInt(card.sdgNumber) === 7 ? 'black' : 'white' }}
                        >
                          {card.sdgNumber}
                        </div>
                        <span className="text-[10px] font-medium" style={{ color: card.color }}>SDG {card.sdgNumber}</span>
                      </div>
                    </div>
                    <h4 className="text-xl font-medium text-white">{card.title}</h4>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
