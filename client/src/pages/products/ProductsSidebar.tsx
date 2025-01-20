import FilterContent from "@/components/shared/filter/FilterContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilterType } from "@/hooks/useProductFilter";
import { SquareX } from "lucide-react";

interface ProductsSidebarProps {
  onFilter: (filters: FilterType) => void;
  handleOpenSidebar: () => void;
}
const ProductsSidebar: React.FC<ProductsSidebarProps> = ({
  onFilter,
  handleOpenSidebar,
}) => {
  const isMobile = useIsMobile();
  return (
    <Sidebar>
      <SidebarContent className="relative">
        <ScrollArea className={`${isMobile && "h-[875px]"} w-full`}>
          <div className="p-4">
            <FilterContent onFilter={onFilter} />
          </div>
        </ScrollArea>
        {!isMobile && (
          <SquareX
            className="absolute right-2 top-2 cursor-pointer"
            onClick={handleOpenSidebar}
          />
        )}
      </SidebarContent>
    </Sidebar>
  );
};
export default ProductsSidebar;
