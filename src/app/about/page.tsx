import { AboutPage } from "../../components/AboutPage";
import { getAboutPage } from "../../lib/strapi";

export default async function Page() {
  const data = await getAboutPage();
  return <AboutPage sections={data.sections} />;
}
