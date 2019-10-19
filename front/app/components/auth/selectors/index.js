import { createSelector } from 'reselect';

export const tokenSelector = state => state.auth.token;
export const userSelector = state => state.auth.user;
export const loadingSelector = state => state.auth.loading;
export const errorSelector = state => state.auth.error;
export const isAuthorizedSelector = createSelector(
    tokenSelector,
    userSelector,
    (token = '', user = {}) => token.length > 0 && Object.keys(user).length > 0
);
