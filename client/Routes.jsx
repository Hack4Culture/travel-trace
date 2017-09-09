import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Home from '../client/components/body/Home.jsx';
import Landing from '../client/components/Landing.jsx';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/andela-trace-travel" component={Landing} />
      {/*<Route exact path="/public-documents" component={DocumentsPage} />
       <Route exact path="/role-documents" component={DocumentsPage} />   
      <Route path="/profile" component={ProfilePage} />        
      <Route exact path="/allusers" component={AllUsersPage} />
      <Route exact path="/allroles" component={AllRolesPage} /> 
      <Route path="/access-denied" component={AccessDeniedPage} />
      <Route component={NotFoundPage} /> */}
    </Switch>
  </main>
);

export default Routes;
