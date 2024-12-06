import { PartnerCards } from "./PartnerCards";
import Banner from "./Banner";
import Legals from "./Legals";
import HeroTitles from "./HeroTitles";
import HeroBanner from "./HeroBanner";
import Products from "./Products";

const HomePage = () => {
  return (
    <main>
      <HeroBanner />
      <HeroTitles />
      <hr />
      <Banner pathImage="/images/home-bck-3.jpeg" />
      <Products />
      <Legals />
      <Banner pathImage="/images/home-bck-4.jpeg" />
      <PartnerCards />
    </main>
  );
};

export default HomePage;
