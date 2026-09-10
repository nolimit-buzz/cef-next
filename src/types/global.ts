export type SocialPlatform = "linkedin" | "youtube" | "instagram" | "x" | "facebook";

export interface StrapiLink {
  id?: number;
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  id?: number;
  platform: SocialPlatform;
  url: string;
}

export interface FooterLinkGroup {
  id?: number;
  heading: string;
  links?: StrapiLink[];
}

export type CtaCardIcon = "trending-up" | "building" | "globe";

export interface CtaCard {
  id?: number;
  icon?: CtaCardIcon;
  title: string;
  description?: string;
  cta_label?: string;
  cta_href?: string;
  background_image?: string;
}

// Partners are site-wide rather than tied to one page's sections: the OEM
// marquee renders in the footer on every route, and the strategic marquee
// renders on the home page.
export interface PartnerItem {
  id?: number;
  name: string;
  /** The all-white logo the marquee shows at rest. */
  logo_url: string | null;
  logo_url_alt_text?: string;
  /**
   * Brand-colour version of the same mark, revealed on hover. Leave empty for
   * a logo with no colour export that reads on a near-black background — the
   * marquee then keeps showing the white one.
   */
  logo_url_color?: string | null;
}

export interface GlobalData {
  id?: number;
  strategic_partners_label?: string;
  partners?: PartnerItem[];
  oem_partners_label?: string;
  oem_partners?: PartnerItem[];
  contact_email?: string;
  support_email?: string;
  project_funding_email?: string;
  investor_email?: string;
  office_address?: string;
  social_links?: SocialLink[];
  footer_links?: FooterLinkGroup[];
  partner_cta_cards?: CtaCard[];
}
