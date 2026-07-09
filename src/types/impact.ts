// Types for the Strapi `impact` singleType (cms/src/api/impact + cms/src/components/impact-page/*).
// Media on this page arrives via the `shared.media` wrapper component: `{ file: "<url>" }`.

export interface SharedMedia {
  id: number;
  file: string | null;
}

export interface HeroFeatureItem {
  id: number;
  label: string;
}

export interface HeroSection {
  id: number;
  __component: "impact-page.hero-section";
  badge: string;
  headingPrimary: string;
  headingSecondary: string;
  subheadline: string;
  features: HeroFeatureItem[];
  statLabel: string;
  statValue: string;
  heroImage?: SharedMedia | null;
}

export interface ImpactStatementSection {
  id: number;
  __component: "impact-page.impact-statement-section";
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface StatCardItem {
  id: number;
  label: string;
  value: string;
  description: string;
}

export interface ImpactBodySection {
  id: number;
  __component: "impact-page.impact-body-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  methodologyLink: string;
  stats: StatCardItem[];
  accentImage?: SharedMedia | null;
}

export interface PillarPointItem {
  id: number;
  text: string;
}

export interface PillarItem {
  id: number;
  title: string;
  points: PillarPointItem[];
}

export interface CorePillarsSection {
  id: number;
  __component: "impact-page.core-pillars-section";
  heading: string;
  description: string;
  pillars: PillarItem[];
}

export interface CaseStudyStatItem {
  id: number;
  label: string;
  value: string;
}

export interface CaseStudySpotlightSection {
  id: number;
  __component: "impact-page.case-study-spotlight-section";
  badge: string;
  heading: string;
  body: string;
  stats: CaseStudyStatItem[];
  ctaLabel: string;
  spotlightImage?: SharedMedia | null;
}

export type ImpactPageSection =
  | HeroSection
  | ImpactStatementSection
  | ImpactBodySection
  | CorePillarsSection
  | CaseStudySpotlightSection;

export interface ImpactPageData {
  id: number;
  documentId: string;
  sections: ImpactPageSection[];
}
