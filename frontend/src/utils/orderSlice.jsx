import { createSlice } from "@reduxjs/toolkit";
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: {},
  },
  reducers: {
    addorder: (state, action) => {
      const { payload } = action;
      const { _id, ...order } = payload;
      console.log(payload);
      if (!state.orders[_id]) {
        state.orders[_id] = [];
      }
      state.orders[_id].push({
        ...order,
        order_status: "Pending", 
        deliveryTime: null,
      });
    },
    updateorder: (state, action) => {
      const { userId, orderId, order_status, deliveryTime } = action.payload;
      const userOrders = state.orders[userId];
      console.log(userOrders)
      if (userOrders) {
        const updatedOrders = userOrders.map((order) =>
          order.id === orderId ? { ...order, order_status, deliveryTime } : order
        );
    
        state.orders[userId] = updatedOrders;
      }
    },
    clearorder: (state, action) => {
      const { userId } = action.payload;
      state.orders[userId] = [];
    },
  },
});

export const { addorder, clearorder, updateorder } = orderSlice.actions;
export default orderSlice.reducer;

export const UserOrder = (state) => state.order.orders;
