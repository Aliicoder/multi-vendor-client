import { RootState } from '@/store/index'
import { ICart, ICartOrder } from '@/utils/types/types'
import { createSlice } from '@reduxjs/toolkit'

let initialState:ICart = {
  clientId : "",
  orders : [],
  units: [],
  totalNoOfProducts : 0,
  totalAmount : 0,
  status :"active",
}
export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    setActiveCart:(state,action) => {
      let cart = action.payload ; //console.log(" set cart >>",cart)
      state.clientId = cart.clientId;
      state.orders = cart.orders;
      state.units = cart.orders.map((order:ICartOrder) => order.units).flat();
      state.totalNoOfProducts = cart.totalNoOfProducts;
      state.totalAmount = cart.totalAmount;
      state.status = cart.status;
    },
   emptyTheCart:(state)=>{
      state.clientId = "";
      state.orders = [];
      state.units = [];
      state.totalNoOfProducts = 0;
      state.totalAmount = 0;
      state.status = "active";
    }
  },
})
export const { setActiveCart ,emptyTheCart } = cartReducer.actions
export default cartReducer.reducer 
export const selectActiveCart = (state:RootState) => state.cart