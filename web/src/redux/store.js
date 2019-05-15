import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import { initialState as initialSettings } from './reducers/settings';

const persistConfig = {
  key: `settings`,
  version: 1,
  storage: storage,
  whitelist: [`settings`],
  migrate: (state) => {
    return Promise.resolve(
      state
        ? {
            ...state,
            settings: {
              ...initialSettings,
              ...state.settings,
            },
          }
        : state,
    );
  },
};

const loggerConfig = {
  collapsed: true,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const logger = createLogger(loggerConfig);
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export { store, persistor };
