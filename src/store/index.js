import { configureStore } from '@reduxjs/toolkit';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tripReducer from './slices/tripSlice';
import uiReducer from './slices/uiSlice';

let persistStorage;

// Xử lý SSR
if (typeof window === 'undefined') {
  const createNoopStorage = () => {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  };
  persistStorage = createNoopStorage();
} else {
  persistStorage = storage;
}

// Transform để xử lý dữ liệu trước khi persist
const persistTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState) => {
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState) => {
    return outboundState;
  }
);



const uiPersistConfig = {
  key: 'ui',
  storage: persistStorage,
  whitelist: ['theme', 'sidebarOpen'],
  transforms: [persistTransform],
};

const tripPersistConfig = {
  key: 'trips',
  storage: persistStorage,
  whitelist: ['trips', 'filteredTrips', 'cache'],
  blacklist: ['loading', 'error', 'loadingTripIds'], // Thêm blacklist
  transforms: [persistTransform],
};


const persistedUiReducer = persistReducer(uiPersistConfig, uiReducer);
const persistedTripReducer = persistReducer(tripPersistConfig, tripReducer);

export const store = configureStore({
  reducer: {
    ui: persistedUiReducer,
    trips: persistedTripReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
