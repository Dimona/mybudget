import produce from 'immer';
import { handleActions, combineActions } from 'redux-actions';
import nullfined from 'nullfined';

import {
    setTokenAction,
    getUserAction,
    facebookLoginAction,
    logoutAction,
    revokeTokenAction,
    refreshUserAction,
} from '../actions';

export const INITIAL_STATE = {
    token: undefined,
    user: undefined,
    loading: false,
    error: undefined
};

export default {
    key: 'auth',
    reducer: handleActions(
        {
            [setTokenAction]: (state, { payload }) =>
                produce(state, draft => {
                    draft.token = payload;
                }),
            [combineActions(
                facebookLoginAction.REQUEST,
                logoutAction.REQUEST,
                refreshUserAction.REQUEST,
                getUserAction.REQUEST,
            )]: state =>
                produce(state, draft => {
                    draft.loading = true;
                }),
            [combineActions(
                getUserAction.SUCCESS,
                refreshUserAction.SUCCESS
            )]: (state, { payload }) =>
                produce(state, draft => {
                    draft.user = nullfined(payload);
                    draft.loading = false;
                }),
            [facebookLoginAction.SUCCESS]: (state, { payload }) =>
                produce(state, draft => {
                    draft.token = payload.token;
                    draft.user = payload;
                    draft.loading = false;
                }),
            [combineActions(
                facebookLoginAction.FAILURE,
                logoutAction.FAILURE,
                refreshUserAction.FAILURE,
                getUserAction.FAILURE,
            )]: state => produce(state, draft => {
                draft.loading = false
            }),
            [combineActions(revokeTokenAction, logoutAction.SUCCESS)]: () => INITIAL_STATE
        },
        INITIAL_STATE
    )
};
