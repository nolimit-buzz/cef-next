// Types for the Strapi `about` singleType (cms/src/api/about + cms/src/components/about-page/*).
// Media fields are plain Cloudinary URL strings (see cms schema: media was converted to string).

export interface StatItem {
  id: number;
  value: string;
  title: string;
  description: string;
}

export interface ApproachBlock {
  id: number;
  sectionLabel: string;
  heading: string;
  body: string;
  viewMore: string;
  viewLess: string;
  expandedBody: string;
}

export interface FundOverviewItem {
  id: number;
  title: string;
  body: string;
}

export interface FundStep {
  id: number;
  stepLabel: string;
  title: string;
}

export interface CredentialItem {
  id: number;
  label: string;
}

export interface MilestoneNode {
  id: number;
  title: string;
  desc: string;
}

export interface TeamMemberItem {
  id: number;
  name: string;
  title: string;
  photo?: string | null;
  photo_alt_text?: string;
}

export interface PartnerItem {
  id: number;
  name: string;
  body: string;
  logo?: string | null;
  logo_alt_text?: string;
}

export interface TransactionPartyItem {
  id: number;
  partyName: string;
  roleHighlight: string;
  roleRest: string;
  logo?: string | null;
  logo_alt_text?: string;
}

export interface RatingAgencyItem {
  id: number;
  label: string;
  name: string;
  sub: string;
  affiliation: string;
  tagline: string;
}

export interface SdgItem {
  id: number;
  number: string;
  sdgCode: string;
  title: string;
  body: string;
}

export interface InvestorItem {
  id: number;
  title: string;
  desc: string;
  image?: string | null;
  image_alt_text?: string;
}

export interface NavItem {
  id: number;
  navId: string;
  label: string;
}

export interface FundStructureFlowchart {
  topNodes: string[];
  centerFund: { name: string; subtitle: string };
  arrowLabels: string[];
  bottomNodes: string[];
}

export interface HeroSection {
  id: number;
  __component: "about-page.hero-section";
  badge: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  credentials: CredentialItem[];
  ratingLabel: string;
  ratingValue: string;
  hero_video?: string | null;
  poster_image?: string | null;
  poster_image_alt_text?: string;
}

export interface StickyNavSection {
  id: number;
  __component: "about-page.sticky-nav-section";
  navItems: NavItem[];
}

export interface AboutFundSection {
  id: number;
  __component: "about-page.about-fund-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  subheading: string;
  stats: StatItem[];
  approach: ApproachBlock;
  bento_image?: string | null;
  bento_image_alt_text?: string;
}

export interface MacroProblemSection {
  id: number;
  __component: "about-page.macro-problem-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  subheading: string;
  stats: StatItem[];
  solution: ApproachBlock;
  bento_image?: string | null;
  bento_image_alt_text?: string;
}

export interface FundOverviewSection {
  id: number;
  __component: "about-page.fund-overview-section";
  sectionLabel: string;
  heading: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
  items: FundOverviewItem[];
}

export interface FundStructureSection {
  id: number;
  __component: "about-page.fund-structure-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  steps: FundStep[];
  flowchart: FundStructureFlowchart;
  steps_background_image?: string | null;
  steps_background_image_alt_text?: string;
}

export interface TechnicalAssistanceSection {
  id: number;
  __component: "about-page.technical-assistance-section";
  sectionLabel: string;
  partners: PartnerItem[];
  ratingAgencies: RatingAgencyItem[];
}

export interface MilestonesSection {
  id: number;
  __component: "about-page.milestones-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  nodes: MilestoneNode[];
}

export interface TeamSection {
  id: number;
  __component: "about-page.team-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  cta: string;
  members: TeamMemberItem[];
  transactionParties: TransactionPartyItem[];
}

export interface ValuesAndImpactSection {
  id: number;
  __component: "about-page.values-and-impact-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  sdgs: SdgItem[];
  decorative_image_1?: string | null;
  decorative_image_1_alt_text?: string;
  decorative_image_2?: string | null;
  decorative_image_2_alt_text?: string;
}

export interface TargetInvestorsSection {
  id: number;
  __component: "about-page.target-investors-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  cta: string;
  cardLabel: string;
  investors: InvestorItem[];
}

export type AboutPageSection =
  | HeroSection
  | StickyNavSection
  | AboutFundSection
  | MacroProblemSection
  | FundOverviewSection
  | FundStructureSection
  | TechnicalAssistanceSection
  | MilestonesSection
  | TeamSection
  | ValuesAndImpactSection
  | TargetInvestorsSection;

export interface AboutPageData {
  id: number;
  documentId: string;
  sections: AboutPageSection[];
}
