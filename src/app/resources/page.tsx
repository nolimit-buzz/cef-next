import { getResourcesPage } from "../../lib/strapi";
import { ResourcesPage } from "../../views/ResourcesPage";

export default async function Page() {
  const data = await getResourcesPage();
  return <ResourcesPage sections={data.sections} />;
}
