import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getTracesAction } from '../actions/traceActions';
import Gallery from './body/Gallery';

/**
 * @class Landing
 * @extends {Component}
 */
class Landing extends Component {

  /**
   * Creates an instance of Landing.
   * @memberof Landing
   * @param { object } props
   */
  constructor(props){
    super(props);
    this.state={
      user: this.props.auth.user,
      isAuthenticated: this.props.auth.isAuthenticated,
      traces: []
    };
  }

  /**
   * Runw shen the component ii fully mounted
   * @method componentDidMount
   * @return {void}
   * @memberOf Landing
   */
  componentDidMount() {
    if (!this.state.isAuthenticated) {
      this.props.history.push('/');
    }
    this.props.getTracesAction();
  }

  /**
   * Set new props to state
   * @method componentWillReceiveProps
   * @param {object} nextProps 
   * @return {void}
   * @memberOf Landing
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.auth.user,
      isAuthenticated: nextProps.auth.isAuthenticated,
      traces: nextProps.traces
    });
  }
  
  /**
   * @memberof Landing
    * @returns { void }
   */
  render() {
    return(
      <div id="intro" className="fade-in">
        <div className="intro-section">
          <h2 className="intro-text">Share Your Travel Experience.</h2>
          <h4 className="intro-text">Create. Trace. Memories.</h4>
          <h2 className="intro-text"> A Thousand Words.</h2>
        </div>
        <div className="info-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col stats-grid">
                <i className="fa fa-users hover-effect" aria-hidden="true" />
                <div className="stats-text">
                  <h5 className="counter">300</h5> 
                  <p>Users Around The Globe</p>
                </div>
              </div>
              <div className="col stats-grid">
                <i className="fa fa-camera hover-effect" aria-hidden="true" />
                <div className="stats-text">
                  <h5 className="counter">200</h5> 
                  <p>Images Uploaded Since App Deployment</p>
                </div>
              </div>
              <div className="col stats-grid">
                <i className="fa fa-globe hover-effect" aria-hidden="true" />
                <div className="stats-text">
                  <h5 className="counter">4</h5> 
                  <p>And Andela Keeps Expanding</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div id="gallery">
            <Gallery traces={this.state.traces} />
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  auth: PropTypes.shape({})
};

Landing.defaultProps = {
  auth: {}
};

// Map state to props
const mapStateToProps = (state) => (
  {
    auth: state.users,
    traces: state.traces
  }
);

export default connect(mapStateToProps, { getTracesAction })(withRouter(Landing));
