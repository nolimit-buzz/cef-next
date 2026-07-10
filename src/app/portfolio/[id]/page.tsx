import { redirect } from "next/navigation";
import { getPortfolioPage } from "../../../lib/strapi";
import type { ProjectsSection } from "../../../types/portfolio";
import { CaseStudyView } from "../../../components/caseStudyComponents/CaseStudyView";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getPortfolioPage();
  const projectsSection = data.sections.find(
    (section): section is ProjectsSection => section.__component === 'portfolio-page.projects-section'
  );
  const projects = projectsSection?.projects ?? [];

  const project = projects.find(p => p.projectId === params.id);
  if (!project) {
    redirect('/');
  }

  const otherProjects = projects.filter(p => p.projectId !== params.id).slice(0, 2);

  return <CaseStudyView project={project} otherProjects={otherProjects} />;
}
