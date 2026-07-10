import type { FundPageData } from "../types/fund";
import type { AboutPageData } from "../types/about";
import type { EligibilityPageData } from "../types/eligibility";
import type { GovernancePageData } from "../types/governance";
import type { HomePageData } from "../types/home";
import type { ImpactPageData } from "../types/impact";
import type { InvestorRelationsPageData } from "../types/investor-relations";
import type { PortfolioPageData } from "../types/portfolio";
import type { ResourcesPageData } from "../types/resources";

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export function getStrapiURL(path = ""): string {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${baseUrl}${path}`;
}

// Media fields are plain URL strings in the CMS (usually absolute Cloudinary
// URLs); relative paths are still resolved against the Strapi host.
export function getStrapiMediaURL(url?: string | null): string | undefined {
  if (!url) return undefined;
  return url.startsWith("http") ? url : getStrapiURL(url);
}

async function fetchAPI<T>(path: string, query = ""): Promise<T> {
  const url = getStrapiURL(`/api${path}${query ? `?${query}` : ""}`);
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Strapi request failed: ${res.status} ${res.statusText} (${url}) ${body.slice(0, 500)}`
    );
  }

  const json: StrapiResponse<T> = await res.json();
  return json.data;
}

const FUND_POPULATE_QUERY = [
  "populate[sections][on][fund-page.hero-section][populate]=*",
  "populate[sections][on][fund-page.sticky-sub-nav-section][populate][navItems][populate]=*",
  "populate[sections][on][fund-page.overview-section][populate][items][populate]=*",
  "populate[sections][on][fund-page.challenge-section][populate][challengeStats][populate]=*",
  "populate[sections][on][fund-page.investment-strategy-section][populate]=*",
  "populate[sections][on][fund-page.aim-of-funds-section][populate][aimCards][populate]=*",
  "populate[sections][on][fund-page.impact-sdgs-section][populate][sdgCards][populate]=*",
].join("&");

export function getFundPage(): Promise<FundPageData> {
  return fetchAPI<FundPageData>("/fund", FUND_POPULATE_QUERY);
}

// Strapi dynamic zones need the `on`-syntax to deep-populate components nested
// inside each zone entry — plain `populate=*` only populates one level deep.
const ABOUT_POPULATE_QUERY = [
  "populate[sections][on][about-page.hero-section][populate]=*",
  "populate[sections][on][about-page.sticky-nav-section][populate]=*",
  "populate[sections][on][about-page.about-fund-section][populate]=*",
  "populate[sections][on][about-page.macro-problem-section][populate]=*",
  "populate[sections][on][about-page.fund-overview-section][populate]=*",
  "populate[sections][on][about-page.fund-structure-section][populate]=*",
  "populate[sections][on][about-page.technical-assistance-section][populate][partners][populate]=*",
  "populate[sections][on][about-page.technical-assistance-section][populate][ratingAgencies][populate]=*",
  "populate[sections][on][about-page.milestones-section][populate]=*",
  "populate[sections][on][about-page.team-section][populate][members][populate]=*",
  "populate[sections][on][about-page.team-section][populate][transactionParties][populate]=*",
  "populate[sections][on][about-page.values-and-impact-section][populate]=*",
  "populate[sections][on][about-page.target-investors-section][populate][investors][populate]=*",
].join("&");

export function getAboutPage(): Promise<AboutPageData> {
  return fetchAPI<AboutPageData>("/about", ABOUT_POPULATE_QUERY);
}

const IMPACT_POPULATE_QUERY = [
  "populate[sections][on][impact-page.hero-section][populate]=*",
  "populate[sections][on][impact-page.impact-statement-section][populate]=*",
  "populate[sections][on][impact-page.impact-body-section][populate]=*",
  "populate[sections][on][impact-page.core-pillars-section][populate][pillars][populate]=*",
  "populate[sections][on][impact-page.case-study-spotlight-section][populate]=*",
].join("&");

export function getImpactPage(): Promise<ImpactPageData> {
  return fetchAPI<ImpactPageData>("/impact", IMPACT_POPULATE_QUERY);
}

const INVESTOR_RELATIONS_POPULATE_QUERY = [
  "populate[sections][on][investor-relations-page.hero-section][populate]=*",
  "populate[sections][on][investor-relations-page.sticky-nav-section][populate][navItems][populate]=*",
  "populate[sections][on][investor-relations-page.performance-highlights-section][populate][highlights][populate]=*",
  "populate[sections][on][investor-relations-page.performance-reports-section][populate][reports][populate]=*",
  "populate[sections][on][investor-relations-page.investor-base-section][populate][investorTypes][populate]=*",
  "populate[sections][on][investor-relations-page.distribution-history-section][populate][seriesOneHoldings][populate]=*",
  "populate[sections][on][investor-relations-page.distribution-history-section][populate][seriesTwoHoldings][populate]=*",
  "populate[sections][on][investor-relations-page.distribution-history-section][populate][distributionRecords][populate]=*",
  "populate[sections][on][investor-relations-page.downloads-section][populate][categories][populate][documents][populate]=*",
  "populate[sections][on][investor-relations-page.investor-enquiries-section][populate][subjectOptions][populate]=*",
].join("&");

