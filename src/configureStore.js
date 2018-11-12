import "regenerator-runtime/runtime";
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  whitelist: ['auth'],
};

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

const pReducer = persistReducer(persistConfig, createRootReducer(history));

const store = createStore(
  pReducer, // root reducer with router state
// initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      sagaMiddleware,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

module.exports = {
  store,
  history,
  persistor,
};

// export default store;
