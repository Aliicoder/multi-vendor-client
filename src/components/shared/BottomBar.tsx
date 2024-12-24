import { HiOutlineTag } from "react-icons/hi2"
import { IoCartOutline } from "react-icons/io5"
import { RiHome5Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { RiHome5Fill } from "react-icons/ri";
import useLastSegment from "@/hooks/useLastSegment"
import { useSelector } from "react-redux"
import { selectActiveCart } from "@/store/Reducers/cartReducer"
import { LuBrainCircuit } from "react-icons/lu";
import { IoCart } from "react-icons/io5";
import { HiTag } from "react-icons/hi2";
import { useEffect, useRef } from "react";
import { trackElementHeight } from "@/utils/functions/resizeTrackers";
function BottomBar() {
  const refBottomBar = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const lastSegment = useLastSegment()
  const cart = useSelector(selectActiveCart)
  useEffect(()=>{
    trackElementHeight(refBottomBar,"--bottomBar-height")
  },[])
  return (
    <div ref={refBottomBar}
      className="p-3 bottom-0 left-0  w-full  | z-40  fixed flex justify-evenly bg-white border-t 
      md:hidden">
        <div onClick={()=>navigate("/home")} className="gap-2  | relative flex flex-col items-center" >
        {
          lastSegment === "home" ?
          <RiHome5Fill className="c9"/>
          :
          <RiHome5Line className="c9"/>
        }
          <h1 className="c5">home</h1>
        </div>
        <div onClick={()=>navigate("/home/cart")} className="gap-2  | relative flex flex-col items-center">
        {
          lastSegment === "cart" ?
          <IoCart className="c9" />
          :
          <IoCartOutline className="c9" />
        }
          <h1 className="c5">cart</h1>
          <div className='top-[-8px] right-[-8px] h-4 w-4 | absolute z-50 flex justify-center items-center | text-xs rounded-full bg-red-500 text-white '>
            <div className=' translate-y-[1px]'>{cart?.units.length}</div>
          </div>
        </div>
        <div onClick={()=>navigate("/home/account/wishlist")} className="gap-2  | flex flex-col items-center">
        {
          lastSegment === "wishlist" ?
          <HiTag className="c9" />
          :
          <HiOutlineTag className="c9" />
        }
          <h1 className="c5">wishList</h1>
        </div>
        <div className="gap-2  | flex flex-col items-center">
          <LuBrainCircuit className="c9" />
          <h1 className="c5">ai</h1>
        </div>
    </div>
  )
}

export default BottomBar