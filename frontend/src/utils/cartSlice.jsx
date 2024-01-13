// cartSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: {},
  },
  reducers: {
    additem: (state, action) => {
      const { _id,...item } = action.payload;
      console.log(action.payload)
      if (!state.carts[_id]) {
        state.carts[_id] = [];
      }
      state.carts[_id].push(item);
    },
    removeitem: (state, action) => {
      const { _id, itemName } = action.payload;
      if (state.carts[_id]) {
        state.carts[_id] = state.carts[_id].filter(cartItem => cartItem.name !== itemName); 
      }
    },
    clearcart: (state, action) => {
      const { _id } = action.payload;
      if (state.carts[_id]) {
        state.carts[_id] = [];
      }
    },
  },
});

export const { additem, removeitem, clearcart } = cartSlice.actions;
export default cartSlice.reducer;
