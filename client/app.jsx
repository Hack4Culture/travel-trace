import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/style.scss';

const App = () => {
  return(
    <div id="sign-in" className="container">
      <img src="/images/logo.png" className="logo-m rounded" alt="Andela" />
      <h3 className="brand-name-m">Andela Travel Trace</h3>
      <div className="g-signin2" data-onsuccess="onSignIn" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
