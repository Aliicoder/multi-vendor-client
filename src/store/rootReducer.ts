import { apiSlice } from "@/store/api/apiSlice"
import { authReducer } from "./Reducers/authReducer"
import { categoriesReducer } from "./Reducers/categoryReducer"
import { cartReducer  }  from "./Reducers/cartReducer"
import { wishListReducer } from "./Reducers/wishListReducer"
const rootReducer = {
  [apiSlice.reducerPath]:apiSlice.reducer,
  [authReducer.name]:authReducer.reducer,
  [categoriesReducer.name]:categoriesReducer.reducer,
  [cartReducer.name]:cartReducer.reducer,
  [wishListReducer.name]:wishListReducer.reducer
}
export default rootReducer