import { defineMessages } from 'react-intl';

export const scope = 'auth';

export default defineMessages({
    buttonCreateAccount: {
        id: `${scope}.button.createAccount`,
        defaultMessage: 'Create Account'
    },
    buttonBackToLogin: {
        id: `${scope}.button.backToLogin`,
        defaultMessage: 'Back to Log In'
    },
    logInTitle: {
        id: `${scope}.title.logIn`,
        defaultMessage: 'Log In'
    },
    createAnAccountTitle: {
        id: `${scope}.title.createAnAccount`,
        defaultMessage: 'Create an Account'
    },
    forgotRequestTitle: {
        id: `${scope}.forgot.requestTitle`,
        defaultMessage: 'Reset password'
    },
    forgotRequestDescription: {
        id: `${scope}.forgot.requestDescription`,
        defaultMessage: 'Submit your account email address and we’ll send you a link to reset your password.'
    },
    forgotConfirmTitle: {
        id: `${scope}.forgot.confirmTitle`,
        defaultMessage: 'Reset password'
    },
    forgotRequestNotification: {
        id: `${scope}.forgot.requestNotification`,
        defaultMessage: 'The reset link has been sent to you email'
    },
    forgotConfirmNotification: {
        id: `${scope}.forgot.confirmNotification`,
        defaultMessage: 'Your password has been changed'
    },
    doNotHaveAccount: {
        id: `${scope}.doNotHaveAccount`,
        defaultMessage: 'Don\'t have an account?',
    }
});