export function getInvestorRelationsPage(): Promise<InvestorRelationsPageData> {
  return fetchAPI<InvestorRelationsPageData>("/investor-relations", INVESTOR_RELATIONS_POPULATE_QUERY);
}

const PORTFOLIO_POPULATE_QUERY = [
  "populate[sections][on][portfolio-page.hero-section][populate]=*",
  "populate[sections][on][portfolio-page.performance-section][populate][sdgCards][populate]=*",
  "populate[sections][on][portfolio-page.projects-section][populate][projects][populate][metrics][populate]=*",
  "populate[sections][on][portfolio-page.projects-section][populate][projects][populate][sdgs][populate]=*",
  "populate[sections][on][portfolio-page.projects-section][populate][projects][populate][caseStudy][populate][overview][populate]=*",
  "populate[sections][on][portfolio-page.projects-section][populate][projects][populate][caseStudy][populate][challenge][populate][text][populate]=*",
  "populate[sections][on][portfolio-page.projects-section][populate][projects][populate][caseStudy][populate][solution][populate]=*",
  "populate[sections][on][portfolio-page.projects-section][populate][projects][populate][caseStudy][populate][impactMetrics][populate]=*",
  "populate[sections][on][portfolio-page.projects-section][populate][projects][populate][caseStudy][populate][galleryImages][populate]=*",
  "populate[sections][on][portfolio-page.nigeria-map-section][populate][states][populate]=*",
].join("&");

export function getPortfolioPage(): Promise<PortfolioPageData> {
  return fetchAPI<PortfolioPageData>("/portfolio", PORTFOLIO_POPULATE_QUERY);
}

const HOME_POPULATE_QUERY = [
  // Hero — sliding card panel + impact stats row
  "populate[sections][on][home-page.hero-section][populate][sliding_card][populate]=*",
  "populate[sections][on][home-page.hero-section][populate][stats][populate]=*",
  // About Fund — 5-box bento grid + scrolling partners strip
  "populate[sections][on][home-page.about-fund-section][populate][bento_cards][populate]=*",
  "populate[sections][on][home-page.about-fund-section][populate][partners][populate]=*",
  // Approach — scalar fields come automatically; only arrays need explicit populate
  "populate[sections][on][home-page.approach-section][populate][why_cef_cards][populate]=*",
  "populate[sections][on][home-page.approach-section][populate][fund_aims][populate]=*",
  "populate[sections][on][home-page.approach-section][populate][how_cef_steps][populate]=*",
  // Portfolio — label/button fields only, no nested arrays
  "populate[sections][on][home-page.portfolio-section][populate]=*",
  // Development Impact — 4 numbered impact cards
  "populate[sections][on][home-page.development-impact-section][populate][impact_cards][populate]=*",
  // News — headline/body/button fields only, no nested arrays
  "populate[sections][on][home-page.news-section][populate]=*",
  // Eligibility — sector carousel cards
  "populate[sections][on][home-page.eligibility-section][populate][sectors][populate]=*",
].join("&");

export function getHomePage(): Promise<HomePageData> {
  return fetchAPI<HomePageData>("/home-page", HOME_POPULATE_QUERY);
}

const ELIGIBILITY_POPULATE_QUERY = [
  "populate[sections][on][eligibility-page.hero-section][populate][heroBadges][populate]=*",
  "populate[sections][on][eligibility-page.statement-section][populate]=*",
  "populate[sections][on][eligibility-page.criteria-section][populate][criteria][populate]=*",
  "populate[sections][on][eligibility-page.process-section][populate][steps][populate]=*",
].join("&");

export function getEligibilityPage(): Promise<EligibilityPageData> {
  return fetchAPI<EligibilityPageData>("/eligibility", ELIGIBILITY_POPULATE_QUERY);
}

const GOVERNANCE_POPULATE_QUERY = [
  "populate[sections][on][governance-page.hero-section][populate]=*",
  "populate[sections][on][governance-page.sticky-sub-nav-section][populate][navItems][populate]=*",
  "populate[sections][on][governance-page.investment-committee-section][populate][members][populate]=*",
  "populate[sections][on][governance-page.fund-managers-section][populate][transactionParties][populate]=*",
  "populate[sections][on][governance-page.investment-strategy-section][populate][performanceStats][populate]=*",
  "populate[sections][on][governance-page.governance-impact-section][populate]=*",
].join("&");

export function getGovernancePage(): Promise<GovernancePageData> {
  return fetchAPI<GovernancePageData>("/governance", GOVERNANCE_POPULATE_QUERY);
}

const RESOURCES_POPULATE_QUERY = [
  "populate[sections][on][resources-page.hero-section][populate][gridItems][populate]=*",
  "populate[sections][on][resources-page.statement-section][populate]=*",
  "populate[sections][on][resources-page.document-library-section][populate][categories][populate]=*",
  "populate[sections][on][resources-page.document-library-section][populate][documents][populate]=*",
].join("&");

export function getResourcesPage(): Promise<ResourcesPageData> {
  return fetchAPI<ResourcesPageData>("/resources-page", RESOURCES_POPULATE_QUERY);
}
