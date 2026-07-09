import { getFundPage } from "../../lib/strapi";
import { FundPage } from "../../views/FundPage";

export default async function Page() {
  const { sections } = await getFundPage();
  return <FundPage sections={sections} />;
}
