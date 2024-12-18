import { useEffect, useState } from "react";
import { CustomerDBType } from "@/types/customer/CustomerTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCustomerInfo from "@/hooks/dashboard/admin/useCustomer";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import NavBackDashboard from "@/components/shared/NavBackDashboard";

const CustomerSheet = () => {
  const [customer, setCustomer] = useState<CustomerDBType | null>(null);
  const { customerId } = useParams();
  const { customerInfoFetch } = useCustomerInfo(customerId);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await customerInfoFetch();
        if (data) {
          setCustomer(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du client :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchCustomer();
  }, [customerInfoFetch]);

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Chargement des données du client...</p>
      </div>
    );
  }

  const {
    avatarUrl,
    firstName,
    lastName,
    email,
    birthdate,
    shippingAddress,
    billingAddress,
    createdAt,
    updatedAt,
    emailMarketingConsent,
    wishlistProducts,
  } = customer;

  return (
    <div>
      <NavBackDashboard
        path="activite/clients/liste"
        text="Revenir à la liste des clients"
        role="admin"
      />
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm gap-4">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`} />
              <AvatarFallback>{firstName[0] + lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {firstName} {lastName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{email}</p>
              {birthdate && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Né(e) le : {new Date(birthdate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          {/* Account Details */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Compte créé le : {new Date(createdAt).toLocaleDateString()}</p>
            <p>
              Dernière mise à jour : {new Date(updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-blue-50 dark:bg-blue-900">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">
                Adresse de livraison
              </CardTitle>
            </CardHeader>
            <CardContent>
              {shippingAddress ? (
                <div>
                  <p>
                    {shippingAddress.firstName} {shippingAddress.lastName}
                  </p>
                  <p>{shippingAddress.address1}</p>
                  {shippingAddress.address2 && (
                    <p>{shippingAddress.address2}</p>
                  )}
                  <p>
                    {shippingAddress.postalCode} {shippingAddress.city}
                  </p>
                  <p>{shippingAddress.country}</p>
                  <p>Tél : {shippingAddress.phone}</p>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Non renseignée
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-900">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-300">
                Adresse de facturation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {billingAddress ? (
                <div>
                  <p>
                    {billingAddress.firstName} {billingAddress.lastName}
                  </p>
                  <p>{billingAddress.address1}</p>
                  {billingAddress.address2 && <p>{billingAddress.address2}</p>}
                  <p>
                    {billingAddress.postalCode} {billingAddress.city}
                  </p>
                  <p>{billingAddress.country}</p>
                  <p>Tél : {billingAddress.phone}</p>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Non renseignée
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Email Marketing Consent */}
        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">
            Consentement marketing
          </h2>
          <Badge variant={emailMarketingConsent ? "outline" : "destructive"}>
            {emailMarketingConsent
              ? "Consentement accordé"
              : "Consentement refusé"}
          </Badge>
        </div>

        {/* Wishlist Section */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Liste des favoris
          </h2>
          {wishlistProducts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du produit</TableHead>
                  <TableHead>Prix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wishlistProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {product.price} €
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Aucun produit dans la liste des favoris
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSheet;
