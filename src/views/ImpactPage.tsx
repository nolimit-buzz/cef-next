"use client";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Leaf,
  Users,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import Breadcrumbs from "../components/Breadcrumbs";
import { SDGMap } from "../components/SDGMap";
import type {
  ImpactPageSection,
  HeroSection as HeroSectionData,
  ImpactStatementSection as ImpactStatementSectionData,
  ImpactBodySection as ImpactBodySectionData,
  CorePillarsSection as CorePillarsSectionData,
  CaseStudySpotlightSection as CaseStudySpotlightSectionData,
} from "../types/impact";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const ImpactPage = ({ sections }: { sections: ImpactPageSection[] }) => {
  const hero = sections.find(
    (s): s is HeroSectionData => s.__component === "impact-page.hero-section",
  );
  const statement = sections.find(
    (s): s is ImpactStatementSectionData =>
      s.__component === "impact-page.impact-statement-section",
  );
  const body = sections.find(
    (s): s is ImpactBodySectionData => s.__component === "impact-page.impact-body-section",
  );
  const pillars = sections.find(
    (s): s is CorePillarsSectionData => s.__component === "impact-page.core-pillars-section",
  );
  const caseStudy = sections.find(
    (s): s is CaseStudySpotlightSectionData =>
      s.__component === "impact-page.case-study-spotlight-section",
  );

  return (
    <main className="bg-white">
      {hero && <HeroSection {...hero} />}
      {statement && <ImpactStatementSection {...statement} />}
      {body && <ImpactBodySection {...body} />}
      <SDGMap />
      {pillars && <CorePillarsSection {...pillars} />}
      {caseStudy && <CaseStudySpotlight {...caseStudy} />}
    </main>
  );
};

const heroFeatureIcons = [ShieldCheck, Leaf];

