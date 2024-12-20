import { RootState } from '@/store/index'
import { IProduct } from '@/utils/types/types'
import { createSlice } from '@reduxjs/toolkit'
interface InitialState {
  products: IProduct[]
}
const initialState:InitialState = {
  products: [],
}
export const wishListReducer = createSlice({
  name: 'wishlist',
  initialState,
  reducers:{
    setWishList:(_,action) => {
      const  wishList  = action.payload ; //console.log("wishList >>",action.payload)
      return wishList
    },
  },
})
export const { setWishList } = wishListReducer.actions
export default wishListReducer.reducer 

export const selectWishList = (state:RootState) => state.wishlist
