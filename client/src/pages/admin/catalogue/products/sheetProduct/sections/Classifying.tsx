import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { CategoryDBType } from "@/types/category/CategoryTypes";
import { CollectionDBType } from "@/types/collection/CollectionTypes/collectionTypes";
import { TagDBType } from "@/types/tag/TagTypes";
import { ChevronDown } from "lucide-react";

interface ClassifyingProps {
  collections: CollectionDBType[];
  categories: CategoryDBType[];
  tags: TagDBType[];
  selectedCollections: string[];
  selectedCategories: string[];
  selectedTags: string[];
  handleCollectionSelection: (collectionId: string, isChecked: boolean) => void;
  handleCategorySelection: (categoryId: string, isChecked: boolean) => void;
  handleTagSelection: (tagId: string, isChecked: boolean) => void;
}

const Classifying: React.FC<ClassifyingProps> = ({
  collections,
  categories,
  tags,
  selectedCollections,
  selectedCategories,
  selectedTags,
  handleCollectionSelection,
  handleCategorySelection,
  handleTagSelection,
}) => {
  return (
    <>
      {/* Collections */}
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <Label>Classement 1</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Collections <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {collections.map((collection) => (
              <DropdownMenuCheckboxItem
                key={collection._id}
                checked={selectedCollections.includes(collection._id)}
                onCheckedChange={(isChecked) =>
                  handleCollectionSelection(collection._id, isChecked)
                }
              >
                {collection.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2 mt-2 flex-wrap">
          {selectedCollections.map((collectionId) => (
            <span
              key={collectionId}
              className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-center"
            >
              {collections.find((cat) => cat._id === collectionId)?.label}
            </span>
          ))}
        </div>
      </div>
      {/* Catégories */}
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <Label>Classement 2</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Catégories <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category._id}
                checked={selectedCategories.includes(category._id)}
                onCheckedChange={(isChecked) =>
                  handleCategorySelection(category._id, isChecked)
                }
              >
                {category.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2 mt-2 flex-wrap">
          {selectedCategories.map((categoryId) => (
            <span
              key={categoryId}
              className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-center"
            >
              {categories.find((cat) => cat._id === categoryId)?.label}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <Label>Classement 3</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Tags <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {tags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag._id}
                checked={selectedTags.includes(tag._id)}
                onCheckedChange={(isChecked) =>
                  handleTagSelection(tag._id, isChecked)
                }
              >
                {tag.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2 mt-2 flex-wrap">
          {selectedTags.map((tagId) => (
            <span
              key={tagId}
              className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-center"
            >
              {tags.find((tag) => tag._id === tagId)?.label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Classifying;
