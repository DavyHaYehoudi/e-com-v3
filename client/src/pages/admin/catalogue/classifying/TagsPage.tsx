import useTag from "@/hooks/dashboard/admin/useTag";
import TagCreate from "./TagCreate";
import TagsList from "./TagsList";
import { useEffect, useState } from "react";
import { TagDBType } from "@/types/tag/TagTypes";
import { toast } from "sonner";

const TagsPage = () => {
  const [tags, setTags] = useState<TagDBType[]>([]);
  const { getTags, deleteTag, createTag } = useTag();

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
    createTag({ label }).then((result) => {
      if (result) {
        setTags((prevTags) => [result, ...prevTags]);
      } else {
        toast.error("Erreur lors de la création du tag.");
      }
    });
  };

  // Fonction pour supprimer un tag (appelée depuis TagsList)
  const handleDeleteTag = async (tagId: string) => {
    try {
      await deleteTag(tagId); // Suppression dans l'API
      setTags((prevTags) => prevTags.filter((tag) => tag._id !== tagId)); // Mettre à jour localement
      toast.success("Tag supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du tag :", error);
      toast.error("Échec de la suppression du tag.");
    }
  };

  // Charger les tags au montage
  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-10">Tags</h1>
      {/* Passer handleAddTag en prop pour notifier le parent */}
      <TagCreate onAddTag={handleAddTag} />
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        {/* Passer tags et handleDeleteTag à TagsList */}
        <TagsList data={tags} onDeleteTag={handleDeleteTag} />
      </div>
    </div>
  );
};

export default TagsPage;
