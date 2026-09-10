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
// to hotlinks.
//
// Each partner ships two exports of the same mark: `-w` is the all-white
// version the strip shows at rest against its near-black background, and the
// unsuffixed file is the brand-colour version revealed on hover. `color` is
// optional — omit it and the logo simply stays white, which is what NSIA and
// Transsion need (see below). Partners with no usable asset render as a text
// wordmark instead.

export type Partner =
  | { type: "logo"; name: string; white: string; color?: string }
  | { type: "text"; name: string };

export const strategic_partners: readonly Partner[] = [
  { type: "logo", name: "Climate Bonds", white: "/assets/climate-bonds-w.svg", color: "/assets/climate-bonds.svg" },
  { type: "logo", name: "FMDQ", white: "/assets/fmdq-w.svg", color: "/assets/fmdq.svg" },
  { type: "logo", name: "USAID", white: "/assets/usaid-w.svg", color: "/assets/usaid.svg" },
  { type: "logo", name: "UKNIaF", white: "/assets/ukniaf-w.svg", color: "/assets/ukniaf.svg" },
  { type: "logo", name: "NSIA", white: "/assets/nsia-w.svg", color: "/assets/nsia.svg" },
] as const;

export const oem_partners: readonly Partner[] = [
  // transsion.svg is filled pure black, so it would vanish against #0A0A0A on
  // hover. Stays white until a dark-background export exists.
  { type: "logo", name: "Transsion", white: "/assets/transsion-w.svg" },
  { type: "logo", name: "itel", white: "/assets/itel-w.svg", color: "/assets/itel.svg" },
  { type: "logo", name: "DYQUE", white: "/assets/dyque-w.svg", color: "/assets/dyque.svg" },
  { type: "logo", name: "TankVolt", white: "/assets/tankvolt-w.svg", color: "/assets/tankvolt.svg" },
  // cawin.png is colour-only (its artwork is already near-white) — wordmark for now.
  { type: "text", name: "Cawin" },
  { type: "logo", name: "AlphaESS", white: "/assets/alphaess-w.svg", color: "/assets/alphaess.svg" },
  { type: "logo", name: "GoodWe", white: "/assets/goodwe-w.svg", color: "/assets/goodwe.svg" },
  { type: "logo", name: "Levene Solar", white: "/assets/levene-w.svg", color: "/assets/levene.svg" },
  { type: "logo", name: "Coleman Cables", white: "/assets/coleman-w.svg", color: "/assets/coleman.svg" },
] as const;
