// Fallback for the partner marquee, used only when the CMS returns no partners
// (an outage, or a fresh install before seeding). The live list is the
// `partners` field on the Global single-type; keep this in step with it.
//
// Logos are self-hosted from /public/assets rather than hotlinked from each
// partner's own domain: those origins can rename assets, block cross-origin
// requests, or go down, and at least one (climatebonds.net) already returns 403
// to hotlinks. Partners with no local asset render as a text wordmark instead.

export type Partner =
  | { type: "logo"; name: string; src: string }
  | { type: "text"; name: string };

export const partners: readonly Partner[] = [
  { type: "logo", name: "InfraCredit", src: "/assets/infracredit.svg" },
  { type: "logo", name: "Shelter Afrique", src: "/assets/shelter-afrique.svg" },
  { type: "text", name: "All On" },
  { type: "logo", name: "Transsion", src: "/assets/partner-transsion-logo.svg" },
  { type: "logo", name: "itel", src: "/assets/partner-itel-logo.svg" },
  { type: "logo", name: "DYQUE", src: "/assets/partner-dyque-logo.png" },
  { type: "logo", name: "TankVolt", src: "/assets/partner-tankvolt-logo.png" },
  { type: "logo", name: "Cawin", src: "/assets/partner-cawin-logo.png" },
  { type: "logo", name: "AlphaESS", src: "/assets/partner-alphaess-logo.svg" },
  { type: "logo", name: "GoodWe", src: "/assets/partner-goodwe-logo.svg" },
] as const;
