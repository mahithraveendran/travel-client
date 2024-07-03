import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import baseApi from "./API/baseApi";
import adminTripManagementReducer from "./Feature/admin/trips/adminTripManagementSlice";
import usersManagementReducer from "./Feature/admin/users/usersManagementSlice";
import { authReducers } from "./Feature/auth/authSlice";
import tripReducer from "./Feature/trip/tripSlice";

// create noop storage
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// create storage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// persist configuration
const authPersistConfig = {
  key: "auth",
  storage: storage,
};

// persisted reducer
const persistedReducer = persistReducer(authPersistConfig, authReducers);

// root reducer
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistedReducer,
  trip: tripReducer,
  userManagement: usersManagementReducer,
  adminTripManagement: adminTripManagementReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Add the api middleware
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
