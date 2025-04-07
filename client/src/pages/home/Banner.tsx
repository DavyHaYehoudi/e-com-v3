
interface BannerProps {
  pathImage: string |File;
}

const Banner: React.FC<BannerProps> = ({ pathImage }) => {
  return (
    <section className="relative h-[300px] lg:h-[600px] overflow-hidden">
      <div
        className="w-full h-full bg-cover bg-center animate-kenburns-left"
        style={{ backgroundImage: `url(${pathImage})` }}
      ></div>
    </section>
  );
};

export default Banner;
