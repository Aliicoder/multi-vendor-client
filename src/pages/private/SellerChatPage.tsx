import IconButton from "@/components/buttons/IconButton"
import { Form, FormControl, FormField, FormItem,  FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router-dom"
import { z } from "zod"
import { RiSendPlaneFill } from "react-icons/ri";
import { useAddMessageMutation, useFetchChatMessagesQuery } from "@/store/apiSlices/chatSlice"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/store/Reducers/authReducer"
import { IMessage } from "@/utils/types/types"
import { useEffect, useState } from "react"
import { socket } from "@/lib/socket"
const formSchema = z.object({
  message: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
function SellerChatPage() {
  const { userId } = useSelector(selectCurrentUser) ; console.log("userId >>",userId)
  const { chat } = useLocation().state ; console.log("chat >>",chat)
  const [liveMessages,setLiveMessages] = useState<IMessage[]>([])
  const { chatId }  = useParams(); //console.log("chat id ",chatId)
  const { data:response } = useFetchChatMessagesQuery({chatId}); //console.log("messages response",response)
  const [addMessageMutation] = useAddMessageMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })
  useEffect(()=>{
    if(liveMessages && liveMessages.length > 0)
    socket.emit("client>>SendMessage>>seller",liveMessages[liveMessages.length - 1]);
    return () =>{
      socket.off("client>>SendMessage>>seller")
    }
  },[liveMessages])
  useEffect(()=>{
    const receiveMessage = (message:any)=>{
      setLiveMessages((prev:any)=>[...prev,message])
    }
    socket.on("client<<ReceiveMessage<<seller",receiveMessage)
    return () =>{
      socket.off("client<<ReceiveMessage<<seller",receiveMessage)
    }
  },[])
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      let message =  {
        chatId,
        message:values.message,
        receiverId:chat.seller._id,
        senderId:userId
      }
      await addMessageMutation(message).unwrap(); console.log("add message response",response)
      setLiveMessages((prev:any)=>[...prev,message])
    }catch(error){ console.log("add message error",error) 
    }
  }
  return (
  <div className='flex  flex-col justify-end  basis-9/12  p-[6%] pt-0 '>

    <div id="chat" className='flex flex-col pb-[3%] '>
     <>
        {
          response?.messages && response?.messages?.length > 0 &&
          response?.messages.map((messageInfo:IMessage)=>
            (
              <div key={messageInfo._id} className={`flex ${messageInfo?.senderId == userId ? "flex-row-reverse" : "" } `}>
                <div className={`  
                  p-[1%] m-3 rounded-md bg-slate-100 w-fit max-w-[50%]  text-wrap   `}>
                     {messageInfo?.message}
                </div>
              </div>
            ))
        }
     </>
    </div>
    <>
        {
          liveMessages && liveMessages.map((messageInfo:IMessage)=>
            (
              <div key={messageInfo._id} className={`flex ${messageInfo?.senderId == userId ? "flex-row-reverse" : "" } `}>
                <div className={`  
                   m-3 rounded-md bg-slate-100 w-fit max-w-[50%]  `}>
                    {messageInfo?.message}
                </div>
              </div>
            ))
        }
    </>
    <div className="">
      <Form {...form}>
        <form id="message-input"  onSubmit={form.handleSubmit(onSubmit)} className="flex  gap-[3%]">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input className="bg-white" placeholder="Type here ..." {...field} />
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
  
          <IconButton className="!h-full" text=" Send" type="submit" direction={"right"}>
            <RiSendPlaneFill />
          </IconButton>
        </form>
      </Form>
    </div>
  </div>
  )
}

export default SellerChatPage