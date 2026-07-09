// Types for the Strapi `portfolio` singleType (cms/src/api/portfolio + cms/src/components/portfolio-page/*).
// Media fields are plain Cloudinary URL strings (see cms schema: media was converted to string).

export interface HeroStatItem {
  id: number;
  value: string;
  label: string;
}

export interface HeroSection {
  id: number;
  __component: "portfolio-page.hero-section";
  badge: string;
  headingPrimary: string;
  headingSecondary: string;
  subHeadline: string;
  stats: HeroStatItem[];
  backgroundImage?: string | null;
  backgroundImage_alt_text?: string;
}

export interface SdgImpactCardItem {
  id: number;
  value: string;
  description: string;
  sdgNumber: string;
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
  chartSeriesDividend: string;
  chartSeriesPerformance: string;
  sdgCards: SdgImpactCardItem[];
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

export interface CaseStudyChallenge {
  text: CaseStudyParagraphItem[];
  quote: string;
}

export interface CaseStudyImpactMetricItem {
  id: number;
  label: string;
  value: string;
  icon: string;
  description: string;
  image?: string | null;
  image_alt_text?: string;
  sdgNumber: string;
}

export interface GalleryImageItem {
  id: number;
  url?: string | null;
  url_alt_text?: string;
}

export interface ProjectCaseStudy {
  overview: CaseStudyParagraphItem[];
  challenge?: CaseStudyChallenge;
  solution: CaseStudyParagraphItem[];
  impactMetrics: CaseStudyImpactMetricItem[];
  galleryImages: GalleryImageItem[];
  solutionImage1?: string | null;
  solutionImage1_alt_text?: string;
  solutionImage2?: string | null;
  solutionImage2_alt_text?: string;
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
  image?: string | null;
  image_alt_text?: string;
  metrics: ProjectMetricItem[];
  sdgs: ProjectSdgItem[];
  caseStudy?: ProjectCaseStudy;
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
  viewCaseStudyLabel: string;
  fullCaseStudyLabel: string;
  projects: ProjectItem[];
}

export interface NigeriaMapSection {
  id: number;
  __component: "portfolio-page.nigeria-map-section";
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
