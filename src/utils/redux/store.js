import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import viewConfigReducer from "./ViewConfigSlice/index.slice";

export const CLEAR_STATE = "CLEAR_STATE";

export const clearState = () => ({
  type: CLEAR_STATE,
});

const RootReducer = combineReducers({
  viewConfig: viewConfigReducer,
});

const encryptor = encryptTransform({
  secretKey: `Phoenix-storage`,
  onError: (error) => {
    console.log(error);
  },
});

const persistConfig = {
  key: "Phoenix",
  storage,
  whitelist: ["viewConfig"], // Only persist the "auth" slice of the state
  transforms: [encryptor], // Apply encryption transform to persisted data
};

const appReducer = (state, action) => {
  if (action.type === CLEAR_STATE) {
    state = undefined;
  }
  return RootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configure middleware to ignore certain actions during serialization
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: "" !== "production", // Enable Redux DevTools in development
});

export default store;

export const Persistor = persistStore(store);
