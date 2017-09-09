import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinAction } from '../../actions/userActions';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      fullname: '',
      avatar: ''
    };
    // this.onClick = this.onClick.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  componentDidMount() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn,
      'onfailure': this.onFailure
    });
  }

  // onClick() {

  // }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    this.state.fullname = profile.getName();
    this.state.avatar = profile.getImageUrl();
    this.state.email = profile.getEmail();
    if (/@andela.com\s*$/.test(this.state.email)) {
      this.props.signinAction(this.state).then((res) => {
        if (res) {
          localStorage.setItem('userToken', googleUser.getAuthResponse().id_token)
        }
      });
    } else {
      console.log('Sorry');
    }
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    
    // // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  onFailure(error) {
    console.log(error);
  }


  render() {
    return (
      <div id="sign-in" className="container">
        <img src="/images/logo.png" className="logo-m rounded" alt="Andela" />
        <h3 className="brand-name-m">Andela Travel Trace</h3>
        <div id="my-signin2"></div>
      </div>
    );
  }
}

export default connect(null, { signinAction })(Home);
