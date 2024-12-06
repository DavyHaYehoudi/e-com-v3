import { Input } from "@/components/ui/input";
import { ProductDBType } from "@/types/product/ProductTypes";
import { sumPriceArticle } from "@/utils/pricesFormat";
import { useEffect, useState } from "react";

const NumberInput = ({
  onValueChange,
  quantity,
  product,
}: {
  onValueChange: (value: number) => void;
  quantity: number;
  product: ProductDBType;
}) => {
  const {
    quantityInStock: quantityInStock,
    price,
    continueSelling: continueSelling,
  } = product;

  const [value, setValue] = useState<number>(quantity);

  useEffect(() => {
    if (value !== quantity) {
      setValue(quantity);
    }
  }, [quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 1;

    if (!continueSelling && quantityInStock !== null) {
      val = Math.max(1, Math.min(val, quantityInStock));
    }

    setValue(val);
    onValueChange(val);
  };

  return (
    <article>
      <div className="flex flex-col items-center gap-3">
        {!continueSelling && quantityInStock && (
          <span className="text-sm text-gray-500 dark:text-[var(--whiteSmoke)]">
            Limité à : {quantityInStock}
          </span>
        )}

        <div className="flex items-center">
          <Input
            type="number"
            value={value}
            min={1}
            max={!continueSelling ? quantityInStock ?? undefined : undefined}
            onChange={handleChange}
            className="text-center w-16"
          />
        </div>

        <p className="whitespace-nowrap">{sumPriceArticle(value, price)}</p>
      </div>
    </article>
  );
};

export default NumberInput;
