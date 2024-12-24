import useMutations from "@/hooks/useMutations";
import Border from "@/components/borders/Border";
import { IProduct } from "@/utils/types/types";
import { useSelector } from "react-redux";
import { selectWishList } from "@/store/Reducers/wishListReducer";
import CustomButton from "@/components/buttons/CustomButton";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function WishListPage() {
  const wishList = useSelector(selectWishList) 
  const navigate = useNavigate()
  const { deleteFromWhishList , addToCart } = useMutations()
  const addProductToCart = (productId:string) =>{
    addToCart(productId)
    deleteFromWhishList(productId)
  }
  return (
    <div className='w-full  p-6 gap-2 | flex flex-col | montserrat overflow-y-scroll hide-scrollbar'>

        <CustomButton onClick={()=>navigate(-1)}
          className="c8 p-6 gap-3 |  flex items-center | bg-white rounded-xl 
          md:hidden" 
          direction="left" text="Wishlist">
          <IoIosArrowBack />
        </CustomButton>

        <div className='basis-full  gap-2 p-6 | flex flex-col overflow-y-scroll hide-scrollbar
          md:9/12'>
        { wishList && wishList?.products?.map((product:IProduct)=> (
          <Border key={product._id} 
            bottomStyle="basis-3/12  gap-3 | shrink-0 flex rounded-md bg-white" 
            cornerRadius={16}>

            <div className="basis-1/4 shrink-0 |  w-full  flex justify-center items-center overflow-hidden">
              <img className="p-4 aspect-square object-contain 
                md:p-10 " src={product.media[0].url} alt="" />
            </div>

            <div className="gap-3 | flex flex-col justify-center 
              md:pl-6">
              <h1 className="w-9/12 c2 | font-semibold">
                {product.name}
              </h1>
              <p className="w-9/12 c2 line-clamp-3 ">
                {product.description}
              </p>
              <h1 className="c2 | font-semibold text-green-500">
                {product.stock > 9 ? " +9 stock" : `${product.stock} stock`} 
              </h1>

              <div className="gap-2 py-1 | flex  ">
              <CustomButton onClick={()=>addProductToCart(product._id)} 
                className="c3 px-3 py-2 gap-3 | flex items-center text-nowrap font-medium border rounded-lg  text-black" text="Add to cart">
              </CustomButton>
              <CustomButton onClick={()=>deleteFromWhishList(product._id)} 
                className="c3 px-3 py-2 gap-3 | flex items-center font-medium text-center border rounded-lg  text-black" text="delete">
              </CustomButton>
              </div>     
            </div>
            
          </Border> 
        ))}
        </div>
    </div>
  )
}

export default WishListPage
