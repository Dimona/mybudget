import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import useDocumentTitle from '@rehooks/document-title';
import LoginPage from './LoginPage/Loadable';
import { params } from "config";

function Guest() {
    useDocumentTitle(params.appTitle);
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Redirect to="/login" />
        </Switch>
    );
}

export default memo(Guest);
