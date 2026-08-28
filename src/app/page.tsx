import { getGlobal, getHomePage } from "../lib/strapi";
import { HomePage } from "../views/HomePage";

export default async function Page() {
  // Global carries the partner marquee, which the footer also renders. Next
  // dedupes this with the layout's own getGlobal() within a single render.
  const [data, global] = await Promise.all([getHomePage(), getGlobal()]);

  return (
    <HomePage
      sections={data.sections}
      partners={global?.partners}
      partnersLabel={global?.strategic_partners_label}
    />
  );
}
