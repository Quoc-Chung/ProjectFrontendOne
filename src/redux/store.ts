import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Client/Auth/AuthReducer";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { cartReducer } from "./Client/CartOrder/CartOrder";
import { brandReducer } from "./Client/Brand/BrandReducer";
import { categoryReducer } from "./Client/Category/CategoryReducer";
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
  // Giảm throttle để persist nhanh hơn (đặc biệt khi login)
  throttle: 100,
};

// Cấu hình persist cho cart reducer
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart'], // Persist field 'cart' (array of cart items)
};

// Cấu hình persist cho brand reducer
const brandPersistConfig = {
  key: 'brand',
  storage,
  whitelist: ['brands', 'lastFetched'], // Lưu brands và thời gian fetch
};

// Cấu hình persist cho category reducer
const categoryPersistConfig = {
  key: 'category',
  storage,
  whitelist: ['categories', 'lastFetched'], // Lưu categories và thời gian fetch
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  brand: persistReducer(brandPersistConfig, brandReducer),
  category: persistReducer(categoryPersistConfig, categoryReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', 
          'persist/REHYDRATE', 
          'persist/PURGE',
          'persist/PAUSE',
          'persist/REGISTER',
        ],
        // Ignore paths trong persist actions để tránh lỗi non-serializable
        ignoredPaths: ['payload.result', 'result'],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
