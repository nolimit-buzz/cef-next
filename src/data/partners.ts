// Fallbacks for the two partner marquees, used only when the CMS returns no
// partners (an outage, or a fresh install before seeding). The live lists are
// the `partners` and `oem_partners` fields on the Global single-type; keep
// these in step with them.
//
// The split is deliberate: strategic partners are the institutional/financial
// backers, OEM partners are the Original Equipment Manufacturers whose hardware
// the fund finances. `strategic_partners` renders on the home page only,
// `oem_partners` renders above the footer on every route.
//
// Logos are self-hosted from /public/assets rather than hotlinked from each
// partner's own domain: those origins can rename assets, block cross-origin
// requests, or go down, and at least one (climatebonds.net) already returns 403
// to hotlinks. Partners with no local asset render as a text wordmark instead.

// "logo"   — art on a transparent ground, so the marquee can flatten it to white.
// "plated" — the mark is baked onto an opaque background plate (Climate Bonds'
//            blue box, NSIA's green box, itel's red pill). Flattening those to
//            white yields a solid white rectangle, so the marquee shows the name
//            as a wordmark at rest and reveals the real logo on hover instead.
// "text"   — no local asset at all; name only.
export type Partner =
  | { type: "logo"; name: string; src: string }
  | { type: "plated"; name: string; src: string }
  | { type: "text"; name: string };

export const strategic_partners: readonly Partner[] = [
  { type: "plated", name: "Climate Bonds", src: "/assets/partner-climate-bonds-logo.svg" },
  { type: "logo", name: "FMDQ", src: "/assets/fmdq.svg" },
  { type: "logo", name: "USAID", src: "/assets/USAID.svg" },
  { type: "logo", name: "UKNIaF", src: "/assets/UKNIAF_Logo-1.svg" },
  { type: "plated", name: "NSIA", src: "/assets/nsia.svg" },
] as const;

export const oem_partners: readonly Partner[] = [
  { type: "logo", name: "Transsion", src: "/assets/partner-transsion-logo.svg" },
  { type: "plated", name: "itel", src: "/assets/partner-itel-logo.svg" },
  { type: "logo", name: "DYQUE", src: "/assets/partner-dyque-logo.png" },
  { type: "logo", name: "TankVolt", src: "/assets/partner-tankvolt-logo.png" },
  { type: "logo", name: "Cawin", src: "/assets/partner-cawin-logo.png" },
  { type: "logo", name: "AlphaESS", src: "/assets/partner-alphaess-logo.svg" },
  { type: "logo", name: "GoodWe", src: "/assets/partner-goodwe-logo.svg" },
  // No local asset yet — these fall through to the marquee's text wordmark.
  { type: "text", name: "Levene Solar" },
  { type: "text", name: "Coleman Cables" },
] as const;
