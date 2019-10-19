/**
 * Create the store with dynamic reducers
 */

import BrowserHistory from 'utils/history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// import produce from 'immer';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}, history) => {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [sagaMiddleware, routerMiddleware(history)];

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(createReducer(), initialState, composeWithDevTools(...enhancers));

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
};

const initialState = {};
const store = configureStore(initialState, BrowserHistory);

export default store;
