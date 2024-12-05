import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductImageItemProps {
  path: string;
  name: string;
  productId: number;
}

const ProductImageItem: React.FC<ProductImageItemProps> = ({
  path,
  name,
  productId,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <a href={`/produits/${productId}`}>
            <img
              className="w-full object-center rounded-[16px] cursor-pointer"
              src={`/images/${path}`}
              alt={name}
              width={150}
              height={150}
            />
          </a>
        </TooltipTrigger>
        <TooltipContent>Voir le produit</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProductImageItem;
