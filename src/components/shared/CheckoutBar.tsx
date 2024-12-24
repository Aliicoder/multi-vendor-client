import CustomButton from "@/components/buttons/CustomButton"
import { selectActiveCart } from "@/store/Reducers/cartReducer"
import { trackElementHeight } from "@/utils/functions/resizeTrackers"
import { useEffect, useRef } from "react"
import { MdNavigateNext } from "react-icons/md"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function CheckoutBar() {
  const navigate = useNavigate()
  const refCheckoutBar = useRef<HTMLDivElement>(null)
  const cart = useSelector(selectActiveCart)
  useEffect(()=>{
    trackElementHeight(refCheckoutBar,"--checkoutBar-height")
  },[])
  return (
    <div ref={refCheckoutBar} 
      className="p-3 bottom-[var(--bottomBar-height)] left-0 w-full | z-40 fixed flex justify-around bg-white border-t border-slate-100
      md:hidden">
      <div>
        <div className="c7 p-2">
          <h1 className="font-semibold">
            {cart.totalNoOfProducts} items in the cart
          </h1>
          <h1>
            ${cart.totalAmount}
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center">      
        <CustomButton disabled={cart.units && cart.units.length > 0 ? false : true} 
          onClick={()=>navigate("checkout")} text='Checkout' direction={"right"}
          className={` ${ cart.units && cart.units.length > 0 ? "cursor-pointer" : "opacity-75"}
            c7 px-3 py-2 gap-3 | flex items-center font-medium border rounded-lg  text-black`}>
          <MdNavigateNext />
        </CustomButton>
      </div>
    </div>
  )
}
