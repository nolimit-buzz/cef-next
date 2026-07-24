"use client";
import { motion } from 'framer-motion';
import Breadcrumbs from '../Breadcrumbs';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { ProjectItem } from '../../types/portfolio';
import { getMetricIcon, getSdgStyle, staggerContainer, fadeUp } from '../portfolioComponents/shared';

export const HeroSection = ({ project }: { project: ProjectItem }) => {
  const imageUrl = getStrapiMediaURL(project.image);

  return (
    <section className="relative pt-32 pb-24 bg-[var(--color-background)] overflow-hidden min-h-[50vh] flex flex-col justify-center border-b border-white/5">
      <div className="absolute inset-0 z-0">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={project.image_alt_text || "Project Hero"}
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <Breadcrumbs />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
        >
          <motion.div variants={fadeUp} className="lg:col-span-8">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border"
              style={{
                backgroundColor: `${project.sectorColor || 'var(--color-accent)'}1A`,
                borderColor: project.sectorColor || 'var(--color-accent)',
                color: project.sectorColor || 'var(--color-accent)'
              }}
            >
              {project.sector}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 text-white max-w-4xl">
              {project.name}
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-4 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.slice(0, 4).map((metric) => {
                const Icon = getMetricIcon(metric.icon);
                return (
                  <div key={metric.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex flex-col items-start">
                    <Icon className="w-4 h-4 text-[var(--color-accent-light)] mb-2" />
                    <div className="text-xl font-light text-white mb-1">{metric.value}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/50">{metric.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 block mb-3">
                SDG Alignment
              </span>
              <div className="flex flex-wrap gap-2">
                {project.sdgs.map((sdg) => {
                  const style = getSdgStyle(sdg.sdgNumber);
                  return (
                    <div
                      key={sdg.id}
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
                      {style.label && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                          {style.label}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
