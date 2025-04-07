import { PartnerCards } from "./PartnerCards";
import Banner from "./Banner";
import Legals from "./Legals";
import HeroTitles from "./HeroTitles";
import HeroBanner from "./HeroBanner";
import Products from "./Products";
import useVisualPublic from "@/hooks/useVisualPublic";
import { useEffect, useState } from "react";

type Designation = "image1" | "image2" | "image3" | "image4";
const HomePage = () => {
  const [visuals, setVisuals] = useState<
    Record<Designation, File | string | null>
  >({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const { defaultValues } = useVisualPublic("homePage");
  useEffect(() => {
    if (defaultValues) {
      setVisuals({ ...defaultValues });
    }
  }, [defaultValues]);

  return (
    <main>
      {visuals.image1 && visuals.image2 && (
        <HeroBanner pathname1={visuals.image1} pathname2={visuals.image2} />
      )}
      <HeroTitles />
      <hr />
      {visuals.image3 && <Banner pathImage={visuals.image3} />}

      <Products />
      <Legals />
      {visuals.image4 && <Banner pathImage={visuals.image4} />}
      <PartnerCards />
    </main>
  );
};

export default HomePage;
