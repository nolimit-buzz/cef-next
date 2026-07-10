"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, Globe2, Zap, Users, Leaf, DollarSign } from 'lucide-react';

import Link from "next/link";
import { portfolioData } from '../data/projects';
import { getStrapiMediaURL } from '../lib/strapi';
import type { PortfolioSection } from '../types/home';

// CMS card metrics carry no icon name — rotate through a fixed set.
const METRIC_ICONS = [Zap, Leaf, Users, DollarSign];

export const Portfolio = ({ cms }: { cms?: PortfolioSection }) => {
  // Prefer CMS cards; fall back to the static list if the CMS returns none.
  const items = cms?.cards?.length
    ? cms.cards.map((card) => ({
        id: card.project_id ?? String(card.id),
        name: card.name,
        sector: card.sector ?? '',
        location: card.location ?? '',
        status: card.status ?? '',
        description: card.description ?? '',
        metrics: (card.metrics ?? []).map((m, i) => ({
          ...m,
          icon: METRIC_ICONS[i % METRIC_ICONS.length],
        })),
        sdgs: card.sdgs ?? [],
        image: getStrapiMediaURL(card.image) ?? '',
        imageAlt: card.image_alt_text || card.name,
      }))
    : portfolioData.map((item) => ({ ...item, imageAlt: item.name }));

  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id ?? null);
  const [expandedTextId, setExpandedTextId] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const uniqueSectors = Array.from(new Set(items.map(item => item.sector)));

  const filteredData = items.filter(item => {
    const matchSector = selectedSector ? item.sector === selectedSector : true;
    return matchSector;
  }).slice(0, 4);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section className="py-32 bg-gradient-to-b from-[#0d1f35] via-[#091624] to-[#050505] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
                {cms?.eyebrow ?? "Our Portfolio"}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight"
            >
              <span className="text-white">{cms?.headline_part1 ?? "Investing in high-impact"}</span>
              {(cms?.headline_part2 ?? "clean energy solutions.") && (
                <><br /><span className="text-[var(--color-text-secondary)]">{cms?.headline_part2 ?? "clean energy solutions."}</span></>
              )}
            </motion.h2>
          </div>
          <Link
            href="/portfolio"
            className="bg-white text-black hover:bg-[var(--color-accent-green)] hover:text-white px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            {cms?.view_all_button ?? "View All Projects"} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mr-2">{cms?.filter_label ?? "Sector:"}</span>
            <button 
              onClick={() => setSelectedSector(null)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${!selectedSector ? 'bg-white text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              {cms?.all_filter_label ?? "All"}
            </button>
            {uniqueSectors.map(sector => (
              <button 
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedSector === sector ? 'bg-white text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
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
                    <h3 className="text-xl md:text-2xl font-medium group-hover:translate-x-2 transition-transform duration-300">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                        <Globe2 className="w-3 h-3" /> {item.location}
                      </span>
                      <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-light)]" /> {item.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="hidden md:block text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase border border-white/10 px-3 py-1 rounded-full">
                    {item.sector}
                  </span>
                  <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${expandedId === item.id ? 'bg-white text-black rotate-180' : 'group-hover:bg-white/10'}`}>
                    {expandedId === item.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === item.id && (
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
                                className="ml-3 text-sm font-medium text-[var(--color-accent-green)] hover:text-white transition-colors"
                              >
                                {expandedTextId === item.id ? (cms?.read_less ?? 'Read Less') : (cms?.read_more ?? 'Read More')}
                              </button>
                            )}
                          </p>
                          
                          <motion.div 
                            variants={containerVariants}
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
                                    backgroundColor: 'rgba(15, 83, 129, 0.4)'
                                  }}
                                  className="bg-[rgba(15,83,129,0.28)] border border-white/10 p-5 rounded-lg backdrop-blur-md transition-all group/metric cursor-default flex flex-col justify-between min-h-[160px]"
                                >
                                  <div>
                                    <motion.div
                                      whileHover={{ scale: 1.2, rotate: 5 }}
                                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                      <metric.icon className="w-5 h-5 text-white/40 mb-3 group-hover/metric:text-[var(--color-accent-light)] transition-colors duration-300" />
                                    </motion.div>
                                    <div className="text-2xl font-light mb-1">{metric.value}</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover/metric:text-white/70 transition-colors mb-4">{metric.label}</div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        </div>

                        <motion.div 
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex flex-wrap items-center gap-12"
                        >
                          <div className="flex items-center gap-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">
                              {cms?.sdg_impact_label ?? "SDG Impact:"}
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
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                                    {sdg.label}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          
                          <motion.div variants={itemVariants} className="h-10 w-[1px] bg-white/10 hidden md:block" />
                          
                          <motion.div variants={itemVariants}>
                            <Link href={`/portfolio/${item.id}`} className="text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:text-[var(--color-accent-light)] transition-colors group/link">
                              {cms?.case_study_link ?? "Full Case Study"}
                              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </Link>
                          </motion.div>
                        </motion.div>
                      </div>

                      <div className="lg:col-span-5">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden relative group/img">
                          <img
                            src={item.image}
                            alt={item.imageAlt}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-[rgb(0,133,202)]/40 mix-blend-multiply opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {cms?.view_all_link ?? "View all projects"} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
