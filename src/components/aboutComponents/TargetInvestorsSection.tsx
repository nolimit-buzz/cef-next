"use client";
import Link from "next/link";
import { ArrowUpRight, Landmark, ShieldCheck, Building2, Users, Plus } from 'lucide-react';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { TargetInvestorsSection as TargetInvestorsSectionData } from '../../types/about';

const TARGET_INVESTOR_ICONS = [Landmark, ShieldCheck, Building2, Users];

export const TargetInvestorsSection = ({ sectionLabel, headingPrimary, headingSecondary, body, cta, cardLabel, investors }: TargetInvestorsSectionData) => {
  return (
    <section id="investors" className="py-24 lg:py-32 bg-white relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

        {/* Left Content */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start shrink-0 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">{sectionLabel}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-[#0A1224]">
            {headingPrimary} <span className="text-gray-400">{headingSecondary}</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {body}
          </p>
          <Link href="/investor-relations" className="bg-[var(--color-accent-green)] text-white hover:bg-[var(--color-accent)] px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 w-fit shadow-lg">
            {cta} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right Grid */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {investors.map((investor, i) => {
              const Icon = TARGET_INVESTOR_ICONS[i % TARGET_INVESTOR_ICONS.length];
              const investorImageUrl = getStrapiMediaURL(investor.image);
              return (
                <div
                  key={investor.id}
                  className="relative rounded-[8px] overflow-hidden h-[320px] group cursor-pointer"
                >
                  {/* Background Image */}
                  {investorImageUrl && (
                    <img
                      src={investorImageUrl}
                      alt={investor.image_alt_text || investor.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-[#050A15]/60 group-hover:bg-[#050A15]/80 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-transparent to-transparent opacity-90" />

                  {/* Top Icons */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-white/40 transition-colors">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-[var(--color-accent-green)] group-hover:border-[var(--color-accent-green)] transition-colors">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end h-full">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-3 block">
                        {cardLabel}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-medium text-white leading-tight">
                        {investor.title}
                      </h3>

                      {/* Hover Description */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                        <div className="overflow-hidden">
                          <p className="text-sm text-white/70 mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {investor.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
