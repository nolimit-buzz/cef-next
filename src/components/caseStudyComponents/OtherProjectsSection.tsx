"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";
import { getStrapiMediaURL } from '../../lib/strapi';
import type { ProjectItem } from '../../types/portfolio';
import { staggerContainer, fadeUp } from '../portfolioComponents/shared';

export const OtherProjectsSection = ({ otherProjects }: { otherProjects: ProjectItem[] }) => {
  if (otherProjects.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={staggerContainer}
      className="mt-12 mb-12"
    >
      <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-8">
        <span className="text-slate-900">Other </span>
        <span className="text-slate-400">Projects</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherProjects.map((otherProject) => {
          const imageUrl = getStrapiMediaURL(otherProject.image);
          return (
            <Link href={`/portfolio/${otherProject.projectId}`} key={otherProject.projectId} onClick={() => window.scrollTo(0, 0)}>
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="group relative h-[300px] rounded-lg overflow-hidden bg-white cursor-pointer border border-slate-200"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={otherProject.image_alt_text || otherProject.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8">
                  <span
                    className="px-2 py-1 text-[10px] font-bold rounded-full text-white shadow-lg mb-3 inline-block"
                    style={{ backgroundColor: otherProject.sectorColor || 'var(--color-accent)' }}
                  >
                    {otherProject.sector}
                  </span>
                  <h4 className="text-2xl font-medium text-white flex items-center justify-between">
                    {otherProject.name}
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </h4>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
};
