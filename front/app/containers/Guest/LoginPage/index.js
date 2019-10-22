import React, { useReducer, useCallback } from 'react';
import { transliterate as tr } from 'transliteration';
import { useDispatch } from 'react-redux';
// import ReactDOM from 'react-dom'
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from "utils/injectSaga";
import ucfirst from 'ucfirst';
import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';
import { params } from 'config';
import useDocumentTitle from '@rehooks/document-title';
import { SocialButton, messages, config as socialAppIds, FACEBOOK_PROVIDER } from 'components/SocialButton';
// import authReducer, { INITIAL_STATE } from 'components/auth/reducers';
import { loginWatcherSaga } from 'components/auth/sagas';
import { loginAction } from 'components/auth/actions';

export default function LoginPage() {
    useDocumentTitle(`${params.appTitle} - Login`);
    const dispatch = useDispatch();
    const login = useCallback(payload => {
        console.log(dispatch);
        dispatch(loginAction.request(payload))
    }, [dispatch]);
    useInjectSaga(loginWatcherSaga);

    const handleLoginSuccess = useCallback(
        ({ profile: { email, name, profilePicURL }, token: { accessToken, expiresAt } }) => {
            console.log(email, name, profilePicURL, accessToken, expiresAt);
            login({ email, name: tr(name), avatar: profilePicURL, token: accessToken, tokenExpiresAt: expiresAt });
        },
        []
    );

    // const handleLoginSuccess = ({ email, name, profilePicURL, accessToken, expiresAt }) => {
    //     console.log(email, name, profilePicURL, accessToken, expiresAt);
    //     login({ email, name: tr(name), avatar: profilePicURL, token: accessToken, tokenExpiresAt: expiresAt })
    // };
    //
    // const handleLoginSuccess = (user) => {
    //     console.log(user);
    // };

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

// import React, { useEffect, memo } from 'react';
// import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
//
// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
// import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
// import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
// import Section from './Section';
// import messages from './messages';
// import { loadRepos } from '../App/actions';
// import { changeUsername } from './actions';
// import { makeSelectUsername } from './selectors';
// import reducer from './reducer';
// import saga from './saga';
//
// const key = 'home';
//
// export function HomePage({ username, loading, error, repos, onSubmitForm, onChangeUsername }) {
//     useInjectReducer({ key, reducer });
//     useInjectSaga({ key, saga });
//
//     useEffect(() => {
//         // When initial state username is not null, submit the form to load repos
//         if (username && username.trim().length > 0) onSubmitForm();
//     }, []);
//
//     const reposListProps = {
//         loading,
//         error,
//         repos
//     };
//
//     return (
//         <article>
//             <Helmet>
//                 <title>Home Page</title>
//                 <meta name="description" content="A React.js Boilerplate application homepage" />
//             </Helmet>
//             <div>
//                 <CenteredSection>
//                     <H2>
//                         <FormattedMessage {...messages.startProjectHeader} />
//                     </H2>
//                     <p>
//                         <FormattedMessage {...messages.startProjectMessage} />
//                     </p>
//                 </CenteredSection>
//                 <Section>
//                     <H2>
//                         <FormattedMessage {...messages.trymeHeader} />
//                     </H2>
//                     <Form onSubmit={onSubmitForm}>
//                         <label htmlFor="username">
//                             <FormattedMessage {...messages.trymeMessage} />
//                             <AtPrefix>
//                                 <FormattedMessage {...messages.trymeAtPrefix} />
//                             </AtPrefix>
//                             <Input
//                                 id="username"
//                                 type="text"
//                                 placeholder="mxstbr"
//                                 value={username}
//                                 onChange={onChangeUsername}
//                             />
//                         </label>
//                     </Form>
//                     <ReposList {...reposListProps} />
//                 </Section>
//             </div>
//         </article>
//     );
// }
//
// HomePage.propTypes = {
//     loading: PropTypes.bool,
//     error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
//     repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
//     onSubmitForm: PropTypes.func,
//     username: PropTypes.string,
//     onChangeUsername: PropTypes.func
// };
//
// const mapStateToProps = createStructuredSelector({
//     repos: makeSelectRepos(),
//     username: makeSelectUsername(),
//     loading: makeSelectLoading(),
//     error: makeSelectError()
// });
//
// export function mapDispatchToProps(dispatch) {
//     return {
//         onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
//         onSubmitForm: evt => {
//             if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//             dispatch(loadRepos());
//         }
//     };
// }
//
// const withConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps
// );
//
// export default compose(
//     withConnect,
//     memo
// )(HomePage);
