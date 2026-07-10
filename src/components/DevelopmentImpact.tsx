"use client";
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Lightbulb, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { getStrapiMediaURL } from '../lib/strapi';
import type { DevelopmentImpactSection } from '../types/home';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const DevelopmentImpact = ({ cms }: { cms?: DevelopmentImpactSection }) => {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-background)] relative z-10 border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
              {cms?.eyebrow ?? "Development Impact"}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left: Headline */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight">
                <span className="text-white">{cms?.headline_part1 ?? "A holistic approach to"}</span>
                {cms?.headline_part2 && (
                  <><br className="hidden lg:block" /><span className="text-[var(--color-text-secondary)]">{cms.headline_part2}</span></>
                )}
              </h3>
            </motion.div>

            {/* Right: Description & CTA */}
            <motion.div variants={itemVariants} className="flex flex-col justify-start items-start">
              <p className="text-lg text-white/70 font-light leading-relaxed mb-8 max-w-xl">
                {cms?.body ?? "We deliver impact by displacing fossil fuels, driving local economic growth, and building sustainable communities. Guided by a strong Gender & Impact Lens, we empower women-led enterprises and ensure equitable job creation across the green economy."}
              </p>
              <a href="#" className="text-sm font-medium text-white hover:text-white/80 transition-colors flex items-center gap-1">
                {cms?.learn_more_link ?? "Learn More"} <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bento Grid Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]"
        >
          {/* Column 1, Row 1: 01 Renewable Energy */}
          <motion.div
            variants={itemVariants}
            className="group relative bg-[#0A1224] border border-white/10 rounded-lg p-8 flex flex-col justify-between transition-all duration-500 hover:border-[var(--card-color)] hover:shadow-[0_8px_30px_var(--card-glow)]"
            style={{ '--card-color': 'rgba(252, 195, 11, 0.5)', '--card-glow': 'rgba(252, 195, 11, 0.15)' } as CSSProperties}
          >
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at top right, rgba(252, 195, 11, 0.15) 0%, transparent 60%)` }}
            />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-light text-white/20 font-sans">{cms?.impact_cards?.[0]?.number ?? "01"}</span>
                <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white/80 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-medium text-white mb-4">{cms?.impact_cards?.[0]?.title ?? "Renewable Energy"}</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FCC30B]/10 border border-[#FCC30B]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#FCC30B] flex items-center justify-center text-[9px] font-bold text-black">7</div>
                  <span className="text-[10px] font-medium text-[#FCC30B]">SDG 7</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                    Affordable and Clean Energy
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                  </div>
                </div>
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#3F7E44]/10 border border-[#3F7E44]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#3F7E44] flex items-center justify-center text-[9px] font-bold text-white">13</div>
                  <span className="text-[10px] font-medium text-[#3F7E44]">SDG 13</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                    Climate Action
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                  </div>
                </div>
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FD6925]/10 border border-[#FD6925]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#FD6925] flex items-center justify-center text-[9px] font-bold text-white">9</div>
                  <span className="text-[10px] font-medium text-[#FD6925]">SDG 9</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                    Industry, Innovation and Infrastructure
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/60 font-light leading-relaxed text-sm relative z-10">
              {cms?.impact_cards?.[0]?.body ?? "Financing clean energy generation to power communities, foster innovation, and drive global climate action."}
            </p>
          </motion.div>

          {/* Column 2, Row 1: Infrastructure (Image) */}
          <motion.div 
            variants={itemVariants}
            className="group relative border border-white/10 rounded-lg overflow-hidden bg-[#0A1224] transition-all duration-500 hover:border-white/30"
          >
            <div className="absolute inset-0 bg-[rgb(0,133,202)]/40 mix-blend-multiply z-10 group-hover:bg-[rgb(0,133,202)]/60 transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent z-10" />
            <img
              src={
                getStrapiMediaURL(cms?.infrastructure_image) ??
                "https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=2574&auto=format&fit=crop"
              }
              alt={cms?.infrastructure_image_alt_text || "Clean Energy Infrastructure"}
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[30%]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Column 3, Row 1: 02 Energy Efficiency (Blue Accent) */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-[#0A1224] border border-white/10 rounded-lg p-8 flex flex-col justify-between transition-all duration-500 hover:border-[var(--card-color)] hover:shadow-[0_8px_30px_var(--card-glow)]"
            style={{ '--card-color': 'rgba(0, 133, 202, 0.5)', '--card-glow': 'rgba(0, 133, 202, 0.15)' } as CSSProperties}
          >
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at top right, rgba(0, 133, 202, 0.15) 0%, transparent 60%)` }}
            />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-light text-[var(--color-accent-light)]/40 font-sans">{cms?.impact_cards?.[1]?.number ?? "02"}</span>
                <ArrowUpRight className="w-5 h-5 text-[var(--color-accent-light)]/50 group-hover:text-[var(--color-accent-light)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-medium text-white mb-4">{cms?.impact_cards?.[1]?.title ?? "Energy Efficiency"}</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FCC30B]/10 border border-[#FCC30B]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#FCC30B] flex items-center justify-center text-[9px] font-bold text-black">7</div>
                  <span className="text-[10px] font-medium text-[#FCC30B]">SDG 7</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                    Affordable and Clean Energy
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                  </div>
                </div>
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FD9D24]/10 border border-[#FD9D24]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#FD9D24] flex items-center justify-center text-[9px] font-bold text-white">11</div>
                  <span className="text-[10px] font-medium text-[#FD9D24]">SDG 11</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                    Sustainable Cities and Communities
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                  </div>
                </div>
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#3F7E44]/10 border border-[#3F7E44]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#3F7E44] flex items-center justify-center text-[9px] font-bold text-white">13</div>
                  <span className="text-[10px] font-medium text-[#3F7E44]">SDG 13</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                    Climate Action
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/70 font-light leading-relaxed text-sm relative z-10">
              {cms?.impact_cards?.[1]?.body ?? "Optimizing energy consumption in sustainable cities and industrial infrastructure to reduce carbon footprints."}
            </p>
          </motion.div>

          {/* Column 1, Row 2: 03 Gender Equality (Green Accent) */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-[#0A1224] border border-white/10 rounded-lg p-8 flex flex-col justify-between transition-all duration-500 hover:border-[var(--card-color)] hover:shadow-[0_8px_30px_var(--card-glow)]"
            style={{ '--card-color': 'rgba(255, 58, 33, 0.5)', '--card-glow': 'rgba(255, 58, 33, 0.15)' } as CSSProperties}
          >
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at top right, rgba(255, 58, 33, 0.15) 0%, transparent 60%)` }}
            />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-light text-[var(--color-accent-green)]/40 font-sans">{cms?.impact_cards?.[2]?.number ?? "03"}</span>
                <ArrowUpRight className="w-5 h-5 text-[var(--color-accent-green)]/50 group-hover:text-[var(--color-accent-green)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-medium text-white mb-4">{cms?.impact_cards?.[2]?.title ?? "Gender Equality & Jobs"}</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FF3A21]/10 border border-[#FF3A21]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#FF3A21] flex items-center justify-center text-[9px] font-bold text-white">5</div>
                  <span className="text-[10px] font-medium text-[#FF3A21]">SDG 5</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                    Gender Equality
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                  </div>
                </div>
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#A21942]/10 border border-[#A21942]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#A21942] flex items-center justify-center text-[9px] font-bold text-white">8</div>
                  <span className="text-[10px] font-medium text-[#A21942]">SDG 8</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                    Decent Work and Economic Growth
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/70 font-light leading-relaxed text-sm relative z-10">
              {cms?.impact_cards?.[2]?.body ?? "Empowering women in leadership and creating decent work opportunities across the clean energy value chain."}
            </p>
          </motion.div>

          {/* Column 2, Row 2: Diverse Team (Image) */}
          <motion.div 
            variants={itemVariants}
            className="group relative border border-white/10 rounded-lg overflow-hidden bg-[#0A1224] transition-all duration-500 hover:border-white/30"
          >
            <div className="absolute inset-0 bg-[rgb(0,133,202)]/40 mix-blend-multiply z-10 group-hover:bg-[rgb(0,133,202)]/60 transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent z-10" />
            <img
              src={
                getStrapiMediaURL(cms?.team_image) ??
                "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop"
              }
              alt={cms?.team_image_alt_text || "Diverse Professional Team"}
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[30%]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Column 3, Row 2: 04 Partnership */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-[#0A1224] border border-white/10 rounded-lg p-8 flex flex-col justify-between transition-all duration-500 hover:border-[var(--card-color)] hover:shadow-[0_8px_30px_var(--card-glow)]"
            style={{ '--card-color': 'rgba(0, 180, 216, 0.5)', '--card-glow': 'rgba(0, 180, 216, 0.15)' } as React.CSSProperties}
          >
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at top right, rgba(0, 180, 216, 0.15) 0%, transparent 60%)` }}
            />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-light text-white/20 font-sans">{cms?.impact_cards?.[3]?.number ?? "04"}</span>
                <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white/80 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-medium text-white mb-4">{cms?.impact_cards?.[3]?.title ?? "Partnership for Growth"}</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#19486A]/10 border border-[#19486A]/20 cursor-default">
                  <div className="w-4 h-4 rounded-full bg-[#19486A] flex items-center justify-center text-[9px] font-bold text-white">17</div>
                  <span className="text-[10px] font-medium text-[#19486A]">SDG 17</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                    Partnerships for the Goals
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/60 font-light leading-relaxed text-sm relative z-10">
              {cms?.impact_cards?.[3]?.body ?? "Collaborating with global and local institutions to mobilize capital for sustainable, inclusive development."}
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
