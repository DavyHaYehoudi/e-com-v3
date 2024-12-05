import { useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  BookOpenIcon,
  GiftIcon,
  GlobeIcon,
  MailIcon,
  TagIcon,
} from "lucide-react";
import ProductMenu from "./ProductMenu";

const Navbar = () => {
  // const pathname = usePathname(); // Récupère le chemin actif
    // Récupère l'objet location
    const location = useLocation();

    // Le pathname est accessible via location.pathname
    const pathname = location.pathname;
  return (
    <nav className="text-gray-500 mb-4 lg:p-4">
      <NavigationMenu className="flex flex-col lg:flex-row lg:justify-center gap-8 list-none items-start lg:items-center">
        {/* Onglet Produits avec sous-menu */}
        <NavigationMenuItem >
          <div className="flex items-center">
            <TagIcon className="tab-nav w-5 h-5" />
            <ProductMenu />
          </div>
        </NavigationMenuItem>
        {/* Onglet Créatrice */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/creatrice"
            className={`flex items-center space-x-2 relative ${
              pathname === "/creatrice" ? "active" : ""
            }`}
          >
            <BookOpenIcon className="tab-nav w-5 h-5" />
            <span className="tab-nav tracking-widest text-xs lg:text-sm">Creatrice</span>
            <span className="absolute bottom-0 left-1/2 h-1 w-0 bg-golden transition-all duration-300 transform -translate-x-1/2 hover:w-full"></span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Onglet Tradition */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/tradition"
            className={`flex items-center space-x-2 relative ${
              pathname === "/tradition" ? "active" : ""
            }`}
          >
            <GlobeIcon className="tab-nav w-5 h-5" />
            <span className="tab-nav tracking-widest text-xs lg:text-sm">Tradition</span>
            <span className="absolute bottom-0 left-1/2 h-1 w-0 bg-golden transition-all duration-300 transform -translate-x-1/2 hover:w-full"></span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Onglet Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className={`flex items-center space-x-2 relative ${
              pathname === "/contact" ? "active" : ""
            }`}
          >
            <MailIcon className="tab-nav w-5 h-5" />
            <span className="tab-nav tracking-widest text-xs lg:text-sm">Contact</span>
            <span className="absolute bottom-0 left-1/2 h-1 w-0 bg-golden transition-all duration-300 transform -translate-x-1/2 hover:w-full"></span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* Onglet Carte cadeau */}
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/carte-cadeau"
            className={`flex items-center space-x-2 relative ${
              pathname === "/carte-cadeau" ? "active" : ""
            }`}
          >
            <GiftIcon className="tab-nav w-5 h-5" />
            <span className="tab-nav tracking-widest text-xs lg:text-sm">
              Carte cadeau
            </span>
            <span className="absolute bottom-0 left-1/2 h-1 w-0 bg-golden transition-all duration-300 transform -translate-x-1/2 hover:w-full"></span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    </nav>
  );
};
export default Navbar;
