import { persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer, themeReducer, countriesReducer } from '.'

const rootStore = combineReducers({
	auth: authReducer,
	theme: themeReducer,
	countries: countriesReducer,
})

const persistConfig = {
  key: 'root',
	storage,
	blacklist: ['offsetY'],
};

const persistedReducer = persistReducer(persistConfig, rootStore)

export const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;