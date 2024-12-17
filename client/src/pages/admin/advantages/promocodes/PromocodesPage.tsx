import usePromocode from "@/hooks/dashboard/admin/usePromocode";
import { PromocodeDBType } from "@/types/promocode/PromocodeTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PromocodeCreate from "./PromocodeCreate";
import PromocodesList from "./PromocodesList";

export interface SelectedPromocode {
  promocodeId: string;
  code: string;
}
export interface PromocodeToAdd {
  code: string;
  promocodePercentage: number;
  startDate: string;
  endDate: string;
}

const PromocodesPage = () => {
  const [promocodes, setPromocodes] = useState<PromocodeDBType[]>([]);
  const [selectedPromocode, setSelectedPromocode] = useState<SelectedPromocode>(
    {
      promocodeId: "",
      code: "",
    }
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { getPromocodes, createPromocode, deletePromocode } = usePromocode(
    selectedPromocode.promocodeId
  );

  // Fonction pour récupérer tous les promocodes
  const fetchPromocodes = async () => {
    try {
      const data = await getPromocodes();
      if (data) {
        setPromocodes(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des promocodes :", error);
      toast.error("Impossible de charger vos informations.");
    }
  };

  const handleAddPromocode = (bodyData: PromocodeToAdd) => {
    const isExistedCode = promocodes.some(
      (promocode) => promocode.code === bodyData.code
    );
    if (isExistedCode) {
      toast.error("Ce code promo existe déjà.");
      return;
    }
    createPromocode(bodyData).then((result) => {
      if (result) {
        setPromocodes((prevPromocodes) => [result, ...prevPromocodes]);
        toast.success("Code promo créé avec succès.");
      } else {
        toast.error("Erreur lors de la création du code promo.");
      }
    });
  };

  // Fonction pour supprimer un code promo
  const handleDeletePromocode = async () => {
    try {
      await deletePromocode(selectedPromocode.promocodeId);

      setPromocodes((prevPromocodes) =>
        prevPromocodes.filter(
          (promocode) => promocode._id !== selectedPromocode.promocodeId
        )
      ); // Mettre à jour localement
      toast.success("Code promo supprimé avec succès.");
    } catch (error) {
      console.log("error:", error);
      toast.error("Erreur lors de la suppression du code promo.");
    }
  };

  // Charger les promocodes au montage
  useEffect(() => {
    fetchPromocodes();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-10">Codes promos</h1>
      <PromocodeCreate onAddPromocode={handleAddPromocode} />
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <PromocodesList
          data={promocodes}
          handleDeletePromocode={handleDeletePromocode}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          selectedPromocode={selectedPromocode}
          setSelectedPromocode={setSelectedPromocode}
        />
      </div>
    </div>
  );
};

export default PromocodesPage;
