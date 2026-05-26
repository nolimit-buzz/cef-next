"use client";
import  { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Filter, Globe2, Zap, LayoutGrid, List, Plus, Minus } from 'lucide-react';
import Link from "next/link";
import { portfolioData } from '../data/projects';
import Breadcrumbs from './Breadcrumbs';
import { cn } from '../lib/utils';
import dynamic from 'next/dynamic';
const NigeriaMap = dynamic(() => import('./NigeriaMap').then(m => m.NigeriaMap), { ssr: false });
import { FundPerformanceChart } from './FundPerformanceChart';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function PortfolioArchive() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedTextId, setExpandedTextId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'accordion' | 'card'>('accordion');
  const [expandedAccordionId, setExpandedAccordionId] = useState<string | null>(portfolioData[0].id);
  const [activePerfTab, setActivePerfTab] = useState<'SDG Impact Highlights' | 'Financial Performance'>('SDG Impact Highlights');
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const filters = ['All', ...Array.from(new Set(portfolioData.map(item => item.sector)))];

  const filteredProjects = activeFilter === 'All' 
    ? portfolioData 
    : portfolioData.filter(project => project.sector === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedAccordionId(expandedAccordionId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Dark Hero Section (Split Screen) */}
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
                  Portfolio
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight">
                <span className="text-white">Driving Impact.</span><br className="hidden lg:block" />
                <span className="text-white/50">Delivering Yield.</span>
              </motion.h1>
            </motion.div>
          </div>
          
          {/* Right Column: Image Background */}
          <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full">
            <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2670&auto=format&fit=crop" 
                alt="Portfolio Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
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
              Our portfolio represents a carefully curated selection of projects that align with our mandate to accelerate the transition to a low-carbon economy.
            </motion.p>
          </div>

          {/* Column 2: Brand Accent Block */}
          <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4 relative z-10">
              <Zap className="w-8 h-8 text-white shrink-0" />
              <div className="flex flex-col">
                <span className="text-xl xl:text-2xl font-light text-white leading-snug">₦15B+</span>
                <span className="text-[10px] xl:text-xs font-bold text-white/70 uppercase tracking-widest">Capital Deployed</span>
              </div>
            </motion.div>
            <div className="w-full h-px bg-white/20 relative z-10" />
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4 relative z-10">
              <Globe2 className="w-8 h-8 text-white shrink-0" />
              <div className="flex flex-col">
                <span className="text-xl xl:text-2xl font-light text-white leading-snug">21,000+</span>
                <span className="text-[10px] xl:text-xs font-bold text-white/70 uppercase tracking-widest">Tonnes CO₂ Avoided</span>
              </div>
            </motion.div>
          </div>

          {/* Column 3: Light Block */}
          <div className="bg-[#32a99f] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#32a99f]">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
              <LayoutGrid className="w-10 h-10 text-white shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">Active Projects</span>
                <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">12+ Sustainable Assets</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Chart Section */}
      <section className="py-24 bg-white relative z-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              className="md:w-1/2 lg:w-7/12"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                  Fund Metrics
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
                <span className="text-[#0A1224]">Portfolio</span> <span className="text-gray-400">Performance</span>
              </motion.h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2 lg:w-5/12 md:flex md:justify-end"
            >
              <p className="text-lg text-gray-600 leading-relaxed max-w-md md:text-right">
                Review our aggregated impact metrics aligned with the UN Sustainable Development Goals, alongside our financial performance.
              </p>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar px-6 -mx-6 sm:px-0 sm:mx-0 pt-2">
            {(['SDG Impact Highlights', 'Financial Performance'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActivePerfTab(tab)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activePerfTab === tab ? "text-[var(--color-accent)]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
                {activePerfTab === tab && (
                  <motion.div 
                    layoutId="portfolioPerfTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activePerfTab === 'SDG Impact Highlights' && (
                <motion.div 
                  key="sdg-highlights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Bento Grid */}
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid grid-cols-12 gap-6"
                  >
                    {/* Top Row: 3 Cards */}
                    <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4 group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[240px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-4xl lg:text-5xl font-light text-[#0A1224] tracking-tight">150<span className="text-2xl lg:text-3xl">MW</span></h3>
                          <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">Total Clean Energy Capacity Installed & Operational</p>
                      </div>
                      <div className="relative z-10 mt-6 flex justify-start">
                        <div 
                          className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                          style={{ backgroundColor: '#FCC30B1A', borderColor: '#FCC30B33' }}
                        >
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                            style={{ backgroundColor: '#FCC30B', color: 'black' }}
                          >
                            7
                          </div>
                          <span className="text-[10px] font-medium" style={{ color: '#FCC30B' }}>SDG 7</span>
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                            Affordable and Clean Energy
                            <div className="absolute top-full left-4 border-4 border-transparent border-t-[#1A1A1A]/90" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4 group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[240px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-4xl lg:text-5xl font-light text-[#0A1224] tracking-tight">21,197</h3>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">Tonnes of CO₂ Emissions Avoided Annually</p>
                      </div>
                      <div className="relative z-10 mt-6 flex justify-start">
                        <div 
                          className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                          style={{ backgroundColor: '#3F7E441A', borderColor: '#3F7E4433' }}
                        >
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                            style={{ backgroundColor: '#3F7E44', color: 'white' }}
                          >
                            13
                          </div>
                          <span className="text-[10px] font-medium" style={{ color: '#3F7E44' }}>SDG 13</span>
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                            Climate Action
                            <div className="absolute top-full left-4 border-4 border-transparent border-t-[#1A1A1A]/90" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-span-12 md:col-span-12 lg:col-span-4 group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[240px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-4xl lg:text-5xl font-light text-[#0A1224] tracking-tight">1,250+</h3>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">Direct & Indirect Green Jobs Created</p>
                      </div>
                      <div className="relative z-10 mt-6 flex justify-start">
                        <div 
                          className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                          style={{ backgroundColor: '#A219421A', borderColor: '#A2194233' }}
                        >
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                            style={{ backgroundColor: '#A21942', color: 'white' }}
                          >
                            8
                          </div>
                          <span className="text-[10px] font-medium" style={{ color: '#A21942' }}>SDG 8</span>
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                            Decent Work and Economic Growth
                            <div className="absolute top-full left-4 border-4 border-transparent border-t-[#1A1A1A]/90" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Bottom Row: 2 Cards */}
                    <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[240px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-4xl lg:text-5xl font-light text-[#0A1224] tracking-tight">₦15B+</h3>
                          <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">Total Capital Deployed in Climate Infrastructure</p>
                      </div>
                      <div className="relative z-10 mt-6 flex justify-start">
                        <div 
                          className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                          style={{ backgroundColor: '#FD69251A', borderColor: '#FD692533' }}
                        >
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                            style={{ backgroundColor: '#FD6925', color: 'white' }}
                          >
                            9
                          </div>
                          <span className="text-[10px] font-medium" style={{ color: '#FD6925' }}>SDG 9</span>
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                            Industry, Innovation and Infrastructure
                            <div className="absolute top-full left-4 border-4 border-transparent border-t-[#1A1A1A]/90" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[240px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-4xl lg:text-5xl font-light text-[#0A1224] tracking-tight">85,000</h3>
                          <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">Households & Businesses Powered with Reliable Energy</p>
                      </div>
                      <div className="relative z-10 mt-6 flex justify-start">
                        <div 
                          className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                          style={{ backgroundColor: '#FCC30B1A', borderColor: '#FCC30B33' }}
                        >
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                            style={{ backgroundColor: '#FCC30B', color: 'black' }}
                          >
                            7
                          </div>
                          <span className="text-[10px] font-medium" style={{ color: '#FCC30B' }}>SDG 7</span>
                          <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                            Affordable and Clean Energy
                            <div className="absolute top-full left-4 border-4 border-transparent border-t-[#1A1A1A]/90" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                  </motion.div>
                </motion.div>
              )}

              {activePerfTab === 'Financial Performance' && (
                <motion.div 
                  key="fund-performance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <FundPerformanceChart />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Grid Section (Dark Mode) */}
      <section className="py-24 bg-[#0A1224] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Header */}
            <motion.div variants={fadeUp} className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]" />
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
                  Our Projects
                </span>
              </div>
              <h2 className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight">
                <span className="text-white">Explore Our </span>
                <span className="text-white/60">Portfolio</span>
              </h2>
            </motion.div>

            {/* Filters and View Toggle */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mr-2 shrink-0">Filter by Sector:</span>
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                      activeFilter === filter
                        ? 'bg-white text-[#0A1224]'
                        : 'bg-transparent text-white/60 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg shrink-0">
                <button
                  onClick={() => setViewMode('accordion')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'accordion' ? 'bg-white shadow-sm text-[#0A1224]' : 'text-white/40 hover:text-white'}`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'card' ? 'bg-white shadow-sm text-[#0A1224]' : 'text-white/40 hover:text-white'}`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div layout>
              <AnimatePresence mode="wait">
                {viewMode === 'accordion' ? (
                  <motion.div 
                    key="accordion-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-t border-white/10"
                  >
                    {filteredProjects.map((item) => (
                      <motion.div 
                        key={item.id} 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="border-b border-white/10"
                      >
                        <button 
                          onClick={() => toggleExpand(item.id)}
                          className="w-full py-8 flex items-center justify-between group text-left"
                        >
                          <div className="flex items-center gap-8 md:gap-16 flex-1">
                            <span className="text-4xl font-light text-white/20 font-sans w-12">{item.id}</span>
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 flex-1">
                              <h3 className="text-xl md:text-2xl font-medium text-white group-hover:translate-x-2 transition-transform duration-300">
                                {item.name}
                              </h3>
                              <div className="flex items-center gap-6 opacity-60 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 text-white/60">
                                  <Globe2 className="w-3 h-3" /> {item.location}
                                </span>
                                <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 text-white/60">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-light)]" /> {item.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <span className="hidden md:block text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase border border-white/10 px-3 py-1 rounded-full">
                              {item.sector}
                            </span>
                            <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${expandedAccordionId === item.id ? 'bg-white text-[#0A1224] rotate-180' : 'group-hover:bg-white/5 text-white/40'}`}>
                              {expandedAccordionId === item.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedAccordionId === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                              className="overflow-hidden"
                            >
                              <div className="pb-16 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-7 flex flex-col justify-between">
                                  <div>
                                    <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-12">
                                      {expandedTextId === item.id || item.description.length <= 120
                                        ? item.description
                                        : `${item.description.substring(0, 120)}...`}
                                      {item.description.length > 120 && (
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); setExpandedTextId(expandedTextId === item.id ? null : item.id); }}
                                          className="ml-3 text-sm font-medium text-[var(--color-accent-light)] hover:text-white transition-colors"
                                        >
                                          {expandedTextId === item.id ? 'Read Less' : 'Read More'}
                                        </button>
                                      )}
                                    </p>
                                    
                                    <motion.div 
                                      variants={staggerContainer}
                                      initial="hidden"
                                      animate="visible"
                                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
                                    >
                                      {item.metrics.map((metric, idx) => {
                                        return (
                                          <motion.div 
                                            key={idx} 
                                            variants={itemVariants}
                                            whileHover={{ 
                                              y: -5, 
                                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                            }}
                                            className="bg-white/5 border border-white/10 p-5 rounded-lg transition-all group/metric cursor-default flex flex-col justify-between min-h-[160px]"
                                          >
                                            <div>
                                              <motion.div
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                              >
                                                <metric.icon className="w-5 h-5 text-white/40 mb-3 group-hover/metric:text-[var(--color-accent-light)] transition-colors duration-300" />
                                              </motion.div>
                                              <div className="text-2xl font-light text-white mb-1">{metric.value}</div>
                                              <div className="text-[9px] font-bold uppercase tracking-widest text-white/50 group-hover/metric:text-white/80 transition-colors mb-4">{metric.label}</div>
                                            </div>
                                          </motion.div>
                                        );
                                      })}
                                    </motion.div>
                                  </div>

                                  <motion.div 
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                    className="flex flex-wrap items-center gap-12"
                                  >
                                    <div className="flex items-center gap-6">
                                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 whitespace-nowrap">
                                        SDG Impact:
                                      </span>
                                      <div className="flex flex-wrap items-center gap-2">
                                        {item.sdgs.map((sdg) => (
                                          <motion.div 
                                            key={sdg.id} 
                                            variants={itemVariants}
                                            className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                                            style={{ backgroundColor: `${sdg.color}1A`, borderColor: `${sdg.color}33` }}
                                          >
                                            <div 
                                              className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                                              style={{ backgroundColor: sdg.color, color: sdg.id === 7 ? 'black' : 'white' }}
                                            >
                                              {sdg.id}
                                            </div>
                                            <span className="text-[10px] font-medium" style={{ color: sdg.color }}>SDG {sdg.id}</span>
                                          </motion.div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <motion.div variants={itemVariants} className="h-10 w-[1px] bg-white/10 hidden md:block" />
                                    
                                    <motion.div variants={itemVariants}>
                                      <Link href={`/portfolio/${item.id}`} className="text-[11px] font-bold uppercase tracking-[0.2em] text-white flex items-center gap-3 hover:text-[var(--color-accent-light)] transition-colors group/link">
                                        Full Case Study 
                                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                      </Link>
                                    </motion.div>
                                  </motion.div>
                                </div>

                                <div className="lg:col-span-5">
                                  <div className="aspect-[4/3] rounded-lg overflow-hidden relative group/img">
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-[var(--color-accent)]/20 mix-blend-multiply opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="card-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {filteredProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-lg overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 group"
                      >
                        {/* Background Image & Overlay */}
                        <div className="absolute inset-0 z-0">
                          <img 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-[#0A1224]/80 mix-blend-multiply" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1224] via-[#0A1224]/90 to-[#0A1224]/40" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 flex flex-col h-full">
                          {/* Top: Number */}
                          <div className="flex justify-between items-start mb-6">
                            <span className="text-4xl font-sans italic text-white/30">{(idx + 1).toString().padStart(2, '0')}</span>
                          </div>

                          {/* Title & SDGs */}
                          <h3 className="text-2xl text-white font-medium mb-4">{project.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.sdgs.map((sdg) => (
                              <span 
                                key={sdg.id}
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-3 py-1"
                              >
                                <span 
                                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                                  style={{ backgroundColor: sdg.color, color: sdg.id === 7 ? 'black' : 'white' }}
                                >
                                  {sdg.id}
                                </span>
                                <span className="text-xs font-medium" style={{ color: sdg.color }}>SDG {sdg.id}</span>
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-white/70 text-sm mb-6 leading-relaxed flex-grow">
                            {project.description.length <= 120 ? project.description : `${project.description.substring(0, 120)}...`}
                          </p>

                          {/* RICH DETAILS */}
                          <div className="grid grid-cols-2 gap-4 mb-8 py-4 border-y border-white/10">
                            <div>
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Location</div>
                              <div className="text-sm text-white font-medium flex items-center gap-1"><Globe2 className="w-3 h-3 text-white/40" /> {project.location}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Status</div>
                              <div className="text-sm text-white font-medium flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)]" /> {project.status}</div>
                            </div>
                            {project.metrics.slice(0, 2).map((metric, mIdx) => (
                              <div key={mIdx}>
                                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{metric.label}</div>
                                <div className="text-sm text-white font-medium">{metric.value}</div>
                              </div>
                            ))}
                          </div>

                          {/* IR-Style Footer Button */}
                          <Link href={`/portfolio/${project.id}`} className="mt-auto flex items-center justify-between group/btn cursor-pointer">
                            <span className="text-sm font-medium text-white group-hover/btn:text-[var(--color-accent-light)] transition-colors">View Case Study</span>
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all group-hover/btn:bg-white group-hover/btn:scale-110">
                              <ArrowUpRight className="w-5 h-5 text-white group-hover/btn:text-[#0A1224]" />
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nigeria Map Section */}
      <NigeriaMap />
    </div>
  );
}
