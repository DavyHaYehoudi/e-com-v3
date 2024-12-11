import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setAddresses } from "@/redux/slice/addressesSlice";
import {
  AddressFormValues,
  AddressSchema,
} from "@/pages/payment/schema/addressesSchema";
import useBillingAddress from "@/hooks/addresses/useBillingAddress";

interface UseBillingFormProps {
  onNext: () => void;
}

const useBillingForm = ({ onNext }: UseBillingFormProps) => {
  const dispatch = useDispatch();
  const billingAddress = useBillingAddress();
  const addressState = useSelector((state: RootState) => state.addresses);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(AddressSchema),
  });

  useEffect(() => {
    if (billingAddress) {
      dispatch(setAddresses({ shipping: null, billing: billingAddress }));
    }
  }, [billingAddress, dispatch]);

  useEffect(() => {
    if (addressState.billing) {
      const {
        company,
        firstName,
        lastName,
        phone,
        email,
        streetNumber,
        address1,
        address2,
        postalCode,
        city,
        country,
      } = addressState.billing;
      setValue("company", company || "");
      setValue("firstName", firstName || "");
      setValue("lastName", lastName || "");
      setValue("phone", phone || "");
      setValue("email", email || "");
      setValue("streetNumber", streetNumber || "");
      setValue("address1", address1 || "");
      setValue("address2", address2 || "");
      setValue("postalCode", postalCode || "");
      setValue("city", city || "");
      setValue("country", country || "France");
    }
  }, [addressState.billing, setValue]);

  const onSubmit = (AddressFormValues: AddressFormValues) => {
    dispatch(setAddresses({ billing: AddressFormValues, shipping: null }));
    onNext();
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useBillingForm;
