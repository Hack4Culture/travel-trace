import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';

/**
 * @class Landing
 * @extends {Component}
 */
class Landing extends Component{

  /**
   * Creates an instance of Landing.
   * @memberof Landing
   * @param { object } props
   */
  constructor(props){
    super(props);
    this.state={
      user: this.props.user
    };
  }
  
  /**
   * @memberof Landing
    * @returns { void }
   */
  render() {
    return(
      <div id="landing-page">
        <Header username={this.state.user.name} />
        <div id="intro">
          <h2 className="intro-text">Share Your Travel Experience.</h2>
          <h4 className="intro-text">Create. Trace. Memories.</h4>
          <h2 className="intro-text"> A Thousand Words.</h2>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  user: PropTypes.object
}

Landing.defaultProps = {
  user: {}
}

// Map state to props
const mapStateToProps = (state) => {
  return{
    user: state.users.user
  }
}

export default connect(mapStateToProps, null)(Landing);
