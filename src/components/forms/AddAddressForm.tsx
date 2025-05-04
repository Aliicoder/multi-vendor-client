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
import { useAddAddressMutation } from "@/store/apiSlices/userSlice";
import addressValidation from "@/validations/addressValidation";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setAddresses } from "@/store/Reducers/authReducer";
import CustomButton from "../buttons/CustomButton";
import { useEffect, useRef, useState } from "react";
import { trackElementHeight } from "@/utils/functions/resizeTrackers";
import GoogleMapLocationPicker from "../shared/GoogleMapLocationPicker";
import { IoMdClose } from "react-icons/io";
import { errorToast } from "@/lib/utils";
function AddAddressForm({
  setAddAddress,
}: {
  setAddAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user = useSelector(selectCurrentUser);
  const [addAddressMutation] = useAddAddressMutation();
  const dispatch = useDispatch();
  const [location, setLocation] = useState<any>(null);

  const locationFromRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof addressValidation>>({
    resolver: zodResolver(addressValidation),
  });
  const { errors } = form.formState;
  async function onSubmit(values: z.infer<typeof addressValidation>) {
    try {
      let response = await addAddressMutation(values).unwrap();
      dispatch(setAddresses(response.addresses));
      setAddAddress(false);
    } catch (error: any) {
      errorToast(error.message);
    }
  }
  useEffect(() => {
    form.setValue("userId", user.userId);
    form.setValue("lat", location?.lat);
    form.setValue("lng", location?.lng);
  }, [location]);
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
            onClick={() => setAddAddress(false)}
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

export default AddAddressForm;
