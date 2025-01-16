import AddToCartButton from "@/components/shared/AddToCartButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const GiftcardPage = () => {
  const [amount, setAmount] = useState(20);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<{
    amount: string | null;
    quantity: string | null;
  }>({
    amount: null,
    quantity: null,
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value);
    if (newAmount <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Le montant doit être supérieur à 0.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, amount: null }));
      setAmount(newAmount);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        quantity: "La quantité doit être au moins 1.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, quantity: null }));
      setQuantity(newQuantity);
    }
  };

  return (
    <main>
      <h1 className="text-center mt-5">carte cadeau</h1>
      <section className="container w-full mx-auto lg:w-3/4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mx-2">
          <div className="flex-1">
            <img
              src="/images/giftcard.jpeg"
              alt="Magnifique coffret tenu dans les mains d'une jeune femme en train de l'ouvrir."
              width={800}
              height={200}
              className="rounded"
            />
          </div>

          <div className="flex-1 space-y-4 text-justify mx-2">
            <p>
              Achetez une carte cadeau, du montant de votre choix, et elle sera
              ajoutée automatiquement à votre compte. Un code secret lui sera
              attribué et vous seul en aurez l&apos;accès.
            </p>
            <p>
              Si vous souhaitez l&apos;offrir, il vous suffira simplement de
              communiquer le code secret à la personne de votre choix.
            </p>
            <p>
              Au moment du règlement des achats, la personne pourra
              l&apos;utiliser en fournissant le code secret.
            </p>
            <p>
              Vous pouvez utiliser plusieurs fois la même carte tant qu'il y reste du crédit.
            </p>
            <p>
              Un historique est tenu à jour dans votre espace compte. Vous voyez
              les différentes utilisations et le solde restant. Cela vous permet
              de garder un suivi clair et transparent de vos avantages.
            </p>
          </div>
        </div>
        <div className="mt-20 mx-2 lg:mx-auto lg:w-1/3 shadow-xl rounded p-4 dark:shadow-xl dark:border-2 dark:border-white">
          <div className="mt-5 w-full flex justify-center items-center gap-2 flex-wrap">
            <Label>Montant de la carte cadeau</Label>
            <Input
              type="number"
              className="w-1/4"
              min={1}
              value={amount}
              onChange={handleAmountChange}
            />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>
          <div className="mt-5 w-full flex justify-center items-center gap-2 flex-wrap">
            <Label>
              Nombre de cartes cadeaux
              <br /> pour ce montant
            </Label>
            <Input
              type="number"
              placeholder="1"
              className="w-1/4"
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity}</p>
            )}
          </div>
          <div className="mt-5 w-full">
            <AddToCartButton
              amount={amount}
              quantity={quantity}
              type="giftcard"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default GiftcardPage;
