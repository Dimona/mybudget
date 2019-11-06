import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from "utils/injectSaga";
import ucfirst from 'ucfirst';
import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';
import { params } from 'config';
import useDocumentTitle from '@rehooks/document-title';
import { SocialButton, messages, config as socialAppIds, FACEBOOK_PROVIDER } from 'components/SocialButton';
import { facebookLoginWatcherSaga } from 'components/auth/sagas';
import { facebookLoginAction } from 'components/auth/actions';

export default function LoginPage() {
    useDocumentTitle(`${params.appTitle} - Login`);
    const dispatch = useDispatch();
    const facebookLogin = useCallback(payload => {
        dispatch(facebookLoginAction.request(payload))
    }, [dispatch]);
    useInjectSaga(facebookLoginWatcherSaga);

    const handleLoginSuccess = useCallback(
        ({ token: { accessToken } }) => {
            facebookLogin({ access_token: accessToken });
        },
        []
    );

    const handleLoginFailure = err => {
        alert(err);
        console.error(err);
    };

    return (
        <div>
            <SocialButton
                provider={FACEBOOK_PROVIDER}
                onLoginSuccess={handleLoginSuccess}
                onLoginFailure={handleLoginFailure}
                appId={socialAppIds[FACEBOOK_PROVIDER]}
                color="primary"
                variant="contained"
                startIcon={<FacebookBoxIcon />}
            >
                <FormattedMessage {...messages.loginWithButton} values={{ provider: ucfirst(FACEBOOK_PROVIDER) }} />
            </SocialButton>
        </div>
    );
}
