import { getHomePage } from "../lib/strapi";
import { HomePage } from "../views/HomePage";

export default async function Page() {
  const data = await getHomePage();
  return <HomePage sections={data.sections} />;
}
