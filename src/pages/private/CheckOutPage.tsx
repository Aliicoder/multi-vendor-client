import { useSelector } from "react-redux";
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { IAddress, ICartOrder, IUnit } from "@/utils/types/types";
import Border from "@/components/borders/Border";
import QuantityButton from "@/components/buttons/QuantityButton";
import NavigateBack from "@/components/shared/NavigateBack";
import PlaceOrderBar from "@/components/dedicated/pages/checkOutPage/PlaceOrderBar";
import ChangeAddressBar from "@/components/dedicated/pages/checkOutPage/ChangeAddressBar";
import { useState } from "react";
import PaymentInfoAndMethods from "@/components/dedicated/pages/checkOutPage/PaymentInfoAndMethods";
import { selectCurrentUser } from "@/store/Reducers/authReducer";

export type IPaymentOptions = "cod" | "card" | "upi"
function CheckOutPage() {
  const {addresses} = useSelector(selectCurrentUser)
  const defaultAddress = addresses[0]
  const  cart  = useSelector(selectActiveCart)
  const [paymentMethod,setPaymentMethod] = useState<IPaymentOptions|undefined>()
  const [address,setAddress] = useState<IAddress>(defaultAddress)
  return (
    <div className='container mx-auto | h-[calc(100vh_-_var(--placeOrderBar-height))] overflow-hidden flex flex-col  montserrat  
      md:h-[100vh]'>

      <NavigateBack text="checkout" />

      <div className=" h-full | flex flex-row" >
        <div className=" basis-full gap-3 p-6 | flex flex-col  overflow-y-scroll hide-scrollbar
          md:basis-9/12 ">
            <PaymentInfoAndMethods className="!block md:!hidden" setPaymentMethod={setPaymentMethod} /> 

          { cart?.orders && cart.orders.map((order:ICartOrder)=> ( order.units&&order.units.map((unit:IUnit)=>(
            <Border key={unit?.productId?._id} 
              bottomStyle="basis-3/12 shrink-0 flex gap-3 rounded-md bg-white " 
              cornerRadius={16}>

              <div className="basis-1/4 shrink-0 |  w-full  flex justify-center items-center overflow-hidden">
                <img className="p-4 aspect-square object-contain 
                  md:p-10 " src={unit?.productId?.media[0]?.url} alt="" />
              </div>

              <div className="gap-3  | flex flex-col justify-center 
                md:pl-6">
                <h1 className="c2 font-semibold">
                  {unit?.productId?.name}
                </h1>
                <p className="c2 line-clamp-3 ">
                  {unit.productId?.description}
                </p>
                <h1 className="c2 font-semibold text-green-500">
                  {unit?.productId?.stock > 9 ? " +9 stock" : `${unit?.productId?.stock} stock`} 
                </h1>
              </div>

              <div className="flex ml-auto flex-col justify-between gap-2 p-6 ">
                <div />
                <h1 className="c2 text-center font-semibold">{unit.price}$</h1>
                <QuantityButton unit={unit} />

              </div> 
            </Border>
          )) )) }
        </div>
        <PaymentInfoAndMethods setPaymentMethod={setPaymentMethod} /> 

        <ChangeAddressBar address={address} setAddress={setAddress} />
        <PlaceOrderBar address={address} paymentMethod={paymentMethod} />
      </div>
    </div>
  )
}

export default CheckOutPage
