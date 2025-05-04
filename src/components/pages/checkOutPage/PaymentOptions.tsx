import { IPaymentOptions } from "@/types/types";
import { FaMoneyBillWave, FaQrcode, FaPaypal } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

interface PaymentOptionsProps {
  paymentMethod: IPaymentOptions;
  setPaymentMethod: React.Dispatch<React.SetStateAction<IPaymentOptions>>;
}

const PaymentOptions = ({
  paymentMethod,
  setPaymentMethod,
}: PaymentOptionsProps) => {
  const paymentMethods = [
    { id: "cod", label: "Cash on Delivery", icon: <FaMoneyBillWave /> },
    { id: "upi", label: "UPI Payment", icon: <FaQrcode /> },
    {
      id: "paypal",
      label: "PayPal",
      icon: <FaPaypal />,
    },
  ];

  return (
    <div className="flex gap-5 flex-col border bg-white p-5 border-neutral-100 rounded-lg">
      <h1 className="font-bold">Payment Methods</h1>
      <div className="gap-3 flex flex-col">
        {paymentMethods.map(({ id, label, icon }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                paymentMethod === id
                  ? "border-black bg-gray-100"
                  : "border-gray-300"
              }`}
            >
              <input
                id={id}
                type="radio"
                name="paymentMethod"
                className="hidden"
                checked={paymentMethod === id}
                onChange={() => setPaymentMethod(id)}
              />
              <span className="text-lg">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
              {paymentMethod === id && <FaCircleCheck className="ml-auto" />}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
