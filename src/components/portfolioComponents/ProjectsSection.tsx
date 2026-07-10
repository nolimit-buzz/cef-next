"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe2, LayoutGrid, List, Plus, Minus } from 'lucide-react';
import Link from "next/link";
import { getStrapiMediaURL } from '../../lib/strapi';
import type { ProjectsSection as ProjectsSectionData } from '../../types/portfolio';
import { fadeUp, staggerContainer, itemVariants, getMetricIcon, getSdgStyle } from './shared';

export const ProjectsSection = ({ sectionLabel, headingPrimary, headingSecondary, filterLabel, locationLabel, statusLabel, sdgImpactLabel, readMoreLabel, readLessLabel, viewCaseStudyLabel, fullCaseStudyLabel, projects }: ProjectsSectionData) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedTextId, setExpandedTextId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'accordion' | 'card'>('accordion');
  const [expandedAccordionId, setExpandedAccordionId] = useState<string | null>(projects[0]?.projectId ?? null);

  const filters = ['All', ...Array.from(new Set(projects.map(item => item.sector)))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.sector === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedAccordionId(expandedAccordionId === id ? null : id);
  };

  return (
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
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight">
              <span className="text-white">{headingPrimary} </span>
              <span className="text-white/60">{headingSecondary}</span>
            </h2>
          </motion.div>

          {/* Filters and View Toggle */}
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mr-2 shrink-0">{filterLabel}</span>
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
                  {filteredProjects.map((item) => {
                    const imageUrl = getStrapiMediaURL(item.image);
                    return (
                      <motion.div
                        key={item.projectId}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="border-b border-white/10"
                      >
                        <button
                          onClick={() => toggleExpand(item.projectId)}
                          className="w-full py-8 flex items-center justify-between group text-left"
                        >
                          <div className="flex items-center gap-8 md:gap-16 flex-1">
                            <span className="text-4xl font-light text-white/20 font-sans w-12">{item.projectId}</span>
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
                            <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${expandedAccordionId === item.projectId ? 'bg-white text-[#0A1224] rotate-180' : 'group-hover:bg-white/5 text-white/40'}`}>
                              {expandedAccordionId === item.projectId ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedAccordionId === item.projectId && (
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
                                      {expandedTextId === item.projectId || item.description.length <= 120
                                        ? item.description
                                        : `${item.description.substring(0, 120)}...`}
                                      {item.description.length > 120 && (
                                        <button
                                          onClick={(e) => { e.stopPropagation(); setExpandedTextId(expandedTextId === item.projectId ? null : item.projectId); }}
                                          className="ml-3 text-sm font-medium text-[var(--color-accent-light)] hover:text-white transition-colors"
                                        >
                                          {expandedTextId === item.projectId ? readLessLabel : readMoreLabel}
                                        </button>
                                      )}
                                    </p>

                                    <motion.div
                                      variants={staggerContainer}
                                      initial="hidden"
                                      animate="visible"
                                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
                                    >
                                      {item.metrics.map((metric) => {
                                        const Icon = getMetricIcon(metric.icon);
                                        return (
                                          <motion.div
                                            key={metric.id}
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
                                                <Icon className="w-5 h-5 text-white/40 mb-3 group-hover/metric:text-[var(--color-accent-light)] transition-colors duration-300" />
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
                                        {sdgImpactLabel}
                                      </span>
                                      <div className="flex flex-wrap items-center gap-2">
                                        {item.sdgs.map((sdg) => {
                                          const style = getSdgStyle(sdg.sdgNumber);
                                          return (
                                            <motion.div
                                              key={sdg.id}
                                              variants={itemVariants}
                                              className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                                              style={{ backgroundColor: `${style.color}1A`, borderColor: `${style.color}33` }}
                                            >
                                              <div
                                                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                                                style={{ backgroundColor: style.color, color: sdg.sdgNumber === '7' ? 'black' : 'white' }}
                                              >
                                                {sdg.sdgNumber}
                                              </div>
                                              <span className="text-[10px] font-medium" style={{ color: style.color }}>SDG {sdg.sdgNumber}</span>
                                            </motion.div>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    <motion.div variants={itemVariants} className="h-10 w-[1px] bg-white/10 hidden md:block" />

                                    <motion.div variants={itemVariants}>
                                      <Link href={`/portfolio/${item.projectId}`} className="text-[11px] font-bold uppercase tracking-[0.2em] text-white flex items-center gap-3 hover:text-[var(--color-accent-light)] transition-colors group/link">
                                        {fullCaseStudyLabel}
                                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                      </Link>
                                    </motion.div>
                                  </motion.div>
                                </div>

                                <div className="lg:col-span-5">
                                  <div className="aspect-[4/3] rounded-lg overflow-hidden relative group/img">
                                    {imageUrl && (
                                      <img
                                        src={imageUrl}
                                        alt={item.image_alt_text || item.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                                        referrerPolicy="no-referrer"
                                      />
                                    )}
                                    <div className="absolute inset-0 bg-[var(--color-accent)]/20 mix-blend-multiply opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="card-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {filteredProjects.map((project, idx) => {
                    const imageUrl = getStrapiMediaURL(project.image);
                    return (
                      <motion.div
                        key={project.projectId}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-lg overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 group"
                      >
                        {/* Background Image & Overlay */}
                        <div className="absolute inset-0 z-0">
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt={project.image_alt_text || project.name}
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                          )}
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
                            {project.sdgs.map((sdg) => {
                              const style = getSdgStyle(sdg.sdgNumber);
                              return (
                                <span
                                  key={sdg.id}
                                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-3 py-1"
                                >
                                  <span
                                    className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                                    style={{ backgroundColor: style.color, color: sdg.sdgNumber === '7' ? 'black' : 'white' }}
                                  >
                                    {sdg.sdgNumber}
                                  </span>
                                  <span className="text-xs font-medium" style={{ color: style.color }}>SDG {sdg.sdgNumber}</span>
                                </span>
                              );
                            })}
                          </div>

                          {/* Description */}
                          <p className="text-white/70 text-sm mb-6 leading-relaxed flex-grow">
                            {project.description.length <= 120 ? project.description : `${project.description.substring(0, 120)}...`}
                          </p>

                          {/* RICH DETAILS */}
                          <div className="grid grid-cols-2 gap-4 mb-8 py-4 border-y border-white/10">
                            <div>
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{locationLabel}</div>
                              <div className="text-sm text-white font-medium flex items-center gap-1"><Globe2 className="w-3 h-3 text-white/40" /> {project.location}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{statusLabel}</div>
                              <div className="text-sm text-white font-medium flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)]" /> {project.status}</div>
                            </div>
                            {project.metrics.slice(0, 2).map((metric) => (
                              <div key={metric.id}>
                                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{metric.label}</div>
                                <div className="text-sm text-white font-medium">{metric.value}</div>
                              </div>
                            ))}
                          </div>

                          {/* IR-Style Footer Button */}
                          <Link href={`/portfolio/${project.projectId}`} className="mt-auto flex items-center justify-between group/btn cursor-pointer">
                            <span className="text-sm font-medium text-white group-hover/btn:text-[var(--color-accent-light)] transition-colors">{viewCaseStudyLabel}</span>
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all group-hover/btn:bg-white group-hover/btn:scale-110">
                              <ArrowUpRight className="w-5 h-5 text-white group-hover/btn:text-[#0A1224]" />
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
