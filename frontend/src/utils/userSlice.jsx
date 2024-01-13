import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users.splice(action.payload, 1);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

// Selector to check if the user is signed in
export const selectUser = (state) => state.user;

export const selectIsUserSignedIn = (state) => {
  const userState = selectUser(state);
  return userState.users.length > 0; // Adjust based on your actual user state structure
};
