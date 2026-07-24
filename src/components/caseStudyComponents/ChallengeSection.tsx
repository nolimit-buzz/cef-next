"use client";
import * as React from 'react';
import { motion } from 'framer-motion';
import type { ProjectItem } from '../../types/portfolio';
import { staggerContainer, fadeUp } from '../portfolioComponents/shared';

export const ChallengeSection = ({ project }: { project: ProjectItem }) => {
  const challenge = project.caseStudy?.challenge;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={staggerContainer}
      id="the-challenge"
      className="scroll-mt-32"
    >
      <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-8">
        <span className="text-slate-900">The </span>
        <span className="text-slate-400">Challenge</span>
      </motion.h2>
      {challenge && (
        <motion.div variants={fadeUp}>
          {challenge.text.map((paragraph, idx) => {
            if (idx === 1 && challenge.quote) {
              return (
                <React.Fragment key={paragraph.id}>
                  <blockquote className="border-l-[3px] border-[var(--color-accent)] pl-8 py-2 my-12 text-2xl md:text-3xl font-light text-slate-900 italic leading-snug">
                    &quot;{challenge.quote}&quot;
                  </blockquote>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {paragraph.text}
                  </p>
                </React.Fragment>
              );
            }
            return (
              <p key={paragraph.id} className="text-slate-600 leading-relaxed mb-6">
                {paragraph.text}
              </p>
            );
          })}
        </motion.div>
      )}
    </motion.section>
  );
};
