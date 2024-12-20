import { selectWishList } from "@/store/Reducers/wishListReducer"
import { TbTag } from "react-icons/tb"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function WishList() {
  const navigate = useNavigate()
  const wishList = useSelector(selectWishList)
  return (
    <div onClick={()=>navigate("dashboard/wishList")} className='relative c4 p-[8%] cursor-pointer '>
      <TbTag />
      <div className='absolute flex justify-center text-xs items-center rounded-full h-4 w-4 top-[-4px] right-[-4px] bg-red-500 text-white '>
          <div className=' translate-y-[1px]'>{wishList.products.length}</div>
      </div>
    </div>
  )
}

export default WishList