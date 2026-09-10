import { getPortfolioPage } from "../../lib/strapi";
import type { PortfolioPageSection } from "../../types/portfolio";
import { HeroSection } from "../../components/portfolioComponents/HeroSection";
import { PerformanceSection } from "../../components/portfolioComponents/PerformanceSection";
import { ProjectsSection } from "../../components/portfolioComponents/ProjectsSection";
import { NigeriaMapSection } from "../../components/portfolioComponents/NigeriaMapSection";

export default async function Page() {
  const data = await getPortfolioPage();
  const sections: PortfolioPageSection[] = data.sections;

  const projectsSection = sections.find(
    (s) => s.__component === 'portfolio-page.projects-section',
  );
  // Passed raw (not through resolveProject()) because resolved metric icons
  // are React components, which can't cross the server->client props
  // boundary — NigeriaMap resolves them client-side instead.
  const rawProjects =
    projectsSection?.__component === 'portfolio-page.projects-section'
      ? projectsSection.projects
      : [];

  return (
    <div className="min-h-screen bg-white font-sans">
      {sections.map((section) => {
        const key = `${section.__component}-${section.id}`;
        switch (section.__component) {
          case 'portfolio-page.hero-section':
            return <HeroSection key={key} {...section} />;
          case 'portfolio-page.performance-section':
            return <PerformanceSection key={key} {...section} />;
          case 'portfolio-page.projects-section':
            return <ProjectsSection key={key} {...section} />;
          case 'portfolio-page.nigeria-map-section':
            return <NigeriaMapSection key={key} section={section} projects={rawProjects} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
