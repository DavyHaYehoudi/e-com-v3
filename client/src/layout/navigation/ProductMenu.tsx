import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
// import { formatLabelForURL } from "@/app/(public)/utils/FormatLabelForUrl";

const ProductMenu = () => {
  // const { collections, getCollections } = useCollection();
  // useEffect(() => {
  //   getCollections();
  // }, []);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="tab-nav p-2 tracking-widest text-xs lg:text-sm flex items-center m-0 dark:bg-transparent">
            Produits
          </NavigationMenuTrigger>
          {/* <NavigationMenuContent>
            <ul className="grid w-[280px] gap-3 p-6 md:w-[500px] lg:w-[600px] dark bg-dark">
              {collections.map((collection) => (
                <li key={collection.label} className="mb-4">
                  <span className="font-bold tracking-widest">
                    {collection.label}
                  </span>
                  <ul className="pl-4">
                    {collection.categories.map((category) => (
                      <li
                        key={category.id}
                        className="hover:underline tracking-wide"
                      >
                        <Link
                          href={`/categorie/${formatLabelForURL(
                            category.label
                          )}/${category.id}/produits`}
                        >
                          {category.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="hover:underline font-bold tracking-widest uppercase text-center">
                <Link href={`/produits`}> tous les produits</Link>
              </li>
            </ul>
          </NavigationMenuContent> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default ProductMenu;
