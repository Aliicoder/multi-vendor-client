import CustomButton from "@/components/buttons/CustomButton";
import { cn } from "@/lib/utils";
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { trackElementHeight } from "@/utils/functions/resizeTrackers";
import { useEffect, useRef } from "react";
import { MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ICheckout {
  className?: string;
}
export default function CheckoutBar({ className }: ICheckout) {
  const navigate = useNavigate();
  const refCheckoutBar = useRef<HTMLDivElement>(null);
  const cart = useSelector(selectActiveCart);
  useEffect(() => {
    trackElementHeight(refCheckoutBar, "--checkoutBar-height");
  }, []);
  return (
    <div ref={refCheckoutBar} className={cn(className, "flex fixed flex-row")}>
      <div className="flex flex-col p-2 c7">
        <h1 className="font-semibold">
          {cart.totalNoOfProducts} items in the cart
        </h1>
        <h1>${cart.totalAmount}</h1>
      </div>
      <div className="flex justify-center items-center">
        <CustomButton
          disabled={cart.units && cart.units.length > 0 ? false : true}
          onClick={() => navigate("checkout")}
          className={` ${cart.units && cart.units.length > 0 ? "cursor-pointer" : "opacity-75"}
            c7 px-3 py-2 gap-3 | flex items-center font-medium border rounded-lg  text-black`}
        >
          Checkout
          <MdNavigateNext />
        </CustomButton>
      </div>
    </div>
  );
}
