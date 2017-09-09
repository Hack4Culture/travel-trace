import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './body/Home';
import Landing from './Landing';
import Upload from './body/Upload';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/andela-travel-trace" component={Landing} /> 
      <Route exact path="/upload" component={Upload} />          
    </Switch>
  </Router>
)

export default App;
