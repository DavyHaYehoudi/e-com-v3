import { ChevronsUpDown, House, LogOut, Mail, Store } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import useAuth from "@/hooks/useAuth";
import LoginModal from "@/components/modules/login/LoginModal";
import FullscreenLoader from "@/components/shared/FullscreenLoader";

export function NavUser({
  user,
  isLoading,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  isLoading: boolean;
}) {
  const isConnected = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { handleAuthentication, handleLogout } = useAuth();
  const { isMobile } = useSidebar();
  if (isLoading) {
    return <FullscreenLoader />;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.email ? user.email[0].toUpperCase() : "AN"}
                </AvatarFallback>
              </Avatar>
              {isConnected ? (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              ) : (
                <p>⚠️ Vous êtes déconnecté</p>
              )}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <>
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">AN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.name || "Atelier Noralya"}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
                {!isConnected && (
                  <div className="m-2">
                    <LoginModal
                      authenticate={handleAuthentication}
                      label="Me connecter"
                    />
                  </div>
                )}
              </>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  to="/"
                  className="flex items-center gap-2 flex-grow"
                  title="Retour sur le site"
                >
                  <House className="size-4" />
                  Retour à l'accueil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/produits"
                  className="flex items-center gap-2 flex-grow"
                  title="Retour sur la boutique"
                >
                  <Store className="size-4" />
                  Retour sur la boutique
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="/contact" className="flex items-center gap-2 flex-grow">
                  <Mail className="size-4" />
                  Contacter un responsable
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {isConnected && (
                <div
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center gap-2 flex-grow"
                  title="Me déconnecter"
                >
                  <LogOut className="size-4" />
                  <span>Me déconnecter</span>
                </div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
