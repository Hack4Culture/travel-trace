import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from './body/Home';
import Stories from './body/Stories';
import Landing from './Landing';
import Header from './Header';
import Upload from './body/Upload';

const history = createBrowserHistory();

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {

  /**
   * Creates an instance of App.
   * @param {any} props 
   * @memberof App
   */
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {}
    }
  }

  /**
   * @memberof App
   * @returns { void }
   */
  componentWillMount() {
    this.setState({
      isAuthenticated: this.props.auth.isAuthenticated,
      user: this.props.auth.user
    });
  }

  /**
   * @memberof App
   * @param { object } nextProps
   * @returns { void }
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.auth.isAuthenticated,
      user: nextProps.auth.user
    })
  }

  /**
   * @memberof App
   * @returns { object } react-component
   */
  render() {
    const { isAuthenticated } = this.state;
    return (
      <Router history={history}>
        <div id="landing-page">
          { isAuthenticated && <Header username={this.state.user.name} />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/landing" component={Landing} />
            <Route path="/stories" component={Stories} />
            <Route exact path="/upload" component={Upload} /> 
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propsTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  user: PropTypes.shape({})
}
const mapStateToProps = state => (
  {
    auth: state.users
  }
)

export default connect(mapStateToProps)(App);
