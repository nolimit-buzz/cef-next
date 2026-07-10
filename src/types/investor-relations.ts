// Types for the Strapi `investor-relations` singleType (cms/src/api/investor-relations + cms/src/components/investor-relations-page/*).

// Media fields are plain Cloudinary URL strings; `shared.media` wrapper fields
// arrive as `{ file: string }` (see cms/src/components/shared/media.json).

export interface SharedMedia {
  id: number;
  file: string | null;
}

export interface CredentialItem {
  id: number;
  label: string;
}

export interface NavItem {
  id: number;
  label: string;
}

export interface HighlightStatItem {
  id: number;
  label: string;
  value: string;
}

export interface ReportCardItem {
  id: number;
  category: string;
  title: string;
  description: string;
  ctaLabel: string;
  link: string;
}

export interface InvestorTypeItem {
  id: number;
  tag: string;
  title: string;
  description: string;
  image?: SharedMedia | null;
}

export interface DistributionRecordItem {
  id: number;
  period: string;
  series: string;
  amount: string;
  status: string;
}

export interface InvestorHoldingItem {
  id: number;
  name: string;
  holding: string;
  logo?: string | null;
}

export interface DownloadDocumentItem {
  id: number;
  name: string;
  date: string;
  size: string;
  fileUrl?: string;
}

export interface DownloadCategoryItem {
  id: number;
  categoryName: string;
  documents: DownloadDocumentItem[];
}

export interface SubjectOptionItem {
  id: number;
  label: string;
}

export interface HeroSection {
  id: number;
  __component: "investor-relations-page.hero-section";
  badge: string;
  headingPrimary: string;
  headingSecondary: string;
  subheadline: string;
  credentials: CredentialItem[];
  heroVideo?: SharedMedia | null;
  heroPoster?: SharedMedia | null;
  heroFallbackImage?: SharedMedia | null;
  heroFallbackImage_alt_text?: string;
}

export interface StickyNavSection {
  id: number;
  __component: "investor-relations-page.sticky-nav-section";
  navItems: NavItem[];
}

export interface PerformanceHighlightsSection {
  id: number;
  __component: "investor-relations-page.performance-highlights-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  viewAllLink: string;
  tabHighlightsLabel: string;
  tabFundPerformanceLabel: string;
  chartTitle: string;
  chartDescription: string;
  chartSeriesNav: string;
  chartSeriesPerformance: string;
  chartSeriesDividend: string;
  highlights: HighlightStatItem[];
}

export interface PerformanceReportsSection {
  id: number;
  __component: "investor-relations-page.performance-reports-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  reports: ReportCardItem[];
}

export interface InvestorBaseSection {
  id: number;
  __component: "investor-relations-page.investor-base-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  investorTypes: InvestorTypeItem[];
}

export interface DistributionHistorySection {
  id: number;
  __component: "investor-relations-page.distribution-history-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  tabDistributionLabel: string;
  tabHoldingsLabel: string;
  seriesOneLabel: string;
  seriesTwoLabel: string;
  distributionColPeriod: string;
  distributionColSeries: string;
  distributionColAmount: string;
  distributionColAmountMobile: string;
  distributionColStatus: string;
  holdingsColLogo: string;
  holdingsColInvestorName: string;
  holdingsColHolding: string;
  holdingsColHoldingMobile: string;
  distributionRecords: DistributionRecordItem[];
  seriesOneHoldings: InvestorHoldingItem[];
  seriesTwoHoldings: InvestorHoldingItem[];
}

export interface DownloadsSection {
  id: number;
  __component: "investor-relations-page.downloads-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  downloadButtonLabel: string;
  fileTypeLabel: string;
  viewMoreLabel: string;
  viewLessLabel: string;
  categories: DownloadCategoryItem[];
}

export interface InvestorEnquiriesSection {
  id: number;
  __component: "investor-relations-page.investor-enquiries-section";
  sectionLabel: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  email: string;
  emailLabel: string;
  phone: string;
  phoneLabel: string;
  officeAddress: string;
  officeLabel: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  institutionLabel: string;
  institutionPlaceholder: string;
  workEmailLabel: string;
  workEmailPlaceholder: string;
  subjectLabel: string;
  subjectDefaultOption: string;
  subjectOptions: SubjectOptionItem[];
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
}

export type InvestorRelationsPageSection =
  | HeroSection
  | StickyNavSection
  | PerformanceHighlightsSection
  | PerformanceReportsSection
  | InvestorBaseSection
  | DistributionHistorySection
  | DownloadsSection
  | InvestorEnquiriesSection;

export interface InvestorRelationsPageData {
  id: number;
  documentId: string;
  sections: InvestorRelationsPageSection[];
}
