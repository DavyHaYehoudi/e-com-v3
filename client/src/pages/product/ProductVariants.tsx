import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductDBType } from "@/types/ProductTypes";

interface ProductVariantsProps {
  product: ProductDBType;
  onVariantChange: (selectedVariant: string) => void;
  selectedVariant: string;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({
  product,
  onVariantChange,
  selectedVariant,
}) => {

  return (
    <article>
      <h2 className="text-xl font-semibold">Choix :</h2>
      <RadioGroup
        value={selectedVariant}
        className="mt-2"
        onValueChange={(value) => onVariantChange(value)}
      >
        {product.variants.map((variant, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem
              value={variant.combination}
              id={`variant-${index}`}
            />
            <Label htmlFor={`variant-${index}`}>{variant.combination}</Label>
          </div>
        ))}
      </RadioGroup>
    </article>
  );
};

export default ProductVariants;
