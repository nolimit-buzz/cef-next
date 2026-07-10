"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { GradientCard } from '../GradientCard';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { ValuesAndImpactSection as ValuesAndImpactSectionData } from '../../types/about';
import { fadeUp, staggerContainer } from './shared';

const SDG_STYLES: Record<string, { baseColor: string; bg: string; border: string }> = {
  "5": { baseColor: "255, 58, 33", bg: "bg-[#FF3A21]", border: "bg-[#FF3A21]/10 border-[#FF3A21]/20" },
  "8": { baseColor: "162, 25, 66", bg: "bg-[#A21942]", border: "bg-[#A21942]/10 border-[#A21942]/20" },
  "11": { baseColor: "253, 157, 36", bg: "bg-[#FD9D24]", border: "bg-[#FD9D24]/10 border-[#FD9D24]/20" },
  "13": { baseColor: "63, 126, 68", bg: "bg-[#3F7E44]", border: "bg-[#3F7E44]/10 border-[#3F7E44]/20" },
};
const DEFAULT_SDG_STYLE = { baseColor: "63, 126, 68", bg: "bg-[#3F7E44]", border: "bg-[#3F7E44]/10 border-[#3F7E44]/20" };

const SdgCard = ({ sdg }: { sdg: ValuesAndImpactSectionData['sdgs'][number] }) => {
  const style = SDG_STYLES[sdg.sdgCode] ?? DEFAULT_SDG_STYLE;
  return (
    <GradientCard variants={fadeUp} baseColor={style.baseColor} mode="light" className="h-full">
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="text-4xl font-light text-gray-300 font-sans">{sdg.number}</span>
          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#0A1224] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
        </div>
        <h4 className="text-xl font-medium text-[#0A1224] mb-4">{sdg.title}</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className={cn("group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default", style.border)}>
            <div className={cn("w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white", style.bg)}>{sdg.sdgCode}</div>
            <span className="text-[10px] font-medium" style={{ color: `rgb(${style.baseColor})` }}>SDG {sdg.sdgCode}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 font-light leading-relaxed text-sm mt-auto">
        {sdg.body}
      </p>
    </GradientCard>
  );
};

export const ValuesAndImpactSection = ({ sectionLabel, headingPrimary, headingSecondary, body, sdgs, decorative_image_1, decorative_image_1_alt_text, decorative_image_2, decorative_image_2_alt_text }: ValuesAndImpactSectionData) => {
  // Original layout interleaves a decorative image between every pair of SDG cards (2 cards + 1 image per row).
  const rows: typeof sdgs[] = [];
  for (let i = 0; i < sdgs.length; i += 2) {
    rows.push(sdgs.slice(i, i + 2));
  }

  const decorativeImages = [
    { url: getStrapiMediaURL(decorative_image_1), alt: decorative_image_1_alt_text },
    { url: getStrapiMediaURL(decorative_image_2), alt: decorative_image_2_alt_text },
  ].filter((img): img is { url: string; alt: string | undefined } => Boolean(img.url));

  return (
    <section id="values" className="py-24 lg:py-32 bg-white relative z-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              {sectionLabel}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left: Headline */}
            <motion.div variants={fadeUp}>
              <h3 className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight text-[#0A1224]">
                {headingPrimary} <br className="hidden lg:block" />
                <span className="text-gray-400">{headingSecondary}</span>
              </h3>
            </motion.div>

            {/* Right: Description */}
            <motion.div variants={fadeUp} className="flex flex-col justify-start items-start">
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-8 max-w-xl">
                {body}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bento Grid Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]"
        >
          {rows.map((row, rowIndex) => (
            <>
              {row[0] && <SdgCard key={row[0].id} sdg={row[0]} />}
              {decorativeImages.length > 0 && (
                <motion.div
                  key={`img-${rowIndex}`}
                  variants={fadeUp}
                  className="group relative border border-gray-200 rounded overflow-hidden bg-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                  <img
                    src={decorativeImages[rowIndex % decorativeImages.length].url}
                    alt={decorativeImages[rowIndex % decorativeImages.length].alt || "Clean Energy Infrastructure"}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}
              {row[1] && <SdgCard key={row[1].id} sdg={row[1]} />}
            </>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
