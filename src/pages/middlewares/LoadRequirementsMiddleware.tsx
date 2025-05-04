import { Outlet } from "react-router-dom";
import { useGetUserWishListQuery } from "@/store/apiSlices/wishListSlice";
import { setWishList } from "@/store/Reducers/wishListReducer";
import { useGetUserActiveCartQuery } from "@/store/apiSlices/cartSlice";
import { setActiveCart } from "@/store/Reducers/cartReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function LoadRequirements() {
  const dispatch = useDispatch();
  const { data: cartResponse } = useGetUserActiveCartQuery({});
  const { data: wishListResponse } = useGetUserWishListQuery({});

  useEffect(() => {
    if (cartResponse?.cart) dispatch(setActiveCart(cartResponse?.cart));
  }, [cartResponse]);

  useEffect(() => {
    if (wishListResponse?.wishList) {
      dispatch(setWishList(wishListResponse?.wishList));
    }
  }, [wishListResponse]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default LoadRequirements;
