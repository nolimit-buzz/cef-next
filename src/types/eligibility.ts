export interface HeroBadgeItem {
  id: number;
  label: string;
}

export interface EligibilityHeroSection {
  __component: "eligibility-page.hero-section";
  id: number;
  badge: string;
  capacityLabel: string;
  capacityValue: string;
  headingPrimary: string;
  headingSecondary: string;
  subHeadline: string;
  heroBadges: HeroBadgeItem[];
}

export interface EligibilityStatementSection {
  __component: "eligibility-page.statement-section";
  id: number;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
  headingPrimary: string;
  headingSecondary: string;
}

export interface CriteriaItem {
  id: number;
  title: string;
  description: string;
}

export interface EligibilityCriteriaSection {
  __component: "eligibility-page.criteria-section";
  id: number;
  description: string;
  headingPrimary: string;
  headingSecondary: string;
  sectionLabel: string;
  criteria: CriteriaItem[];
}

export interface ProcessStepItem {
  id: number;
  num: string;
  title: string;
  desc: string;
}

export interface EligibilityProcessSection {
  __component: "eligibility-page.process-section";
  id: number;
  description: string;
  heading: string;
  sectionLabel: string;
  steps: ProcessStepItem[];
}

export type EligibilityPageSection =
  | EligibilityHeroSection
  | EligibilityStatementSection
  | EligibilityCriteriaSection
  | EligibilityProcessSection;

export interface EligibilityPageData {
  sections: EligibilityPageSection[];
}
