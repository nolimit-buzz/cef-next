export interface SlidingCard {
  id: number;
  subtitle: string;
  title: string;
  CTA: string;
  down_text: string;
}

export interface HeroStatItem {
  id: number;
  value: string;
  label: string;
}

export interface BentoCard {
  id: number;
  eyebrow: string;
  statement: string | null;
  proof: string | null;
  tags: string[] | null;
  credential_1: string | null;
  credential_2: string | null;
  image?: string | null;
}

export interface PartnerItem {
  id: number;
  name: string;
  logo_url: string | null;
}

export interface WhyCefCard {
  id: number;
  title: string;
  content: string;
}

export interface FundAim {
  id: number;
  title: string;
  description: string;
  image?: string | null;
}

export interface HowCefStep {
  id: number;
  title: string;
  content: string;
}

export interface ImpactCard {
  id: number;
  number: string;
  title: string;
  body: string;
}

export interface EligibilitySector {
  id: number;
  title: string;
  focus: string;
  ticket_size: string;
  risk_profile: string;
  image: string;
}

export interface HeroSection {
  __component: "home-page.hero-section";
  id: number;
  headline: string;
  description: string;
  primary_cta: string;
  secondary_cta: string;
  down_text: string;
  sliding_card: SlidingCard[];
  stats?: HeroStatItem[];
}

export interface AboutFundSection {
  __component: "home-page.about-fund-section";
  id: number;
  eyebrow: string;
  headline: string;
  primary_cta: string;
  secondary_cta: string;
  strategic_partners_label: string;
  bento_cards: BentoCard[];
  partners?: PartnerItem[];
}

export interface ApproachSection {
  __component: "home-page.approach-section";
  id: number;
  heading_part1: string;
  heading_part2: string | null;
  tab_why_cef?: string;
  tab_fund_aims?: string;
  tab_how_cef?: string;
  why_cef_eyebrow: string;
  why_cef_headline: string;
  why_cef_body: string;
  why_cef_primary_cta: string;
  why_cef_secondary_cta: string;
  how_cef_eyebrow: string;
  how_cef_headline: string;
  how_cef_cta: string;
  why_cef_cards: WhyCefCard[];
  fund_aims: FundAim[];
  how_cef_steps: HowCefStep[];
}

export interface PortfolioSection {
  __component: "home-page.portfolio-section";
  id: number;
  eyebrow: string;
  headline_part1: string;
  headline_part2: string | null;
  view_all_button: string;
  filter_label: string | null;
  all_filter_label: string | null;
  read_more: string | null;
  read_less: string | null;
  sdg_impact_label: string | null;
  case_study_link: string | null;
  view_all_link: string | null;
}

export interface DevelopmentImpactSection {
  __component: "home-page.development-impact-section";
  id: number;
  eyebrow: string;
  headline_part1: string;
  headline_part2: string | null;
  body: string;
  learn_more_link: string;
  impact_cards: ImpactCard[];
}

export interface NewsSection {
  __component: "home-page.news-section";
  id: number;
  eyebrow: string;
  headline_part1: string;
  headline_part2: string | null;
  body: string;
  view_all_button: string;
}

export interface EligibilitySection {
  __component: "home-page.eligibility-section";
  id: number;
  eyebrow: string;
  headline_part1: string;
  headline_part2: string | null;
  body: string;
  cta_button: string;
  card_default_label: string;
  focus_label: string;
  ticket_size_label: string;
  risk_profile_label: string;
  sectors: EligibilitySector[];
}

export type HomePageSection =
  | HeroSection
  | AboutFundSection
  | ApproachSection
  | PortfolioSection
  | DevelopmentImpactSection
  | NewsSection
  | EligibilitySection;

export interface HomePageData {
  sections: HomePageSection[];
}
