"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import type { EligibilitySection } from '../types/home';
import { getCtaHref } from '../lib/strapi';

const DEFAULT_SECTORS = [
  {
    title: "Energy Access",
    focus: "Solar Mini-grids & C&I Solar",
    ticket: "₦500M - ₦2B",
    risk: "Asset-backed, long-term off-taker agreements",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Clean Cooking",
    focus: "LPG distribution & biomass transition",
    ticket: "₦300M - ₦1.5B",
    risk: "High gender empowerment (SDG 5) and respiratory health benefits",
    image: "https://images.unsplash.com/photo-1554260570-9140fd3b7614?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Agro-Processing",
    focus: "Solar-powered milling, cold storage",
    ticket: "₦400M - ₦2B",
    risk: "Reducing post-harvest loss and boosting local GDP",
    image: "https://images.unsplash.com/photo-1586771107445-d3afcb84d3e8?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Telecommunications",
    focus: "Telecom tower solar hybridization",
    ticket: "₦1B - ₦3B",
    risk: "Blue-chip off-takers, predictable long-term yields",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Transportation",
    focus: "E-Mobility & EV charging infrastructure",
    ticket: "₦500M - ₦1.5B",
    risk: "Pioneering market share in high-density urban corridors",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=800&auto=format&fit=crop"
  }
];

export const EligibilityCriteria = ({ cms }: { cms?: EligibilitySection }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setVisibleCards(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const sectors = cms?.sectors?.length
    ? cms.sectors.map(s => ({
        title: s.title,
        focus: s.focus,
        ticket: s.ticket_size,
        risk: s.risk_profile,
        image: s.image,
      }))
    : DEFAULT_SECTORS;

  const cardDefaultLabel = cms?.card_default_label ?? "Priority Sector";
  const focusLabel = cms?.focus_label ?? "Focus";
  const ticketLabel = cms?.ticket_size_label ?? "Ticket Size";
  const riskLabel = cms?.risk_profile_label ?? "Risk Profile";

  const maxIndex = Math.max(sectors.length - visibleCards, 0);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-20 bg-[#dae7fa] text-slate-900 border-t border-slate-200 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
                {cms?.eyebrow ?? "Eligibility"}
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-medium leading-[1.15] tracking-tight mb-6">
              <span className="text-slate-900">{cms?.headline_part1 ?? "Is Your Project"}</span>{' '}
              {(cms?.headline_part2 ?? "Eligible?") && (
                <span className="text-slate-500">{cms?.headline_part2 ?? "Eligible?"}</span>
              )}
            </h2>

            <p className="text-base text-slate-600 font-light leading-relaxed max-w-sm mb-8">
              {cms?.body ?? "We focus on high-impact, climate-aligned infrastructure projects within our priority sectors. Discover if your initiative aligns with our investment mandate."}
            </p>

            {(() => {
              const ctaClassName = "bg-slate-900 text-white hover:bg-[var(--color-accent-light)] hover:text-white px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg w-fit";
              const label = (
                <>
                  {cms?.cta?.cta_text ?? "View Eligibility Criteria"} <ArrowUpRight className="w-4 h-4" />
                </>
              );
              const href = getCtaHref(cms?.cta);
              return href ? (
                <a href={href} rel="noopener noreferrer" download className={ctaClassName}>
                  {label}
                </a>
              ) : (
                <button className={ctaClassName}>{label}</button>
              );
            })()}
          </motion.div>

          {/* Right Carousel */}
          <motion.div
            className="lg:col-span-8 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="relative w-full overflow-hidden px-0 sm:px-12">
              <motion.div
                className="flex gap-6"
                animate={{ x: `calc(-${currentIndex * (100 / visibleCards)}% - ${currentIndex * (24 / visibleCards)}px)` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              >
                {sectors.map((sector, idx) => (
                  <div key={idx} className="min-w-full sm:min-w-[calc(50%-12px)] h-[260px] relative rounded-md sm:rounded-lg overflow-hidden shadow-xl group">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[rgb(0,133,202)]/40 mix-blend-multiply group-hover:bg-[rgb(0,133,202)]/80 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Default State */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transition-opacity duration-500 group-hover:opacity-0">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1 block">{cardDefaultLabel}</span>
                        <h3 className="text-lg font-medium text-white">{sector.title}</h3>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Hover State Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <h3 className="text-xl font-medium text-white mb-4">{sector.title}</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-0.5">{focusLabel}</span>
                          <p className="text-sm text-white/90 leading-tight">{sector.focus}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-0.5">{ticketLabel}</span>
                          <p className="text-sm text-[var(--color-accent-green)] font-medium">{sector.ticket}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-0.5">{riskLabel}</span>
                          <p className="text-xs text-white/80 leading-tight">{sector.risk}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Navigation Controls */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={nextSlide}
                  disabled={currentIndex >= maxIndex}
                  className="w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
