import { Truck } from "lucide-react";

const FreeShippingBanner = () => {
  return (
    <div
      id="freeShippingBanner"
      className="show animate-banner text-[var(--dark)]"
    >
      <span aria-hidden="true">
        <Truck />
      </span>
      <p className="tracking-widest font-bold "> Livraison offerte 🎁 !</p>
    </div>
  );
};

export default FreeShippingBanner;
