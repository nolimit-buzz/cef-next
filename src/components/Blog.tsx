"use client";
import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";
import { articles } from '../data/articles';
import type { NewsSection } from '../types/home';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const BlogArticle = ({ article, index, isLast, setLastActive }: { key?: React.Key, article: any, index: number, isLast: boolean, setLastActive: (v: boolean) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "start 130px"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isLast) {
      setLastActive(latest > 0);
    }
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Link href={`/news/${article.id}`} className="group cursor-pointer flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        {/* Image - Square and smaller */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden relative shrink-0">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[rgb(0,133,202)]/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center w-full">
          <div className="flex items-center gap-4 mb-4">
            {/* Capsule style category */}
            <div 
              className="px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest"
              style={{ 
                backgroundColor: `${article.color}1A`, 
                borderColor: `${article.color}33`,
                color: article.color
              }}
            >
              {article.category}
            </div>
            <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              {article.date}
            </span>
          </div>
          
          {/* Longer title, smaller font */}
          <h3 className="text-lg sm:text-xl font-medium leading-snug text-slate-900 mb-4 relative inline-block w-fit">
            {article.title}
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-slate-900 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </h3>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {article.readTime}
            </span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-colors duration-500">
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const Blog = ({ cms }: { cms?: NewsSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLastActive, setIsLastActive] = useState(false);

  return (
    <section ref={containerRef} className="py-32 bg-[#F8FAFC] text-slate-900 border-t border-slate-200 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Sticky Header & CTA */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 flex flex-col justify-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]" />
                  <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
                    {cms?.eyebrow ?? "News & Insights"}
                  </span>
                </motion.div>
                
                <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-8">
                  <span className="text-slate-900">{cms?.headline_part1 ?? "Perspectives on"}</span>
                  {(cms?.headline_part2 ?? "Clean Energy & Finance.") && (
                    <><br className="hidden lg:block" /><span className="text-slate-500">{cms?.headline_part2 ?? "Clean Energy & Finance."}</span></>
                  )}
                </motion.h2>

                <motion.p variants={fadeUp} className="text-lg text-slate-600 font-light leading-relaxed max-w-md mb-12">
                  {cms?.body ?? "Explore our latest thinking on sustainable infrastructure, local currency financing, and the transition to a low-carbon economy."}
                </motion.p>
              </motion.div>

              {/* Consistent CTA Reveal */}
              <AnimatePresence>
                {isLastActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    className="mt-4 hidden lg:block"
                  >
                    <Link href="/news" className="bg-slate-900 text-white hover:bg-[var(--color-accent-light)] hover:text-white px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg w-fit whitespace-nowrap">
                      {cms?.view_all_button ?? "View All Articles"} <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Article List */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-12 lg:gap-16 pb-32">
              {articles.slice(0, 4).map((article, index) => (
                <BlogArticle 
                  key={article.id}
                  article={article}
                  index={index}
                  isLast={index === 3}
                  setLastActive={setIsLastActive}
                />
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 lg:hidden flex justify-start">
              <Link href="/news" className="bg-slate-900 text-white hover:bg-[var(--color-accent-light)] hover:text-white px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg w-fit whitespace-nowrap">
                {cms?.view_all_button ?? "View All Articles"} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
