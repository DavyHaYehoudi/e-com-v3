import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useShippingForm from "@/hooks/payment/useShippingForm";

const ShippingForm = ({
  onNext,
  onSameAddressChange,
  sameAddress,
}: {
  onNext: () => void;
  onSameAddressChange: (checked: boolean) => void;
  sameAddress: boolean;
}) => {
  const { register, handleSubmit, onSubmit, errors } = useShippingForm({
    onNext,sameAddress
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-md rounded-md space-y-4 dark bg-dark"
    >
      <div>
        <Label>Prénom</Label>
        <Input
          {...register("firstName")}
          placeholder="Prénom"
          className="w-full p-2 border rounded-md"
        />
        {errors.firstName && (
          <p className="text-red-600 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <Label>Nom</Label>
        <Input
          {...register("lastName")}
          placeholder="Nom"
          className="w-full p-2 border rounded-md"
        />
        {errors.lastName && (
          <p className="text-red-600 text-sm mt-1">
            {errors.lastName.message}
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
          {...register("streetNumber")}
          placeholder="Numéro de voie"
          className="w-full p-2 border rounded-md"
        />
        {errors.streetNumber && (
          <p className="text-red-600 text-sm mt-1">
            {errors.streetNumber.message}
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
          {...register("postalCode")}
          placeholder="Code postal"
          className="w-full p-2 border rounded-md"
        />
        {errors.postalCode && (
          <p className="text-red-600 text-sm mt-1">
            {errors.postalCode.message}
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

      <div className="flex items-center justify-end space-x-2">
        <Label htmlFor="terms" className="text-m font-medium leading-none">
          Adresse de facturation identique
        </Label>
        <Checkbox
          id="terms"
          onCheckedChange={(checked) => onSameAddressChange(!!checked)}
          checked={sameAddress}
        />
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

export default ShippingForm;
