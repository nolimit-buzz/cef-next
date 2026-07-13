"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FundPerformanceChart } from '../FundPerformanceChart';
import type { PerformanceSection as PerformanceSectionData } from '../../types/portfolio';
import { fadeUp, staggerContainer, itemVariants, getSdgStyle } from './shared';

const COL_SPAN_CLASSES = [
  'col-span-12 md:col-span-6 lg:col-span-4',
  'col-span-12 md:col-span-6 lg:col-span-4',
  'col-span-12 md:col-span-12 lg:col-span-4',
  'col-span-12 md:col-span-6',
  'col-span-12 md:col-span-6',
];
const DEFAULT_COL_SPAN = 'col-span-12 md:col-span-6';

export const PerformanceSection = ({ sectionLabel, headingPrimary, headingSecondary, description, tabSdgLabel, tabFinancialLabel, sdgCards }: PerformanceSectionData) => {
  const [activePerfTab, setActivePerfTab] = useState<'sdg' | 'financial'>('sdg');

  return (
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
                {sectionLabel}
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0">
              <span className="text-[#0A1224]">{headingPrimary}</span> <span className="text-gray-400">{headingSecondary}</span>
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
              {description}
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 sm:gap-8 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar pt-2">
          {([{ key: 'sdg' as const, label: tabSdgLabel }, { key: 'financial' as const, label: tabFinancialLabel }]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActivePerfTab(tab.key)}
              className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                activePerfTab === tab.key ? "text-[var(--color-accent)]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {activePerfTab === tab.key && (
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
            {activePerfTab === 'sdg' && (
              <motion.div
                key="sdg-highlights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px" }}
                  className="grid grid-cols-12 gap-6"
                >
                  {sdgCards.map((card, i) => {
                    const style = getSdgStyle(card.sdgNumber);
                    return (
                      <motion.div key={card.id} variants={itemVariants} className={`${COL_SPAN_CLASSES[i] ?? DEFAULT_COL_SPAN} group relative bg-white border border-blue-100/60 p-8 flex flex-col justify-between min-h-[240px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200/60 hover:-translate-y-0.5`}>
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#E8F2FF] to-transparent opacity-50 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-4xl lg:text-5xl font-light text-[#0A1224] tracking-tight">{card.value}</h3>
                            <ArrowUpRight className="w-8 h-8 text-blue-300/70 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400" strokeWidth={1.5} />
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">{card.description}</p>
                        </div>
                        <div className="relative z-10 mt-6 flex justify-start">
                          <div
                            className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                            style={{ backgroundColor: `${style.color}1A`, borderColor: `${style.color}33` }}
                          >
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                              style={{ backgroundColor: style.color, color: card.sdgNumber === '7' ? 'black' : 'white' }}
                            >
                              {card.sdgNumber}
                            </div>
                            <span className="text-[10px] font-medium" style={{ color: style.color }}>SDG {card.sdgNumber}</span>
                            {style.label && (
                              <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                                {style.label}
                                <div className="absolute top-full left-4 border-4 border-transparent border-t-[#1A1A1A]/90" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {activePerfTab === 'financial' && (
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
  );
};
