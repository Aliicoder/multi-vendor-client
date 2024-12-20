import { useSelector } from "react-redux"
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { ICartOrder, IUnit } from "@/utils/types/types";
import Border from "@/components/borders/Border";

function CheckOutCartProducts() {
  const cart = useSelector(selectActiveCart)

  return (
     <>
         {
          cart?.orders &&
          cart.orders.map((order:ICartOrder)=> (
              order.units&&order.units.map((unit:IUnit)=>(
                <Border key={unit?.productId?._id} 
                  bottomStyle="flex basis-3/12 shrink-0  gap-3 rounded-md bg-white overflow-hidden hover:shadow-md transition-all" 
                  cornerRadius={16}>

                  <div className="basis-1/4 shrink-0 flex justify-center items-center w-full overflow-hidden">
                    <img className="p-[20%] aspect-square object-contain " src={unit?.productId?.media[0]?.url} alt="" />
                  </div>

                  <div className="flex flex-col justify-center gap-3 pl-6">
                    <h1 className="c2 font-semibold">{unit?.productId?.name}</h1>
                    <p className="c2 line-clamp-3 ">{unit.productId?.description}</p>
                 
                  </div>

                </Border>
              ))
          ))
        }
     </>
  )
}

export default CheckOutCartProducts