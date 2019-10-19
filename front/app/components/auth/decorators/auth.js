import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import injectSaga from 'utils/injectSaga';
import { Loader } from 'components/loader';
import { isAuthorizedSelector, tokenSelector, userSelector } from '../selectors';
import { refreshUserWatcherSaga, logoutWatcherSaga, getUserWatcherSaga } from '../sagas';
import { getUserAction } from '../actions';

export default WrappedComponent => {
    @injectSaga(getUserWatcherSaga)
    @injectSaga(refreshUserWatcherSaga)
    @injectSaga(logoutWatcherSaga)
    @connect(
        store => ({
            authToken: tokenSelector(store),
            authUser: userSelector(store),
            isAuthorized: isAuthorizedSelector(store)
        }),
        dispatch => ({
            getUser: () => dispatch(getUserAction.request())
        })
    )
    class Auth extends PureComponent {
        static displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        static propTypes = {
            history: PropTypes.object.isRequired,
            isAuthorized: PropTypes.bool.isRequired,
            getUser: PropTypes.func.isRequired,
            authToken: PropTypes.string,
            authUser: PropTypes.object
        };

        static defaultProps = {
            authToken: undefined,
            authUser: undefined
        };

        componentDidMount() {
            const { authToken } = this.props;

            if (authToken) {
                this.checkUser();
            }
        }

        checkUser() {
            const { authUser, getUser } = this.props;

            if (!authUser) {
                getUser();
            }
        }

        render() {
            const { authUser, authToken, isAuthorized } = this.props;

            return (
                <Loader loading={Boolean(authToken && !authUser)}>
                    <WrappedComponent
                        {...this.props}
                        authUser={authUser}
                        authToken={authToken}
                        isAuthorized={isAuthorized}
                    />
                </Loader>
            );
        }
    }

    return Auth;
};
