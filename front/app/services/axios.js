import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { toPath } from 'lodash';
import { revokeTokenAction } from 'components/auth/actions';
import snackbars from 'components/snackbars';
import Auth from 'config/auth';
import Store from 'config/store';

export const ApiClient = axios.create({
    baseURL: process.env.API_HOST, // eslint-disable-line
    responseType: 'json'
});

ApiClient.interceptors.request.use(config => {
    const token = Auth.TokenStorage.get();

    if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
});

ApiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { response } = error;

        if (response) {
            const { status } = response;
            let { data } = response;

            if (data instanceof ArrayBuffer) {
                data = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
            }

            if (status === 422 && data.code === 'E_UNPROCESSABLE_ENTITY' && Array.isArray(data.errors)) {
                const errors = {};
                data.errors.forEach(({ field, message }) => {
                    const path = toPath(field);

                    if (path.length === 1) {
                        errors[field] = message;
                    } else if (path.length === 3) {
                        const [arrayName, arrayKey, arrayField] = path;

                        if (errors[arrayName] === undefined) {
                            errors[arrayName] = {};
                        }

                        if (errors[arrayName][arrayKey] === undefined) {
                            errors[arrayName][arrayKey] = {};
                        }

                        errors[arrayName][arrayKey][arrayField] = message;
                    }
                });
                return Promise.reject(new SubmissionError(errors));
            }

            if ([400, 404].includes(status)) {
                snackbars.warning(data.message || 'Something went wrong!');
            }

            if (status === 500) {
                snackbars.error(data.message || 'Something went wrong!');
            }

            if (status === 401) {
                Store.dispatch(revokeTokenAction());
            }
        } else {
            snackbars.error(error.message);
        }

        return Promise.reject(error);
    }
);

export default { ApiClient };
