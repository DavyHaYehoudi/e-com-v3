import { useEffect, useState } from "react";
import NewBadge from "@/components/shared/badge/NewBadge";
import FavoriteButton from "@/components/shared/FavoriteButton";
import CarouselProduct from "./CarouselProduct";
import ProductPrice from "./ProductPrice";
import ProductInformation from "./ProductInformation";
import ProductsSuggested from "./ProductsSuggested";
import NumberInput from "@/components/shared/NumberInput";
import { useFetch } from "@/service/hooks/useFetch";
import ProductVariants from "./ProductVariants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useParams } from "react-router-dom";
import { ProductDBType } from "@/types/ProductTypes";
import { isProductNew } from "@/utils/productUtils";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ProductReviewSection from "./reviews/ProductReviewSection";

const MasterProduct = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const [selectedVariant, setSelectedVariant] = useState("");
  const { productId } = useParams();
  const {
    data: product,
    loading,
    triggerFetch,
  } = useFetch<ProductDBType>(`/products/${productId}`);

  useEffect(() => {
    if (productId) {
      triggerFetch();
    }
  }, [productId, triggerFetch]);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
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
          const defaultCombination = product.variants[0].combination;
          setSelectedVariant(defaultCombination);
        }
      }
      // Le panier est vide
    } else if (product) {
      const defaultCombination = product.variants[0].combination;
      setSelectedVariant(
        selectedVariant ? selectedVariant : defaultCombination
      );
    }
  }, [cartCustomer, product, productId, selectedVariant]);
  useEffect(() => {
    // Force le défilement vers le haut à chaque rendu
    window.scrollTo(0, 0);
  }, []);
  if (loading) {
    return (
      <div className="flex items-center flex-col justify-center gap-4">
        <LoadingSpinner />
        <span> Chargement en cours...</span>
      </div>
    );
  }
  return (
    product && (
      <main>
        <section className="contenair m-2 xl:w-1/2 md:w-3/4 w-full mx-auto p-2">
          {/* Nom du produit */}
          <h1 className="text-2xl font-bold text-center mt-10">
            {" "}
            {product?.name}{" "}
          </h1>
          <div className="flex items-center justify-between gap-8 my-10 flex-wrap">
            {/* Caroussel */}
            <div className="md:w-1/2 w-full min-w-[300px]">
              <CarouselProduct
                product={product}
                selectedVariant={selectedVariant}
              />
            </div>
            <div className="flex-grow">
              {/* Badge + favoris */}
              <div className="flex justify-center items-center gap-2 my-5 relative">
                {" "}
                {isProductNew(product.newUntil) && <NewBadge />}
                <FavoriteButton product={product} />{" "}
              </div>
              {/* Variants */}
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
              <h2 className="text-xl font-semibold my-8">🔢 Quantité :</h2>
              {/* Quantité */}
              <NumberInput
                onValueChange={handleQuantityChange}
                quantity={quantity}
                product={product}
              />
              <hr className="my-4" />
              {/* Prix */}
              <ProductPrice
                product={product}
                selectedVariant={selectedVariant}
                quantity={quantity}
              />
            </div>
          </div>
          {/* Description */}
          <article className="bg-purple-50 p-4 rounded-md text-gray-700 text-base leading-relaxed mt-4">
            {product?.description}
          </article>
          {/* Avis */}
          <ProductReviewSection productId={product._id} />
        </section>
        <ProductInformation />
        <ProductsSuggested product={product} />
      </main>
    )
  );
};

export default MasterProduct;
