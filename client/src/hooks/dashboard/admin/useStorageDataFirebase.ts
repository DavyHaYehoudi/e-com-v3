import { useEffect, useState } from "react";
import { ref, listAll, getMetadata } from "firebase/storage";
import { storage } from "@/firebase";
import { toast } from "sonner";

const useStorageDataFirebase = () => {
  const [statsProducts, setStatsProducts] = useState({
    totalImagesProducts: 0,
    totalSizeProducts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      let totalImagesProducts = 0;
      let totalSizeProducts = 0;

      // Calculer les stats pour les produits
      const listRef = ref(storage, "products");
      try {
        const res = await listAll(listRef);
        totalImagesProducts += res.items.length;

        const promises = res.items.map((itemRef) => getMetadata(itemRef));
        const metadatas = await Promise.all(promises);

        totalSizeProducts += metadatas.reduce((acc, metadata) => {
          return acc + metadata.size;
        }, 0);
      } catch (error) {
        console.log("error:", error);
        toast.error("Erreur lors de la récupération des données");
      }

      setStatsProducts({ totalImagesProducts, totalSizeProducts });
    };
    fetchStats();
  }, []);

  return { statsProducts };
};

export default useStorageDataFirebase;
