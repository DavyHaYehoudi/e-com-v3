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
import useShippingAddress from "@/hooks/addresses/useShippingAddress";

interface UseShippingFormProps {
  onNext: () => void;
  sameAddress: boolean;
}

const useShippingForm = ({ onNext, sameAddress }: UseShippingFormProps) => {
  const dispatch = useDispatch();
  const shippingAddress = useShippingAddress();
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
    if (shippingAddress) {
      dispatch(setAddresses({ shipping: shippingAddress, billing: null }));
    }
  }, [shippingAddress, dispatch]);

  useEffect(() => {
    if (addressState.shipping) {
      const {
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
      } = addressState.shipping;
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
  }, [addressState.shipping, setValue]);

  const onSubmit = (AddressFormValues: AddressFormValues) => {
    dispatch(setAddresses({ shipping: AddressFormValues, billing: null }));
    if (sameAddress) {
      dispatch(setAddresses({ billing: AddressFormValues, shipping: null }));
    }
    onNext();
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useShippingForm;
