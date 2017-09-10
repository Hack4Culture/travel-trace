import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ReadStory extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: this.props.auth.user,
      isAuthenticated: this.props.auth.isAuthenticated
    };
  }

  /**
   * Runw shen the component ii fully mounted
   * @method componentDidMount
   * @return {void}
   * @memberOf ReadStory
   */
  componentDidMount() {
    if (!this.state.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  /**
   * Set new props to state
   * @method componentWillReceiveProps
   * @param {object} nextProps 
   * @return {void}
   * @memberOf ReadStory
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.auth.user,
      isAuthenticated: nextProps.auth.isAuthenticated
    });
  }

  render() {
    return (
      <div className="stories-cont slide-up">
        <div className="cont">
          <div className="single">
            <div className="row">
              <div className="col-sm-3 profile">
                <img src="/images/esther.jpeg" alt="Esther Falayi" />
                <div className="fellow">
                  <p>
                    <span><img src="/images/logo.png" alt="Andela Logo" /></span>
                    Esther Falayi
                  </p>
                  <p><span>Visited: <i className="fa fa-map-marker" aria-hidden="true" /></span> Johanesburg</p>
                </div>
              </div>

              <div className="col-sm-7 story-content">
                <h1 className="title">My awesome Experience in the Kenyan National Park.</h1>
                <p>nfjnke jf ek tgjv etk tvrj vk vekv rkv rjb rk</p>
              </div>
              <div className="page-view-count">
                <span> <i className="fa fa-eye" aria-hidden="true" /> 50 </span>
              </div>
              <div className="col-sm-2 p-0" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Map state to props
const mapStateToProps = (state) => {
  return {
    auth: state.users
  }
}

export default connect(mapStateToProps, null)(withRouter(ReadStory));