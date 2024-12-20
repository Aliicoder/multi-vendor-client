import { useState } from "react";
import IconButton from "@/components/buttons/IconButton"
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CheckOutCartProducts from "@/components/dedicated/pages/checkOutPage/CheckOutCartProducts";
import CartSummery from "@/components/dedicated/pages/checkOutPage/CartSummery";
import toast from "react-hot-toast";
import { emptyTheCart } from "@/store/Reducers/cartReducer";
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { useCashOnDeliveryPaymentMutation } from "@/store/apiSlices/cartSlice";
import { util } from "@/store/apiSlices/orderSlice";
import { IAddress } from "@/utils/types/types";
import { useNavigate } from "react-router-dom";


function CheckOutPage() {
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const addresses:IAddress[] = user.addresses
  const  cart  = useSelector(selectActiveCart)
  const [isAddLocation,setIsAddLocation] = useState(false);
  const [paymentMethod,setPaymentMethod] = useState("");
  const [cashOnDeliveryPaymentMutation] = useCashOnDeliveryPaymentMutation()
  const handlePaymentMethodChange = (paymentMethod:string) =>{
    setPaymentMethod(paymentMethod)
  }
  const handleCashOnDelivery = async () =>{
    if(paymentMethod  == "cod" && addresses[0] != null && cart != null  ){
      try{
        const response = await cashOnDeliveryPaymentMutation({cart,address:addresses[0]}).unwrap()
        toast.success(response.message);
        dispatch(emptyTheCart())
        navigate("/dashboard/orders")
        util.invalidateTags(["Orders"])
      }catch(error:any){ }
    }
  }
  const CashOnDelivery = () =>{
    return <div className="flex justify-end">
      <IconButton onClick={handleCashOnDelivery} className="cp-x-2_7 cp-y-1_4 font-semibold bg-transparent border text-black hover:text-slate-50" text="Place order" direction={"right"}>
        
      </IconButton>
    </div>
  }
  return (
    <div className='container montserrat mx-auto flex h-[83svh] '>

       <div className="p-6 basis-6/12 flex flex-col gap-3 ">
        <CartSummery />
        <CheckOutCartProducts/>
      </div>

      <div className="flex p-6 gap-2 basis-6/12 flex-col  ">
        <div className="flex flex-col gap-3 bg-white p-6 border rounded-md">
          {
            isAddLocation ? 
            <div></div>
            :
            (
              user.addresses?.length > 0  ?
              <>
                <h1 className="font-semibold">Delivery Information</h1>
                <div className="flex justify-between items-center">
                  <h1 className="font-normal">to Ali Fahmi </h1>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="p-2 mr-2 bg-blue-500 border rounded-md font-bold text-white">{addresses[0]?.type}</div> 
                  <p>{addresses[0]?.city},</p> <p>{addresses[0]?.area},</p> <p>{addresses[0]?.pinCode}</p>,
                  <div  className="text-blue-500 hover:cursor-pointer hover:underline">change</div>
                </div> 
                </>
              :
              <div className="flex justify-center p-6 items-center">
                <IconButton onClick={()=>setIsAddLocation(true)} text="add address" direction={"right"}>
                  
                </IconButton>
              </div>
            )
          }
          <h1 className=" font-semibold mt-5">Payment Methods </h1>
          <Select onValueChange={handlePaymentMethodChange} >
            <SelectTrigger  className="w-fit">
              <SelectValue   placeholder="Choose Payment method" />
            </SelectTrigger>
            <SelectContent  className="montserrat">
              <SelectItem  value="cod">cash on delivery</SelectItem>
              <SelectItem disabled value="UPI">UPI</SelectItem>
              <SelectItem disabled value="Stripe">Stripe</SelectItem>
            </SelectContent>
          </Select>
          {
            paymentMethod == "" ? 
            <></>
            : 
            paymentMethod == "cod" ? 
            <CashOnDelivery />
            :
            <></>
          }
        </div>
      </div>
    </div>
  )
}

export default CheckOutPage
