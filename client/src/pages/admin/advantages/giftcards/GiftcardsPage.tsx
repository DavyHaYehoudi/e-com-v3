import useGiftcardsCustomer from "@/hooks/dashboard/admin/useGiftcard";
import { GiftcardCustomerDBType } from "@/types/giftcard/GiftcardTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import GiftcardsList from "./GiftcardsList";

export interface SelectedGiftcard {
  giftcardId: string;
  code: string;
}

const GiftcardsPage = () => {
  const [giftcards, setGiftcards] = useState<GiftcardCustomerDBType[]>([]);
  const [selectedGiftcard, setSelectedGiftcard] = useState<SelectedGiftcard>({
    giftcardId: "",
    code: "",
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { fetchAllGiftcards, deleteGiftcard } = useGiftcardsCustomer({
    giftcardId: selectedGiftcard.giftcardId,
  });

  // Fonction pour récupérer toutes les cartes cadeaux
  const fetchGiftcards = async () => {
    try {
      const data = await fetchAllGiftcards();
      if (data) {
        setGiftcards(data);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des cartes cadeaux :",
        error
      );
      toast.error("Impossible de charger vos informations.");
    }
  };

  // Fonction pour supprimer une carte cadeau
  const handleDeleteGiftcard = async () => {
    try {
      await deleteGiftcard();

      setGiftcards((prevGiftcards) =>
        prevGiftcards.filter(
          (giftcard) => giftcard._id !== selectedGiftcard.giftcardId
        )
      ); // Mettre à jour localement
      toast.success("Carte cadeau supprimée avec succès.");
    } catch (error) {
      console.log("error:", error);
      toast.error("Erreur lors de la suppression de la carte cadeau.");
    }
  };

  // Charger les cartes cadeaux au montage
  useEffect(() => {
    fetchGiftcards();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-10">Cartes cadeaux de tous les clients</h1>
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <GiftcardsList
          data={giftcards}
          handleDeleteGiftcard={handleDeleteGiftcard}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          selectedGiftcard={selectedGiftcard}
          setSelectedGiftcard={setSelectedGiftcard}
        />
      </div>
    </div>
  );
};

export default GiftcardsPage;
