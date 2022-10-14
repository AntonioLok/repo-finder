import React from 'react';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ErrorBoundary from './error-boundary';
import Header from './header';
import Repositories from './repositories';
import Commits from './commits';
import NotFound from './not-found';
import { ROUTES } from '../constants';
import '../stylesheets/app.scss';

const {
  home, repositories, commits, notFound,
} = ROUTES;

const history = createHistory();

const App = () => (
  <Router history={history}>
    <div className="container">
      <ErrorBoundary>
        <Header history={history} />
        <Switch>
          <Route exact path={home} render={() => null} />
          <Route exact path={repositories} component={Repositories} />
          <Route exact path={commits} component={Commits} />
          <Route path={notFound} component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </div>
  </Router>
);

export default App;
