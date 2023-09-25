import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export const { addToCart } = cartSlice.actions;
export const cartState = (state) => state.cart;
export default cartSlice.reducer;
