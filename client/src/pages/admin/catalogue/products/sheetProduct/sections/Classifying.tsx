import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { CategoryDBType } from "@/types/category/CategoryTypes";
import { TagDBType } from "@/types/tag/TagTypes";
import { ChevronDown } from "lucide-react";

interface ClassifyingProps {
  categories: CategoryDBType[];
  tags: TagDBType[];
  selectedCategories: string[];
  selectedTags: string[];
  handleCategorySelection: (categoryId: string, isChecked: boolean) => void;
  handleTagSelection: (tagId: string, isChecked: boolean) => void;
}

const Classifying: React.FC<ClassifyingProps> = ({
  categories,
  tags,
  selectedCategories,
  selectedTags,
  handleCategorySelection,
  handleTagSelection,
}) => {
  return (
    <>
      {/* Catégories */}
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <Label>Classement 1</Label>
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
        <Label>Classement 2</Label>
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
