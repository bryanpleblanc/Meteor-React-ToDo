import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import AppContainer from '../../ui/App.js';
import NotFoundPage from '../../ui/pages/NotFoundPage.js';


const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={AppContainer}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </Router>
);