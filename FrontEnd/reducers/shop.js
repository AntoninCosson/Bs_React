import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cartList: [],
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
    }
  },
});

export const { setProducts, setCartList } = shopSlice.actions;
export default shopSlice.reducer;
