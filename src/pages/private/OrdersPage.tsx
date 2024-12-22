
import Border from "@/components/borders/Border";
import CustomButton from "@/components/buttons/CustomButton";
import { useFetchOrdersQuery } from "@/store/apiSlices/orderSlice";
import dateFormatter from "@/utils/functions/dateFormatter";
import { IOrder, IUnit } from "@/utils/types/types";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const navigate= useNavigate()
  const {data:response} = useFetchOrdersQuery({})
  return (
    <div className='montserrat gap-2 p-6 flex flex-col overflow-y-scroll hide-scrollbar '>
      <CustomButton onClick={()=>navigate(-1)}
        className="c8 p-6 gap-3 |  flex items-center | bg-white rounded-xl 
        md:hidden" 
        direction="left" text="your orders">
        <IoIosArrowBack />
      </CustomButton>

      { response?.orders&&response.orders.map((order:IOrder) => (

      <div key={order._id} className="p-[4%]  bg-white rounded-md  border">
        <div className=" c3"> Ordered from {order.shopName}</div>
        <div className="flex items-center justify-between gap-3">
          <h1 className="c5 font-bold">{order._id}</h1>
          <div className="px-[2%] py-[1%] rounded-full c3 bg-slate-100 font-bold">{order.status}</div>
        </div>
        <div className="c3">{dateFormatter(order.createdAt)}</div>
        <div className="c4 ">{order.amount}$</div>

        <div className="flex mt-[2%] overflow-x-scroll hide-scrollbar">
        { order?.units.map((unit:IUnit) =>(
          <Border cornerRadius={16}
            topStyle="m-[2%] basis-3/12 shrink-0 bg-slate-50" 
            bottomStyle="relative flex flex-col ">
            <img className="scale-75 aspect-square object-contain" src={unit.productId.media[0].url} alt="" />
            <div className="bottom-0 p-[2%] line-clamp-1 w-full c3 text-center  absolute ">{unit.productId.name}</div>
        
          </Border>
        ))} 
        </div>
      </div>
      ))}
    </div>
  )
}

export default OrdersPage

