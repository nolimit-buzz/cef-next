"use client";
import { motion } from 'framer-motion';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { ProjectItem, CaseStudyImpactMetricItem } from '../../types/portfolio';
import { staggerContainer, fadeUp, itemVariants, getMetricIcon, getSdgStyle } from '../portfolioComponents/shared';

export const ImpactMetricsSection = ({ project }: { project: ProjectItem }) => {
  const impactMetrics: CaseStudyImpactMetricItem[] = project.caseStudy?.impactMetrics?.length
    ? project.caseStudy.impactMetrics
    : project.metrics.map(m => ({
        id: m.id,
        label: m.label,
        value: m.value,
        icon: m.icon,
        description: `Key metric demonstrating the impact of ${m.label.toLowerCase()}.`,
        image: project.image,
        image_alt_text: project.image_alt_text,
        sdgNumber: project.sdgs[0]?.sdgNumber ?? '7',
      }));

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={staggerContainer}
      id="impact-metrics"
      className="scroll-mt-32 bg-[var(--color-surface)] rounded-lg p-8 md:p-12 lg:p-16 relative overflow-hidden border border-white/5"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-lg">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-accent)]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-accent-green)]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-12">
          <span className="text-white">Impact </span>
          <span className="text-[var(--color-text-secondary)]">Metrics</span>
        </motion.h2>

        {/* Metrics Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {impactMetrics.map((metric) => {
            const Icon = getMetricIcon(metric.icon);
            const style = getSdgStyle(metric.sdgNumber);
            const imageUrl = getStrapiMediaURL(metric.image);
            return (
              <motion.div
                key={metric.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="relative overflow-hidden group transition-all duration-500 shadow-xl rounded-lg border border-white/10 bg-white/5 h-full flex flex-col p-8"
              >
                {/* Hover Image Background */}
                {imageUrl && (
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <img
                      src={imageUrl}
                      alt={metric.image_alt_text || metric.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-luminosity"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[var(--color-accent)]/60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-12">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]/30 transition-colors duration-500"
                    >
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-[var(--color-accent-light)] transition-colors duration-500" />
                    </motion.div>

                    {/* Inline SDG */}
                    <div
                      className="flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                      style={{ backgroundColor: `${style.color}1A`, borderColor: `${style.color}33` }}
                    >
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                        style={{ backgroundColor: style.color, color: metric.sdgNumber === '7' ? 'black' : 'white' }}
                      >
                        {metric.sdgNumber}
                      </div>
                      <span className="text-[10px] font-medium" style={{ color: style.color }}>SDG {metric.sdgNumber}</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-4xl md:text-5xl font-light mb-4 text-white tracking-tight group-hover:text-white transition-colors duration-500">{metric.value}</div>
                    <div className="text-sm font-medium text-white/90 mb-2">{metric.label}</div>
                    <div className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-500">{metric.description}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};
