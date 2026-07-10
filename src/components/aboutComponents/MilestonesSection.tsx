"use client";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { MilestonesSection as MilestonesSectionData } from '../../types/about';
import { fadeUp } from './shared';

export const MilestonesSection = ({ headingPrimary, headingSecondary, body, nodes }: MilestonesSectionData) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const firstChild = container.children[0] as HTMLElement;
    if (!firstChild) return;

    // Calculate the width of one item including the gap (gap-5 = 20px)
    const itemWidth = firstChild.offsetWidth + 20;
    const newIndex = Math.round(container.scrollLeft / itemWidth);

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.children[0] as HTMLElement;
      const scrollAmount = firstChild ? firstChild.offsetWidth + 20 : 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="track-record" className="py-24 lg:py-32 bg-[#050A15] text-white relative z-20 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Intro */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: false }} variants={fadeUp}
            >
              <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6">
                <span className="text-white">{headingPrimary} </span>
                <span className="text-white/50">{headingSecondary}</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                {body}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Horizontal Track */}
          <div className="lg:col-span-8 flex flex-col relative min-w-0">

            {/* The scrollable container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-5 overflow-x-auto no-scrollbar px-6 -mx-6 sm:px-0 sm:mx-0 pb-12 pt-4 snap-x snap-mandatory items-center"
            >
              {nodes.map((node, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className={cn(
                      "w-[260px] md:w-[300px] shrink-0 snap-start rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 min-h-[260px]",
                      isActive
                        ? "bg-[#0395db] border border-[#0395db] shadow-[0_0_25px_rgba(3,149,219,0.4)] scale-105 z-10"
                        : "bg-white/5 border border-white/5 opacity-50 hover:opacity-70 scale-100"
                    )}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={cn(
                          "w-8 h-[2px] transition-colors duration-500",
                          isActive ? "bg-white" : "bg-white/20"
                        )} />
                        {isActive && (
                          <span className="relative flex h-3 w-3 ml-auto">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                          </span>
                        )}
                      </div>
                      <h3 className={cn(
                        "text-xl font-medium mb-3 transition-colors duration-500",
                        isActive ? "text-white" : "text-gray-400"
                      )}>{node.title}</h3>
                      <p className={cn(
                        "leading-relaxed mt-auto text-sm transition-colors duration-500",
                        isActive ? "text-white/90" : "text-gray-500"
                      )}>{node.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Track Line & Navigation */}
            <div className="mt-2 relative">
              {/* Continuous Line */}
              <div className="w-full h-px bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.5, ease: "easeInOut" as const }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0395db]/50 to-[#0395db]"
                />
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all text-white group"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all text-white group"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
