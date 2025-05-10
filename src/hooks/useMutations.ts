import { errorToast, successToast } from "@/lib/utils";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { setActiveCart } from "@/store/Reducers/cartReducer";
import {
  useAddToCartMutation,
  useDeleteFromCartMutation,
} from "@/store/apiSlices/cartSlice";
import {
  useDeleteFromWishListMutation,
  useAddToWishListMutation,
} from "@/store/apiSlices/wishListSlice";
import { useDispatch, useSelector } from "react-redux";

const usePrivateMutations = () => {
  const { accessToken } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [addToCartMutation, { isLoading: isAddedToCart }] =
    useAddToCartMutation();

  const [deleteFromCartMutation, { isLoading: isDeletedFromCart }] =
    useDeleteFromCartMutation();

  const [addProductToWishListMutation, { isLoading: isAddedToWishList }] =
    useAddToWishListMutation();
  const [deleteFromWhishListMutation, { isLoading: isDeletedFromWishList }] =
    useDeleteFromWishListMutation();

  const addToCart = async (productId: string) => {
    if (accessToken) {
      try {
        const response = await addToCartMutation({
          productId,
        }).unwrap();
        dispatch(setActiveCart(response.cart));
        successToast(response.message);
      } catch (error: any) {
        errorToast(error.data.message);
      }
    }
  };
  const deleteFromCart = async (productId: string) => {
    if (accessToken) {
      try {
        const response = await deleteFromCartMutation({ productId }).unwrap();
        dispatch(setActiveCart(response.cart));
        successToast(response.message);
      } catch (error: any) {
        errorToast(error.data.message);
      }
    }
  };
  const addToWishList = async (productId: string) => {
    if (accessToken) {
      try {
        const response = await addProductToWishListMutation({
          productId,
        }).unwrap();
        console.log("added from wishlist ", response);
        successToast(response.message);
      } catch (error: any) {
        errorToast(error.data.message);
      }
    }
  };
  const deleteFromWhishList = async (productId: string) => {
    if (accessToken) {
      try {
        const response = await deleteFromWhishListMutation({
          productId,
        }).unwrap();
        console.log("deleted from wishlist ", response);
        successToast(response.message);
      } catch (error: any) {
        errorToast(error.data.message);
      }
    }
  };

  return {
    addToCart,
    deleteFromCart,
    addToWishList,
    deleteFromWhishList,
    isAddedToCart,
    isDeletedFromCart,
    isAddedToWishList,
    isDeletedFromWishList,
  };
};

export default usePrivateMutations;
