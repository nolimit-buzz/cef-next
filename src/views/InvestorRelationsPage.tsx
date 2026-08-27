"use client";
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ShieldCheck, Leaf, TrendingUp,
  Download, FileText, Mail, Phone,
  Landmark, Briefcase, Shield, LineChart, MapPin, Send, Plus, Minus
} from 'lucide-react';
import Link from "next/link";
import Breadcrumbs from '../components/Breadcrumbs';
import { cn, statGridSpan } from '../lib/utils';
import { getStrapiMediaURL } from '../lib/strapi';
import { FundPerformanceChart } from '../components/FundPerformanceChart';
import type {
  InvestorRelationsPageSection,
  HeroSection as HeroSectionData,
  StickyNavSection as StickyNavSectionData,
  PerformanceHighlightsSection as PerformanceHighlightsSectionData,
  PerformanceReportsSection as PerformanceReportsSectionData,
  InvestorBaseSection as InvestorBaseSectionData,
  DistributionHistorySection as DistributionHistorySectionData,
  DownloadsSection as DownloadsSectionData,
  InvestorEnquiriesSection as InvestorEnquiriesSectionData,
} from '../types/investor-relations';

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

// Map investor type tag to a Lucide icon
const TAG_ICON_MAP: Record<string, React.ElementType> = {
  'ANCHOR INVESTORS': Landmark,
  'LONG-TERM CAPITAL': Briefcase,
  'RISK-ADJUSTED YIELD': Shield,
  'PORTFOLIO DIVERSIFICATION': LineChart,
};

export const InvestorRelationsPage = ({ sections = [] }: { sections: InvestorRelationsPageSection[] }) => {
  const hero       = sections.find(s => s.__component === 'investor-relations-page.hero-section') as HeroSectionData | undefined;
  const stickyNav  = sections.find(s => s.__component === 'investor-relations-page.sticky-nav-section') as StickyNavSectionData | undefined;
  const perf       = sections.find(s => s.__component === 'investor-relations-page.performance-highlights-section') as PerformanceHighlightsSectionData | undefined;
  const reports    = sections.find(s => s.__component === 'investor-relations-page.performance-reports-section') as PerformanceReportsSectionData | undefined;
  const invBase    = sections.find(s => s.__component === 'investor-relations-page.investor-base-section') as InvestorBaseSectionData | undefined;
  const dist       = sections.find(s => s.__component === 'investor-relations-page.distribution-history-section') as DistributionHistorySectionData | undefined;
  const downloads  = sections.find(s => s.__component === 'investor-relations-page.downloads-section') as DownloadsSectionData | undefined;
  const enquiries  = sections.find(s => s.__component === 'investor-relations-page.investor-enquiries-section') as InvestorEnquiriesSectionData | undefined;

  return (
    <main className="bg-white">
      <HeroSection data={hero} />
      <StickySubNav navItems={stickyNav?.navItems} />
      <PerformanceHighlightsSection data={perf} />
      {/* <PerformanceReportsSection data={reports} /> */}
      <DistributionHistorySection data={dist} />
      {/* <DownloadsSection data={downloads} /> */}
      <InvestorBaseSection data={invBase} />
      <InvestorEnquiriesSection data={enquiries} />
    </main>
  );
};

// Most CMS labels slugify straight onto their section id; these do not.
const SECTION_ID_OVERRIDES: Record<string, string> = {
  'investor enquiries': 'enquiries',
};

const sectionIdFor = (label: string) =>
  SECTION_ID_OVERRIDES[label.toLowerCase()] ?? label.toLowerCase().replace(/\s+/g, '-');

