import { RootState } from '@/store/index'
import { createSlice } from '@reduxjs/toolkit'
export interface UserParams {
  categories: string[]
}
export const categoriesReducer = createSlice({
  name: 'categories',
  initialState:[],
  reducers:{
    setCategories:(_,action) => {
      const  categories  = action.payload ; //console.log("categories >>",action.payload)
      return categories
    },
  },
})
export const {setCategories} = categoriesReducer.actions
export default categoriesReducer.reducer 
export const selectCategories = (state:RootState) => state.categories
