import { Outlet } from "react-router-dom"
import { useGetWishListQuery } from "@/store/apiSlices/wishListSlice";
import { setWishList } from "@/store/Reducers/wishListReducer";
import { useFetchActiveCartQuery } from "@/store/apiSlices/cartSlice";
import { setActiveCart } from "@/store/Reducers/cartReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function LoadCartAndWishlistMiddleware() {
  const dispatch = useDispatch()  
  const { data:cartResponse } = useFetchActiveCartQuery({}) 
  const { data:wishListResponse } = useGetWishListQuery({})
  
  useEffect(()=>{   
    if(cartResponse?.cart)
      dispatch(setActiveCart(cartResponse?.cart)); 
  },[cartResponse])

  useEffect(()=>{   
    if(wishListResponse?.wishList)
      dispatch(setWishList(wishListResponse?.wishList)); 
  },[wishListResponse]) 
  return (
    <>
      <Outlet />
    </>
  )
}

export default LoadCartAndWishlistMiddleware