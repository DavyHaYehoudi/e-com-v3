import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { data } from "./data/tabs";
import { SidebarSection } from "../SidebarSection";
import { CustomerDBType } from "@/types/CustomerTypes";
import useCustomerInfo from "@/hooks/dashboard/admin/useCustomer";
import { toast } from "sonner";
import { NavUser } from "../NavUser";

export function SidebarAppAdmin({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [customerInfo, setCustomerInfo] = React.useState<CustomerDBType | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const { customerInfoFetch } = useCustomerInfo();
  React.useEffect(() => {
    const getCustomerInfo = async () => {
      setIsLoading(true);
      try {
        if (!customerInfo) {
          const customerData = (await customerInfoFetch()) || null;
          setCustomerInfo(customerData);
        }
      } catch (error) {
        console.log("error:", error);
        toast.error(
          "Une erreur est survenue lors de la récupération de vos informations"
        );
      } finally {
        setIsLoading(false);
      }
    };
    getCustomerInfo();
  }, [customerInfoFetch, customerInfo]);
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
        <NavUser
          user={{
            name: customerInfo?.firstName || "",
            email: customerInfo?.email || "",
            avatar: customerInfo?.avatarUrl || "",
          }}
          isLoading={isLoading}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
