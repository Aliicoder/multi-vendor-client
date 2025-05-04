import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import successAnimation from "@/assets/animations/success.json";
import { emptyTheCart, selectActiveCart } from "@/store/Reducers/cartReducer";
import { IAddress, ICartOrder, IPaymentOptions, IUnit } from "@/types/types";
import { useContext, useEffect, useState } from "react";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import CustomButton from "@/components/buttons/CustomButton";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Header from "@/components/shared/Header";
import checkoutValidation from "@/validations/checkoutValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCashCheckoutMutation } from "@/store/apiSlices/cartSlice";
import { Form } from "@/components/ui/form";
import { cn, errorToast } from "@/lib/utils";
import PaymentOptions from "@/components/pages/checkOutPage/PaymentOptions";
import SetDeliveryAddress from "@/components/pages/checkOutPage/SetDeliveryAddress";
import PayPalCheckout from "@/components/Payments/PayPalCheckout";
import UnitCard from "@/components/cards/UnitCard";
import { Currency } from "@/Context/Currency";
import { currencyFormatter } from "@/utils/functions/currencyFormatter";
function CheckOutPage() {
  const { addresses } = useSelector(selectCurrentUser);
  const { selectedCurrency, exchangeRates } = useContext(Currency);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cashCheckoutMutation] = useCashCheckoutMutation();
  const cart = useSelector(selectActiveCart);
  const defaultAddress = addresses[0];
  const form = useForm<z.infer<typeof checkoutValidation>>({
    resolver: zodResolver(checkoutValidation),
  });

  const [deliveryAddress, setDeliveryAddress] =
    useState<IAddress>(defaultAddress);
  const [success, setSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<IPaymentOptions>("paypal");

  async function onSubmit(values: z.infer<typeof checkoutValidation>) {
    try {
      const response = await cashCheckoutMutation({
        currency: selectedCurrency.code,
        address: values.address,
      }).unwrap();
      console.log("res ", response);
      setSuccess(true);
      dispatch(emptyTheCart());
      setTimeout(() => {
        navigate("/account/orders");
      }, 2000);
    } catch (error: any) {
      errorToast(error.data.message);
    }
  }
  useEffect(() => {
    form.setValue("address", deliveryAddress);
  }, [deliveryAddress]);
  useEffect(() => {
    if (paymentMethod) form.setValue("paymentMethod", paymentMethod);
  }, [paymentMethod]);
  useEffect(() => {
    setTotalAmount(
      cart.totalAmount * exchangeRates[selectedCurrency.changeCode]
    );
  }, [selectedCurrency, exchangeRates, cart]);
  const SuccessOverlay = () => (
    <div className="absolute inset-0  flex justify-center items-center bg-white bg-opacity-90 z-50">
      <Lottie
        className="size-96"
        animationData={successAnimation}
        loop={false}
      />
    </div>
  );
  return (
    <div className="flex h-svh flex-col">
      {success && <SuccessOverlay />}
      <Header />
      <div className="flex flex-col container mx-auto overflow-hidden font-montserrat ">
        <CustomButton
          onClick={() => navigate(-1)}
          className="flex bg-slate-50 p-6 font-semibold gap-3 items-center"
        >
          <IoIosArrowBack />
          Checkout
        </CustomButton>

        <div className="flex h-full">
          <div
            id="check-out-left-part"
            className=" gap-3 px-5 mr-5 pb-[100px] flex flex-col overflow-scroll basis-9/12  "
          >
            <PaymentOptions
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            <SetDeliveryAddress
              setDeliveryAddress={setDeliveryAddress}
              deliveryAddress={deliveryAddress}
            />

            <div className="flex flex-col gap-5  rounded-lg ">
              {cart?.orders &&
                cart.orders.map(
                  (order: ICartOrder) =>
                    order.units &&
                    order.units.map((unit: IUnit, i) => (
                      <UnitCard key={i} unit={unit} />
                    ))
                )}
            </div>
          </div>

          <div
            id="check-out-right-part"
            className="max-md:hidden basis-3/12 flex "
          >
            <div className="flex flex-col p-5 gap-5 border bg-white border-neutral-100  h-fit rounded-lg w-full overflow-hidden">
              <h1 className=" font-bold"> Order summary</h1>
              <Form {...form}>
                <form
                  className="bg-white"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <p className="c6 md:c2">
                    <span className="font-semibold">
                      {cart.totalNoOfProducts}
                    </span>{" "}
                    items in the cart
                  </p>
                  <h1 className="flex justify-between">
                    <span className="font-semibold">products amount</span>{" "}
                    {currencyFormatter(selectedCurrency.code, totalAmount)}
                  </h1>
                  <h1 className="flex justify-between">
                    <span className="font-semibold">delivery amount</span>{" "}
                    <span className=""></span>
                  </h1>
                  <h1 className="flex justify-between">
                    <span className="font-semibold">total</span>
                    {currencyFormatter(selectedCurrency.code, totalAmount)}
                  </h1>
                  {paymentMethod === "paypal" ? (
                    <PayPalCheckout
                      setSuccess={setSuccess}
                      address={deliveryAddress}
                    />
                  ) : (
                    <CustomButton
                      disabled={
                        cart.units && cart.units.length > 0 ? false : true
                      }
                      type="submit"
                      theme="black"
                      className={cn(
                        "w-full mt-10",
                        cart.units && cart.units.length > 0
                          ? "cursor-pointer"
                          : "opacity-75"
                      )}
                    >
                      Checkout
                    </CustomButton>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutPage;
