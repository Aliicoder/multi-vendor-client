import { RootState } from "@/store/index";
import { IAuthState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

let initialState: IAuthState = {
  userId: "",
  name: "",
  email: "",
  accessToken: "",
  addresses: [],
};
export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (_, action) => {
      const user = action.payload;
      console.log("setCredentials ", user);
      return user;
    },
    setAddresses: (state, action) => {
      const addresses = action.payload;
      state.addresses = addresses;
    },
    logout: (_) => {
      return initialState;
    },
  },
});
export const { setCredentials, logout, setAddresses } = authReducer.actions;
export default authReducer.reducer;
export const selectCurrentUser = (state: RootState) => state.auth;
