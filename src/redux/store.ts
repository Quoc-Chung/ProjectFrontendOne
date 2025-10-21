import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Client/Auth/AuthReducer";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { cartReducer } from "./Client/CartOrder/CartOrder";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// Cấu hình persist cho auth reducer - chỉ persist những field cần thiết
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isLogin', 'roleNames'], // Chỉ persist những field cần thiết
  // Thêm transform để tối ưu hóa
  transforms: [],
  // Thêm throttle để giảm số lần write
  throttle: 1000,
};

// Cấu hình persist cho cart reducer
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'totalPrice'] // Chỉ persist những field cần thiết
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
