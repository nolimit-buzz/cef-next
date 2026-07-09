"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Target,
  TrendingUp,
  CheckCircle2,
  Leaf,
  Users,
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from '../components/Breadcrumbs';
import { cn } from '../lib/utils';
import { GradientCard } from '../components/GradientCard';
import { TransactionPartiesGrid } from '../components/TransactionParties';
import type { TransactionPartyItem } from '../types/about';

const FUND_MANAGER_PARTIES: TransactionPartyItem[] = [
  { id: 1, partyName: 'KPMG', roleHighlight: 'Auditors', roleRest: 'to the Fund', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/db/KPMG_blue_logo.svg', logo_alt_text: 'KPMG' },
  { id: 2, partyName: 'Olaniwun Ajayi', roleHighlight: 'Solicitors', roleRest: 'to The Fund' },
  { id: 3, partyName: 'Africa Prudential', roleHighlight: 'Registrar', roleRest: 'to the Fund' },
  { id: 4, partyName: 'UBA', roleHighlight: 'Custodian', roleRest: 'to The Fund', logo: 'https://www.ubagroup.com/wp-content/uploads/2025/03/UBA-58567.svg', logo_alt_text: 'UBA' },
  { id: 5, partyName: 'Stanbic IBTC', roleHighlight: 'Trustee', roleRest: 'to The Fund' },
  { id: 6, partyName: 'FSDH Capital', roleHighlight: 'Fund Adviser /', roleRest: 'Issuing House' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Structural section IDs — CMS nav-item schema only stores label, not scroll target
const SECTION_IDS = ["investment-committee", "fund-managers", "strategy", "governance-impact"];

// Icon + background config for performance stat cards (indexed by position)
const STAT_CARD_CONFIGS = [
  { bg: "bg-[#EBF3FF]", icon: <Target className="w-5 h-5 text-[var(--color-accent)]" /> },
  { bg: "bg-[#F0FDF4]", icon: <ShieldCheck className="w-5 h-5 text-[var(--color-accent-green)]" /> },
  { bg: "bg-[#F8F9FA]", icon: <TrendingUp className="w-5 h-5 text-gray-600" /> },
  { bg: "bg-[#FFF8EB]", icon: <CheckCircle2 className="w-5 h-5 text-orange-500" /> },
];

const HeroSection = ({
  headingPrimary,
  headingSecondary,
  subheadline,
  badge1Label,
  badge2Label,
  ratingLabel,
  ratingValue,
}: HeroSectionData) => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative bg-[var(--color-background)] flex flex-col  lg:h-screen lg:min-h-[700px] lg:max-h-[1080px]">
      {" "}
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
            <motion.h1
              variants={fadeUp}
              className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight"
            >
              <span className="text-white">{headingPrimary}</span>{" "}
              <br className="hidden lg:block" />{" "}
              <span className="text-white/50">{headingSecondary}</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Column: Image Background */}
        <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full">
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop"
              alt="Corporate Boardroom"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent z-10 lg:block hidden" />
          </motion.div>
        </div>
      </div>
      {/* Bottom Tier: 3-Column Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 z-20 relative shrink-0">
        {/* Column 1: Sub-headline */}
        <div className="lg:col-span-2 bg-[var(--color-surface)] p-8 lg:py-12 xl:py-14 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12 border-t border-r border-white/5 flex items-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-white/80 text-lg leading-relaxed font-light"
          >
            {subheadline}
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-4"
          >
            <Leaf className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">
              {badge1Label}
            </span>
          </motion.div>
          <div className="w-full h-px bg-white/20" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-4"
          >
            <ShieldCheck className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">
              {badge2Label}
            </span>
          </motion.div>
        </div>

        {/* Column 3: Light Block */}
        <div className="bg-[#32a99f] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#32a99f]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-4"
          >
            <TrendingUp className="w-10 h-10 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">
                {ratingLabel}
              </span>
              <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">
                {ratingValue}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InvestmentCommitteeSection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  members,
}: InvestmentCommitteeSectionData) => {
  return (
    <section
      id="investment-committee"
      className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20"
    >
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
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{headingPrimary}</span>{" "}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {members.map((member, i) => {
            const nameParts = member.name.split(" ");
            const firstName = nameParts.slice(0, -1).join(" ");
            const lastName = nameParts[nameParts.length - 1];
            const photoSrc = member.photo ? getStrapiURL(member.photo.url) : "";

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                className={`group relative rounded-[8px] overflow-hidden h-[360px] cursor-pointer items-center justify-center`}
              >
                {/* Background Image */}
                <img
                  src={photoSrc}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale"
                  referrerPolicy="no-referrer"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#050A15]/40 group-hover:bg-[#050A15]/80 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-transparent to-transparent opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="font-bold text-xl text-white">
                      {firstName}{" "}
                      <span className="text-[var(--color-accent-green)]">
                        {lastName}
                      </span>
                    </h3>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-accent-green)] transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>

                  {/* Snippet (Always visible) */}
                  <p className="text-sm text-gray-300 line-clamp-1 group-hover:hidden transition-all duration-300">
                    {member.bio.split(".")[0]}
                  </p>

                  {/* Full Description (Visible on hover) */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-2">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {member.bio}
                    </p>
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

const InvestmentStrategySection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  thesisHeading,
  thesisBody,
  thesisChartTitle,
  thesisChartLabel,
  thesisChartActualLabel,
  riskHeading,
  riskBody,
  riskChartTitle,
  riskChartBadge,
  riskChartValue,
  performanceHeading,
  performanceBody,
  performanceChartTitle,
  performanceChartCta,
  performanceTooltipTitle,
  performanceTooltipSub,
  performanceStats,
}: InvestmentStrategySectionData) => {
  return (
    <section
      id="strategy"
      className="py-24 lg:py-32 bg-[#F8F9FA] text-[#0A1224] relative z-20 border-t border-gray-200"
    >
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
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{headingPrimary}</span>
              <br />
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {/* Investment Thesis */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 p-8 md:p-10 rounded-[8px] flex flex-col"
          >
            <h3 className="text-2xl font-medium mb-4 text-[#0A1224]">
              {thesisHeading}
            </h3>
            <p className="text-slate-600 font-light leading-relaxed mb-8">
              {thesisBody}
            </p>

            {/* Custom Dashboard Widget: Line Chart */}
            <div className="mt-auto border border-gray-100 rounded-[8px] p-6 relative overflow-hidden bg-gray-50/50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-semibold text-[#0A1224]">
                  {thesisChartTitle}
                </h4>
                <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                  {thesisChartLabel}
                </span>
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
                  <svg
                    viewBox="0 0 400 100"
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    {/* Grid lines */}
                    <line
                      x1="0"
                      y1="0"
                      x2="400"
                      y2="0"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="0"
                      y1="50"
                      x2="400"
                      y2="50"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="0"
                      y1="100"
                      x2="400"
                      y2="100"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />

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
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut" as const,
                        delay: 0.2,
                      }}
                    />

                    {/* Tooltip Marker */}
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, duration: 0.3 }}
                    >
                      <line
                        x1="150"
                        y1="20"
                        x2="150"
                        y2="100"
                        stroke="var(--color-accent-green)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <circle
                        cx="150"
                        cy="20"
                        r="4"
                        fill="white"
                        stroke="var(--color-accent-green)"
                        strokeWidth="2"
                      />
                      <rect
                        x="110"
                        y="-15"
                        width="80"
                        height="24"
                        rx="12"
                        fill="#0A1224"
                      />
                      <text
                        x="150"
                        y="0"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {thesisChartActualLabel}
                      </text>
                    </motion.g>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Mitigation Strategies */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 p-8 md:p-10 rounded-[8px] flex flex-col"
          >
            <h3 className="text-2xl font-medium mb-4 text-[#0A1224]">
              {riskHeading}
            </h3>
            <p className="text-slate-600 font-light leading-relaxed mb-8">
              {riskBody}
            </p>

            {/* Custom Dashboard Widget: Area Chart */}
            <div className="mt-auto border border-gray-100 rounded-[8px] p-6 relative overflow-hidden bg-gray-50/50">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-semibold text-[#0A1224]">
                  {riskChartTitle}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#0A1224]">
                    {riskChartValue}
                  </span>
                  <span className="text-[10px] font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    {riskChartBadge}
                  </span>
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
                  <svg
                    viewBox="0 0 400 100"
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    {/* Grid lines */}
                    <line
                      x1="0"
                      y1="25"
                      x2="400"
                      y2="25"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="50"
                      x2="400"
                      y2="50"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="75"
                      x2="400"
                      y2="75"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />

                    {/* Area Gradient */}
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--color-accent-green)"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--color-accent-green)"
                          stopOpacity="0"
                        />
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

          {/* Performance Highlights (Full Width) */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-2 bg-white border border-gray-100 p-8 md:p-10 rounded-[8px] flex flex-col lg:flex-row gap-12"
          >
            <div className="w-full lg:w-1/2 flex flex-col">
              <h3 className="text-3xl font-medium mb-4 text-[#0A1224]">
                {performanceHeading}
              </h3>
              <p className="text-slate-600 font-light leading-relaxed mb-10">
                {performanceBody}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                {performanceStats.map((stat, i) => {
                  const config = STAT_CARD_CONFIGS[i] ?? STAT_CARD_CONFIGS[0];
                  return (
                    <div
                      key={stat.id}
                      className={`${config.bg} p-6 rounded-[8px] flex flex-col h-[160px]`}
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-auto shadow-sm">
                        {config.icon}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-2xl font-bold text-[#0A1224]">
                        {stat.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Dashboard Widget: Bar Chart */}
            <div className="w-full lg:w-1/2 border border-gray-100 rounded-[8px] p-6 relative overflow-hidden bg-gray-50/50 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-sm font-semibold text-[#0A1224]">
                  {performanceChartTitle}
                </h4>
                <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                  {performanceChartCta}
                </span>
              </div>

              <div className="relative flex-1 flex items-end justify-between gap-2 px-2 pb-6 pt-12">
                {/* Y-axis line */}
                <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-300" />

                {/* Bars */}
                {[
                  { height: "40%", label: "2020", active: false },
                  { height: "85%", label: "2021", active: true },
                  { height: "35%", label: "2022", active: false },
                  { height: "60%", label: "2023", active: false },
                  { height: "45%", label: "2024", active: false },
                  {
                    height: "55%",
                    label: "2025",
                    active: false,
                    outline: true,
                  },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="relative flex flex-col items-center w-full max-w-[48px] group"
                  >
                    {/* Tooltip for active bar */}
                    {bar.active && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0A1224] text-white text-[10px] p-2 rounded-lg whitespace-nowrap z-10 shadow-xl"
                      >
                        <div className="font-semibold mb-1">
                          {performanceTooltipTitle}
                        </div>
                        <div className="flex items-center gap-1 text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)]" />
                          {performanceTooltipSub}
                        </div>
                        {/* Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A1224] rotate-45" />
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: bar.height }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: "easeOut" as const,
                      }}
                      className={`w-full rounded-t-lg ${
                        bar.active
                          ? "bg-[var(--color-accent-green)] shadow-lg"
                          : bar.outline
                            ? "bg-transparent border-2 border-dashed border-[var(--color-accent-green)]/40"
                            : "bg-[var(--color-accent-green)]/10"
                      }`}
                    />
                    <span className="absolute -bottom-6 text-[10px] text-gray-400 font-medium">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const GovernanceImpactSection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  sdg1Title,
  sdg1Description,
  sdg2Title,
  sdg2Subtitle,
  sdg2Quote,
}: GovernanceImpactSectionData) => {
  return (
    <section
      id="governance-impact"
      className="py-24 bg-[#F8F9FA] relative z-20 border-t border-gray-200"
    >
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
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{headingPrimary}</span>
              <br />
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

        {/* Impact & SDGs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              className="flex items-start gap-4 mb-6"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-green)]/10 flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6 text-[var(--color-accent-green)]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0A1224] text-lg">
                  {sdg1Title}
                </h4>
                <p className="text-gray-600">{sdg1Description}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="bg-white border border-[var(--color-accent)]/20 p-8 md:p-10 rounded-[8px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-light)]/10 rounded-full blur-3xl" />
            <div className="flex items-start gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <div>
                <h4 className="font-bold text-[#0A1224] text-xl">{sdg2Title}</h4>
                <p className="text-[var(--color-accent)] font-medium">
                  {sdg2Subtitle}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed relative z-10 italic">
              &quot;{sdg2Quote}&quot;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StickySubNav = ({ navItems }: StickySubNavSectionData) => {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);

  // Map CMS labels to structural section IDs by position
  const navLinks = navItems.map((item, i) => ({
    id: SECTION_IDS[i] ?? "",
    label: item.label,
  }));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  // navLinks is derived from stable props and won't change after mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[57px] z-40 w-full bg-[#dae7fa]/80 backdrop-blur-md border-b border-gray-200 py-4 hidden md:block transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto no-scrollbar">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border",
              activeSection === link.id
                ? "bg-[#32a99f] border-transparent text-white shadow-sm"
                : "bg-transparent border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900",
            )}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const FundManagersSection = ({
  sectionLabel,
  headingPrimary,
  headingSecondary,
  body,
  cta,
}: FundManagersSectionData) => {
  return (
    <section
      id="fund-managers"
      className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between items-end mb-16">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight mb-6">
              {headingPrimary}
              <br />
              <span className="text-gray-400">{headingSecondary}</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              {body}
            </p>
          </div>
          <div className="w-full lg:w-1/3 flex lg:justify-end pb-2">
            <Link
              href="/about#team"
              className="px-6 py-3 rounded-lg border border-gray-200 text-[#0A1224] text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {cta}
            </Link>
          </div>
        </div>

        <TransactionPartiesGrid parties={FUND_MANAGER_PARTIES} />

      </div>
    </section>
  );
};

export const GovernancePage = ({ sections }: { sections: GovernancePageSection[] }) => {
  return (
    <main className="bg-white">
      {sections.map((section) => {
        const key = `${section.__component}-${section.id}`;
        switch (section.__component) {
          case "governance-page.hero-section":
            return <HeroSection key={key} {...section} />;
          case "governance-page.sticky-sub-nav-section":
            return <StickySubNav key={key} {...section} />;
          case "governance-page.investment-committee-section":
            return <InvestmentCommitteeSection key={key} {...section} />;
          case "governance-page.fund-managers-section":
            return <FundManagersSection key={key} {...section} />;
          case "governance-page.investment-strategy-section":
            return <InvestmentStrategySection key={key} {...section} />;
          case "governance-page.governance-impact-section":
            return <GovernanceImpactSection key={key} {...section} />;
          default:
            return null;
        }
      })}
    </main>
  );
};
