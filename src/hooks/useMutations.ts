import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { useAddProductAndFetchMutation, useDeleteProductAndFetchMutation } from "@/store/apiSlices/cartSlice";
import { setActiveCart } from "@/store/Reducers/cartReducer";
import { useDeleteFromWishListMutation, useAddToWishListMutation } from "@/store/apiSlices/wishListSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const usePrivateMutations = () => {
  const { accessToken } = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [addProductAndFetchMutation,{isLoading:isAdded}] = useAddProductAndFetchMutation()
  const [addProductToWishListMutation] = useAddToWishListMutation();
  const [deleteAndFetchMutation,{isLoading:isDeleted}] = useDeleteProductAndFetchMutation()
  const [deleteFromWhishListMutation] = useDeleteFromWishListMutation()
  const addToCart = async (productId:string) =>{
    if(accessToken){
      try{
        const response = await addProductAndFetchMutation({productId}).unwrap()
        dispatch(setActiveCart(response.cart))
        toast.success(response.message)
      }catch(error){}
    }
  }
  const addToWishList = async (productId:string) =>{
    if(accessToken){
      try{
        const response = await addProductToWishListMutation({productId}).unwrap()
        toast.success(response.message)
      }catch(error){}
    }
  }
  const deleteFromWhishList = async (productId:string) =>{
    if(accessToken){
      try{
        const response = await deleteFromWhishListMutation({productId}).unwrap()
        toast.success(response.message)
      }catch(error){}
    }
  }
  const deleteFromCart = async (productId:string) =>{
    if(accessToken){
      try{
        const response = await deleteAndFetchMutation({productId}).unwrap()
        dispatch(setActiveCart(response.cart));
      }catch(error){}
    }
  }
  return {
    addToCart,
    addToWishList,
    deleteFromWhishList,
    deleteFromCart,
    isAdded,
    isDeleted,
  }
}

export default  usePrivateMutations 