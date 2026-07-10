import { getEligibilityPage } from "../../lib/strapi";
import { EligibilityPage } from "../../views/EligibilityPage";

export default async function Page() {
  const data = await getEligibilityPage();
  return <EligibilityPage sections={data.sections} />;
}
