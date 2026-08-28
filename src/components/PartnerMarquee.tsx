"use client";
import { motion } from "framer-motion";

import { partners as fallbackPartners } from "../data/partners";
import type { PartnerItem } from "../types/global";

export interface MarqueePartner {
  name: string;
  /** null renders the name as a text wordmark instead of a logo. */
  src: string | null;
  alt?: string;
}

/**
 * Normalises CMS partners into the marquee's shape, falling back to the
 * bundled list when the CMS returns nothing — a CMS outage should still show
 * the partner strip rather than a blank gap.
 */
export function toMarqueePartners(cms?: PartnerItem[] | null): MarqueePartner[] {
  if (cms?.length) {
    return cms.map((p) => ({
      name: p.name,
      src: p.logo_url ?? null,
      alt: p.logo_url_alt_text || p.name,
    }));
  }
  return fallbackPartners.map((p) => ({
    name: p.name,
    src: p.type === "logo" ? p.src : null,
  }));
}

/**
 * The scrolling partner logo strip, shared by the home page and the footer.
 *
 * The edge masks are hardcoded to #0A0A0A, so this only sits correctly on the
 * near-black section background both call sites use.
 */
export function PartnerMarquee({
  heading,
  partners,
}: {
  heading: string;
  partners: MarqueePartner[];
}) {
  if (!partners.length) return null;

  return (
    <div className="py-12 border-t border-[var(--color-border)]">
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--color-text-tertiary)] mb-8">
          {heading}
        </span>

        <div className="w-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            className="flex items-center gap-16 md:gap-24 whitespace-nowrap w-max px-12"
          >
            {[
              ...partners,
              ...partners, // duplicate for seamless loop
            ].map((partner, i) =>
              !partner.src ? (
                <span
                  key={i}
                  className="text-lg md:text-2xl font-sans italic tracking-tight text-[var(--color-text-secondary)] cursor-default"
                >
                  {partner.name}
                </span>
              ) : (
                <div
                  key={i}
                  className="flex items-center justify-center h-8 w-32 flex-shrink-0 cursor-default"
                >
                  <img
                    src={partner.src}
                    alt={partner.alt ?? partner.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
