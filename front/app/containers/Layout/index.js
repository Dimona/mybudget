import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './Main/Loadable';

function LayoutPage() {
    return (
        <Switch>
            <Route path="/" component={Layout} />
            <Redirect to="/dashboard" />
        </Switch>
    );
}

export default memo(LayoutPage);
