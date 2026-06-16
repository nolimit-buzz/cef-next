import { InvestorRelationsPage } from "../../views/InvestorRelationsPage";
import { getInvestorRelationsPage } from "../../lib/strapi";

export default async function Page() {
  const data = await getInvestorRelationsPage();
  return <InvestorRelationsPage sections={data.sections} />;
}
