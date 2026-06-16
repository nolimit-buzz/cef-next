import type { AboutPageData } from "../types/about";
import type { ImpactPageData } from "../types/impact";
import type { InvestorRelationsPageData } from "../types/investor-relations";

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export function getStrapiURL(path = ""): string {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${baseUrl}${path}`;
}

async function fetchAPI<T>(path: string, query = ""): Promise<T> {
  const url = getStrapiURL(`/api${path}${query ? `?${query}` : ""}`);
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText} (${url})`);
  }

  const json: StrapiResponse<T> = await res.json();
  return json.data;
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
  "populate[sections][on][about-page.technical-assistance-section][populate]=*",
  "populate[sections][on][about-page.milestones-section][populate]=*",
  "populate[sections][on][about-page.team-section][populate]=*",
  "populate[sections][on][about-page.values-and-impact-section][populate]=*",
  "populate[sections][on][about-page.target-investors-section][populate]=*",
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
  "populate[sections][on][investor-relations-page.sticky-nav-section][populate]=*",
  "populate[sections][on][investor-relations-page.performance-highlights-section][populate]=*",
  "populate[sections][on][investor-relations-page.performance-reports-section][populate]=*",
  "populate[sections][on][investor-relations-page.investor-base-section][populate]=*",
  "populate[sections][on][investor-relations-page.distribution-history-section][populate]=*",
  "populate[sections][on][investor-relations-page.downloads-section][populate][categories][populate]=*",
  "populate[sections][on][investor-relations-page.investor-enquiries-section][populate]=*",
].join("&");

export function getInvestorRelationsPage(): Promise<InvestorRelationsPageData> {
  return fetchAPI<InvestorRelationsPageData>("/investor-relations", INVESTOR_RELATIONS_POPULATE_QUERY);
}
