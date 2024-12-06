import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Link to="/panier">
      <Button className="uppercase mt-auto w-full">page panier</Button>
    </Link>
  );
};

export default Footer;
