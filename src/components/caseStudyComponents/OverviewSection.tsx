"use client";
import { motion } from 'framer-motion';
import type { ProjectItem } from '../../types/portfolio';
import { staggerContainer, fadeUp } from '../portfolioComponents/shared';

export const OverviewSection = ({ project }: { project: ProjectItem }) => {
  const overview = project.caseStudy?.overview?.length
    ? project.caseStudy.overview
    : [{ id: 0, text: project.description }];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={staggerContainer}
      id="overview"
      className="scroll-mt-32"
    >
      <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-8">
        <span className="text-slate-900">Project </span>
        <span className="text-slate-400">Overview</span>
      </motion.h2>
      <motion.div variants={fadeUp}>
        {overview.map((paragraph) => (
          <p key={paragraph.id} className="text-slate-600 leading-relaxed mb-6">
            {paragraph.text}
          </p>
        ))}
      </motion.div>
    </motion.section>
  );
};
