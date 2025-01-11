import FilterContent from "@/components/shared/filter/FilterContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilterType } from "@/hooks/useProductFilter";

interface ProductsSidebarProps {
  onFilter: (filters: FilterType) => void;
}
const ProductsSidebar: React.FC<ProductsSidebarProps> = ({ onFilter }) => {
  const isMobile = useIsMobile();
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <ScrollArea
          className={`${isMobile && "h-[875px]"} w-full rounded-md border`}
        >
          <div className="p-4">
            <FilterContent onFilter={onFilter} />
          </div>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
export default ProductsSidebar;
