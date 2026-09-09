"use client";
import { motion } from "framer-motion";

import type { Partner } from "../data/partners";
import type { PartnerItem } from "../types/global";

export interface MarqueePartner {
  name: string;
  /** null renders the name as a text wordmark instead of a logo. */
  src: string | null;
  alt?: string;
  /**
   * The logo is baked onto an opaque background plate, so it cannot be
   * flattened to white. Shows the name as a wordmark, swapping in the real
   * logo on hover.
   */
  plated?: boolean;
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
      src: p.logo_url ?? null,
      alt: p.logo_url_alt_text || p.name,
      plated: p.plated ?? false,
    }));
  }
  return fallback.map((p) => ({
    name: p.name,
    src: p.type === "text" ? null : p.src,
    plated: p.type === "plated",
  }));
}

/** Shared so a plated logo's resting name matches a text-only partner's. */
const wordmark =
  "text-lg md:text-2xl font-sans italic tracking-tight text-white whitespace-nowrap";

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
              // No asset at all — the name is the only thing to show.
              if (!partner.src) {
                return (
                  <span key={i} className={`${wordmark} cursor-default`}>
                    {partner.name}
                  </span>
                );
              }

              // Plated logos can't be flattened to white, so the wordmark
              // carries the resting state and hover reveals the real logo.
              if (partner.plated) {
                return (
                  <div
                    key={i}
                    className="group relative flex items-center justify-center h-8 min-w-32 flex-shrink-0 px-2 cursor-default"
                  >
                    <span
                      className={`${wordmark} transition-opacity duration-300 group-hover:opacity-0`}
                    >
                      {partner.name}
                    </span>
                    <img
                      src={partner.src}
                      alt={partner.alt ?? partner.name}
                      className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                );
              }

              // brightness-0 crushes the logo to black, invert flips it to pure
              // white — one uniform treatment for logos that each ship in their
              // own brand colours. Hover drops the filter to show the real thing.
              return (
                <div
                  key={i}
                  className="group flex items-center justify-center h-8 w-32 flex-shrink-0 cursor-default"
                >
                  <img
                    src={partner.src}
                    alt={partner.alt ?? partner.name}
                    className="h-full w-full object-contain brightness-0 invert transition-[filter] duration-300 group-hover:brightness-100 group-hover:invert-0"
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
