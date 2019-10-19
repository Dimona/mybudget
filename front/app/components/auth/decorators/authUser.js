import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isAuthorizedSelector, tokenSelector, userSelector } from '../selectors';

export default WrappedComponent => {
    @connect(store => ({
        authToken: tokenSelector(store),
        authUser: userSelector(store),
        isAuthorized: isAuthorizedSelector(store)
    }))
    class AuthUser extends PureComponent {
        static propTypes = {
            isAuthorized: PropTypes.bool.isRequired,
            authToken: PropTypes.string,
            authUser: PropTypes.object
        };

        static defaultProps = {
            authToken: undefined,
            authUser: undefined
        };

        render() {
            const { authUser, authToken, isAuthorized } = this.props;

            return (
                <WrappedComponent
                    {...this.props}
                    authUser={authUser}
                    authToken={authToken}
                    isAuthorized={isAuthorized}
                />
            );
        }
    }

    return AuthUser;
};
