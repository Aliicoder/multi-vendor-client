import IconButton from "@/components/buttons/IconButton"
import useMutations from "@/hooks/useMutations";
import Border from "@/components/borders/Border";
import { IProduct } from "@/utils/types/types";
import { useSelector } from "react-redux";
import { selectWishList } from "@/store/Reducers/wishListReducer";
function WishListPage() {
  const wishList = useSelector(selectWishList) ; console.log("wishList",wishList)
  const { deleteFromWhishList , addToCart } = useMutations()
  const addProductToCart = (productId:string) =>{
    addToCart(productId)
    deleteFromWhishList(productId)
  }
  return (
    <div className='montserrat p-6 gap-2  flex flex-col overflow-y-scroll hide-scrollbar'>
      <h1 className="font-semibold c3 p-6 "> Wish list</h1>
      {
        wishList ?
          wishList?.products?.map((product:IProduct)=> (
          <Border key={product._id} 
            topStyle=""
            bottomStyle="flex basis-3/12 shrink-0  gap-3 rounded-md bg-white overflow-hidden hover:shadow-md transition-all" 
            cornerRadius={16}>

            <div className="basis-1/4 shrink-0 flex justify-center items-center w-full overflow-hidden">
              <img className="p-[20%] aspect-square object-contain " src={product?.media[0]?.url} alt="" />
            </div>

            <div className="flex flex-col justify-center gap-3 pl-6">
              <h1 className="c2 font-semibold">{product.name}</h1>
              <p className="c2 w-3/4 line-clamp-3 text-balance ">{product.description}</p>
              <h1 className="c2 my-3 font-semibold">{product.price}$</h1>

              <div className="gap-3 flex items-center">
                <IconButton 
                  className="bg-white text-black shadow-none border hover:bg-white "
                  text="Add To Cart" onClick={()=>addProductToCart(product._id)} direction={"right"}>
                </IconButton>
                <IconButton text="Delete" onClick={()=>deleteFromWhishList(product._id)} direction={"right"}>
                </IconButton>
              </div>
            </div>
          </Border>
          
          ))
          :
          <div>no products in the wishList yet</div>
      }
    </div>
  )
}

export default WishListPage
