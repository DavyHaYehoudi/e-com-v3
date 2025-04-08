import { PartnerCards } from "./PartnerCards";
import Banner from "./Banner";
import Legals from "./Legals";
import HeroTitles from "./HeroTitles";
import HeroBanner from "./HeroBanner";
import Products from "./Products";
import useVisualPublic from "@/hooks/useVisualPublic";
import { useEffect, useState } from "react";

type Designation = "visual1" | "visual2" | "visual3" | "visual4";
const HomePage = () => {
  const [visuals, setVisuals] = useState<
    Record<Designation, File | string | null>
  >({
    visual1: null,
    visual2: null,
    visual3: null,
    visual4: null,
  });
  const { defaultValues } = useVisualPublic("homePage");
  useEffect(() => {
    if (defaultValues) {
      setVisuals({ ...defaultValues });
    }
  }, [defaultValues]);

  return (
    <main>
      {visuals.visual1 && visuals.visual2 && (
        <HeroBanner pathname1={visuals.visual1} pathname2={visuals.visual2} />
      )}
      <HeroTitles />
      <hr />
      {visuals.visual3 && <Banner pathImage={visuals.visual3} />}

      <Products />
      <Legals />
      {visuals.visual4 && <Banner pathImage={visuals.visual4} />}
      <PartnerCards />
    </main>
  );
};

export default HomePage;
