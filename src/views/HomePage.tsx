import type {
  HomePageSection,
  HeroSection,
  AboutFundSection,
  ApproachSection,
  PortfolioSection,
  DevelopmentImpactSection,
  NewsSection,
  EligibilitySection,
} from "../types/home";
import { Hero, ImpactStats } from "../components/Navbar";
import { AboutFund } from "../components/AboutFund";
import { Portfolio } from "../components/Portfolio";
import { DevelopmentImpact } from "../components/DevelopmentImpact";
import { Blog } from "../components/Blog";
import { EligibilityCriteria } from "../components/EligibilityCriteria";

function find<T extends HomePageSection>(
  sections: HomePageSection[],
  component: T["__component"],
): T | undefined {
  return sections.find((s) => s.__component === component) as T | undefined;
}

export function HomePage({ sections }: { sections: HomePageSection[] }) {
  const hero = find<HeroSection>(sections, "home-page.hero-section");
  const aboutFund = find<AboutFundSection>(sections, "home-page.about-fund-section");
  const approach = find<ApproachSection>(sections, "home-page.approach-section");
  const portfolio = find<PortfolioSection>(sections, "home-page.portfolio-section");
  const developmentImpact = find<DevelopmentImpactSection>(sections, "home-page.development-impact-section");
  const news = find<NewsSection>(sections, "home-page.news-section");
  const eligibility = find<EligibilitySection>(sections, "home-page.eligibility-section");

  return (
    <main>
      <Hero hero={hero} />
      <ImpactStats stats={hero?.stats} />
      <AboutFund aboutFund={aboutFund} approach={approach} />
      <Portfolio cms={portfolio} />
      <DevelopmentImpact cms={developmentImpact} />
      {/* <Blog cms={news} /> */}
      <EligibilityCriteria cms={eligibility} />
    </main>
  );
}
