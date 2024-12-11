
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarApp } from "./SidebarApp";
import SessionExpired from "@/components/modules/login/SessionExpired";
import ThemeToggle from "@/components/shared/ThemeToggle";
import BreadcrumbCustomer from "./Breadcrumb";
import { Outlet } from "react-router-dom";

const DashboardCustomerLayout = () => {
  return (
    <SidebarProvider>
      <SidebarApp />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="mt-10">
              {/* <BreadcrumbCustomer /> */}
            </div>
          </div>
          <div className="mr-2">
            <ThemeToggle />
          </div>
        </header>
        {/* <main className="flex flex-1 flex-col gap-4 p-4 mt-8"> */}
        <main className="p-4 mt-16">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </main>
        <Outlet />
      </SidebarInset>
      {/* Modale de session expirée */}
      <SessionExpired />
    </SidebarProvider>
  );
};

export default DashboardCustomerLayout;
