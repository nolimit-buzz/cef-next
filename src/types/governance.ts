// Media fields are plain Cloudinary URL strings (see cms schema: media was converted to string).

export interface CommitteeMemberItem {
  id: number;
  name: string;
  bio: string;
  photo: string | null;
}

export interface TransactionPartyItem {
  id: number;
  name: string;
  roleHighlight: string;
  roleRest: string;
  logo: string | null;
}

export interface PerformanceStatItem {
  id: number;
  label: string;
  value: string;
}

export interface NavItem {
  id: number;
  label: string;
}

export interface HeroSection {
  id: number;
  __component: "governance-page.hero-section";
  headingPrimary: string;
  headingSecondary: string;
  subheadline: string;
  badge1Label: string;
  badge2Label: string;
  ratingLabel: string;
  ratingValue: string;
}

export interface StickySubNavSection {
  id: number;
  __component: "governance-page.sticky-sub-nav-section";
  navItems: NavItem[];
}

export interface InvestmentCommitteeSection {
  id: number;
  __component: "governance-page.investment-committee-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  members: CommitteeMemberItem[];
}

export interface FundManagersSection {
  id: number;
  __component: "governance-page.fund-managers-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  cta: string;
  transactionPartiesHeadingPrimary: string;
  transactionPartiesHeadingSecondary: string;
  transactionParties: TransactionPartyItem[];
}

export interface InvestmentStrategySection {
  id: number;
  __component: "governance-page.investment-strategy-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  thesisHeading: string;
  thesisBody: string;
  thesisChartTitle: string;
  thesisChartLabel: string;
  thesisChartActualLabel: string;
  riskHeading: string;
  riskBody: string;
  riskChartTitle: string;
  riskChartBadge: string;
  riskChartValue: string;
  performanceHeading: string;
  performanceBody: string;
  performanceChartTitle: string;
  performanceChartCta: string;
  performanceTooltipTitle: string;
  performanceTooltipSub: string;
  performanceStats: PerformanceStatItem[];
}

export interface GovernanceImpactSection {
  id: number;
  __component: "governance-page.governance-impact-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  sdg1Title: string;
  sdg1Description: string;
  sdg2Title: string;
  sdg2Subtitle: string;
  sdg2Quote: string;
}

export type GovernancePageSection =
  | HeroSection
  | StickySubNavSection
  | InvestmentCommitteeSection
  | FundManagersSection
  | InvestmentStrategySection
  | GovernanceImpactSection;

export interface GovernancePageData {
  id: number;
  documentId: string;
  sections: GovernancePageSection[];
}
