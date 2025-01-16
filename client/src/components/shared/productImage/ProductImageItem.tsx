import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductImageItemProps {
  path: string;
  name: string;
  productId: string;
  width: string;
  height: string;
}

const ProductImageItem: React.FC<ProductImageItemProps> = ({
  path,
  name,
  productId,
  width,
  height,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <a
            href={`/produits/${productId}`}
            className="inline-block"
            style={{ width: width, height: height }}
          >
            <img
              className="w-[100%] h-[100%] object-center rounded-[16px] cursor-pointer"
              src={path}
              alt={name}
            />
          </a>
        </TooltipTrigger>
        <TooltipContent>Voir le produit</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProductImageItem;
