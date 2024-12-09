import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

interface ProductImageGiftcardProps {
  amount: number;
}

const ProductImageGiftcard: React.FC<ProductImageGiftcardProps> = ({
  amount,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <Link to="/carte-cadeau">
            <img
              className=" object-center rounded-[16px] cursor-pointer"
              src={`/images/giftcard.jpeg`}
              alt={`Carte cadeau d'une valeur de ${amount} euros`}
              width="150px"
              height="150px"
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>Voir la page des cartes cadeaux</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProductImageGiftcard;