const HeroSection = ({
  badge,
  headingPrimary,
  headingSecondary,
  subheadline,
  features,
  statLabel,
  statValue,
}: HeroSectionData) => {
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
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-3 mb-6 lg:mb-8 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full"
            >
              <span className="text-base text-[var(--color-accent-green)]">
                <Leaf className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                {badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight"
            >
              <span className="text-white">{headingPrimary}</span> <br className="hidden lg:block" /> <span className="text-white/50">{headingSecondary}</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Column: Image Background */}
        <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent z-10 lg:block hidden" />
          <img
            src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2670&auto=format&fit=crop"
            alt="Clean Energy Impact"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Bottom Tier: 3-Column Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 z-20 relative shrink-0 mb-40">
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
          {features.map((feature, idx) => {
            const Icon = heroFeatureIcons[idx % heroFeatureIcons.length];
            return (
              <div key={feature.id}>
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-white shrink-0" />
                  <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug whitespace-pre-line">
                    {feature.label}
                  </span>
                </motion.div>
                {idx < features.length - 1 && <div className="w-full h-px bg-white/20 mt-6" />}
              </div>
            );
          })}
        </div>

        {/* Column 3: Light Block */}
        <div className="bg-[#50B848] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#50B848]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">{statLabel}</span>
              <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">{statValue}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ImpactStatementSection = ({
  headingPrimary,
  headingSecondary,
  body,
  ctaPrimary,
  ctaSecondary,
}: ImpactStatementSectionData) => {
  return (
    <section className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <h2 className="text-[32px] md:text-4xl lg:text-[40px] font-medium leading-[1.15] tracking-tight mb-8">
              <span className="text-[#0A1224]">{headingPrimary}</span><br/>
              <span className="text-gray-400">{headingSecondary}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-10">
              {body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#report"
                className="bg-[#0A1224] text-white hover:bg-[#0094da] px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg w-max"
              >
                {ctaPrimary} <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#methodology"
                className="border border-gray-200 text-[#0A1224] hover:bg-gray-50 px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 w-max"
              >
                {ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ImpactBodySection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  methodologyLink,
  stats,
}: ImpactBodySectionData) => {
  return (
    <section className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Reference Image Style Split Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16 lg:mb-24 border-b border-gray-200 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 lg:w-5/12"
          >
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
              {sectionLabel}
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-[#0A1224]">
              {headingPrimary} <br />
              <span className="text-gray-400">{headingSecondary}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 lg:w-6/12"
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {body}
            </p>
            <a
              href="#methodology"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-accent)] hover:text-blue-800 transition-colors border-b-2 border-transparent hover:border-blue-800 pb-1"
            >
              {methodologyLink} <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* 6-Grid Bento Stats (Matching IR Styles) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat, idx) => {
            const isLast = idx === stats.length - 1;

            if (isLast) {
              return (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  className="group relative bg-[var(--color-background)] border border-[#1A2644] p-8 flex flex-col justify-between min-h-[260px] overflow-hidden transition-all duration-500 hover:border-blue-400/60 hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=1000&auto=format&fit=crop')] opacity-10 bg-cover mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent opacity-90 z-0" />
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-6">
                      {stat.label}
                    </div>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-5xl font-light text-white tracking-tight">
                          {stat.value}
                        </h3>
                        <ArrowUpRight
                          className="w-6 h-6 text-white/50 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed pr-6">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[260px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                    {stat.label}
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-5xl font-light text-[#0A1224] tracking-tight">
                        {stat.value}
                      </h3>
                      <ArrowUpRight
                        className="w-6 h-6 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed pr-6">
                      {stat.description}
                    </p>
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

const pillarStyles = [
  { icon: Leaf, color: "text-[#50B848]", bg: "bg-[#50B848]/10" },
  { icon: Users, color: "text-[#0085CA]", bg: "bg-[#0085CA]/10" },
  { icon: TrendingUp, color: "text-[#FCC30B]", bg: "bg-[#FCC30B]/10" },
];

const CorePillarsSection = ({ heading, description, pillars }: CorePillarsSectionData) => {
  return (
    <section className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight mb-6">
            {heading}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {pillars.map((pillar, idx) => {
            const { icon: Icon, color, bg } = pillarStyles[idx % pillarStyles.length];
            return (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                className="flex flex-col"
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8",
                    bg,
                  )}
                >
                  <Icon className={cn("w-8 h-8", color)} />
                </div>
                <h3 className="text-2xl font-medium mb-6">{pillar.title}</h3>
                <ul className="space-y-4 flex-1">
                  {pillar.points.map((point) => (
                    <li key={point.id} className="flex items-start gap-4">
                      <div className="mt-1 shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-gray-300" />
                      </div>
                      <span className="text-gray-600 leading-relaxed">
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const CaseStudySpotlight = ({ badge, heading, body, stats, ctaLabel }: CaseStudySpotlightSectionData) => {
  return (
    <section className="bg-[#050A15] border-t border-white/10 text-white flex flex-col lg:flex-row min-h-[600px] relative z-20">
      {/* Left Image (50%) */}
      <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1584281720894-3ee1d5750fc2?q=80&w=2000&auto=format&fit=crop"
          alt="Solar impact on community"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050A15]/80 lg:to-[#050A15] z-10" />
      </div>

      {/* Right Content (50%) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-20 lg:p-24 relative z-20 bg-[#050A15]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded border border-white/10 text-xs font-bold uppercase tracking-widest text-[#0085CA] mb-8">
            {badge}
          </div>

          <h2 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight text-white mb-6">
            {heading}
          </h2>

          <p className="text-white/70 leading-relaxed mb-10 text-lg">
            {body}
          </p>

          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-8 mb-10 border-t border-white/10 pt-8">
              {stats.map((stat, idx) => (
                <div key={stat.id}>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                    {stat.label}
                  </div>
                  <div className={cn("text-3xl font-light", idx === 0 ? "text-white" : "text-[#50B848]")}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-white/70 transition-colors border-b-2 border-transparent hover:border-white/50 pb-1 w-max"
          >
            {ctaLabel} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
