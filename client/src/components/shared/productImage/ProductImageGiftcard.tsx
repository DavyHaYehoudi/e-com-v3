import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import Image from "next/image";
  import React from "react";
  
  interface ProductImageGiftcardProps {
    amount:number;
  }
  
  const ProductImageGiftcard: React.FC<ProductImageGiftcardProps> = ({
   amount
  }) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <a href={`/carte-cadeau`}>
              <Image
                className="w-full object-center rounded-[16px] cursor-pointer"
                src={`/images/giftcard.jpeg`}
                alt={`Carte cadeau d'une valeur de ${amount} euros`}
                width={150}
                height={150}
              />
            </a>
          </TooltipTrigger>
          <TooltipContent>Voir la page des cartes cadeaux</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  export default ProductImageGiftcard;
  