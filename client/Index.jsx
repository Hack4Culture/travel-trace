import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import './assets/stylesheets/style.scss';
import './assets/stylesheets/loading.scss';
import setAuthorizationToken from './utils/setAuthorization';
import { signinWithToken } from './actions/userActions';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() :
    f => f
  )
);

const token = localStorage.getItem('userToken');

if (token) {
  setAuthorizationToken(token);
}
const dispatch = store.dispatch;
signinWithToken(dispatch, token).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
});
