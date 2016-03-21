import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducers from './modules/reducer';
import sagas from './sagas';
import { persistStore, autoRehydrate } from 'redux-persist';

let singleton;
let storeStorage;

export function getSingleton() {
  return singleton;
}

export default function create() {
  const sagaMiddleware = createSagaMiddleware(sagas);

  const store = createStore(reducers,
    compose(
      applyMiddleware(sagaMiddleware)
    ),
    autoRehydrate());

  persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['auth']
  });

  singleton = store;

  return store;
}
