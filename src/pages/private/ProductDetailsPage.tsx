import IconButton from "@/components/buttons/IconButton"
import { useEstablishChatMutation } from "@/store/apiSlices/chatSlice"
import { useFetchProductQuery } from "@/store/apiSlices/productSlice"
import { productRating } from "@/utils/functions/rating"
import { useState } from "react"
import toast from "react-hot-toast"
import {  RiShareForwardLine } from "react-icons/ri"
import {  useNavigate, useParams } from "react-router-dom"

function ProductDetailsPage() {
  const { productId } = useParams() ; 
  const navigate = useNavigate()  
  const {data:response} = useFetchProductQuery({productId}) ; //console.log("product >>",response)
  const [establishChatMutation] = useEstablishChatMutation()
  const [activeNav,setActiveNav] = useState("reviews")
  const handleStartChat = async (sellerId:string) =>
  {
    try {
      const response = await establishChatMutation({sellerId}).unwrap(); //console.log("chat establish response >>",response)
      toast.success(response.message)
      navigate(`/sellersChats/${response.chatId}`,{})
    } catch (error:any) { //console.log("error >>",error) 
      toast.error(error.message ?? "try again later")
    }
  }
  return (
    <div className='flex flex-col container mx-auto  gap-2'>
      <div className="flex container mx-auto m-6 bg-white border rounded-md">
        <div className='basis-4/12 flex flex-col bg-white '>
          <div className='overflow-hidden aspect-square flex justify-items-center content-center p-4'>
            <img className='object-cover w-full h-full rounded-md ' loading="lazy" src={response?.product?.media[0]?.url} alt="" />
          </div>
        </div>

        <div className='basis-9/12 flex flex-col gap-2 p-6'>
          <div className="flex justify-end">
            <div className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
              <RiShareForwardLine />
            </div>
          </div>
          
          <h1 className="font-medium c5">{response?.product?.name}</h1>
          <p>{response?.product?.description}</p>
          <h1 className=" font-semibold p2">${response?.product?.price}</h1>
          <div className='flex gap-1 items-center  '>{productRating(4)} <span className="mx-2 text-green-500 ">(32 reviews)</span></div>
          <div className="flex gap-[2%] py-[6%]  ">
            <IconButton className="font-semibold  bg-transparent border py-[1%] px-[2%] text-black" text="Buy Now" direction={"right"} >
            </IconButton>
            <IconButton className="py-[1%] px-[2%]" text="Add to Cart " direction={"right"}>
            </IconButton>
          </div>
          <h1 className="text-green-500">{response?.product?.stock} in Stock</h1>
          <h1 className="flex gap-2">
            {response?.product.shopName} | <div onClick={()=>handleStartChat(response?.product?.sellerId)} className="text-blue-500 hover:underline cursor-pointer">chat with seller</div>
          </h1>
        </div>
      </div>
      <div>
        <ul className="flex gap-2 transition-all">
          <li onClick={()=>setActiveNav("reviews")} className={`${activeNav == "reviews" ? "bg-white border":""} p-3 py-1 rounded-md`}>Reviews</li>
          <li onClick={()=>setActiveNav("details")} className={`${activeNav == "details" ? "bg-white":""} p-3 py-1  border rounded-md`}>Details</li>
          <li onClick={()=>setActiveNav("shop")} className={`${activeNav == "shop" ? "bg-white border":""} p-3 py-1  border rounded-md`}>Shop</li>
        </ul>
      </div>
      <div className="flex flex-col border bg-white rounded-md p-6">
        <div className="flex gap-6 p-6">
          <div className="flex flex-col gap-2">
            <div><span className="c9 ">3 /</span > <span className="c7">5</span></div>
            <div><span className=" text-green-500 ">32 reviews</span></div>
            <div className="flex gap-1 c2">{productRating(5)}</div> 
          </div>
          <div className="flex flex-col gap-3">
           <div className="flex items-center gap-3">
            <div>59</div>
            <div className="h-2 border rounded-md w-[300px]" >
              <div className="w-[90%] h-full bg-yellow-500" /> 
            </div>
            <div className="flex gap-1 c2">{productRating(4)}</div>
           </div>
           <div className="flex items-center gap-3">
            <div>12</div>
            <div className="h-2 border rounded-md w-[300px]" >
              <div className="w-[90%] h-full bg-yellow-500" /> 
            </div>
            <div className="flex gap-1 c2">{productRating(3)}</div>
           </div>
           <div className="flex items-center gap-3">
            <div>19</div>
            <div className="h-2 border rounded-md w-[300px]" >
              <div className="w-[90%] h-full bg-yellow-500" /> 
            </div>
            <div className="flex gap-1 c2">{productRating(2)}</div>
           </div>
           <div className="flex items-center gap-3">
            <div>15</div>
            <div className="h-2 border rounded-md w-[300px]" >
              <div className="w-[90%] h-full bg-yellow-500" /> 
            </div>
            <div className="flex gap-1 c2">{productRating(1)}</div>
           </div>
           <div className="flex items-center gap-3">
            <div>11</div>
            <div className="h-2 border rounded-md w-[300px]" >
              <div className="w-[90%] h-full bg-yellow-500" /> 
            </div>
            <div className="flex gap-1 c2">{productRating(0)}</div>
           </div>
          </div>
        </div>
        <h1 className="font-semibold">Customer Reviews</h1>
        <div className="flex flex-col gap-1 p-6">
            <h1>Salem ahmed</h1>
            <div className="flex gap-1 c2">{productRating(4)}</div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident voluptas consequuntur corrupti odit et eveniet libero? Officia magnam mollitia accusantium voluptatem harum nobis natus? Nemo temporibus veniam nesciunt rem quaerat!
            </p>
        </div>
        <div className="flex flex-col gap-1 p-6">
            <h1>Salem ahmed</h1>
            <div className="flex gap-1 c2">{productRating(4)}</div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident voluptas consequuntur corrupti odit et eveniet libero? Officia magnam mollitia accusantium voluptatem harum nobis natus? Nemo temporibus veniam nesciunt rem quaerat!
            </p>
        </div>
        <div className="flex justify-center">
          <h1 className="text-blue-500 hover:underline cursor-pointer">Show more reviews</h1>
        </div>
      </div>

    </div>
  )
}

export default ProductDetailsPage