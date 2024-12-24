import { useSelector } from "react-redux";
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { ICartOrder, IUnit } from "@/utils/types/types";
import Border from "@/components/borders/Border";
import Summary from "@/components/dedicated/pages/CartPage/Summary";
import QuantityButton from "@/components/buttons/QuantityButton";
import BottomBar from "@/components/shared/BottomBar";
import CheckoutBar from "@/components/shared/CheckoutBar";
import NavigateBack from "@/components/shared/NavigateBack";
function CartPage() {
  const cart = useSelector(selectActiveCart)
  return (
    <div  className='container | flex flex-col montserrat mx-auto overflow-hidden
      h-[calc(100vh_-_var(--checkoutBar-height)_-_var(--bottomBar-height))] md:h-[100vh] '>

      <NavigateBack text="cart" />


      <div className=" h-full | flex flex-row">

        <div className='basis-full  gap-2 p-6 | flex flex-col overflow-y-scroll hide-scrollbar
          md:9/12'>
        { cart?.orders && cart.orders.map((order:ICartOrder)=> ( order.units&&order.units.map((unit:IUnit)=>(
          <Border key={unit?.productId?._id} 
            bottomStyle="basis-3/12  gap-3 | shrink-0 flex rounded-md bg-white" 
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
        
        <Summary />

      </div>


      <CheckoutBar />
      <BottomBar />

    </div>
  )
}

export default CartPage


