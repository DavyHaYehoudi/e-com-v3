import useTag from "@/hooks/dashboard/admin/useTag";
import TagCreate from "./TagCreate";
import TagsList from "./TagsList";
import { useEffect, useState } from "react";
import { TagDBType } from "@/types/tag/TagTypes";
import { toast } from "sonner";

export interface SelectedTag {
  tagId: string;
  label: string;
}

const TagsPage = () => {
  const [tags, setTags] = useState<TagDBType[]>([]);
  const [selectedTag, setSelectedTag] = useState<SelectedTag>({
    tagId: "",
    label: "",
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { getTags, createTag, deleteTag, updateTag } = useTag(
    selectedTag.tagId
  );

  // Fonction pour récupérer tous les tags
  const fetchTags = async () => {
    try {
      const data = await getTags();
      if (data) {
        setTags(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des tags :", error);
      toast.error("Impossible de charger vos informations.");
    }
  };

  const handleAddTag = (label: string) => {
    const isExistedLabel = tags.some((tag) => tag.label === label);
    if (isExistedLabel) {
      toast.error("Ce tag existe déjà.");
      return;
    }
    createTag({ label }).then((result) => {
      if (result) {
        const formatResult = { ...result, productCount: 0 };
        setTags((prevTags) => [formatResult, ...prevTags]);
        toast.success("Tag créé avec succès.");
      } else {
        toast.error("Erreur lors de la création du tag.");
      }
    });
  };

  // Fonction pour supprimer un tag (appelée depuis TagsList)
  const handleDeleteTag = () => {
    deleteTag(selectedTag.tagId).then((result) => {
      if (!result) {
        return toast.error(
          "Impossible de supprimer le tag, des produits lui sont associés"
        );
      }

      setTags((prevTags) =>
        prevTags.filter((tag) => tag._id !== selectedTag.tagId)
      ); // Mettre à jour localement
      toast.success("Tag supprimé avec succès.");
    });
  };

  // Fonction pour update un tag
  const handleEditTag = (updatedLabel: string) => {
    const isExistedLabel = tags.some((tag) => tag.label === updatedLabel);
    if (isExistedLabel) {
      toast.error("Ce tag existe déjà.");
      return;
    }
    updateTag({ label: updatedLabel.trim() }).then(() => {
      const updatedTags = tags.map((tag) =>
        tag._id === selectedTag.tagId ? { ...tag, label: updatedLabel } : tag
      );
      setTags(updatedTags);
      toast.success("Tag modifié avec succès.");
    });
  };

  // Charger les tags au montage
  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-10">Tags</h1>
      <TagCreate onAddTag={handleAddTag} />
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <TagsList
          data={tags}
          handleDeleteTag={handleDeleteTag}
          handleEditTag={handleEditTag}
          isEditOpen={isEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </div>
    </div>
  );
};

export default TagsPage;
