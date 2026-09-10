"use client";
import { motion } from "framer-motion";

import type { Partner } from "../data/partners";
import type { PartnerItem } from "../types/global";

export interface MarqueePartner {
  name: string;
  /** The all-white logo shown at rest; null renders the name as a wordmark. */
  white: string | null;
  /** Brand-colour logo revealed on hover. Absent means the logo stays white. */
  color?: string | null;
  alt?: string;
}

/**
 * Normalises CMS partners into the marquee's shape, falling back to the
 * caller's bundled list when the CMS returns nothing — a CMS outage should
 * still show the partner strip rather than a blank gap. The fallback is passed
 * in rather than imported because the strategic and OEM strips each have their
 * own list.
 */
export function toMarqueePartners(
  cms: PartnerItem[] | null | undefined,
  fallback: readonly Partner[],
): MarqueePartner[] {
  if (cms?.length) {
    return cms.map((p) => ({
      name: p.name,
      white: p.logo_url ?? null,
      color: p.logo_url_color ?? null,
      alt: p.logo_url_alt_text || p.name,
    }));
  }
  return fallback.map((p) =>
    p.type === "text"
      ? { name: p.name, white: null }
      : { name: p.name, white: p.white, color: p.color ?? null },
  );
}

/** Shared so a wordmark partner sits consistently beside the logos. */
const wordmark =
  "text-lg md:text-2xl font-sans italic tracking-tight text-white whitespace-nowrap";

const logoBox = "flex items-center justify-center h-8 w-32 flex-shrink-0 cursor-default";

/**
 * The scrolling partner logo strip, used for both the home page's strategic
 * partners and the footer's OEM partners.
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
            ].map((partner, i) => {
              // No usable asset — the name is the only thing to show.
              if (!partner.white) {
                return (
                  <span key={i} className={`${wordmark} cursor-default`}>
                    {partner.name}
                  </span>
                );
              }

              // White-only: no brand-colour export that reads on a dark ground.
              if (!partner.color) {
                return (
                  <div key={i} className={logoBox}>
                    <img
                      src={partner.white}
                      alt={partner.alt ?? partner.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                );
              }

              // Cross-fade white → brand colour on hover. The colour image is
              // aria-hidden so the partner is announced once, not twice.
              return (
                <div key={i} className={`group relative ${logoBox}`}>
                  <img
                    src={partner.white}
                    alt={partner.alt ?? partner.name}
                    className="h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={partner.color}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
