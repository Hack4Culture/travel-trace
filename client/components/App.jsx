import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signinAction } from '../actions/userActions';
import Home from './body/Home';
import Stories from './body/Stories';
import Landing from './Landing';
import Header from './Header';
import Upload from './body/Upload';
import ReadStory from './body/ReadStory';

const history = createBrowserHistory();
const API_KEY = '1046195674142-jlljcpbj568babnu48f6frhdgdl30hv4.apps.googleusercontent.com';

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
      user: {},
    }
    this.onSignIn = this.onSignIn.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.loadGapi = this.loadGapi.bind(this);
  }

  /**
   * @memberof App
   * @returns { void }
   */
  componentWillMount() {
    this.setState({
      email: '',
      fullname: '',
      avatar: '',
      isAuthenticated: this.props.auth.isAuthenticated,
      user: this.props.auth.user
    });
  }

  componentDidMount() {
    this.loadGapi();
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
    });
  }

  loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';
    script.onload = () => {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: API_KEY,
          cookiepolicy: 'single_host_origin',
        }).then((auth2) => {
          const token = auth2.currentUser.get().getAuthResponse(false).id_token;
          localStorage.setItem('userToken', token);
        });
      });
    };

    document.body.appendChild(script);
  }

  /**
   * @memberof Home
   * @param {any} googleUser
   * @returns { void }
   */
  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    this.state.fullname = profile.getName();
    this.state.avatar = profile.getImageUrl();
    this.state.email = profile.getEmail();
    if (/@andela.com\s*$/.test(this.state.email)) {
      this.props.signinAction(this.state).then((res) => {
        console.log('Here')
        if (res) {
          localStorage.setItem('userToken', googleUser.getAuthResponse().id_token);
        }
        console.log('Sorry');
      });
    } else {
      console.log('Sorry');
    }
  }

  /**
   * @memberof Home
   * @param {any} error
   * @returns {void}
   * 
   */
  onFailure(error) {
    console.log(error);
  }

  /**
   * @memberof Home
   * @param {any} googleUser
   * @returns { void }
   */
  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  onFailure(error) {
    console.log('error buddy', error);
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
            <Route exact path="/" component={() => <Home onSignIn={this.onSignIn} />} />
            <Route path="/landing" component={Landing} />
            <Route exact path="/stories" component={Stories} />
            <Route exact path="/upload" component={Upload} /> 
            <Route exact path="/stories/read/:id" component={ReadStory} />
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

export default connect(mapStateToProps, { signinAction })(App);
