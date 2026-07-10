import { GovernancePage } from "../../views/GovernancePage";
import { getGovernancePage } from "../../lib/strapi";

export default async function Page() {
  const data = await getGovernancePage();
  return <GovernancePage sections={data.sections} />;
}
