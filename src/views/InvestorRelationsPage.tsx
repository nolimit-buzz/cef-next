"use client";
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ShieldCheck, Leaf, TrendingUp,
  Download, FileText, Mail, Phone, Landmark, Briefcase, Shield, LineChart, MapPin, Send, Plus, Minus
} from 'lucide-react';
import Link from "next/link";
import Breadcrumbs from '../components/Breadcrumbs';
import { cn } from '../lib/utils';
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

export const InvestorRelationsPage = ({ sections }: { sections: InvestorRelationsPageSection[] }) => {
  const hero = sections.find(
    (s): s is HeroSectionData => s.__component === "investor-relations-page.hero-section",
  );
  const stickyNav = sections.find(
    (s): s is StickyNavSectionData => s.__component === "investor-relations-page.sticky-nav-section",
  );
  const performanceHighlights = sections.find(
    (s): s is PerformanceHighlightsSectionData =>
      s.__component === "investor-relations-page.performance-highlights-section",
  );
  const performanceReports = sections.find(
    (s): s is PerformanceReportsSectionData =>
      s.__component === "investor-relations-page.performance-reports-section",
  );
  const distributionHistory = sections.find(
    (s): s is DistributionHistorySectionData =>
      s.__component === "investor-relations-page.distribution-history-section",
  );
  const downloads = sections.find(
    (s): s is DownloadsSectionData => s.__component === "investor-relations-page.downloads-section",
  );
  const investorBase = sections.find(
    (s): s is InvestorBaseSectionData => s.__component === "investor-relations-page.investor-base-section",
  );
  const enquiries = sections.find(
    (s): s is InvestorEnquiriesSectionData =>
      s.__component === "investor-relations-page.investor-enquiries-section",
  );

  return (
    <main className="bg-white">
      {hero && <HeroSection {...hero} />}
      {stickyNav && <StickySubNav {...stickyNav} />}
      {performanceHighlights && <PerformanceHighlightsSection {...performanceHighlights} />}
      {performanceReports && <PerformanceReportsSection {...performanceReports} />}
      {distributionHistory && <DistributionHistorySection {...distributionHistory} />}
      {downloads && <DownloadsSection {...downloads} />}
      {investorBase && <InvestorBaseSection {...investorBase} />}
      {enquiries && <InvestorEnquiriesSection {...enquiries} />}
    </main>
  );
};

const navTargetIds = ['performance', 'distribution-history', 'downloads', 'investor-base', 'enquiries'];

