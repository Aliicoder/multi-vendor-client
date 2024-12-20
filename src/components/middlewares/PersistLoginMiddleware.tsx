import { Outlet } from "react-router-dom"
import { selectCurrentUser, setCredentials } from "@/store/Reducers/authReducer";
import { useFetchActiveCartQuery } from "@/store/apiSlices/cartSlice";
import { setActiveCart } from "@/store/Reducers/cartReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useRefreshMutation } from "@/store/apiSlices/authSlice";
import { useGetWishListQuery } from "@/store/apiSlices/wishListSlice";
import { setWishList } from "@/store/Reducers/wishListReducer";
function PersistLoginMiddleware() { 
  const { accessToken } = useSelector(selectCurrentUser) ; 
  const [ refresh ] = useRefreshMutation();
  const [isLoading,setIsLoading] = useState(true)
  const { data:cartResponse } = useFetchActiveCartQuery({},{ skip: !accessToken }) 
  const { data:wishListResponse } = useGetWishListQuery({},{ skip: !accessToken }) ; //console.log("wishList >>",wishListResponse)
  const dispatch = useDispatch()  
  const navigate = useNavigate()
  const { state } = useLocation() ; 
  useEffect(()=>{
    const refreshUser = async () =>{
      try{
        let response = await refresh({}).unwrap() 
        dispatch(setCredentials(response.user))

        if(state?.from)
          navigate(state.from)

      }catch(error){}finally{
        setIsLoading(false)
      }
    }  
    refreshUser()
  },[])

  useEffect(()=>{   
    if(cartResponse?.cart)
      dispatch(setActiveCart(cartResponse?.cart)); 
  },[cartResponse,accessToken])

  useEffect(()=>{   
    if(wishListResponse?.wishList)
      dispatch(setWishList(wishListResponse?.wishList)); 
  },[wishListResponse,accessToken])
  return (
    <>
      { 
        isLoading ? 
        null 
        : 
        <Outlet />
      }
    </>
  )
}

export default PersistLoginMiddleware