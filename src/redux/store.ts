import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Client/Auth/AuthReducer";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { cartReducer } from "./Client/CartOrder/CartOrder";
import { brandReducer } from "./Client/Brand/BrandReducer";
import { categoryReducer } from "./Client/Category/CategoryReducer";
import { orderReducer } from "./Client/Order/Order";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isLogin', 'roleNames'], 
  transforms: [],
  throttle: 100,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart'], 
};
const brandPersistConfig = {
  key: 'brand',
  storage,
  whitelist: ['brands', 'lastFetched'], 
};

const categoryPersistConfig = {
  key: 'category',
  storage,
  whitelist: ['categories', 'lastFetched'],
};

const orderPersistConfig = {
  key: 'order',
  storage,
  whitelist: ['orders', 'currentOrder'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  brand: persistReducer(brandPersistConfig, brandReducer),
  category: persistReducer(categoryPersistConfig, categoryReducer),
  order: persistReducer(orderPersistConfig, orderReducer),
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