const StickySubNav = ({ navItems }: StickyNavSectionData) => {
  const items = navItems.map((item, idx) => ({
    targetId: navTargetIds[idx % navTargetIds.length],
    label: item.label,
  }));

  const [activeSection, setActiveSection] = useState(items[0]?.targetId ?? navTargetIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for sticky nav

      for (const item of items) {
        const element = document.getElementById(item.targetId);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(item.targetId);
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
      const y = el.getBoundingClientRect().top + window.scrollY - 100; // Offset for sticky nav
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[57px] z-40 w-full bg-[#dae7fa]/80 backdrop-blur-md border-b border-gray-200 py-4 hidden md:block transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto no-scrollbar">
        {items.map(item => (
          <button
            key={item.targetId}
            onClick={() => scrollTo(item.targetId)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border",
              activeSection === item.targetId
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

const heroCredentialIcons = [Leaf, ShieldCheck];

const HeroSection = ({ badge, headingPrimary, headingSecondary, subheadline, credentials }: HeroSectionData) => {
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
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                {badge}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight">
              <span className="text-white">{headingPrimary}</span> <br className="hidden lg:block" /> <span className="text-white/50">{headingSecondary}</span>
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
              poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
              className="w-full h-full object-cover motion-reduce:hidden"
            >
              <source src="https://cdn.coverr.co/videos/coverr-office-buildings-in-the-city-4344/1080p.mp4" type="video/mp4" />
            </video>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
              alt="Institutional Data"
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
            {subheadline}
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10">
          {credentials.map((cred, idx) => {
            const Icon = heroCredentialIcons[idx % heroCredentialIcons.length];
            return (
              <div key={cred.id}>
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-white shrink-0" />
                  <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug whitespace-pre-line">{cred.label}</span>
                </motion.div>
                {idx < credentials.length - 1 && <div className="w-full h-px bg-white/20 mt-6" />}
              </div>
            );
          })}
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

const PerformanceHighlightsSection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  viewAllLink,
  tabHighlightsLabel,
  tabFundPerformanceLabel,
  chartTitle,
  chartDescription,
  highlights,
}: PerformanceHighlightsSectionData) => {
  const [activeTab, setActiveTab] = useState<'Highlights' | 'Fund Performance'>('Highlights');

  const tabs = [
    { key: 'Highlights' as const, label: tabHighlightsLabel },
    { key: 'Fund Performance' as const, label: tabFundPerformanceLabel },
  ];

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

  return (
    <section id="performance" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
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
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{headingPrimary}</span><br />
              <span className="text-gray-400">{headingSecondary}</span>
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
                {body}
              </p>
              <a href="#downloads" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded text-sm font-medium text-[#0A1224] hover:border-gray-300 hover:bg-gray-50 transition-colors w-max">
                {viewAllLink} <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar px-6 -mx-6 sm:px-0 sm:mx-0 pt-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                activeTab === tab.key ? "text-[var(--color-accent)]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="perfActiveTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'Highlights' && (
              <motion.div
                key="highlights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Bento Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px" }}
                  className="grid grid-cols-12 gap-6"
                >
                  {highlights.map((stat, idx) => {
                    const isTopRow = idx < 3;
                    return (
                      <motion.div
                        key={stat.id}
                        variants={itemVariants}
                        className={cn(
                          "col-span-12 group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[240px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5",
                          isTopRow ? "md:col-span-4" : "md:col-span-6",
                        )}
                      >
                        <div className={cn(
                          "absolute top-0 right-0 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none",
                          isTopRow ? "w-64 h-64" : "w-80 h-80",
                        )} />
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-4xl lg:text-5xl font-light text-[#0A1224] tracking-tight">{stat.value}</h3>
                            <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
                          </div>
                          <p className={cn("text-gray-500 text-sm leading-relaxed", isTopRow ? "max-w-[200px]" : "max-w-[250px]")}>{stat.label}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'Fund Performance' && (
              <motion.div
                key="fund-performance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-[#0A1224] mb-2">{chartTitle}</h3>
                  <p className="text-gray-500 text-sm">{chartDescription}</p>
                </div>
                <FundPerformanceChart />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const reportLinkConfig = [
  { link: '#performance', isWide: false },
  { link: '/fund', isWide: false },
  { link: '#downloads', isWide: false },
  { link: '/governance', isWide: true },
  { link: '/governance', isWide: false },
];

const PerformanceReportsSection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  reports,
}: PerformanceReportsSectionData) => {
  const ReportCard = ({ category, title, description, ctaLabel, link, isWide = false }: { category: string; title: string; description: string; ctaLabel: string; link: string; isWide?: boolean }) => (
    <motion.div
      variants={fadeUp}
      className={`group bg-[#0A1224] border border-white/10 rounded-lg p-8 flex flex-col h-full transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/20 ${isWide ? "md:col-span-2" : "col-span-1"}`}
    >
      {/* Eyebrow */}
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300/60 mb-4">
        {category}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-light text-white mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
        {description}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-white/10 mb-6" />

      {/* Footer CTA */}
      <div className="flex items-center justify-between">
        {link.startsWith('#') ? (
          <a href={link} className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors">
            {ctaLabel}
          </a>
        ) : (
          <Link href={link} className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors">
            {ctaLabel}
          </Link>
        )}
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <ArrowUpRight className="w-5 h-5 text-[#0A1224]" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-24 lg:py-32 bg-[#050914] text-white relative z-20">
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
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-white">{headingPrimary}</span><br />
              <span className="text-white/60">{headingSecondary}</span>
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
              {body}
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
          {reports.map((report, idx) => {
            const config = reportLinkConfig[idx % reportLinkConfig.length];
            return (
              <ReportCard
                key={report.id}
                category={report.category}
                title={report.title}
                description={report.description}
                ctaLabel={report.ctaLabel}
                link={config.link}
                isWide={config.isWide}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const investorBaseStyles = [
  { icon: Landmark, image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2000&auto=format&fit=crop" },
  { icon: Briefcase, image: "https://images.unsplash.com/photo-1508514177221-188b1c77eca2?q=80&w=2000&auto=format&fit=crop" },
  { icon: Shield, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" },
  { icon: LineChart, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" },
];

const InvestorBaseSection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  investorTypes,
}: InvestorBaseSectionData) => {
  return (
    <section id="investor-base" className="py-24 lg:py-32 bg-[#0A1224] text-white relative z-20">
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
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-white">{headingPrimary}</span><br />
              <span className="text-white/60">{headingSecondary}</span>
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
              {body}
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
            const { icon: Icon, image } = investorBaseStyles[idx % investorBaseStyles.length];
            return (
              <motion.div key={inv.id} variants={fadeUp} className="group relative rounded-lg overflow-hidden h-[400px] cursor-pointer">
                {/* Background Image & Overlay */}
                <img
                  src={image}
                  alt={inv.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050A15]/40 via-[#050A15]/60 to-[#050A15]/95" />

                {/* Content Container */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">

                  {/* Top Nav: Icon & Plus Button */}
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/10">
                      <Plus className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-45" />
                    </div>
                  </div>

                  {/* Bottom Content: Title & Reveal Description */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">
                      {inv.tag}
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-2">
                      {inv.title}
                    </h3>

                    {/* Smooth Reveal Container using CSS Grid */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <p className="text-white/70 text-sm leading-relaxed pt-2">
                          {inv.description}
                        </p>
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

const DistributionHistorySection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  tabDistributionLabel,
  tabHoldingsLabel,
  seriesOneLabel,
  seriesTwoLabel,
  distributionRecords,
  seriesOneHoldings,
  seriesTwoHoldings,
}: DistributionHistorySectionData) => {
  const [activeTab, setActiveTab] = useState<'holdings' | 'history'>('holdings');
  const [activeSeries, setActiveSeries] = useState<'Series One' | 'Series Two'>('Series One');

  const holdingsData = {
    'Series One': seriesOneHoldings,
    'Series Two': seriesTwoHoldings,
  };

  const seriesTabs = [
    { key: 'Series One' as const, label: seriesOneLabel },
    { key: 'Series Two' as const, label: seriesTwoLabel },
  ];

  return (
    <section id="distribution-history" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
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
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{headingPrimary}</span><br />
              <span className="text-gray-400">{headingSecondary}</span>
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
              {body}
            </p>
          </motion.div>
        </div>

        {/* Premium Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar px-6 -mx-6 sm:px-0 sm:mx-0 pt-2">
          {(['holdings', 'history'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                activeTab === tab ? "text-[var(--color-accent)]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === 'holdings' ? tabHoldingsLabel : tabDistributionLabel}
              {activeTab === tab && (
                <motion.div
                  layoutId="distActiveTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'holdings' && (
              <motion.div
                key="holdings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-5xl mx-auto"
              >
                {/* Series Filter Toggle */}
                <div className="flex justify-end mb-6">
                  <div className="inline-flex bg-gray-100 p-1 rounded-lg">
                    {seriesTabs.map((series) => (
                      <button
                        key={series.key}
                        onClick={() => setActiveSeries(series.key)}
                        className={cn(
                          "px-4 py-2 text-sm font-medium rounded-md transition-all",
                          activeSeries === series.key ? "bg-white text-[#0A1224] shadow-sm" : "text-gray-500 hover:text-gray-900"
                        )}
                      >
                        {series.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-gray-300 mb-4 px-4">
                  <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-gray-400">Logo</div>
                  <div className="col-span-7 text-xs font-bold uppercase tracking-widest text-gray-400">Investor Name</div>
                  <div className="col-span-3 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">% Holding</div>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col gap-2">
                  {holdingsData[activeSeries].map((investor) => (
                    <div key={investor.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="col-span-2 flex items-center h-12">
                        <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-wider font-bold">Logo</div>
                      </div>
                      <div className="col-span-7">
                        <span className="text-lg font-medium text-[#0A1224]">{investor.name}</span>
                      </div>
                      <div className="col-span-3 md:text-right">
                        <span className="md:hidden text-xs font-bold uppercase tracking-widest text-gray-400 mr-2">Holding:</span>
                        <span className="text-lg font-mono font-medium text-[var(--color-accent-green)]">{investor.holding}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-5xl mx-auto"
              >
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-4 gap-4 py-4 border-b border-gray-300 mb-4 px-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Period</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Fund Series</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Distribution Amount</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Status</div>
                </div>

                {/* Data Rows */}
                <div className="flex flex-col gap-2">
                  {distributionRecords.map((dist) => (
                    <div key={dist.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-6 px-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex flex-col md:block">
                        <span className="md:hidden text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Period</span>
                        <span className="text-lg font-medium text-[#0A1224]">{dist.period}</span>
                      </div>
                      <div className="flex flex-col md:block">
                        <span className="md:hidden text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Fund Series</span>
                        <span className="text-gray-600 font-light">{dist.series}</span>
                      </div>
                      <div className="flex flex-col md:block">
                        <span className="md:hidden text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Amount</span>
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

const DownloadsSection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  categories,
}: DownloadsSectionData) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]?.categoryName ?? null);
  const [viewMoreCategories, setViewMoreCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const toggleViewMore = (categoryName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewMoreCategories(prev => ({ ...prev, [categoryName]: !prev[categoryName] }));
  };

  return (
    <section id="downloads" className="py-24 lg:py-32 bg-[#050A15] text-white relative z-20">
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
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-white">{headingPrimary}</span> <span className="text-white/60">{headingSecondary}</span>
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
              {body}
            </p>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <AnimatePresence mode="popLayout">
            {categories.map((category) => {
              const isExpanded = expandedCategory === category.categoryName;
              const isViewMore = viewMoreCategories[category.categoryName];
              const visibleItems = isViewMore ? category.documents : category.documents.slice(0, 3);
              const hasMore = category.documents.length > 3;

              return (
                <motion.div
                  key={category.id}
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
                              {visibleItems.map((item) => (
                                <motion.a
                                  key={item.id}
                                  layout
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.3 }}
                                  href="#"
                                  className="group flex flex-col p-6 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
                                >
                                  <div className="flex items-start justify-between mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent-green)] transition-colors" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex items-center gap-2 text-white/40 group-hover:text-[var(--color-accent-green)] transition-colors">
                                      <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">Download</span>
                                      <Download className="w-4 h-4" />
                                    </div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-base font-medium text-white mb-2 leading-snug">{item.name}</span>
                                    <div className="flex items-center gap-3 text-xs text-white/40 font-mono">
                                      <span>{item.date}</span>
                                      <span className="w-1 h-1 rounded-full bg-white/20" />
                                      <span>PDF</span>
                                      <span className="w-1 h-1 rounded-full bg-white/20" />
                                      <span>{item.size}</span>
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
                                {isViewMore ? 'View Less' : 'View More'}
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

const InvestorEnquiriesSection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  email,
  emailLabel,
  phone,
  phoneLabel,
  officeAddress,
  officeLabel,
  fullNameLabel,
  fullNamePlaceholder,
  institutionLabel,
  institutionPlaceholder,
  workEmailLabel,
  workEmailPlaceholder,
  subjectLabel,
  subjectDefaultOption,
  subjectOptions,
  messageLabel,
  messagePlaceholder,
  submitLabel,
}: InvestorEnquiriesSectionData) => {
  const telHref = `tel:${phone.replace(/[^+\d]/g, '')}`;

  return (
    <section id="enquiries" className="py-24 lg:py-32 bg-[#F4F4F6] text-[#0A1224] relative z-20">
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
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{headingPrimary}</span><br />
              <span className="text-gray-400">{headingSecondary}</span>
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
              {body}
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
              <motion.a variants={fadeUp} href={`mailto:${email}`} className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{emailLabel}</span>
                  <span className="block text-lg font-medium text-[#0A1224] group-hover:text-[var(--color-accent)] transition-colors">{email}</span>
                </div>
              </motion.a>

              <motion.a variants={fadeUp} href={telHref} className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{phoneLabel}</span>
                  <span className="block text-lg font-medium text-[#0A1224] group-hover:text-[var(--color-accent)] transition-colors">{phone}</span>
                </div>
              </motion.a>

              <motion.div variants={fadeUp} className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                  <MapPin className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{officeLabel}</span>
                  <span className="block text-lg font-medium text-[#0A1224] leading-snug whitespace-pre-line">
                    {officeAddress}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Minimalist Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={fadeUp}
            className="bg-white p-8 md:p-12 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-widest text-gray-500">{fullNameLabel}</label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all"
                    placeholder={fullNamePlaceholder}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="institution" className="text-xs font-bold uppercase tracking-widest text-gray-500">{institutionLabel}</label>
                  <input
                    type="text"
                    id="institution"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all"
                    placeholder={institutionPlaceholder}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">{workEmailLabel}</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all"
                  placeholder={workEmailPlaceholder}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500">{subjectLabel}</label>
                <select
                  id="subject"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all text-gray-700 appearance-none"
                >
                  <option value="">{subjectDefaultOption}</option>
                  {subjectOptions.map((opt) => (
                    <option key={opt.id} value={opt.label}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">{messageLabel}</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all resize-none"
                  placeholder={messagePlaceholder}
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-[#0A1224] text-white rounded-lg px-6 py-4 text-sm font-medium hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center gap-2 group"
              >
                {submitLabel}
                <Send className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
