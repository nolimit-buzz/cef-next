import { ImpactPage } from "../../views/ImpactPage";
import { getImpactPage } from "../../lib/strapi";

export default async function Page() {
  const data = await getImpactPage();
  return <ImpactPage sections={data.sections} />;
}
