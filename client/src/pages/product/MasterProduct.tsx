import { useEffect, useState } from "react";
import NewBadge from "@/components/shared/badge/NewBadge";
import FavoriteButton from "@/components/shared/FavoriteButton";
import CarouselProduct from "./CarouselProduct";
import ProductPrice from "./ProductPrice";
import ProductInformation from "./ProductInformation";
import ProductsSuggested from "./ProductsSuggested";
import NumberInput from "@/components/shared/NumberInput";
import { useFetch } from "@/service/hooks/useFetch";
import LoaderWrapper from "@/components/shared/LoaderWrapper";
import ProductVariants from "./ProductVariants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import ProductReview from "./ProductReview";
import { useParams } from "react-router-dom";
import { ProductDBType } from "@/types/product/ProductTypes";
import { useCartManager } from "@/hooks/useCartManager";
import { isProductNew } from "@/utils/productUtils";

const MasterProduct = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const [selectedVariant, setSelectedVariant] = useState("");
  const { addOrUpdateProductInCart } = useCartManager();
  const { productId } = useParams();
  const {
    data: product,
    error,
    loading,
    triggerFetch,
  } = useFetch<ProductDBType>(`/products/${productId}`);
  useEffect(() => {
    if (productId) {
      triggerFetch();
    }
  }, [productId, triggerFetch]);

  const handleQuantityChange = (value: number) => {
    if (productId && product) {
      addOrUpdateProductInCart({
        productId,
        variant: selectedVariant,
        quantity: value,
        name: product?.name,
        heroImage: product?.heroImage,
        newUntil: product?.newUntil,
        price: product?.price,
        promotionPercentage: product?.promotionPercentage,
        promotionEndDate: product?.promotionEndDate,
        cashback: product?.cashback,
      });
    }
  };
  const handleVariantChange = (combination: string) => {
    const selectedVariantInProduct = product?.variants.find(
      (variant) =>
        variant.combination === combination && productId === product._id
    );
    if (selectedVariantInProduct) {
      setSelectedVariant(selectedVariantInProduct.combination);
    }
  };

  useEffect(() => {
    // Il existe des produits dans le panier
    if (
      cartCustomer &&
      cartCustomer.cartProducts &&
      cartCustomer.cartProducts.length > 0
    ) {
      // Le produit est-il dans le panier
      const productInCart = cartCustomer.cartProducts.find(
        (p) =>
          p.productId === productId &&
          (selectedVariant ? p.variant === selectedVariant : true)
      );
      // Le produit est dans le panier
      if (productInCart) {
        setQuantity(productInCart.quantity);
        setSelectedVariant(productInCart.variant || selectedVariant);
        // Le produit n'est pas dans le panier
      } else {
        setQuantity(1);
        if (product && !selectedVariant) {
          setSelectedVariant(product.variants[0].combination);
        }
      }
      // Le panier est vide
    } else if (product) {
      setSelectedVariant(
        selectedVariant ? selectedVariant : product.variants[0].combination
      );
    }
  }, [cartCustomer, product, productId, selectedVariant]);
  useEffect(() => {
    // Force le défilement vers le haut à chaque rendu
    window.scrollTo(0, 0);
  }, []);

  return (
    <LoaderWrapper error={error} loading={loading}>
      {product && (
        <main>
          <section className="contenair m-2 lg:w-1/2 lg:mx-auto ">
            <h1 className="text-2xl font-bold text-center mt-5">
              {" "}
              {product?.name}{" "}
            </h1>
            <div className="flex justify-center items-center gap-2 mt-5 relative">
              {" "}
              {isProductNew(product.newUntil) && <NewBadge />}
              <FavoriteButton product={product} />{" "}
            </div>
            <CarouselProduct product={product} />
            <article className="bg-purple-50 p-4 rounded-md text-gray-700 text-base leading-relaxed mt-4">
              {product?.description}
            </article>
            <ProductReview productId={product._id} />
            <hr className="my-4" />
            {product.variants.length > 0 && (
              <>
                <ProductVariants
                  product={product}
                  selectedVariant={selectedVariant}
                  onVariantChange={handleVariantChange}
                />
                <hr className="my-4" />
              </>
            )}
            <h2 className="text-xl font-semibold mt-8">🔢 Quantité :</h2>
            <NumberInput
              onValueChange={handleQuantityChange}
              quantity={quantity}
              product={product}
            />
            <hr className="my-4" />
            <ProductPrice
              product={product}
              selectedVariant={selectedVariant}
              quantity={quantity}
            />
          </section>
          <ProductInformation />
          <ProductsSuggested product={product} />
        </main>
      )}
    </LoaderWrapper>
  );
};

export default MasterProduct;
