import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Address } from "@/types/CustomerTypes";

interface OrderAddressesProps {
  shippingAddresses: Address;
  billingAddresses: Address;
}

const OrderAddresses: React.FC<OrderAddressesProps> = ({
  shippingAddresses,
  billingAddresses,
}) => {
  const renderAddress = (address: Address, title: string) => (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold">{`${address.firstName} ${address.lastName}`}</p>
        {address.company && <p>{address.company}</p>}
        <p>
          {address.streetNumber} {address.address1}
        </p>
        {address.address2 && <p>{address.address2}</p>}
        <p>
          {address.city}, {address.postalCode}
        </p>
        <p>{address.country}</p>
        <Separator className="my-4" />
        <p>Email : {address.email}</p>
        <p>Téléphone : {address.phone}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-wrap items-center gap-5 justify-center my-20">
      {renderAddress(billingAddresses, "Adresse de Facturation")}
      {renderAddress(shippingAddresses, "Adresse de Livraison")}
    </div>
  );
};
export default OrderAddresses;
