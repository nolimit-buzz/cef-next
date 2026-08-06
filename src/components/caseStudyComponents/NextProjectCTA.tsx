"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";
import { fadeUp } from '../portfolioComponents/shared';

export const NextProjectCTA = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={fadeUp}
      className="mt-12 bg-[var(--color-surface)] rounded-lg p-12 md:p-20 text-center relative overflow-hidden border border-white/5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent" />
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Ready to scale your impact?</h2>
        <p className="text-[var(--color-text-secondary)] mb-10 max-w-xl mx-auto text-lg">
          Discover how our local currency financing can accelerate your transition to clean energy.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/portfolio" className="bg-[var(--color-accent-green)] text-white hover:bg-[var(--color-accent)] px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300">
            View All Case Studies <ArrowUpRight className="w-4 h-4" />
          </Link>
          {/* Points at the contact page rather than a mailto: the page's form is
              backed by a real API route and its addresses come from the CMS, so
              there is no hardcoded address here to go stale. */}
          <Link href="/contact" className="bg-white/10 text-white hover:bg-white/20 px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
            Contact Our Team
          </Link>
        </div>
      </div>
    </motion.section>
  );
};
