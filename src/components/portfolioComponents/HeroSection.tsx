"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Globe2, LayoutGrid } from 'lucide-react';
import Breadcrumbs from '../Breadcrumbs';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { HeroSection as HeroSectionData } from '../../types/portfolio';
import { fadeUp, staggerContainer } from './shared';

const HERO_STAT_ICONS = [Zap, Globe2, LayoutGrid];

export const HeroSection = ({ badge, headingPrimary, headingSecondary, subHeadline, stats, backgroundImage, backgroundImage_alt_text }: HeroSectionData) => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const backgroundImageUrl = getStrapiMediaURL(backgroundImage);

  const [statA, statB, statC] = stats;

  return (
    <section className="relative bg-[var(--color-background)] flex flex-col border-b border-white/5 lg:h-[100dvh] lg:min-h-[700px] lg:max-h-[1080px]">
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
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                {badge}
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight">
              <span className="text-white">{headingPrimary}</span><br className="hidden lg:block" />
              <span className="text-white/50">{headingSecondary}</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Column: Image Background */}
        <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
            {backgroundImageUrl && (
              <img
                src={backgroundImageUrl}
                alt={backgroundImage_alt_text || "Portfolio Hero"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
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
            {subHeadline}
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          {statA && (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4 relative z-10">
              {(() => { const Icon = HERO_STAT_ICONS[0]; return <Icon className="w-8 h-8 text-white shrink-0" />; })()}
              <div className="flex flex-col">
                <span className="text-xl xl:text-2xl font-light text-white leading-snug">{statA.value}</span>
                <span className="text-[10px] xl:text-xs font-bold text-white/70 uppercase tracking-widest">{statA.label}</span>
              </div>
            </motion.div>
          )}
          {statB && (
            <>
              <div className="w-full h-px bg-white/20 relative z-10" />
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4 relative z-10">
                {(() => { const Icon = HERO_STAT_ICONS[1]; return <Icon className="w-8 h-8 text-white shrink-0" />; })()}
                <div className="flex flex-col">
                  <span className="text-xl xl:text-2xl font-light text-white leading-snug">{statB.value}</span>
                  <span className="text-[10px] xl:text-xs font-bold text-white/70 uppercase tracking-widest">{statB.label}</span>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Column 3: Light Block */}
        <div className="bg-[#32a99f] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#32a99f]">
          {statC && (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
              {(() => { const Icon = HERO_STAT_ICONS[2]; return <Icon className="w-10 h-10 text-white shrink-0" />; })()}
              <div className="flex flex-col">
                <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">{statC.label}</span>
                <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">{statC.value}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
