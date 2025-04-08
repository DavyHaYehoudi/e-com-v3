import { Button } from "@/components/ui/button";
import useVisualPublic from "@/hooks/useVisualPublic";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
type Designation = "visual1";
const GiftcardManual = () => {
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
    <section className="container w-full mx-auto lg:w-3/4">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mx-2">
        <div className="flex-1">
          {visuals.visual1 && typeof visuals.visual1 === "string" && (
            <img
              src={visuals.visual1}
              alt="Magnifique coffret tenu dans les mains d'une jeune femme en train de l'ouvrir."
              className="rounded w-[800px] h-[400px]"
            />
          )}
        </div>

        <div className="flex-1 space-y-4 text-justify mx-2">
          <p>
            Vos cartes cadeaux vous permettent de régler tout ou partie de vos
            commandes directement depuis notre boutique en ligne. Chaque carte
            cadeau est associée à un code unique et un solde que vous pouvez
            suivre dans votre liste de cartes cadeaux.
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
            Un historique est tenu à jour dans votre espace compte. Vous voyez
            les différentes utilisations et le solde restant. Cela vous permet
            de garder un suivi clair et transparent de vos avantages.
          </p>
        </div>
      </div>
      <div className="text-center my-10">
        <Link to="/carte-cadeau">
          {" "}
          <Button>Acheter une carte cadeau</Button>
        </Link>
      </div>
    </section>
  );
};
export default GiftcardManual;
