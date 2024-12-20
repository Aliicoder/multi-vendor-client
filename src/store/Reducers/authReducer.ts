import { RootState } from '@/store/index'
import { IAddress, IMedia } from '@/utils/types/types';
import { createSlice } from '@reduxjs/toolkit'
export interface InitialState {
  userId: string
  name: string
  media: IMedia
  roles: number[]
  accessToken:string
  addresses:IAddress[]
}
let initialState : InitialState = {
    userId:"",
    name:"",
    media:{
      url:"",
      public_id:""
    },
    roles:[0],
    accessToken:"",
    addresses:[]
}
export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    setCredentials:(_,action) => {
      const  user   = action.payload ; console.log("set credentials >>",action.payload)
      return user
    },
    setAddresses:(state,action) => {
      const  addresses   = action.payload ; console.log("set addresses >>",action.payload)
      state.addresses = addresses
    },
    logout:(_) =>{
      return initialState
    }
  },
})
export const {
  setCredentials,
  setAddresses,
  logout
} = authReducer.actions
export default authReducer.reducer 
export const selectCurrentUser = (state:RootState) => state.auth

