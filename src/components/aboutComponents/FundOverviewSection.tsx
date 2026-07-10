"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";
import { cn } from '../../lib/utils';
import type { FundOverviewSection as FundOverviewSectionData } from '../../types/about';
import { Multiline } from './shared';

export const FundOverviewSection = ({ sectionLabel, heading, body, ctaPrimary, ctaSecondary, items }: FundOverviewSectionData) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="fund-overview" className="py-24 lg:py-32 bg-[#050A15] text-white relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block">{sectionLabel}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-5/12 flex flex-col justify-start"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight mb-8">
            <Multiline text={heading} />
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-md">
            {body}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button className="w-full sm:w-auto bg-white text-[#050A15] hover:bg-gray-100 px-8 py-4 rounded text-sm font-medium transition-colors">
              {ctaPrimary}
            </button>
            <Link href="/fund" className="text-white hover:text-[var(--color-accent-green)] text-sm font-medium transition-colors flex items-center gap-2">
              {ctaSecondary} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="w-full lg:w-7/12 flex flex-col justify-start"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={cn(
                "border-white/10 py-10 flex flex-col md:flex-row gap-6 md:gap-12",
                i === 0 && "first:pt-0 border-b",
                i > 0 && i < items.length - 1 && "border-b",
                i === items.length - 1 && "pb-0"
              )}
            >
              <h3 className="text-2xl font-medium w-full md:w-1/2">{item.title}</h3>
              <p className="text-white/60 leading-relaxed w-full md:w-1/2">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
};
