"use client";
import { getStrapiMediaURL } from '../../lib/strapi';
import { cn } from '../../lib/utils';
import type { TechnicalAssistanceSection as TechnicalAssistanceSectionData } from '../../types/about';
import { Multiline } from './shared';

export const TechnicalAssistanceSection = ({ sectionLabel, partners, ratingAgencies }: TechnicalAssistanceSectionData) => {
  const gcr = ratingAgencies[0];
  const greenVerifier = ratingAgencies[1];

  return (
    <section className="w-full">
      {/* Top Tier: Technical Assistance */}
      <div className="bg-[#f0f5fd] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#00A859] font-bold tracking-[0.2em] uppercase mb-12 text-center lg:text-left text-sm">
            {sectionLabel}
          </h2>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
            {partners.map((partner, i) => {
              const logoUrl = getStrapiMediaURL(partner.logo);
              const isFirst = i === 0;
              return (
                <div key={partner.id} className="contents">
                  <div className={cn("flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-6", isFirst ? "lg:pr-10" : "lg:pl-10")}>
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt={partner.logo_alt_text || partner.name}
                        className="h-12 w-32 object-contain object-left shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-[#0A1224] text-sm mb-1">{partner.name}</span>
                      <p className="text-sm text-[#0A1224] leading-relaxed">
                        {partner.body}
                      </p>
                    </div>
                  </div>
                  {isFirst && partners.length > 1 && (
                    <>
                      <div className="hidden lg:block w-px bg-gray-400/50 self-stretch" />
                      <div className="lg:hidden h-px w-full bg-gray-400/50" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Tier: Rating Agencies */}
      <div className="bg-[#dae7fa] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Rating Agency 1: GCR */}
          {gcr && (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <span className="text-[#003366] font-bold text-lg whitespace-nowrap">{gcr.label}</span>
              <div className="flex items-center gap-4 border-l border-gray-400/50 pl-6">
                <div className="flex flex-col items-center">
                  <span className="text-[#E3000F] font-bold text-4xl leading-none tracking-tighter">{gcr.name}</span>
                  <span className="text-gray-500 text-[10px] tracking-[0.2em] mt-1">{gcr.sub}</span>
                </div>
                <div className="text-[11px] text-gray-600 border-l border-gray-400/50 pl-4 leading-tight">
                  <Multiline text={gcr.affiliation} />
                </div>
              </div>
            </div>
          )}

          {/* Rating Agency 2: Green Verifier */}
          {greenVerifier && (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <span className="text-[#003366] font-bold text-lg whitespace-nowrap">{greenVerifier.label}</span>
              <div className="flex flex-col gap-1 border-l border-gray-400/50 pl-6">
                <div className="flex items-center gap-2">
                  <div className="grid grid-cols-2 gap-[2px]">
                    <div className="w-3 h-3 bg-[#003366]"></div>
                    <div className="w-3 h-3 bg-gray-400"></div>
                    <div className="w-3 h-3 bg-gray-400"></div>
                    <div className="w-3 h-3 bg-gray-400"></div>
                  </div>
                  <span className="text-[#003366] font-bold text-3xl tracking-tight">{greenVerifier.name}</span>
                </div>
                <div className="text-[10px] text-[#003366] italic ml-8">
                  {greenVerifier.tagline}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
