import { PortfolioPage } from "../../views/PortfolioPage";
import { getPortfolioPage } from "../../lib/strapi";

export default async function Page() {
  const data = await getPortfolioPage();
  return <PortfolioPage sections={data.sections} />;
}
