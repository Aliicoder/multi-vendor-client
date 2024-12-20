import IconButton from "@/components/buttons/IconButton"
import { productRating } from "@/utils/functions/rating"
import { FaMinus } from "react-icons/fa6";
import { RiAddLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { MdNavigateNext } from "react-icons/md";
import LinkButton from "@/components/buttons/LinkButton";
import { useSelector } from "react-redux";
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { ICartOrder, IUnit } from "@/utils/types/types";
import Border from "@/components/borders/Border";
import useMutations from "@/hooks/useMutations";
import { useState } from "react";
function CartPage() {
  const cart = useSelector(selectActiveCart)
  const [hasCoupon,] = useState(false)
  const {addToCart,isAdded,deleteFromCart,isDeleted} = useMutations()
  return (
    <div className='container flex montserrat mx-auto  h-[83svh] '>
      <div className='flex flex-col h-full basis-9/12 overflow-x-auto gap-2 p-6'>
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
                    <div className=" flex gap-1 c2">{productRating(3)}</div>
                    <h1 className="c2 font-semibold text-green-500">
                      {unit?.productId?.stock > 9 ? " +9 stock" : `${unit?.productId?.stock} stock`} 
                    </h1>
                  </div>

                  <div className="flex ml-auto flex-col justify-between gap-2 p-6 ">
                    <div />
                    <h1 className="c2 text-center font-semibold">{unit.price}$</h1>
                    <div className="flex items-center">
                    
                      <div onClick={()=>deleteFromCart(unit?.productId?._id)}  
                        className={` ${isDeleted ? "pointer-events-none":""}
                          c1 p-2 rounded-tl-md rounded-bl-md aspect-square border`} > 
                        <FaMinus />
                      </div>

                      <div 
                        className={` relative c1 p-2 bg-gray-100 border border-x-0 `} >
                        <div className="absolute c2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{unit.noOfProducts}</div>
                        <RiAddLine className="opacity-0" />
                      </div>


                      <div onClick={()=>addToCart(unit?.productId?._id)} 
                        className={` ${isAdded ? "pointer-events-none":""}
                          c1 p-2 rounded-tr-md rounded-br-md aspect-square border cursor-pointer`} >
                        <RiAddLine />
                      </div>

                    </div>
                  </div>
                </Border>
              ))
          ))
        }
      </div>
      
      <div className="basis-4/12 flex flex-col p-6 ">
        <Border cornerRadius={16} topStyle="!p-[0.5px]" bottomStyle="flex flex-col p-6 gap-3 bg-white border rounded-md">
          <h1 className="font-semibold">Summery</h1>
          {
            hasCoupon ? 
            <div className="flex gap-3">
              <Input placeholder="" />
              
              <IconButton text="Apply" direction={"right"}>    
              </IconButton>
            </div> 
            :  
            <div>do you have a coupon ? click</div>
          }

          <p className="c2"><span className="font-semibold">{cart?.totalNoOfProducts}</span> items in the cart</p>
          <h1 className="flex justify-between"><span className="font-semibold">products amount</span> {cart?.totalAmount}$</h1>
          <h1 className="flex justify-between"><span className="font-semibold">delivery amount</span> 6$</h1>
          <h1 className="flex justify-between"><span className="font-semibold">total</span>{cart?.totalAmount +6}$</h1>
          
          <div className="flex justify-center pt-3">
            <LinkButton className=' px-[3%] py-[2%] font-semibold bg-transparent border' text="Checkout" direction={"right"} to={"checkout"}>
              <MdNavigateNext />
            </LinkButton>
          </div>
        </Border>
      </div>
    </div>
  )
}

export default CartPage