const StickySubNav = ({ navItems }: { navItems?: StickyNavSectionData['navItems'] }) => {
  const [activeSection, setActiveSection] = useState('');
  // Nav items are CMS-driven but some sections are not mounted (e.g. Downloads).
  // Rather than let those render as dead buttons, keep only the items whose
  // target section is actually on the page — self-healing when one is restored.
  const [renderedItems, setRenderedItems] = useState<StickyNavSectionData['navItems']>([]);

  const items = navItems ?? [];

  useEffect(() => {
    setRenderedItems(items.filter(item => document.getElementById(sectionIdFor(item.label))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems]);

  useEffect(() => {
    if (!items.length) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const item of items) {
        const id = sectionIdFor(item.label);
        const element = document.getElementById(id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!renderedItems.length) return null;

  return (
    <div className="sticky top-[57px] z-40 w-full bg-[#dae7fa]/80 backdrop-blur-md border-b border-gray-200 py-4 hidden md:block transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto no-scrollbar">
        {renderedItems.map(item => {
          const id = sectionIdFor(item.label);
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border",
                activeSection === id
                  ? "bg-[#32a99f] border-transparent text-white shadow-sm"
                  : "bg-transparent border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const HeroSection = ({ data }: { data?: HeroSectionData }) => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const badgeParts = data?.badge?.split(/\s(.+)/) ?? [];
  const badgeEmoji = badgeParts[0];
  const badgeText  = badgeParts[1];

  return (
    <section className="relative bg-[var(--color-background)] flex flex-col lg:h-screen lg:min-h-[700px] lg:max-h-[1080px]">
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
            {badgeEmoji && badgeText && (
              <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6 lg:mb-8 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full">
                <span className="text-base">{badgeEmoji}</span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                  {badgeText}
                </span>
              </motion.div>
            )}

            <motion.h1 variants={fadeUp} className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight">
              <span className="text-white">{data?.headingPrimary}</span>{' '}
              <br className="hidden lg:block" />
              <span className="text-white/50">{data?.headingSecondary}</span>
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
              poster={
                getStrapiMediaURL(data?.heroPoster?.file) ??
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
              }
              className="w-full h-full object-cover motion-reduce:hidden"
            >
              {/* No stock-footage fallback: the poster image stands in when the
                  CMS has no hero video. */}
              {getStrapiMediaURL(data?.heroVideo?.file) && (
                <source
                  src={getStrapiMediaURL(data?.heroVideo?.file)}
                  type="video/mp4"
                />
              )}
            </video>
            <img
              src={
                getStrapiMediaURL(data?.heroFallbackImage?.file) ??
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
              }
              alt={data?.heroFallbackImage_alt_text || "Institutional Data"}
              className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover"
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
            {data?.subheadline}
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <Leaf className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">{data?.credentials?.[0]?.label}</span>
          </motion.div>
          <div className="w-full h-px bg-white/20" />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">{data?.credentials?.[1]?.label}</span>
          </motion.div>
        </div>

        {/* Column 3: Light Block */}
        <div className="bg-[#32a99f] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#32a99f]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">{data?.credentials?.[2]?.label}</span>
              <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">{data?.credentials?.[3]?.label}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PerformanceHighlightsSection = ({ data }: { data?: PerformanceHighlightsSectionData }) => {
  const tabHighlightsLabel      = data?.tabHighlightsLabel ?? '';
  const tabFundPerformanceLabel = data?.tabFundPerformanceLabel ?? '';

  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (tabHighlightsLabel) setActiveTab(tabHighlightsLabel);
  }, [tabHighlightsLabel]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const highlights = data?.highlights ?? [];

  return (
    <section id="performance-highlights" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
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
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {data?.sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{data?.headingPrimary}</span><br />
              <span className="text-gray-400">{data?.headingSecondary}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 lg:w-5/12 md:flex md:justify-end"
          >
            <div className="flex flex-col md:items-end gap-4">
              <p className="text-lg text-gray-600 leading-relaxed max-w-md md:text-right">
                {data?.body}
              </p>
              {/* Parked for now — the CMS still supplies this label; uncomment to restore.
              <a href="#downloads" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded text-sm font-medium text-[#0A1224] hover:border-gray-300 hover:bg-gray-50 transition-colors w-max">
                {data?.viewAllLink} <ArrowUpRight className="w-4 h-4" />
              </a>
              */}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        {tabHighlightsLabel && tabFundPerformanceLabel && (
          <div className="flex gap-8 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar px-6 -mx-6 sm:px-0 sm:mx-0 pt-2">
            {[tabHighlightsLabel, tabFundPerformanceLabel].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab ? "text-[var(--color-accent)]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="perfActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === tabHighlightsLabel && (
              <motion.div
                key="highlights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px" }}
                  className="grid grid-cols-12 gap-6"
                >
                  {highlights.map((h, idx) => {
                    const colSpan = statGridSpan(idx, highlights.length);
                    return (
                      <motion.div
                        key={h.id}
                        variants={itemVariants}
                        className={`${colSpan} group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[240px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5`}
                      >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-4xl lg:text-5xl font-light text-[#0A1224] tracking-tight">{h.value}</h3>
                            <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">{h.label}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {activeTab === tabFundPerformanceLabel && (
              <motion.div
                key="fund-performance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <FundPerformanceChart
                  chartTitle={data?.chartTitle}
                  chartSubtitle={data?.chartDescription}
                  seriesNav={data?.chartSeriesNav}
                  seriesPerformance={data?.chartSeriesPerformance}
                  seriesDividend={data?.chartSeriesDividend}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const PerformanceReportsSection = ({ data }: { data?: PerformanceReportsSectionData }) => {
  const ReportCard = ({ report }: { report: PerformanceReportsSectionData['reports'][number] }) => {
    const isAnchor = report.link?.startsWith('#');
    return (
      <motion.div
        variants={fadeUp}
        className="group bg-[#0A1224] border border-white/10 rounded-lg p-8 flex flex-col h-full transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/20"
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300/60 mb-4">
          {report.category}
        </div>
        <h3 className="text-2xl font-light text-white mb-4">{report.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">{report.description}</p>
        <div className="w-full h-px bg-white/10 mb-6" />
        <div className="flex items-center justify-between">
          {isAnchor ? (
            <a href={report.link} className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors">
              {report.ctaLabel}
            </a>
          ) : (
            <Link href={report.link ?? '/'} className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors">
              {report.ctaLabel}
            </Link>
          )}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight className="w-5 h-5 text-[#0A1224]" />
          </div>
        </div>
      </motion.div>
    );
  };

  const reports = data?.reports ?? [];

  return (
    <section className="py-24 lg:py-32 bg-[#050914] text-white relative z-20">
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
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                {data?.sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-white">{data?.headingPrimary}</span><br />
              <span className="text-white/60">{data?.headingSecondary}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 lg:w-5/12 md:flex md:justify-end"
          >
            <p className="text-lg text-white/60 leading-relaxed max-w-md md:text-right">
              {data?.body}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reports.map((report, idx) => (
            <ReportCard key={report.id ?? idx} report={report} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const InvestorBaseSection = ({ data }: { data?: InvestorBaseSectionData }) => {
  const investorTypes = data?.investorTypes ?? [];

  return (
    <section id="investor-base" className="py-24 lg:py-32 bg-[#0A1224] text-white relative z-20">
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
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                {data?.sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-white">{data?.headingPrimary}</span><br />
              <span className="text-white/60">{data?.headingSecondary}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 lg:w-5/12 md:flex md:justify-end"
          >
            <p className="text-lg text-white/60 leading-relaxed max-w-md md:text-right">
              {data?.body}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {investorTypes.map((inv, idx) => {
            const Icon = TAG_ICON_MAP[inv.tag] ?? Landmark;
            return (
              <motion.div key={inv.id ?? idx} variants={fadeUp} className="group relative rounded-lg overflow-hidden h-[400px] cursor-pointer">
                <img
                  src={getStrapiMediaURL(inv.image?.file)}
                  alt={inv.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050A15]/40 via-[#050A15]/60 to-[#050A15]/95" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/10">
                      <Plus className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-45" />
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">
                      {inv.tag}
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-2">{inv.title}</h3>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <p className="text-white/70 text-sm leading-relaxed pt-2">{inv.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const DistributionHistorySection = ({ data }: { data?: DistributionHistorySectionData }) => {
  const tabHoldingsLabel     = data?.tabHoldingsLabel     ?? '';
  const tabDistributionLabel = data?.tabDistributionLabel ?? '';
  const seriesOneLabel       = data?.seriesOneLabel       ?? '';
  const seriesTwoLabel       = data?.seriesTwoLabel       ?? '';

  const [activeTab, setActiveTab]       = useState<string>('');
  const [activeSeries, setActiveSeries] = useState<string>('');

  useEffect(() => {
    if (tabHoldingsLabel) setActiveTab(tabHoldingsLabel);
    if (seriesOneLabel) setActiveSeries(seriesOneLabel);
  }, [tabHoldingsLabel, seriesOneLabel]);

  const holdingsForSeries = activeSeries === seriesTwoLabel
    ? (data?.seriesTwoHoldings ?? [])
    : (data?.seriesOneHoldings ?? []);

  const distributions = data?.distributionRecords ?? [];

  return (
    <section id="distribution-history" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
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
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {data?.sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{data?.headingPrimary}</span><br />
              <span className="text-gray-400">{data?.headingSecondary}</span>
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
              {data?.body}
            </p>
          </motion.div>
        </div>

        {tabHoldingsLabel && tabDistributionLabel && (
          <div className="flex gap-8 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar px-6 -mx-6 sm:px-0 sm:mx-0 pt-2">
            {[tabHoldingsLabel, tabDistributionLabel].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab ? "text-[var(--color-accent)]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="distActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === tabHoldingsLabel && (
              <motion.div
                key="holdings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-5xl mx-auto"
              >
                {seriesOneLabel && seriesTwoLabel && (
                  <div className="flex justify-end mb-6">
                    <div className="inline-flex bg-gray-100 p-1 rounded-lg">
                      {[seriesOneLabel, seriesTwoLabel].map((series) => (
                        <button
                          key={series}
                          onClick={() => setActiveSeries(series)}
                          className={cn(
                            "px-4 py-2 text-sm font-medium rounded-md transition-all",
                            activeSeries === series ? "bg-white text-[#0A1224] shadow-sm" : "text-gray-500 hover:text-gray-900"
                          )}
                        >
                          {series}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between md:grid md:grid-cols-12 gap-2 md:gap-4 py-3 md:py-4 border-b border-gray-300 mb-4 px-2 md:px-4">
                  <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-gray-400">{data?.holdingsColLogo}</div>
                  <div className="col-span-7 text-xs font-bold uppercase tracking-widest text-gray-400">{data?.holdingsColInvestorName}</div>
                  <div className="col-span-3 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">{data?.holdingsColHolding}</div>
                </div>

                <div className="flex flex-col gap-2">
                  {holdingsForSeries.map((investor, idx) => (
                    <div key={investor.id ?? idx} className="flex justify-between md:grid md:grid-cols-12 gap-2 md:gap-4 items-center py-3 md:py-4 px-2 md:px-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="col-span-2 flex items-center h-12">
                        {investor.logo ? (
                          <img src={getStrapiMediaURL(investor.logo)} alt={investor.name} className="h-8 w-12 md:h-10 md:w-16 object-contain" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-12 h-8 md:w-16 md:h-10 bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-wider font-bold">{data?.holdingsColLogo}</div>
                        )}
                      </div>
                      <div className="col-span-7 flex-1 min-w-0 md:flex-none">
                        <span className="text-sm md:text-lg font-medium text-[#0A1224]">{investor.name}</span>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-sm md:text-lg font-mono font-medium text-[var(--color-accent-green)]">{investor.holding}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === tabDistributionLabel && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-5xl mx-auto"
              >
                <div className="hidden md:grid grid-cols-4 gap-4 py-4 border-b border-gray-300 mb-4 px-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{data?.distributionColPeriod}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{data?.distributionColSeries}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{data?.distributionColAmount}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 text-right">{data?.distributionColStatus}</div>
                </div>

                <div className="flex flex-col gap-2">
                  {distributions.map((dist, idx) => (
                    <div key={dist.id ?? idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-6 px-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex flex-col md:block">
                        <span className="md:hidden text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{data?.distributionColPeriod}</span>
                        <span className="text-lg font-medium text-[#0A1224]">{dist.period}</span>
                      </div>
                      <div className="flex flex-col md:block">
                        <span className="md:hidden text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{data?.distributionColSeries}</span>
                        <span className="text-gray-600 font-light">{dist.series}</span>
                      </div>
                      <div className="flex flex-col md:block">
                        <span className="md:hidden text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{data?.distributionColAmountMobile}</span>
                        <span className="text-lg font-mono font-medium text-[#0A1224] tracking-tight">{dist.amount}</span>
                      </div>
                      <div className="flex flex-col md:items-end mt-2 md:mt-0">
                        <span className={cn(
                          "inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border",
                          dist.status === "Paid"
                            ? "bg-green-50/50 text-green-700 border-green-200/60"
                            : "bg-blue-50/50 text-blue-700 border-blue-200/60"
                        )}>
                          {dist.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const DownloadsSection = ({ data }: { data?: DownloadsSectionData }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [viewMoreCategories, setViewMoreCategories] = useState<Record<string, boolean>>({});

  const categories = data?.categories ?? [];

  useEffect(() => {
    if (categories.length) setExpandedCategory(categories[0].categoryName);
  }, [categories.length]);

  const toggleCategory = (name: string) => {
    setExpandedCategory(expandedCategory === name ? null : name);
  };

  const toggleViewMore = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewMoreCategories(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const downloadLabel = data?.downloadButtonLabel;
  const fileTypeLabel = data?.fileTypeLabel;
  const viewMoreLabel = data?.viewMoreLabel;
  const viewLessLabel = data?.viewLessLabel;

  return (
    <section id="downloads" className="py-24 lg:py-32 bg-[#050A15] text-white relative z-20">
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
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                {data?.sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-white">{data?.headingPrimary}</span>{' '}
              <span className="text-white/60">{data?.headingSecondary}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 lg:w-5/12 md:flex md:justify-end"
          >
            <p className="text-lg text-white/60 leading-relaxed max-w-md md:text-right">
              {data?.body}
            </p>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <AnimatePresence mode="popLayout">
            {categories.map((category, idx) => {
              const isExpanded = expandedCategory === category.categoryName;
              const isViewMore = viewMoreCategories[category.categoryName];
              // Documents with no uploaded file used to render as href="#"
              // download cards that did nothing when clicked. Drop them.
              const docs = (category.documents ?? []).filter((doc) => doc.fileUrl);
              const visibleDocs = isViewMore ? docs : docs.slice(0, 3);
              const hasMore = docs.length > 3;

              return (
                <motion.div
                  key={category.id ?? idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  className="border-b border-white/10"
                >
                  <button
                    onClick={() => toggleCategory(category.categoryName)}
                    className="w-full py-8 flex items-center justify-between group text-left"
                  >
                    <h3 className="text-2xl md:text-3xl font-light group-hover:translate-x-2 transition-transform duration-300">
                      {category.categoryName}
                    </h3>
                    <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-white text-black rotate-180' : 'group-hover:bg-white/10'}`}>
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                        className="overflow-hidden"
                      >
                        <div className="pb-12 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                              {visibleDocs.map((doc) => (
                                <motion.a
                                  key={doc.id ?? doc.name}
                                  layout
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.3 }}
                                  href={doc.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex flex-col p-6 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
                                >
                                  <div className="flex items-start justify-between mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent-green)] transition-colors" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex items-center gap-2 text-white/40 group-hover:text-[var(--color-accent-green)] transition-colors">
                                      <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">{downloadLabel}</span>
                                      <Download className="w-4 h-4" />
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-base font-medium text-white mb-2 leading-snug">{doc.name}</span>
                                    <div className="flex items-center gap-3 text-xs text-white/40 font-mono">
                                      <span>{doc.date}</span>
                                      <span className="w-1 h-1 rounded-full bg-white/20" />
                                      <span>{fileTypeLabel}</span>
                                      <span className="w-1 h-1 rounded-full bg-white/20" />
                                      <span>{doc.size}</span>
                                    </div>
                                  </div>
                                </motion.a>
                              ))}
                            </AnimatePresence>
                          </div>

                          {hasMore && (
                            <div className="mt-8 flex justify-center">
                              <button
                                onClick={(e) => toggleViewMore(category.categoryName, e)}
                                className="text-sm font-medium text-[var(--color-accent-green)] hover:text-white transition-colors flex items-center gap-2"
                              >
                                {isViewMore ? viewLessLabel : viewMoreLabel}
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const InvestorEnquiriesSection = ({ data }: { data?: InvestorEnquiriesSectionData }) => {
  const subjectOptions = data?.subjectOptions ?? [];

  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !institution || !email || !subject || !message) {
      setStatus('error');
      setStatusMessage('Please fill in all fields.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/investor-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          institution,
          email,
          subject,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage(result.message || 'Thank you! Your inquiry has been submitted.');
        setFullName('');
        setInstitution('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setStatusMessage('Failed to connect to the server. Please check your internet connection.');
    }
  };

  return (
    <section id="enquiries" className="py-24 lg:py-32 bg-[#F4F4F6] text-[#0A1224] relative z-20">
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
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {data?.sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{data?.headingPrimary}</span><br />
              <span className="text-gray-400">{data?.headingSecondary}</span>
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
              {data?.body}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col justify-center"
          >
            <motion.div variants={staggerContainer} className="flex flex-col gap-8">
              <motion.a variants={fadeUp} href={`mailto:${data?.email}`} className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{data?.emailLabel}</span>
                  <span className="block text-lg font-medium text-[#0A1224] group-hover:text-[var(--color-accent)] transition-colors">{data?.email}</span>
                </div>
              </motion.a>

{/* Phone */}
              {/* <motion.a variants={fadeUp} href={`tel:${(data?.phone ?? '').replace(/[\s()]/g, '')}`} className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{data?.phoneLabel}</span>
                  <span className="block text-lg font-medium text-[#0A1224] group-hover:text-[var(--color-accent)] transition-colors">{data?.phone}</span>
                </div>
              </motion.a> */}

              <motion.div variants={fadeUp} className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                  <MapPin className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{data?.officeLabel}</span>
                  <span className="block text-lg font-medium text-[#0A1224] leading-snug">
                    {data?.officeAddress}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={fadeUp}
            className="bg-white p-8 md:p-12 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-widest text-gray-500">{data?.fullNameLabel}</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all"
                    placeholder={data?.fullNamePlaceholder}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="institution" className="text-xs font-bold uppercase tracking-widest text-gray-500">{data?.institutionLabel}</label>
                  <input
                    type="text"
                    id="institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all"
                    placeholder={data?.institutionPlaceholder}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">{data?.workEmailLabel}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all"
                  placeholder={data?.workEmailPlaceholder}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500">{data?.subjectLabel}</label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all text-gray-700 appearance-none"
                >
                  <option value="">{data?.subjectDefaultOption}</option>
                  {subjectOptions.map((opt) => (
                    <option key={opt.id} value={opt.label}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">{data?.messageLabel}</label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all resize-none"
                  placeholder={data?.messagePlaceholder}
                ></textarea>
              </div>

              {statusMessage && (
                <div className={cn(
                  "p-4 rounded-lg text-sm transition-all",
                  status === 'success' ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
                )}>
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-4 w-full bg-[#0A1224] text-white rounded-lg px-6 py-4 text-sm font-medium hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Submitting...' : data?.submitLabel}
                <Send className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
