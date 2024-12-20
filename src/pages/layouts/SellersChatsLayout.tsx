import useSegment from "@/hooks/useSegment";
import { socket } from "@/lib/socket";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { useFetchChatsQuery } from "@/store/apiSlices/chatSlice";
import { IClientChat } from "@/utils/types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"

function SellersChatsLayout() {
  const {data:response} = useFetchChatsQuery({}); console.log("chats",response)
  const [activeSellers,setActiveSellers] = useState<any[]>([])
  const navigate = useNavigate()
  const activeClientInfo = useSelector(selectCurrentUser)
  const secondSegment = useSegment(2)
  useEffect(()=>{
    if(response?.chats){
      socket.connect()
      socket.emit("client>>Connect",activeClientInfo,response?.chats)
    }
    return () =>{
      socket.disconnect()
    }
  },[response?.chats])
  useEffect(()=>{
    const handleReceivingSellerAndSendingClientInfoThrowSellerSocket = (activeSellerInfo:any,activeSellerSocketId:any)=>{
      let isSellerExists = activeSellers.some((seller:any)=>(seller.userId === activeSellerInfo.userId))
      if(!isSellerExists)
        setActiveSellers((prev:any) =>[...prev,activeSellerInfo])
      socket.emit("client>>SynAck>>seller",activeClientInfo,activeSellerSocketId)
    }
    const handleReceivingSellerInfo = (activeSellerInfo:any)=>{ //console.log(" activeSellerInfo >>",activeSellerInfo)
      let isSellerExists = activeSellers.some((seller:any)=>(seller.userId === activeSellerInfo.userId))
      if(!isSellerExists)
        setActiveSellers((prev:any) =>[...prev,activeSellerInfo])
    }
    const handleDisconnectedSeller = (userId:any)=>{
      const filteredSellers = activeSellers.filter((seller:any)=> seller.userId != userId)
      setActiveSellers(filteredSellers); //console.log(`user ${userId} disconnected`)
    }
    socket.on("seller>>Syn>>client",handleReceivingSellerAndSendingClientInfoThrowSellerSocket)
    socket.on("client<<Ack<<seller",handleReceivingSellerInfo)
    socket.on("disconnected",handleDisconnectedSeller)
    return () =>{
      socket.off("seller>>Syn>>client",handleReceivingSellerAndSendingClientInfoThrowSellerSocket)
      socket.off("client>>SynAck>>seller")
      socket.off("client<<Ack<<seller",handleReceivingSellerInfo)
      socket.off("disconnected",handleDisconnectedSeller)
    }
  },[])

  useEffect(()=>{
    console.log("activeSellers >>",activeSellers)
  },[activeSellers])
  return (
  <div className='flex montserrat  w-full h-full'>
    <div className='flex border-r flex-col basis-3/12 bg-slate-100 ' >

      <div>
        <h1 className='font-bold p-[6%] c3'>Chats</h1>
      </div>

      <div className='flex flex-col'>
        {
          response?.chats&&response?.chats.map((chat:IClientChat)=>(
            <div key={chat._id}
              onClick={()=>navigate(`/sellersChats/${chat._id}`,{state:{chat}})} 
              className={` ${secondSegment == chat._id ? "bg-white" : ""}
                flex basis-3/12 justify-center hover:bg-slate-200  items-center gap-3 `}>
                <div className={` basis-3/12 scale-75 aspect-square  `}>
                  <div className={` 
                       ${
                  activeSellers.find((seller)=> seller.userId == chat.seller._id) ?
                     "bg-green-300" 
                    :
                      "bg-red-300" 

                    }
                      h-full rounded-full p-[3%]`}>
                    <img className='w-full h-full object-cover rounded-full' src={chat?.seller?.avatar || "/fb.jpg"} alt="" />
                  </div>
                </div>       
              <div>
                <h1 className='c3 font-bold'>{chat?.seller?.businessName}</h1>
              </div>
            </div>
          ))
        }
      </div>

    </div>
    <Outlet />
  </div>
  )
}

export default SellersChatsLayout


