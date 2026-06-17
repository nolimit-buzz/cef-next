"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowUpRight, ShieldCheck, TrendingUp, CheckCircle2, Building2, FileText, Settings, BarChart } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import type {
  EligibilityPageSection,
  EligibilityHeroSection,
  EligibilityStatementSection,
  EligibilityCriteriaSection,
  EligibilityProcessSection,
} from "../types/eligibility";

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

function find<T extends EligibilityPageSection>(
  sections: EligibilityPageSection[],
  component: T["__component"],
): T | undefined {
  return sections.find((s) => s.__component === component) as T | undefined;
}

export const EligibilityPage = ({ sections }: { sections: EligibilityPageSection[] }) => {
  const hero = find<EligibilityHeroSection>(sections, "eligibility-page.hero-section");
  const statement = find<EligibilityStatementSection>(sections, "eligibility-page.statement-section");
  const criteria = find<EligibilityCriteriaSection>(sections, "eligibility-page.criteria-section");
  const process = find<EligibilityProcessSection>(sections, "eligibility-page.process-section");

  return (
    <main className="bg-white">
      <HeroSection cms={hero} />
      <EligibilityStatementSection cms={statement} />
      <CriteriaSection cms={criteria} />
      <ProcessSection cms={process} />
    </main>
  );
};

const HeroSection = ({ cms }: { cms?: EligibilityHeroSection }) => {
  const badges = (cms?.heroBadges ?? []).map((b) => b.label);

  return (
<section className="relative bg-[var(--color-background)] flex flex-col  lg:h-screen lg:min-h-[700px] lg:max-h-[1080px]">      {/* Top Tier: Split Hero */}
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
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                {cms?.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight"
            >
              <span className="text-white">{cms?.headingPrimary}</span>{" "}
              <br className="hidden lg:block" />
              <span className="text-white/50">
                {cms?.headingSecondary}
              </span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Column: Image Background */}
        <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent z-10 lg:block hidden" />
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2670&auto=format&fit=crop"
            alt="Eligibility Criteria"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
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
            {cms?.subHeadline}
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block — driven by heroBadges */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10">
          {badges.map((label, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="w-full h-px bg-white/20" />}
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
                <Settings className="w-8 h-8 text-white shrink-0" />
                <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">
                  {label}
                </span>
              </motion.div>
            </React.Fragment>
          ))}
        </div>

        {/* Column 3: Capacity Block */}
        <div className="bg-[#50B848] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#50B848]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <Building2 className="w-10 h-10 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">
                {cms?.capacityLabel}
              </span>
              <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">
                {cms?.capacityValue}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const EligibilityStatementSection = ({ cms }: { cms?: EligibilityStatementSection }) => {
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
              <span className="text-[#0A1224]">{cms?.headingPrimary}</span><br/>
              <span className="text-gray-400">{cms?.headingSecondary}</span>
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
              {cms?.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#apply"
                className="bg-[#0A1224] text-white hover:bg-[#0094da] px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg w-max"
              >
                {cms?.ctaPrimary} <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#criteria"
                className="border border-gray-200 text-[#0A1224] hover:bg-gray-50 px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 w-max"
              >
                {cms?.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CRITERIA_ICONS = [Building2, Settings, BarChart, Leaf, ShieldCheck, FileText, TrendingUp];

const CriteriaSection = ({ cms }: { cms?: EligibilityCriteriaSection }) => {
  const criteriaList = (cms?.criteria ?? []).map((c, i) => ({
    title: c.title,
    description: c.description,
    icon: CRITERIA_ICONS[i] ?? Building2,
  }));

  return (
    <section id="criteria" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16 lg:mb-24 border-b border-gray-200 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 lg:w-5/12"
          >
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
              {cms?.sectionLabel}
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-[#0A1224]">
              {cms?.headingPrimary} <br />
              <span className="text-gray-400">{cms?.headingSecondary}</span>
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
              {cms?.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {criteriaList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative bg-[#F8FAFC] border border-gray-200/60 p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-md hover:border-blue-200/60"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-blue-100/50 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-[#0A1224] tracking-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const ProcessSection = ({ cms }: { cms?: EligibilityProcessSection }) => {
  const steps = cms?.steps ?? [];

  return (
    <section className="py-24 lg:py-32 bg-[#050A15] text-white relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24 text-center max-w-3xl mx-auto"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-green)] mb-4">
            {cms?.sectionLabel}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-6">
            {cms?.heading}
          </h2>
          <p className="text-white/60 leading-relaxed text-lg">
            {cms?.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative p-6 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl font-light text-[var(--color-accent-green)] mb-6 opacity-80">
                {step.num}
              </div>
              <h3 className="text-xl font-medium mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
