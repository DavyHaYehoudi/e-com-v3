"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useBillingForm from "./hooks/useBillingForm";

const BillingForm = ({ onNext }: { onNext: () => void }) => {
  const { register, handleSubmit, onSubmit, errors } = useBillingForm({
    onNext,
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4 dark bg-dark"
    >
      <div>
        <Label>Société</Label>
        <Input
          {...register("company")}
          placeholder="Société"
          className="w-full p-2 border rounded-md"
        />
        {errors.company && (
          <p className="text-red-600 text-sm mt-1">{errors.company.message}</p>
        )}
      </div>
      <div>
        <Label>Prénom</Label>
        <Input
          {...register("first_name")}
          placeholder="Prénom"
          className="w-full p-2 border rounded-md"
        />
        {errors.first_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>

      <div>
        <Label>Nom</Label>
        <Input
          {...register("last_name")}
          placeholder="Nom"
          className="w-full p-2 border rounded-md"
        />
        {errors.last_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.last_name.message}
          </p>
        )}
      </div>

      <div>
        <Label>Téléphone</Label>
        <Input
          {...register("phone")}
          placeholder="Téléphone"
          className="w-full p-2 border rounded-md"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label>Email</Label>
        <Input
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label>Numéro de voie</Label>
        <Input
          {...register("street_number")}
          placeholder="Numéro de voie"
          className="w-full p-2 border rounded-md"
        />
        {errors.street_number && (
          <p className="text-red-600 text-sm mt-1">
            {errors.street_number.message}
          </p>
        )}
      </div>

      <div>
        <Label>Adresse</Label>
        <Input
          {...register("address1")}
          placeholder="Adresse"
          className="w-full p-2 border rounded-md"
        />
        {errors.address1 && (
          <p className="text-red-600 text-sm mt-1">{errors.address1.message}</p>
        )}
      </div>

      <div>
        <Label>Complément d&apos;adresse</Label>
        <Input
          {...register("address2")}
          placeholder="Complément d'adresse"
          className="w-full p-2 border rounded-md"
        />
        {errors.address2 && (
          <p className="text-red-600 text-sm mt-1">{errors.address2.message}</p>
        )}
      </div>

      <div>
        <Label>Code postal</Label>
        <Input
          {...register("postal_code")}
          placeholder="Code postal"
          className="w-full p-2 border rounded-md"
        />
        {errors.postal_code && (
          <p className="text-red-600 text-sm mt-1">
            {errors.postal_code.message}
          </p>
        )}
      </div>

      <div>
        <Label>Ville</Label>
        <Input
          {...register("city")}
          placeholder="Ville"
          className="w-full p-2 border rounded-md"
        />
        {errors.city && (
          <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>

      <div>
        <Label>Pays</Label>
        <Input
          {...register("country")}
          defaultValue="France"
          placeholder="Pays"
          className="w-full p-2 border rounded-md"
        />
        {errors.country && (
          <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full p-2 mt-4 bg-green-500 hover:bg-green-600 text-white rounded-md "
      >
        Suivant
      </Button>
    </form>
  );
};
export default BillingForm;
