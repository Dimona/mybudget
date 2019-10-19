import produce from 'immer';
import { handleActions, combineActions } from 'redux-actions';
import nullfined from 'nullfined';

import {
    setTokenAction,
    getUserAction,
    loginAction,
    logoutAction,
    revokeTokenAction,
    refreshUserAction,
    // forgotPasswordAction,
    // forgotPasswordSetPasswordAction,
    // verifyEmailAction
} from '../actions';

const INITIAL_STATE = {
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
                loginAction.REQUEST,
                logoutAction.REQUEST,
                refreshUserAction.REQUEST,
                getUserAction.REQUEST,
                // forgotPasswordAction.REQUEST,
                // forgotPasswordSetPasswordAction.REQUEST,
                // verifyEmailAction.REQUEST
            )]: state =>
                produce(state, draft => {
                    draft.loading = true;
                }),
            [combineActions(
                getUserAction.SUCCESS,
                refreshUserAction.SUCCESS,
                getUserAction.SUCCESS
            )]: (state, { payload }) =>
                produce(state, draft => {
                    draft.user = nullfined(payload);
                }),
            [loginAction.SUCCESS]: (state, { payload }) =>
                produce(state, draft => {
                    draft.token = payload.token;
                    draft.loading = false;
                }),
            [combineActions(
                // forgotPasswordAction.SUCCESS,
                // forgotPasswordSetPasswordAction.SUCCESS,
                loginAction.FAILURE,
                logoutAction.FAILURE,
                refreshUserAction.FAILURE,
                getUserAction.FAILURE,
                // forgotPasswordAction.FAILURE,
                // forgotPasswordSetPasswordAction.FAILURE
            )]: state => produce(state, draft => {
                draft.loading = false
            }),
            [combineActions(revokeTokenAction, logoutAction.SUCCESS)]: () => INITIAL_STATE
        },
        INITIAL_STATE
    )
};
