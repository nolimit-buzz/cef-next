"use client";
import { motion } from 'framer-motion';
import { Lightbulb, Sun, Wind, Zap } from 'lucide-react';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { FundStructureSection as FundStructureSectionData } from '../../types/about';
import { fadeUp } from './shared';

const AnimatedVerticalArrow = ({ direction, label, labelPosition, delay = 0, className = "" }: any) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {label && (
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: delay + 0.5 }} viewport={{ once: false }}
          className={`absolute ${labelPosition} text-xs font-medium text-[#1E3A8A] leading-tight`}
        >
          {label}
        </motion.span>
      )}
      <div className="w-0.5 h-full relative flex items-center justify-center bg-gray-200">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay, ease: "easeInOut" as const }}
          className={`w-full bg-[#1E3A8A] absolute ${direction === 'down' ? 'top-0' : 'bottom-0'} overflow-hidden`}
        >
          {/* Flow animation */}
          <motion.div
            animate={{ top: direction === 'down' ? ['0%', '100%'] : ['100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay + 0.8 }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] absolute -left-[2px] shadow-[0_0_8px_2px_rgba(0,168,89,0.6)]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: delay + 0.6 }} viewport={{ once: false }}
          className={`absolute -left-1.5 w-0 h-0 border-l-[7px] border-r-[7px] border-l-transparent border-r-transparent ${
            direction === 'down'
              ? '-bottom-2 border-t-[10px] border-t-[#1E3A8A]'
              : '-top-2 border-b-[10px] border-b-[#1E3A8A]'
          }`}
        />
      </div>
    </div>
  );
};

const AnimatedHorizontalArrow = ({ direction, label, labelPosition, delay = 0, className = "" }: any) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {label && (
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: delay + 0.5 }} viewport={{ once: false }}
          className={`absolute ${labelPosition} text-xs font-medium text-[#1E3A8A] leading-tight text-center`}
        >
          {label}
        </motion.span>
      )}
      <div className="h-0.5 w-full relative flex items-center justify-center bg-gray-200">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay, ease: "easeInOut" as const }}
          className={`h-full bg-[#1E3A8A] absolute ${direction === 'right' ? 'left-0' : 'right-0'} overflow-hidden`}
        >
          {/* Flow animation */}
          <motion.div
            animate={{ left: direction === 'right' ? ['0%', '100%'] : ['100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay + 0.8 }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] absolute -top-[2px] shadow-[0_0_8px_2px_rgba(0,168,89,0.6)]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: delay + 0.6 }} viewport={{ once: false }}
          className={`absolute -top-1.5 w-0 h-0 border-t-[7px] border-b-[7px] border-t-transparent border-b-transparent ${
            direction === 'right'
              ? '-right-2 border-l-[10px] border-l-[#1E3A8A]'
              : '-left-2 border-r-[10px] border-r-[#1E3A8A]'
          }`}
        />
      </div>
    </div>
  );
};

export const FundStructureSection = ({ sectionLabel, headingPrimary, headingSecondary, body, steps, flowchart, steps_background_image, steps_background_image_alt_text }: FundStructureSectionData) => {
  const stepsBackgroundImageUrl = getStrapiMediaURL(steps_background_image);
  return (
    <section id="structure" className="py-24 lg:py-32 bg-[#f6f9fc] relative z-20 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Top Row: Editorial Split */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs uppercase tracking-[0.2em]">{sectionLabel}</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
              <span className="text-[#0A1224]">{headingPrimary}</span>
              <span className="text-slate-400">{headingSecondary}</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              {body}
            </p>
          </div>
        </motion.div>

        {/* Unified Card Container (Steps + Flowchart) */}
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col xl:flex-row mb-6 border border-gray-200/60">

          {/* Left Column: Steps (Image Background) */}
          <div className="w-full xl:w-[35%] relative p-10 lg:p-16 flex flex-col justify-center">
            <div className="absolute inset-0 z-0">
              {stepsBackgroundImageUrl && (
                <img
                  src={stepsBackgroundImageUrl}
                  alt={steps_background_image_alt_text || "Clean Energy Infrastructure"}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-[#0A1224]/90" /> {/* Dark overlay */}
            </div>

            <div className="relative z-10 border-l-2 border-white/20 ml-4 flex flex-col gap-12 py-2">
              {/* Animated Line */}
              <motion.div
                initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: false }} transition={{ duration: 2, ease: "easeInOut" as const }}
                className="absolute left-[-2px] top-0 w-[2px] bg-[var(--color-accent-green)] origin-top z-0"
              />

              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: i * 0.4 + 0.5 }}
                  className="relative pl-10 z-10"
                >
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0A1224] border-2 border-[var(--color-accent-green)] flex items-center justify-center text-sm font-bold text-[var(--color-accent-green)] shadow-sm">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <span className="text-xs font-bold text-[var(--color-accent-green)] uppercase tracking-wider block mb-1">{step.stepLabel}</span>
                    <h4 className="text-lg font-medium text-white leading-snug">{step.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Flowchart (White Background) */}
          <div className="w-full xl:w-[65%] bg-white p-10 lg:p-16 hidden md:flex items-center justify-center">
            <div className="w-full overflow-x-auto pb-8 no-scrollbar">
              <div className="min-w-[750px] w-full flex flex-col items-center font-sans">

                {/* Top Tier */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}
                  className="border border-dashed border-[#00A859] rounded-2xl p-5 flex gap-5 bg-white/50 backdrop-blur-sm relative"
                >
                  <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }} className="absolute inset-0 bg-[#00A859]/5 rounded-2xl -z-10" />
                  {flowchart.topNodes.map((node, i) => (
                    <div key={i} className="bg-[#00A859] text-white rounded-xl p-4 w-56 text-center text-xs font-medium shadow-lg flex items-center justify-center leading-relaxed">
                      {node}
                    </div>
                  ))}
                </motion.div>

                {/* Vertical Arrows 1 */}
                <div className="flex gap-12 h-24 relative my-2">
                  <AnimatedVerticalArrow direction="down" label={flowchart.arrowLabels[0]} labelPosition="-left-16" delay={0.4} className="w-24" />
                  <AnimatedVerticalArrow direction="up" label={flowchart.arrowLabels[1]} labelPosition="-right-20" delay={0.6} className="w-24" />
                </div>

                {/* Middle Tier */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.8 }}
                  className="border-2 border-[#00A859] rounded-2xl px-8 py-5 bg-white shadow-xl z-10 flex items-center gap-4 relative"
                >
                  <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }} className="absolute inset-0 bg-[#00A859]/10 rounded-2xl blur-md -z-10" />
                  <Lightbulb className="w-8 h-8 text-[#1E3A8A]" />
                  <div className="flex flex-col">
                    <span className="text-[#1E3A8A] font-bold text-xl tracking-tight leading-none mb-1">{flowchart.centerFund.name}</span>
                    <span className="text-[#00A859] font-medium text-sm leading-none">{flowchart.centerFund.subtitle}</span>
                  </div>
                </motion.div>

                {/* Vertical Arrows 2 */}
                <div className="flex gap-12 h-32 relative my-2">
                  <AnimatedVerticalArrow direction="down" label={flowchart.arrowLabels[2]} labelPosition="-left-[14rem] text-right w-52" delay={1.2} className="w-24" />
                  <AnimatedVerticalArrow direction="up" label={flowchart.arrowLabels[3]} labelPosition="-right-32" delay={1.4} className="w-24" />
                </div>

                {/* Bottom Tier */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 1.6 }}
                  className="flex items-center justify-center gap-3 w-full"
                >
                  {/* Left Box */}
                  <div className="bg-[#2391D2] text-white rounded-xl p-3 w-36 text-center text-sm font-medium shadow-lg h-20 flex items-center justify-center">
                    {flowchart.bottomNodes[0]}
                  </div>

                  {/* Arrow Right 1 */}
                  <AnimatedHorizontalArrow direction="right" label={flowchart.arrowLabels[4]} labelPosition="-bottom-12 w-48" delay={2.0} className="w-28 mx-10" />

                  {/* Center Box */}
                  <div className="border-2 border-[#00A859] rounded-2xl p-5 bg-white shadow-xl flex flex-col items-center w-64 relative z-10">
                    <div className="flex gap-2 mb-3 text-[#2391D2]">
                      <Sun className="w-8 h-8" strokeWidth={1.5} />
                      <Wind className="w-8 h-8" strokeWidth={1.5} />
                      <Zap className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <span className="text-center font-medium text-[#0A1224] text-sm">{flowchart.bottomNodes[1]}</span>
                  </div>

                  {/* Arrows Right/Left 2 */}
                  <div className="relative w-28 flex flex-col justify-center gap-6 mx-4">
                    <AnimatedHorizontalArrow direction="right" label={flowchart.arrowLabels[5]} labelPosition="-top-8 w-full" delay={2.2} className="w-full" />
                    <AnimatedHorizontalArrow direction="left" label={flowchart.arrowLabels[6]} labelPosition="top-2 w-full" delay={2.4} className="w-full" />
                  </div>

                  {/* Right Box */}
                  <div className="bg-[#2391D2] text-white rounded-xl p-3 w-40 text-center text-sm font-medium shadow-lg h-20 flex items-center justify-center leading-tight">
                    {flowchart.bottomNodes[2]}
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
