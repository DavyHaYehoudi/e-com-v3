'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Address, Addresses } from "../pages/dashboard/customer/hooks/useOrdersCustomer";

interface Props {
  addresses: Addresses;
}

const OrderAddresses = ({ addresses }: Props) => {
  const { billingAddress, shippingAddress } = addresses;

  const renderAddress = (address: Address, title: string) => (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold">{`${address.first_name} ${address.last_name}`}</p>
        {address.company && <p>{address.company}</p>}
        <p>{address.street_number} {address.address1}</p>
        {address.address2 && <p>{address.address2}</p>}
        <p>{address.city}, {address.postal_code}</p>
        <p>{address.country}</p>
        <Separator className="my-4" />
        <p>Email : {address.email}</p>
        <p>Téléphone : {address.phone}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-wrap items-center gap-5 justify-center my-20">
      {renderAddress(billingAddress, "Adresse de Facturation")}
      {renderAddress(shippingAddress, "Adresse de Livraison")}
    </div>
  );
}
export default OrderAddresses;