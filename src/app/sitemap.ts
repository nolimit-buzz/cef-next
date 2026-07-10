import type { MetadataRoute } from "next";
// import { articles } from "../data/articles";
import { getPortfolioPage } from "../lib/strapi";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleanenergyfund.netlify.app";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "weekly" },
  { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/fund`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/impact`, priority: 0.8, changeFrequency: "monthly" },
  // { url: `${BASE_URL}/news`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${BASE_URL}/portfolio`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE_URL}/eligibility`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE_URL}/governance`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE_URL}/investor-relations`, priority: 0.7, changeFrequency: "monthly" },
  // { url: `${BASE_URL}/resources`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE_URL}/contact`, priority: 0.7, changeFrequency: "yearly" },
  { url: `${BASE_URL}/privacy-policy`, priority: 0.4, changeFrequency: "yearly" },
];

async function getPortfolioIds(): Promise<string[]> {
  try {
    const data = await getPortfolioPage();
    const projectsSection = data.sections.find(
      (s) => s.__component === "portfolio-page.projects-section"
    ) as { projects?: { projectId: string }[] } | undefined;
    return (projectsSection?.projects ?? []).map((p) => p.projectId).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const newsEntries: MetadataRoute.Sitemap = articles.map((article) => ({
  //   url: `${BASE_URL}/news/${article.id}`,
  //   priority: 0.6,
  //   changeFrequency: "yearly",
  // }));

  const portfolioIds = await getPortfolioIds();
  const portfolioEntries: MetadataRoute.Sitemap = portfolioIds.map((id) => ({
    url: `${BASE_URL}/portfolio/${id}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [...STATIC_ROUTES, ...portfolioEntries];
}
