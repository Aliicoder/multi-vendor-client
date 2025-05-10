import { RootState } from "@/store/index";
import { ICart, ICartOrder } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

let initialState: ICart = {
  clientId: "",
  orders: [],
  units: [],
  totalNoOfProducts: 0,
  totalAmount: 0,
  status: "active",
};
export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setActiveCart: (state, action) => {
      let cart = action.payload;
      state.clientId = cart.clientId;
      state.orders = cart.orders;
      state.units = cart.orders.flatMap((order: ICartOrder) => order.units);
      state.totalAmount = cart.totalAmount;
      state.status = cart.status;
    },
    emptyTheCart: (_) => {
      return initialState;
    },
  },
});
export const { setActiveCart, emptyTheCart } = cartReducer.actions;
export default cartReducer.reducer;
export const selectActiveCart = (state: RootState) => state.cart;
