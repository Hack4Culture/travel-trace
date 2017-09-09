import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { signinAction } from '../../actions/userActions';


/**
 * @class Home
 * @extends {Component}
 */
class Home extends Component {

  /**
   * Creates an instance of Home.
   * @memberof Home
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullname: '',
      avatar: '',
      isAuthenticated: false,
      user: {},
      loading: true
    };
    // this.onClick = this.onClick.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  componentWillMount() {
    console.log('I mounted');
    const { isAuthenticated, user } = this.props.auth;
    this.setState({
      isAuthenticated,
      user
    });
  }


  /**
   * @memberof Home
   * @returns { void }
   */
  componentDidMount() {
    // gapi.signin2.render('my-signin2', {
    //   'scope': 'profile email',
    //   'width': 240,
    //   'height': 50,
    //   'longtitle': true,
    //   'theme': 'dark',
    //   'onsuccess': this.onSignIn,
    //   'onfailure': this.onFailure
    // });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      isAuthenticated: nextProps.auth.isAuthenticated,
      user: nextProps.auth.user,
      loading: false
    });
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
        if (res) {
          localStorage.setItem('userToken', googleUser.getAuthResponse().id_token);
        }
        console.log('Sorry');
      });
    } else {
      console.log('Sorry');
    }
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    
    // // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
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
   * @memberof Home
   * @returns { object } react-component
   */
  render() {
    $(() => {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSignIn,
        'onfailure': this.onFailure
      });
    });
    const { loading, isAuthenticated } = this.state;
    return (
      <div>
        {
          loading ? (<p>loading</p>) : (
            <div>
              {
                isAuthenticated ? <Redirect to="/landing" /> : (
                  <div id="sign-in" className="container">
                    <img src="/images/logo.png" className="logo-m rounded" alt="Andela" />
                    <h3 className="brand-name-m">Andela Travel Trace</h3>
                    <div id="my-signin2"></div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.users
})

export default connect(mapStateToProps, { signinAction })(withRouter(Home));
