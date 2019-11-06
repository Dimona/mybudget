import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import Auth from 'config/auth';
// import socket from 'config/socket';
// import { ROLE_ADMIN } from 'components/users/constants';
// import { indexUserAction as indexBookmarkAction } from 'components/bookmark/actions';
import { facebookLogin, getUser, logout } from '../api';
import {
    logoutAction,
    facebookLoginAction,
    getUserAction,
    revokeTokenAction,
    refreshUserAction
} from '../actions';

function* handleRefreshUserSaga() {
    try {
        const { data: user } = yield call(getUser);
        yield put(refreshUserAction.success(user));
    } catch (e) {
        Auth.TokenStorage.remove();
        yield put(revokeTokenAction());
    }
}

export function* handleGetUserSaga() {
    try {
        const { data: user } = yield call(getUser);
        yield put(getUserAction.success(user));

        // if (user && !user.roles.includes(ROLE_ADMIN)) {
        //     yield put(indexBookmarkAction.request());
        // }

        // socket.connect();
    } catch (e) {
        Auth.TokenStorage.remove();
        yield put(revokeTokenAction());
    }
}

function* handleFacebookLoginSaga(action) {
    try {
        const { data } = yield call(facebookLogin, action.payload);
        Auth.TokenStorage.set(data.token);
        // yield call(handleGetUserSaga);
        yield put(facebookLoginAction.success(data));
    } catch (e) {
        const { response = {} } = e;

        if (response.status === 404) {
            const {
                data: { message }
            } = response;
            const se = new SubmissionError({ email: message });
            yield put(facebookLoginAction.failure(se));
        } else {
            yield put(facebookLoginAction.failure(e));
        }
    }
}

function* handleLogoutSaga() {
    try {
        yield call(logout);
        // socket.disconnect();
        Auth.TokenStorage.remove();
        yield put(logoutAction.SUCCESS());
    } catch (e) {
        yield put(logoutAction.FAILURE(e));
    }
}

export const facebookLoginWatcherSaga = {
    key: 'facebookLogin',
    *saga() {
        yield takeEvery(facebookLoginAction.REQUEST, handleFacebookLoginSaga);
    }
};

export const logoutWatcherSaga = {
    key: 'logout',
    *saga() {
        yield takeLatest(logoutAction.REQUEST, handleLogoutSaga);
    }
};

export const refreshUserWatcherSaga = {
    key: 'refreshUser',
    *saga() {
        yield takeLatest(refreshUserAction.REQUEST, handleRefreshUserSaga);
    }
};

export const getUserWatcherSaga = {
    key: 'getUser',
    *saga() {
        yield takeLatest(getUserAction.REQUEST, handleGetUserSaga);
    }
};
