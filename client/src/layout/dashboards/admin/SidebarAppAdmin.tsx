import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { data } from "./data/tabs";
import LoginModal from "@/components/modules/login/LoginModal";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { LogOut, House } from "lucide-react";
import { SidebarSection } from "../SidebarSection";
import { Link } from "react-router-dom";

export function SidebarAppAdmin({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { handleAuthentication, handleLogout } = useAuth();
  const isConnected = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarSection items={data.activity} title="Activité" />
        <SidebarSection items={data.catalogue} title="Catalogue" />
        <SidebarSection items={data.advantages} title="Avantages" />
        <SidebarSection items={data.marketing} title="Marketing" />
        <SidebarSection items={data.review} title="Avis" />
        <SidebarSection items={data.stat} title="Chiffres" />
      </SidebarContent>
      <SidebarFooter className="flex-row items-center gap-2 justify-between pb-4">
        <Link
          to="/"
          className="mx-2"
          title="Retour sur le site"
        >
          <House className="size-4" />
        </Link>
        {isConnected ? (
          <div
            onClick={handleLogout}
            className="cursor-pointer mx-2"
            title="Me déconnecter"
          >
            <LogOut className="size-4" />
            {/* Me déconnecter */}
          </div>
        ) : (
          <div className="mx-2">
            <LoginModal
              authenticate={handleAuthentication}
              label="Me connecter"
            />
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
