import { getAboutPage } from "../../lib/strapi";
import type { AboutPageSection } from "../../types/about";
import { HeroSection } from "../../components/aboutComponents/HeroSection";
import { StickySubNav } from "../../components/aboutComponents/StickySubNav";
import { AboutFundSection } from "../../components/aboutComponents/AboutFundSection";
import { MacroProblemSection } from "../../components/aboutComponents/MacroProblemSection";
import { FundOverviewSection } from "../../components/aboutComponents/FundOverviewSection";
import { FundStructureSection } from "../../components/aboutComponents/FundStructureSection";
import { TechnicalAssistanceSection } from "../../components/aboutComponents/TechnicalAssistanceSection";
import { MilestonesSection } from "../../components/aboutComponents/MilestonesSection";
import { TeamSection } from "../../components/aboutComponents/TeamSection";
import { ValuesAndImpactSection } from "../../components/aboutComponents/ValuesAndImpactSection";
import { TargetInvestorsSection } from "../../components/aboutComponents/TargetInvestorsSection";

export default async function Page() {
  const data = await getAboutPage();
  const sections: AboutPageSection[] = data.sections;

  return (
    <main className="bg-white">
      {sections.map((section) => {
        const key = `${section.__component}-${section.id}`;
        switch (section.__component) {
          case 'about-page.hero-section':
            return <HeroSection key={key} {...section} />;
          case 'about-page.sticky-nav-section':
            return <StickySubNav key={key} {...section} />;
          case 'about-page.about-fund-section':
            return <AboutFundSection key={key} {...section} />;
          case 'about-page.macro-problem-section':
            return <MacroProblemSection key={key} {...section} />;
          case 'about-page.fund-overview-section':
            return <FundOverviewSection key={key} {...section} />;
          case 'about-page.fund-structure-section':
            return <FundStructureSection key={key} {...section} />;
          case 'about-page.technical-assistance-section':
            return <TechnicalAssistanceSection key={key} {...section} />;
          case 'about-page.milestones-section':
            return <MilestonesSection key={key} {...section} />;
          case 'about-page.team-section':
            return <TeamSection key={key} {...section} />;
          case 'about-page.values-and-impact-section':
            return <ValuesAndImpactSection key={key} {...section} />;
          case 'about-page.target-investors-section':
            return <TargetInvestorsSection key={key} {...section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
