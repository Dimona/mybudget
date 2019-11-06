import { createFormAction } from 'redux-form-saga';
import { createAction } from 'redux-actions';

export const facebookLoginAction = createFormAction('AUTH_FACEBOOK_LOGIN');
export const logoutAction = createFormAction('AUTH_LOGOUT');
export const setTokenAction = createAction('AUTH_TOKEN_SET');
export const revokeTokenAction = createAction('AUTH_TOKEN_REVOKE');
export const getUserAction = createFormAction('AUTH_USER');
export const refreshUserAction = createFormAction('AUTH_USER_REFRESH');
// export const forgotPasswordAction = createFormAction('AUTH_FORGOT_PASSWORD');
// export const forgotPasswordSetPasswordAction = createFormAction('AUTH_FORGOT_PASSWORD_SET_PASSWORD');
// export const verifyEmailAction = createFormAction('AUTH_EMAIL_VERIFY');
