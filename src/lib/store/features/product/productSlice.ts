import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  items: string[];
}

const initialState: ProductState = {
  items: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = ProductSlice.actions;

export default ProductSlice.reducer;
