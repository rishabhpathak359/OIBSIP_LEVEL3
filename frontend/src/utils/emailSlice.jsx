import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const emailSlice = createSlice({
  name: 'email',
  initialState: {},
  reducers: {
    sendEmailToAdmin: async (state, action) => {
      try {
        const { itemId, itemName, quantity } = action.payload;
        const response = await axios.post('/email', {
          itemId,
          itemName,
          quantity,
        });
   
        console.log('Email sent successfully:', response.data);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    },
  },
});

export const { sendEmailToAdmin } = emailSlice.actions;
export default emailSlice.reducer;
