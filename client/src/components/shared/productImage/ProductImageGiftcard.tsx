import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  
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
              <img
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
  