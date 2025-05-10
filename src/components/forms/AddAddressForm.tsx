import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useAddAddressMutation,
  useSendMobileOtpMutation,
  useVerifyMobileOtpMutation,
} from "@/store/apiSlices/userSlice";
import {
  addressValidation,
  otpValidation,
} from "@/validations/addressValidation";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setAddresses } from "@/store/Reducers/authReducer";
import CustomButton from "../buttons/CustomButton";
import { useEffect, useRef, useState } from "react";
import { trackElementDimension } from "@/utils/functions/resizeTrackers";
import GoogleMapLocationPicker from "../shared/GoogleMapLocationPicker";
import { IoMdClose } from "react-icons/io";
import { errorToast, successToast } from "@/lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

function AddAddressForm({
  setAddAddress,
}: {
  setAddAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user = useSelector(selectCurrentUser);
  const [addAddressMutation] = useAddAddressMutation();
  const [sendMobileOtpMutation] = useSendMobileOtpMutation();
  const [verifyMobileOtpMutation] = useVerifyMobileOtpMutation();
  const dispatch = useDispatch();

  const [location, setLocation] = useState<any>(null);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const locationFromRef = useRef<HTMLDivElement>(null);

  const addressForm = useForm<z.infer<typeof addressValidation>>({
    resolver: zodResolver(addressValidation),
  });
  const otpForm = useForm<z.infer<typeof otpValidation>>({
    resolver: zodResolver(otpValidation),
  });

  async function onSubmitAddress(values: z.infer<typeof addressValidation>) {
    try {
      const response = await sendMobileOtpMutation({
        phone: values.phone,
      }).unwrap();
      successToast(response.message);
      setOtpSent(true);
      setVerifyOtp(true);
    } catch (error: any) {
      errorToast(error.data.message);
    }
  }

  async function onSubmitOtp(values: z.infer<typeof otpValidation>) {
    try {
      await verifyMobileOtpMutation({
        otp: values.otp,
        phone: addressForm.getValues("phone"),
      }).unwrap();
      const response = await addAddressMutation({
        ...addressForm.getValues(),
        otp: values.otp,
      }).unwrap();
      dispatch(setAddresses(response.addresses));
      successToast(response.message);
      setAddAddress(false);
    } catch (error: any) {
      errorToast(error.data.message);
    }
  }

  useEffect(() => {
    if (user?.userId) {
      addressForm.setValue("userId", user.userId);
    }
    if (location) {
      addressForm.setValue("lat", location.lat);
      addressForm.setValue("lng", location.lng);
    }
  }, [location, user]);

  useEffect(() => {
    trackElementDimension(locationFromRef, "--address-form");
  }, []);

  return (
    <div>
      {verifyOtp ? (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="w-full">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem
                  style={{
                    height: "var(--address-form-height)",
                    width: "var(--address-form-width)",
                  }}
                  className="flex flex-col items-center justify-center h-full place-items-center"
                >
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="p-5">
                    Please enter OTP sent to your phone{" "}
                    {otpSent && (
                      <button
                        type="button"
                        onClick={() =>
                          addressForm.handleSubmit(onSubmitAddress)()
                        }
                        className="text-blue-500 ml-2 hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                  </FormDescription>
                  <div className="flex gap-5">
                    <CustomButton
                      onClick={() => setVerifyOtp(false)}
                      type="button"
                      theme="blue-outline"
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton type="submit" theme="blue">
                      Verify & Submit
                    </CustomButton>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <Form {...addressForm}>
          <form
            onSubmit={addressForm.handleSubmit(onSubmitAddress)}
            className="w-full"
          >
            <div ref={locationFromRef} className="flex">
              <GoogleMapLocationPicker
                onLocationSelect={setLocation}
                initialLocation={location}
              />

              <div className="gap-5 p-5 flex flex-col w-[650px]">
                <div
                  onClick={() => setAddAddress(false)}
                  className="flex justify-end cursor-pointer"
                >
                  <IoMdClose size={24} />
                </div>

                <FormField
                  control={addressForm.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem className="md:basis-1/2">
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter province (e.g., Karnataka)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addressForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter city (e.g., Bangalore)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addressForm.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addressForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="basis-1/2">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number (e.g., +1234567890)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {addressForm.formState.errors.lat && (
                  <p className="text-red-500 text-sm">
                    {addressForm.formState.errors.lat.message}
                  </p>
                )}
                <CustomButton type="submit" theme="black">
                  Send OTP
                </CustomButton>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
export default AddAddressForm;
