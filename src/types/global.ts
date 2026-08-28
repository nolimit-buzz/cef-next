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

// Partners are site-wide: the same marquee renders in the footer and on the
// home page, so the list lives here rather than on either page's sections.
export interface PartnerItem {
  id?: number;
  name: string;
  logo_url: string | null;
  logo_url_alt_text?: string;
}

export interface GlobalData {
  id?: number;
  strategic_partners_label?: string;
  partners?: PartnerItem[];
  contact_email?: string;
  support_email?: string;
  project_funding_email?: string;
  investor_email?: string;
  office_address?: string;
  social_links?: SocialLink[];
  footer_links?: FooterLinkGroup[];
  partner_cta_cards?: CtaCard[];
}
