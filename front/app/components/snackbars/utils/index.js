import PubSub from 'pubsub-js';

import { SNACKBAR_SUBMISSION, SNACKBAR_SUCCESS, SNACKBAR_ERROR, SNACKBAR_WARNING, SNACKBAR_INFO } from '../constants';

function notification(message, options = {}) {
    PubSub.publish(SNACKBAR_SUBMISSION, { message, ...options });
}

function success(message, options = {}) {
    notification(message, { variant: SNACKBAR_SUCCESS, ...options });
}

function error(message, options = {}) {
    notification(message, { variant: SNACKBAR_ERROR, ...options });
}

function warning(message, options = {}) {
    notification(message, { variant: SNACKBAR_WARNING, ...options });
}

function info(message, options = {}) {
    notification(message, { variant: SNACKBAR_INFO, ...options });
}

export default {
    notification,
    success,
    error,
    warning,
    info
};
