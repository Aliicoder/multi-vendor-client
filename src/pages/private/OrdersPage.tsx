
import Border from "@/components/borders/Border";
import { useFetchOrdersQuery } from "@/store/apiSlices/orderSlice";
import { IOrder, IUnit } from "@/utils/types/types";

const dateFormatter = (timestamp:string):string =>{
  const options:Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'short', 
    year: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  return new Date(timestamp)
  .toLocaleString('en-US', options)
  .toLowerCase()
  .replace(/,/g, '') 
  .replace(' ', ', ') 
  .replace(/24/, "'24");
}
function OrdersPage() {
  const {data:response} = useFetchOrdersQuery({})
  return (
    <div className='montserrat gap-2 p-6 flex flex-col overflow-y-scroll hide-scrollbar '>
      {
        response?.orders&&response.orders.map((order:IOrder) => (
          <div key={order._id} className="p-[4%]  bg-white rounded-md  border">
            <div className=" c3"> Ordered from {order.shopName}</div>
            <div className="flex items-center justify-between gap-3">
              <h1 className="c5 font-bold">{order._id}</h1>
              <div className="px-[2%] py-[1%] rounded-full c3 bg-slate-100 font-bold">{order.status}</div>
            </div>
            <div className="c3">{dateFormatter(order.createdAt)}</div>
            <div className="c4 ">{order.amount}$</div>

            <div className="flex mt-[2%] overflow-x-scroll hide-scrollbar">
              {
              order?.units.map((unit:IUnit) =>(
                <Border cornerRadius={16}
                  topStyle="m-[2%] basis-3/12 shrink-0 bg-slate-50" 
                  bottomStyle="relative flex flex-col ">
                  <img className="scale-75 aspect-square object-contain" src={unit.productId.media[0].url} alt="" />
                  <div className="bottom-0 p-[2%] line-clamp-1 w-full c3 text-center  absolute ">{unit.productId.name}</div>
              
                </Border>
              ))
              } 
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default OrdersPage

// {
//   cluster.units&&cluster.units.map((unit:any,j)=>{
//     <div key={j} className="flex basis-3/12 gap-3 rounded-md bg-white overflow-hidden border hover:shadow-md transition-all">
//       <div className="basis-1/4 shrink-0 flex justify-center items-center  overflow-hidden">
//         <img className="object-contain " src={unit.productId?.media[0]?.url} alt="" />
//       </div>
//       <div className="flex flex-col justify-center gap-3 pl-6">
//           <h1 className=" font-medium">{unit.productName}</h1>
//           <p className="c2 ">{unit.productId?.description}</p>
//           <div className=" flex gap-1 c2">{productRating(3)}</div>
//           {/* <div className="w-full h-[1px] bg-slate-100"/> */}
//           {/* <h1 className="c2">{product.productId.shopName}</h1> */}
//       </div>
//       <div className="flex ml-auto flex-col justify-between gap-2 p-6 ">
//       <h1 className="text-center">{unit.unitPrice}$</h1>
//         <div className="flex items-center">
//             <div onClick={()=>handleDeleteFromCart(unit.productId._id)} className=" p-2 rounded-full aspect-square border" >
//               <FaMinus />
//             </div>
//             <IconButton className="grow cursor-auto  bg-transparent shadow-none hover:bg-transparent text-black" direction={"right"}>
//               { unit.quantity }
//             </IconButton>
//             <div onClick={()=>handleAddToCart(unit.productId._id)} className="p-2 rounded-full aspect-square border" >
//               <RiAddLine />
//             </div>
//         </div>
//         <a className="c2 hover:underline text-center text-blue-500" href="">show more</a>
//       </div>
//     </div>
//   })
// }