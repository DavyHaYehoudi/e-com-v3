import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useVisualPublic from "@/hooks/useVisualPublic";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProductImageGiftcardProps {
  amount: number;
}
type Designation = "visual1";
const ProductImageGiftcard: React.FC<ProductImageGiftcardProps> = ({
  amount,
}) => {
  const [visuals, setVisuals] = useState<
    Record<Designation, File | string | null>
  >({
    visual1: null,
  });
  const { defaultValues } = useVisualPublic("giftcard");
  useEffect(() => {
    if (defaultValues) {
      setVisuals({ ...defaultValues });
    }
  }, [defaultValues]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <Link to="/carte-cadeau">
            {visuals.visual1 && typeof visuals.visual1 === "string" && (
              <img
                className=" object-center rounded-[16px] cursor-pointer"
                src={visuals.visual1}
                alt={`Carte cadeau d'une valeur de ${amount} euros`}
                width="150px"
                height="150px"
              />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent>Voir la page des cartes cadeaux</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProductImageGiftcard;
