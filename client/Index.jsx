import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import './assets/stylesheets/style.scss';
import setAuthorizationToken from './utils/setAuthorization';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() :
    f => f
  )
);

if (localStorage.getItem('userToken')) {
  // const dispatch = store.dispatch;
  const token = localStorage.getItem('userToken');
  // setCurrentUser(dispatch, token);
  setAuthorizationToken(token);
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
