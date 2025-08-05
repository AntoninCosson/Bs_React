import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cartList: [],
  cartTimeLeft: 0,
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCartList: (state, action) => {
      state.cartList.push(action.payload);
    },
    clearCart: (state) => {
      state.cartList = [];
    },
    cartTimeLeft: (state, action) => {
      state.products = action.payload;
    },
    resetShop: () => initialState,
  },
});

export const { setProducts, setCartList, clearCart, cartTimeLeft, resetShop } = shopSlice.actions
export default shopSlice.reducer
