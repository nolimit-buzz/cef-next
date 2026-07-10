"use client";
import { motion } from 'framer-motion';
import { Layers, Zap } from 'lucide-react';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { ProjectItem } from '../../types/portfolio';
import { staggerContainer, fadeUp } from '../portfolioComponents/shared';

export const SolutionSection = ({ project }: { project: ProjectItem }) => {
  const caseStudy = project.caseStudy;
  const solution = caseStudy?.solution ?? [];
  const solutionImage1Url = getStrapiMediaURL(caseStudy?.solutionImage1);
  const solutionImage2Url = getStrapiMediaURL(caseStudy?.solutionImage2);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={staggerContainer}
      id="our-solution"
      className="scroll-mt-32"
    >
      <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-8">
        <span className="text-slate-900">Our </span>
        <span className="text-slate-400">Solution</span>
      </motion.h2>
      <motion.div variants={fadeUp}>
        {solution.map((paragraph) => (
          <p key={paragraph.id} className="text-slate-600 leading-relaxed mb-6">
            {paragraph.text}
          </p>
        ))}
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <motion.div variants={fadeUp} className="bg-[#F8FAFC] p-8 rounded-lg border border-slate-200">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
            <Layers className="w-5 h-5 text-[var(--color-accent)]" />
          </div>
          <h3 className="text-xl font-medium mb-3 text-slate-900">Infrastructure Scaling</h3>
          <p className="text-slate-600 leading-relaxed mb-8">
            Financed the deployment of new infrastructure across key commercial nodes, ensuring optimal coverage.
          </p>
          {solutionImage1Url && (
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img src={solutionImage1Url} alt={caseStudy?.solutionImage1_alt_text || "Infrastructure"} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white text-slate-900 p-8 rounded-lg flex flex-col justify-between relative overflow-hidden border border-slate-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-green)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
              <Zap className="w-5 h-5 text-[var(--color-accent-green)]" />
            </div>
            <h3 className="text-xl font-medium mb-3">Capacity Expansion</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              Enabled the procurement of additional assets, directly leased to verified partners through an innovative model.
            </p>
          </div>
          {solutionImage2Url && (
            <div className="aspect-[4/3] rounded-lg overflow-hidden relative z-10">
              <img src={solutionImage2Url} alt={caseStudy?.solutionImage2_alt_text || "Capacity"} className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};
