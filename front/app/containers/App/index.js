/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { auth } from 'components/auth/decorators';

import Guest from 'containers/Guest';
import Layout from 'containers/Layout';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { animateScroll } from 'react-scroll';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`.editorconfig
    max-width: calc(768px + 16px * 2);
    margin: 0 auto;
    display: flex;
    min-height: 100%;
    padding: 0 16px;
    flex-direction: column;
`;

function App({ history: { listen }, location: { pathname }, isAuthorized = false }) {
    let unlistenHistoryChanges;
    // const [unlistenHistoryChanges, setUnlistenHistoryChanges] = useState();
    useEffect(() => {
        unlistenHistoryChanges = listen(location => {
            if (location.pathname !== pathname) {
                animateScroll.scrollToTop();
            }
        });
        return () => {
            unlistenHistoryChanges();
        }
    }, []);
    return (
        <AppWrapper>
            <Switch>
                <Route path="/" component={isAuthorized ? Layout : Guest} />
                {/*<Route path="" component={NotFoundPage} />*/}
            </Switch>
            <GlobalStyle />
        </AppWrapper>
    );
}

App.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired
};

export default withRouter(auth(App));
