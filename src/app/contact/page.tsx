import { ContactPage } from "../../views/ContactPage";
import { getGlobal } from "../../lib/strapi";

export default async function Page() {
  const global = await getGlobal();
  return <ContactPage global={global} />;
}
