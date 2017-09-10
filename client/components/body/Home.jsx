import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
      isAuthenticated: this.props.auth.isAuthenticated,
      user: {}
    };
    // this.onClick = this.onClick.bind(this);
    // this.onSignIn = this.onSignIn.bind(this);
    // this.onFailure = this.onFailure.bind(this);
  }

  componentWillMount() {
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
    if (this.state.isAuthenticated) {
      this.props.history.push('/landing');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.auth.isAuthenticated,
      user: nextProps.auth.user,
    });
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
        'onsuccess': this.props.onSignIn
      });
    });
    return (
      <div>
        <div id="sign-in" className="container">
          <img src="/images/logo.png" className="logo-m rounded" alt="Andela" />
          <h3 className="brand-name-m">Andela Travel Trace</h3>
          <div id="my-signin2"></div>
        </div>   
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.users
})

export default connect(mapStateToProps, null)(withRouter(Home));
