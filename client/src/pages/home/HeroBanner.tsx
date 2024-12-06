
const HeroBanner = () => {
  return (
    <section className="relative h-[300px] lg:h-[600px]  flex overflow-hidden">
      <div
        className="w-full h-full bg-cover bg-center animate-kenburns-left"
        style={{ backgroundImage: `url("/images/home-bck-1.jpeg")` }}
      ></div>
      <div
        className="w-full h-full bg-cover bg-center animate-kenburns-right"
        style={{ backgroundImage: `url("/images/home-bck-2.jpeg")` }}
      ></div>
    </section>
  );
};

export default HeroBanner;
