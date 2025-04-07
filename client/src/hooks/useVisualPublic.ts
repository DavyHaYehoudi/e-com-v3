import { useFetch } from "@/service/hooks/useFetch";
import { VisualDBType } from "@/types/VisualTypes";
import { useEffect, useState } from "react";

type Designation = "image1" | "image2" | "image3" | "image4";

const useVisualPublic = (page: string) => {
  const [defaultValues, setDefaultValues] = useState<
    Record<Designation, File | string | null>
  >({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { triggerFetch: getVisuals } = useFetch<VisualDBType>(
    `/visuals/${page}`,
    {
      requiredCredentials: false,
    }
  );

  useEffect(() => {
    const fetchProductData = async () => {
      // Récupération des visuels
      if (page) {
        try {
          setLoading(true);
          const visualsFromDB = await getVisuals();
          if (visualsFromDB) {
            const { image1, image2, image3, image4 } = visualsFromDB.images;
            setDefaultValues({ image1, image2, image3, image4 });
          }
        } catch (err) {
          setError(
            (err as Error).message || "Erreur lors du chargement des visuels."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductData();
  }, [page, getVisuals]);

  return { defaultValues, loading, error, page };
};

export default useVisualPublic;
