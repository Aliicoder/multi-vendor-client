import CustomButton from "@/components/buttons/CustomButton";
import { useCheckoutMutation , util as cartUtil } from "@/store/apiSlices/cartSlice";
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { trackElementHeight } from "@/utils/functions/resizeTrackers";
import tryCatch from "@/utils/functions/tryCatch";
import { IAddress } from "@/utils/types/types";
import checkoutValidation from "@/utils/validations/checkoutValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface IPlaceOrderBar {
  address:IAddress,
  paymentMethod?: "cod" | "card" | "upi" 
}
export default function PlaceOrderBar({address,paymentMethod}:IPlaceOrderBar) {
  const refPlaceOrderBar = useRef<HTMLFormElement>(null);
  const navigate = useNavigate()
  const [checkoutMutation] = useCheckoutMutation()
  const cart = useSelector(selectActiveCart)
  const form = useForm<z.infer<typeof checkoutValidation>>({resolver: zodResolver(checkoutValidation)})
  async function onSubmit(values: z.infer<typeof checkoutValidation>) {
    await tryCatch( async ()=>{
      await checkoutMutation({paymentMethod:values.paymentMethod,address:values.address})
      cartUtil.invalidateTags(["Cart"])
      await new Promise((resolve) => setTimeout(resolve, 300));
      navigate("/home/account/orders")
    })
  }
  useEffect(() => {
    trackElementHeight(refPlaceOrderBar,"--placeOrderBar-height");
  }, []);
  useEffect(()=>{
    form.setValue("address",address)
  },[address])
  useEffect(()=>{
    if(paymentMethod)
      form.setValue("paymentMethod",paymentMethod)
  },[paymentMethod])
  return (
    <form ref={refPlaceOrderBar} onSubmit={form.handleSubmit(onSubmit)} 
      className="p-3 bottom-0 left-0 w-full | z-40 fixed flex justify-around bg-white border-t border-slate-200
      md:hidden">
      <div>
      <div className="c7 p-2">
        <h1 className="font-semibold">
          {cart.totalNoOfProducts} items in the cart
        </h1>
        <h1>
          ${cart.totalAmount} to pay
        </h1>
      </div>
    </div>
    <div className="flex justify-center items-center">      
      <CustomButton disabled={paymentMethod !== undefined && ( cart.units && cart.units.length > 0 ) ? false : true} 
        type="submit" text='place order' direction={"right"}
        className={` ${paymentMethod !== undefined && ( cart.units && cart.units.length > 0 ) ? "cursor-pointer" : "opacity-75"}
          c7 px-3 py-2 gap-3 flex items-center font-medium border rounded-lg  text-black`}>
        <MdNavigateNext />
      </CustomButton>
    </div>
    </form>
  );
}




