import { ApiClient } from 'services/axios';

export const ENDPOINT = '/auth';

export function facebookLogin(params) {
    return ApiClient.post(`${ENDPOINT}/facebook`, params);
}

export function getUser() {
    return ApiClient.get(`${ENDPOINT}/user`);
}

export function logout() {
    return ApiClient.post(`${ENDPOINT}/logout`);
}

// export function forgotPassword(email) {
//     return ApiClient.post(`${ENDPOINT}/forgot-password/request`, { email });
// }
//
// export function forgotPasswordConfirm({ password, confirmPassword, token }) {
//     return ApiClient.post(`${ENDPOINT}/forgot-password/confirm`, { password, confirmPassword, token });
// }
//
// export function verifyEmail(token) {
//     return ApiClient.post(`${ENDPOINT}/verify-email`, { token });
// }
