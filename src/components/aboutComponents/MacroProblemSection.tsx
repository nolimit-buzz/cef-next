"use client";
import { motion } from 'framer-motion';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { MacroProblemSection as MacroProblemSectionData } from '../../types/about';
import { fadeUp, staggerContainer, StatCard, ExpandableApproach } from './shared';

export const MacroProblemSection = ({ sectionLabel, headingPrimary, headingSecondary, subheading, stats, solution, bento_image, bento_image_alt_text }: MacroProblemSectionData) => {
  const bentoImageUrl = getStrapiMediaURL(bento_image);
  return (
    <section id="challenge" className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20">
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Block A: Editorial Split */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUp}
          className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20"
        >
          <div className="w-full md:w-1/4 shrink-0">
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-sm tracking-wide">{sectionLabel}</span>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight mb-4">
              <span className="text-[#0A1224]">{headingPrimary}</span>
              <span className="text-slate-400">{headingSecondary}</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              {subheading}
            </p>
          </div>
        </motion.div>

        {/* Block B: Bento Grid */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {/* Card 1: Image */}
          {bentoImageUrl && (
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden min-h-[280px] lg:min-h-[320px] h-full">
              <img
                src={bentoImageUrl}
                alt={bento_image_alt_text || "Solar installation"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}

          {stats.map((stat) => (
            <StatCard key={stat.id} value={stat.value} title={stat.title} description={stat.description} styleIndex={0} />
          ))}
        </motion.div>

        {/* Block C: Editorial Split (Solution) */}
        <ExpandableApproach dotColor="bg-gray-400" approach={solution} />

      </div>
    </section>
  );
};
