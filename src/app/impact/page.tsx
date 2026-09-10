import { ImpactPage } from "../../views/ImpactPage";
import { getImpactPage, getPortfolioPage } from "../../lib/strapi";
import type { StateItem, ProjectItem } from "../../types/portfolio";

export default async function Page() {
  const data = await getImpactPage();

  // The SDG Alignment Map reuses Portfolio's existing state/project data
  // rather than a new Impact-page content type, so a Portfolio-data hiccup
  // here should degrade the map only, not the whole Impact page. Projects
  // are passed raw (not through resolveProject()) because resolved metric
  // icons are React components, which can't cross the server->client props
  // boundary — SDGMap resolves them client-side instead.
  let states: StateItem[] = [];
  let projects: ProjectItem[] = [];
  try {
    const portfolioData = await getPortfolioPage();
    const nigeriaMapSection = portfolioData.sections.find(
      (s) => s.__component === "portfolio-page.nigeria-map-section",
    );
    const projectsSection = portfolioData.sections.find(
      (s) => s.__component === "portfolio-page.projects-section",
    );
    states =
      nigeriaMapSection?.__component === "portfolio-page.nigeria-map-section"
        ? nigeriaMapSection.states
        : [];
    projects =
      projectsSection?.__component === "portfolio-page.projects-section"
        ? projectsSection.projects
        : [];
  } catch {
    // states/projects stay [] — SDGMap renders sensibly with empty data.
  }

  return <ImpactPage sections={data.sections} states={states} projects={projects} />;
}
