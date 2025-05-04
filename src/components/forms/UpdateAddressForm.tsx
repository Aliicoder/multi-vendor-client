import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import addressValidation from "@/validations/addressValidation";
import { IAddress } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { useUpdateAddressMutation } from "@/store/apiSlices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setAddresses } from "@/store/Reducers/authReducer";
import { errorToast, successToast } from "@/lib/utils";
import GoogleMapLocationPicker from "../shared/GoogleMapLocationPicker";
import { IoMdClose } from "react-icons/io";
import CustomButton from "../buttons/CustomButton";
import { trackElementHeight } from "@/utils/functions/resizeTrackers";
interface IEditAddressProps {
  address: IAddress;
  setEditAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>;
}
function UpdateAddressForm({
  address: { _id, city, phone, province, street, lat, lng },
  setEditAddress,
}: IEditAddressProps) {
  const user = useSelector(selectCurrentUser);
  const [updateAddressMutation] = useUpdateAddressMutation();
  const form = useForm<z.infer<typeof addressValidation>>({
    resolver: zodResolver(addressValidation),
  });
  const dispatch = useDispatch();

  const [location, setLocation] = useState<any>(null);

  const locationFromRef = useRef<HTMLDivElement>(null);

  const { errors } = form.formState;
  async function onSubmit(values: z.infer<typeof addressValidation>) {
    try {
      console.log("values", values);
      const response = await updateAddressMutation(values).unwrap();
      console.log("addresses reponse", response);
      dispatch(setAddresses(response.addresses));
      successToast(response);
    } catch (error) {
      errorToast(error);
    }
  }
  useEffect(() => {
    form.setValue("lat", location?.lat);
    form.setValue("lng", location?.lng);
  }, [location]);
  useEffect(() => {
    form.setValue("userId", user.userId);
    form.setValue("addressId", _id);
    form.setValue("province", province);
    form.setValue("city", city);
    form.setValue("street", street);
    form.setValue("phone", phone);
    form.setValue("lng", lng);
    form.setValue("lat", lat);
  }, []);
  useEffect(() => {
    trackElementHeight(locationFromRef, "--locationFrom-height");
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <GoogleMapLocationPicker
          onLocationSelect={setLocation}
          initialLocation={location}
        />

        <div
          ref={locationFromRef}
          className="flex flex-col w-[650px] gap-5 p-5"
        >
          <div
            onClick={() => setEditAddress(undefined)}
            className="flex justify-end"
          >
            <IoMdClose />
          </div>

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem className="md:basis-1/2">
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errors.lat && (
            <h1 className="text-red-500 text-sm">{errors.lat.message}</h1>
          )}
          <CustomButton className="" theme="black">
            Submit
          </CustomButton>
        </div>
      </form>
    </Form>
  );
}

export default UpdateAddressForm;
