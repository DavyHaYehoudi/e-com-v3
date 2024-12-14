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

export function SidebarAppCustomer({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { handleAuthentication, handleLogout } = useAuth();
  const isConnected = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarSection items={data.account} title="Gestion du compte" />
        <SidebarSection items={data.activities} title="Activités" />
        <SidebarSection items={data.advantages} title="Avantages" />
        <SidebarSection items={data.policy} title="Politique" />
      </SidebarContent>
      <SidebarFooter>
        <Link
          to="/"
          className="flex items-center gap-2 mx-2 my-6"
          title="Retour sur le site"
        >
          <House />
        </Link>
        {isConnected ? (
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer mx-2 my-6"
            title="Me déconnecter"
          >
            <LogOut />
            {/* Me déconnecter */}
          </div>
        ) : (
          <div className="flex items-center gap-2 mx-2 my-6">
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
