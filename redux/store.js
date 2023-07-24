import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import productReducer from './ProductSlice';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types

        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],

        // Ignore these paths in the state

        ignoredPaths: ['items.dates'],

        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// // store.js
// import {configureStore} from '@reduxjs/toolkit';
// import productReducer from './ProductSlice';

// const store = configureStore({
//   reducer: {
//     products: productReducer,
//     // Add other reducers if needed
//   },
// });

// export default store;
