import useCollection from "@/hooks/dashboard/admin/useCollection";
import { CollectionDBType } from "@/types/collectionTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CollectionsList from "./CollectionsList";
import CollectionCreate from "./CollectionCreate";
import FullscreenLoader from "@/components/shared/FullscreenLoader";

export interface SelectedCollection {
  collectionId: string;
  label: string;
}

const CollectionsPage = () => {
  const [collections, setCollections] = useState<CollectionDBType[]>([]);
  const [selectedCollection, setSelectedCollection] =
    useState<SelectedCollection>({
      collectionId: "",
      label: "",
    });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    getCollections,
    createCollection,
    deleteCollection,
    updateCollection,
  } = useCollection(selectedCollection.collectionId);

  // Fonction pour récupérer tous les collections
  const fetchCollections = async () => {
    try {
      setIsLoading(true);
      const data = await getCollections();
      if (data) {
        setCollections(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des collections :", error);
      toast.error("Impossible de charger vos informations.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCollection = (label: string) => {
    const isExistedLabel = collections.some(
      (collection) => collection.label === label
    );
    if (isExistedLabel) {
      toast.error("Cette collection existe déjà.");
      return;
    }
    createCollection({ label }).then((result) => {
      if (result) {
        const formatResult = { ...result, productCount: 0 };
        setCollections((prevCollections) => [formatResult, ...prevCollections]);
        toast.success("Collection créée avec succès.");
      } else {
        toast.error("Erreur lors de la création de la collection.");
      }
    });
  };

  // Fonction pour supprimer une collection (appelée depuis CollectionsList)
  const handleDeleteCollection = () => {
    deleteCollection(selectedCollection.collectionId).then((result) => {
      if (!result) {
        return toast.error(
          "Impossible de supprimer la collection, des produits lui sont associés"
        );
      }

      setCollections((prevCollections) =>
        prevCollections.filter(
          (collection) => collection._id !== selectedCollection.collectionId
        )
      ); // Mettre à jour localement
      toast.success("Collection supprimée avec succès.");
    });
  };

  // Fonction pour update une collection
  const handleEditCollection = (updatedLabel: string) => {
    const isExistedLabel = collections.some(
      (collection) => collection.label === updatedLabel
    );
    if (isExistedLabel) {
      toast.error("Cette collection existe déjà.");
      return;
    }
    updateCollection({ label: updatedLabel.trim() }).then(() => {
      const updatedCollections = collections.map((collection) =>
        collection._id === selectedCollection.collectionId
          ? { ...collection, label: updatedLabel }
          : collection
      );
      setCollections(updatedCollections);
      toast.success("Collection modifiée avec succès.");
    });
  };

  // Charger les collections au montage
  useEffect(() => {
    fetchCollections();
  }, []);
  if (isLoading) {
    return <FullscreenLoader />;
  }
  return (
    <div>
      <h1 className="text-center mb-10">Collections</h1>
      <CollectionCreate onAddCollection={handleAddCollection} />
      <div className="container-responsive">
        <CollectionsList
          data={collections}
          handleDeleteCollection={handleDeleteCollection}
          handleEditCollection={handleEditCollection}
          isEditOpen={isEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
        />
      </div>
    </div>
  );
};

export default CollectionsPage;
