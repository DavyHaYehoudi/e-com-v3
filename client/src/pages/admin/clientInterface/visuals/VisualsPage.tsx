import HomePageVisuals from "./HomePageVisuals";
import CreaterPageVisuals from "./CreaterPageVisuals";
import GiftcardVisual from "./GiftcardVisual";

const VisualsPage = () => {
  return (
    <section>
      <h1 className="text-center mb-10">Visuels</h1>
      <div className="w-3/4 mx-auto flex flex-col gap-20">
        <HomePageVisuals />
        <CreaterPageVisuals />
        <GiftcardVisual />
      </div>
    </section>
  );
};

export default VisualsPage;
