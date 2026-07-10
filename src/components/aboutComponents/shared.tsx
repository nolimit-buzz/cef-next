"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Renders a string field with literal "\n" line breaks as <br />.
export const Multiline = ({ text }: { text: string }) => (
  <>
    {text.split('\n').map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ))}
  </>
);

export const STAT_CARD_STYLES = [
  { border: "border-blue-100/60", hoverBorder: "hover:border-blue-200/60", glow: "from-[#E8F2FF]", arrow: "text-blue-300/70 group-hover:text-blue-400" },
  { border: "border-[#0085CA]/20", hoverBorder: "hover:border-[#0085CA]/40", glow: "from-[#0085CA]/10", arrow: "text-[#0085CA]/60 group-hover:text-[#0085CA]" },
  { border: "border-[#50B848]/20", hoverBorder: "hover:border-[#50B848]/40", glow: "from-[#50B848]/10", arrow: "text-[#50B848]/60 group-hover:text-[#50B848]" },
];

export const StatCard = ({ value, title, description, styleIndex }: { value: string; title: string; description: string; styleIndex: number }) => {
  const style = STAT_CARD_STYLES[styleIndex % STAT_CARD_STYLES.length];
  return (
    <motion.div variants={fadeUp} className={cn("group relative bg-white p-8 flex flex-col justify-between min-h-[280px] lg:min-h-[320px] h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 border", style.border, style.hoverBorder)}>
      <div className={cn("absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl to-transparent opacity-50 pointer-events-none", style.glow)} />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-5xl lg:text-6xl font-light text-[#0A1224] tracking-tight">{value}</h3>
          <ArrowUpRight className={cn("w-8 h-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1", style.arrow)} strokeWidth={1.5} />
        </div>
        <h4 className="text-lg font-medium text-[#0A1224] mb-2">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const ExpandableApproach = ({ dotColor, approach }: { dotColor: string; approach: { sectionLabel: string; heading: string; body: string; viewMore: string; viewLess: string; expandedBody: string } }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
      className="flex flex-col md:flex-row gap-8 md:gap-16"
    >
      <div className="w-full md:w-1/4 shrink-0">
        <div className="flex items-center gap-3 text-gray-500 font-medium">
          <div className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
          <span className="text-sm tracking-wide">{approach.sectionLabel}</span>
        </div>
      </div>
      <div className="w-full md:w-3/4">
        <h3 className="text-2xl md:text-3xl font-medium leading-tight mb-4 text-[#0A1224]">
          {approach.heading}
        </h3>
        <div className="flex flex-col gap-4 text-lg text-gray-600 leading-relaxed">
          <p>{approach.body}</p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[var(--color-accent-green)] font-medium text-left hover:text-[var(--color-accent)] transition-colors w-fit flex items-center gap-1 text-base mt-2"
          >
            {isExpanded ? approach.viewLess : approach.viewMore}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="pb-4">{approach.expandedBody}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
