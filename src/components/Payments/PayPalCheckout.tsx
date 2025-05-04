import { useContext, useEffect, useState } from "react";
import {
  usePaypalCaptureOrderMutation,
  usePaypalCreateOrderMutation,
} from "@/store/apiSlices/cartSlice";
import { PayPalScriptOptions } from "@paypal/paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Currency } from "@/Context/Currency";
import { errorToast } from "@/lib/utils";
import { IAddress } from "@/types/types";
import { useDispatch } from "react-redux";
import { emptyTheCart } from "@/store/Reducers/cartReducer";
import { useNavigate } from "react-router-dom";

export default function PayPalCheckout({
  address,
  setSuccess,
}: {
  address: IAddress;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { selectedCurrency } = useContext(Currency);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intialOptions: PayPalScriptOptions = {
    clientId:
      "AZCqG4Eg6MCq1Dt4Qj5tsqJbyFagS5U0LuKgG5TS0LOCMgIeAunK9I58pd4azcoYPHYmzv8vmUs5ljjh",
    components: "buttons",
    currency: selectedCurrency.code,
    dataNamespace: "paypal_sdk",
  };
  const [options, setOptions] = useState<PayPalScriptOptions>(intialOptions);

  const [createPaypalOrderMutation] = usePaypalCreateOrderMutation();
  const [capturePaypalOrderMutation] = usePaypalCaptureOrderMutation();

  const createOrder = async () => {
    try {
      const response = await createPaypalOrderMutation({
        currency: selectedCurrency.code,
      }).unwrap();
      console.log("response ", response);
      return response.orderId;
    } catch (err) {
      errorToast("Failed to create order");
    }
  };

  const onApprove = async (data: { orderID: string }) => {
    try {
      await capturePaypalOrderMutation({
        orderId: data.orderID,
        address,
        currency: selectedCurrency.code,
      });
      setSuccess(true);
      dispatch(emptyTheCart());
      setTimeout(() => {
        navigate("/account/orders");
      }, 2000);
    } catch (err: any) {
      errorToast(err.data.message);
    }
  };
  useEffect(() => {
    setOptions(intialOptions);
  }, [selectedCurrency]);
  return (
    <div>
      <PayPalScriptProvider options={options}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            height: 40,
          }}
          className="mt-8"
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </div>
  );
}
