// Types for the Strapi `portfolio` singleType (cms/src/api/portfolio + cms/src/components/portfolio-page/*).

import type { LucideIcon } from "lucide-react";

export interface HeroStatItem {
  id: number;
  value: string;
  label: string;
}

export interface SdgImpactCardItem {
  id: number;
  value: string;
  description: string;
  sdgNumber: string;
}

export interface ProjectMetricItem {
  id: number;
  label: string;
  value: string;
  icon: string;
}

export interface ProjectSdgItem {
  id: number;
  sdgNumber: string;
}

export interface CaseStudyParagraphItem {
  id: number;
  text: string;
}

export interface GalleryImageItem {
  id: number;
  url: string;
}

export interface CaseStudyImpactMetricItem {
  id: number;
  label: string;
  value: string;
  icon: string;
  description: string;
  image: string;
  sdgNumber: string;
}

export interface CaseStudyChallenge {
  id: number;
  text: CaseStudyParagraphItem[];
  quote: string;
}

export interface ProjectCaseStudy {
  id: number;
  overview: CaseStudyParagraphItem[];
  challenge: CaseStudyChallenge;
  solution: CaseStudyParagraphItem[];
  impactMetrics: CaseStudyImpactMetricItem[];
  galleryImages: GalleryImageItem[];
}

export interface ProjectItem {
  id: number;
  projectId: string;
  name: string;
  sector: string;
  sectorColor: string;
  location: string;
  status: string;
  description: string;
  image: string;
  metrics: ProjectMetricItem[];
  sdgs: ProjectSdgItem[];
  caseStudy: ProjectCaseStudy;
}

export interface StateProjectRef {
  id: number;
  projectId: string;
}

export interface StateItem {
  id: number;
  stateName: string;
  description: string;
  projectRefs: StateProjectRef[];
}

export interface HeroSection {
  id: number;
  __component: "portfolio-page.hero-section";
  badge: string;
  headingPrimary: string;
  headingSecondary: string;
  subHeadline: string;
  stats: HeroStatItem[];
}

export interface PerformanceSection {
  id: number;
  __component: "portfolio-page.performance-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  description: string;
  tabSdgLabel: string;
  tabFinancialLabel: string;
  chartTitle: string;
  chartSubtitle: string;
  chartSeriesNav: string;
  chartSeriesPerformance: string;
  chartSeriesDividend: string;
  sdgCards: SdgImpactCardItem[];
}

export interface ProjectsSection {
  id: number;
  __component: "portfolio-page.projects-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  filterLabel: string;
  locationLabel: string;
  statusLabel: string;
  sdgImpactLabel: string;
  readMoreLabel: string;
  readLessLabel: string;
  fullCaseStudyLabel: string;
  viewCaseStudyLabel: string;
  projects: ProjectItem[];
}

export interface NigeriaMapSection {
  id: number;
  __component: "portfolio-page.nigeria-map-section";
  eyebrow: string;
  headingPrimary: string;
  headingSecondary: string;
  description: string;
  mapRegionLabel: string;
  apiConnectedLabel: string;
  apiConnectedStatus: string;
  emptyStateHeading: string;
  emptyStateBody: string;
  regionalImpactLabel: string;
  currentProjectsLabel: string;
  aggregatedSdgLabel: string;
  noProjectsText: string;
  futureEvaluationText: string;
  states: StateItem[];
}

export interface ResolvedSdg {
  id: number;
  color: string;
  label: string;
}

export interface ResolvedMetric {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface ResolvedProject {
  id: string;
  name: string;
  sector: string;
  sectorColor: string;
  location: string;
  status: string;
  description: string;
  image: string;
  metrics: ResolvedMetric[];
  sdgs: ResolvedSdg[];
}

export interface ResolvedCaseStudyImpactMetric {
  label: string;
  value: string;
  icon: LucideIcon;
  description: string;
  image: string;
  sdg: ResolvedSdg;
}

export interface ResolvedCaseStudy {
  overview: string[];
  challenge: { text: string[]; quote: string };
  solution: string[];
  impactMetrics: ResolvedCaseStudyImpactMetric[];
  galleryImages: string[];
}

export interface ResolvedProjectWithCaseStudy extends ResolvedProject {
  caseStudy: ResolvedCaseStudy;
}

export type PortfolioPageSection =
  | HeroSection
  | PerformanceSection
  | ProjectsSection
  | NigeriaMapSection;

export interface PortfolioPageData {
  id: number;
  documentId: string;
  sections: PortfolioPageSection[];
}
