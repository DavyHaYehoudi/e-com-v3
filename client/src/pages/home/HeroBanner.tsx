interface HeroBannerProps {
  pathname1: string | File;
  pathname2: string | File;
}
const HeroBanner: React.FC<HeroBannerProps> = ({ pathname1, pathname2 }) => {
  return (
    <section className="relative h-[300px] lg:h-[600px]  flex overflow-hidden">
      <div
        className="w-full h-full bg-cover bg-center animate-kenburns-left"
        // style={{ backgroundImage: `url("/images/home-bck-1.jpeg")` }}
        style={{ backgroundImage: `url(${pathname1})` }}
      ></div>
      <div
        className="w-full h-full bg-cover bg-center animate-kenburns-right"
        style={{ backgroundImage: `url(${pathname2})` }}
      ></div>
    </section>
  );
};

export default HeroBanner;
