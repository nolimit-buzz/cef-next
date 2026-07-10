// Media fields are plain Cloudinary URL strings (see cms schema: media was converted to string).

export interface NavItem {
  id: number;
  label: string;
}

export interface OverviewFeatureItem {
  id: number;
  title: string;
  description: string;
}

export interface ChallengeStatItem {
  id: number;
  value: string;
  label: string;
  description: string;
}

export interface AimCardItem {
  id: number;
  title: string;
  hoverText: string;
  image: string | null;
}

export interface SdgCardItem {
  id: number;
  sdgNumber: string;
  title: string;
  color: string;
}

export interface HeroSection {
  id: number;
  __component: 'fund-page.hero-section';
  badge: string;
  headingPrimary: string;
  headingSecondary: string;
  subheadline: string;
  video: string | null;
  credential1: string;
  credential2: string;
  ratingLabel: string;
  ratingValue: string;
}

export interface StickySubNavSection {
  id: number;
  __component: 'fund-page.sticky-sub-nav-section';
  navItems: NavItem[];
}

export interface OverviewSection {
  id: number;
  __component: 'fund-page.overview-section';
  sectionLabel: string;
  heading: string;
  intro: string;
  ctaLabel: string;
  items: OverviewFeatureItem[];
}

export interface ChallengeSection {
  id: number;
  __component: 'fund-page.challenge-section';
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  supportingText: string;
  challengeImage: string | null;
  challengeStats: ChallengeStatItem[];
  solutionLabel: string;
  solutionHeading: string;
  solutionBody: string;
  solutionExpandedBody: string;
  viewMoreLabel: string;
  viewLessLabel: string;
}

export interface InvestmentStrategySection {
  id: number;
  __component: 'fund-page.investment-strategy-section';
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  subheading: string;
  thesisTitle: string;
  thesisBody: string;
  thesisChartTitle: string;
  thesisForecastBadge: string;
  thesisActualLabel: string;
  riskTitle: string;
  riskBody: string;
  riskChartTitle: string;
  riskChartPercentage: string;
  riskChartBadge: string;
}

export interface AimOfFundsSection {
  id: number;
  __component: 'fund-page.aim-of-funds-section';
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  subheading: string;
  cardLabel: string;
  ctaLabel: string;
  ctaHref: string;
  aimCards: AimCardItem[];
}

export interface ImpactSdgsSection {
  id: number;
  __component: 'fund-page.impact-sdgs-section';
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  subheading: string;
  sdgCards: SdgCardItem[];
}

export type FundPageSection =
  | HeroSection
  | StickySubNavSection
  | OverviewSection
  | ChallengeSection
  | InvestmentStrategySection
  | AimOfFundsSection
  | ImpactSdgsSection;

export interface FundPageData {
  id: number;
  documentId: string;
  sections: FundPageSection[];
}
