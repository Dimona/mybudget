import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './HomePage/Loadable';

function Layout() {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Redirect to="/" />
        </Switch>
    );
}

export default memo(Layout);
