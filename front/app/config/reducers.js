/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import { reducer as formReducer } from 'redux-form';
import { reducer as modalReducer } from 'redux-modal';
import languageReducer from 'components/language/reducers';
import authReducer from 'components/auth/reducers';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    return combineReducers({
        router: connectRouter(history),
        form: formReducer,
        modal: modalReducer,
        [languageReducer.key]: languageReducer.reducer,
        [authReducer.key]: authReducer.reducer,
        ...injectedReducers
    });
}
