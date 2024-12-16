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
  console.log("selectedTag:", selectedTag);
  console.log("tags:", tags);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { getTags, createTag } = useTag();

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
  const handleDeleteTag = (tagId: string | null) => {
    console.log("tagId:", tagId);
    setTags((prevTags) => prevTags.filter((tag) => tag._id !== tagId)); // Mettre à jour localement
    // fetchTags();
  };

  // Fonction pour update un tag
  const handleEditTag = (tagId: string | null, updatedLabel: string) => {
    console.log("tagId:", tagId, "updatedLabel:", updatedLabel);
    const updatedTags = tags.map((tag) =>
      tag._id === tagId ? { ...tag, label: updatedLabel } : tag
    );
    setTags(updatedTags);
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
