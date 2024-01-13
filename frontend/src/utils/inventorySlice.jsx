import {createSlice } from "@reduxjs/toolkit";
import { Inventory } from "../data/pizzaInventory";
import { sendEmailToAdmin } from "./emailSlice";
import axios from "axios";
const sendEmailToAdminApi = async ({itemName,quantity}) => {
  try {
    const response = await axios.post('/email', {
      itemName,
      quantity,
    });

    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
const inventorySlice=createSlice({
    name:"inventory",
    initialState:{
        items:Inventory,
    },
    reducers:{
   updateInventory:(state,action)=>{
    const { updatedInventory, itemUpdated } = action.payload;
    console.log(action.payload)
    state.items = updatedInventory;
    if (itemUpdated.quantity <=5)  {
      sendEmailToAdminApi({
        itemName: itemUpdated.name,
        quantity: itemUpdated.quantity,
      });
    }
   },
   removeitem: (state, action) => {
    const index = state.items.findIndex((item) => item.name === action.payload);
    if (index !== -1) {
      const removedItem = state.items[index];
        state.items.splice(index, 1);
    }

  },
    }
})
export const{updateInventory,removeitem}=inventorySlice.actions;
export default inventorySlice.reducer;

export const inventoryItems = (state) => state.inventory.items;