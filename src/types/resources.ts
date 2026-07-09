export interface HeroGridItem {
  id: number;
  label: string;
}

export interface ResourcesHeroSection {
  __component: "resources-page.hero-section";
  id: number;
  badge: string;
  description: string;
  headingPrimary: string;
  headingSecondary: string;
  gridItems: HeroGridItem[];
}

export interface ResourcesStatementSection {
  __component: "resources-page.statement-section";
  id: number;
  body: string;
  headingPrimary: string;
  headingSecondary: string;
}

export interface ResourceCategoryItem {
  id: number;
  name: string;
}

export interface ResourceDocumentItem {
  id: number;
  category: string;
  date: string;
  size: string;
  title: string;
  type: string;
  year: string;
}

export interface ResourcesDocumentLibrarySection {
  __component: "resources-page.document-library-section";
  id: number;
  allDocumentsLabel: string;
  categoriesLabel: string;
  categories: ResourceCategoryItem[];
  documents: ResourceDocumentItem[];
  filePluralLabel: string;
  fileSingularLabel: string;
  financialReportsLabel: string;
  noDocumentsBody: string;
  noDocumentsHeading: string;
  searchPlaceholder: string;
}

export type ResourcesPageSection =
  | ResourcesHeroSection
  | ResourcesStatementSection
  | ResourcesDocumentLibrarySection;

export interface ResourcesPageData {
  sections: ResourcesPageSection[];
}
