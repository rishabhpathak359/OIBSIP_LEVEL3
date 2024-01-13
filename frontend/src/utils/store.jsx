// store.jsx
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartslice from './cartSlice';
import userSlice from './userSlice';
import inventorySlice from './inventorySlice';
import orderSlice from './orderSlice';
import emailSlice from './emailSlice';

const rootReducer =combineReducers ({
  cart: cartslice,
  user: userSlice,
  inventory : inventorySlice,
  order : orderSlice,
  email:emailSlice
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
