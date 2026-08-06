// Single source of truth for the "Strategic Partners & Funders" marquee.
// Previously duplicated in Footer.tsx and AboutFund.tsx, where the two copies
// were free to drift apart.
//
// Logos are self-hosted from /public/assets rather than hotlinked from each
// partner's own domain: those origins can rename assets, block cross-origin
// requests, or go down, and at least one (climatebonds.net) already returns 403
// to hotlinks. Partners with no local asset render as a text wordmark instead.

export type Partner =
  | { type: "logo"; name: string; src: string }
  | { type: "text"; name: string };

export const partners: readonly Partner[] = [
  { type: "logo", name: "NSIA", src: "/assets/nsia.svg" },
  { type: "logo", name: "InfraCredit", src: "/assets/infracredit.svg" },
  { type: "logo", name: "Shelter Afrique", src: "/assets/shelter-afrique.svg" },
  { type: "text", name: "All On" },
  // Climate Bonds Initiative blocks hotlinking; swap to a logo once the asset
  // is added to /public/assets.
  { type: "text", name: "Climate Bonds" },
  { type: "logo", name: "FMDQ", src: "/assets/fmdq.svg" },
  { type: "logo", name: "USAID", src: "/assets/USAID.svg" },
  { type: "logo", name: "UK NIAF", src: "/assets/UKNIAF_Logo-1.svg" },
] as const;
