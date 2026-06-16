import { CaseStudy } from "../../../components/CaseStudy";
import { getPortfolioPage } from "../../../lib/strapi";
import type { ProjectsSection } from "../../../types/portfolio";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getPortfolioPage();
  const projectsSection = data.sections.find(
    (s): s is ProjectsSection => s.__component === "portfolio-page.projects-section",
  );
  const rawProjects = projectsSection?.projects ?? [];
  const rawProject = rawProjects.find((p) => p.projectId === id);
  const rawOtherProjects = rawProjects.filter((p) => p.projectId !== id).slice(0, 2);

  return <CaseStudy rawProject={rawProject} rawOtherProjects={rawOtherProjects} />;
}
