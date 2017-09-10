import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
            <div className="container">
              <h3 className="gallery-title text-center">Gallery</h3>
              <div className="row">
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6 plr gallery-grid gallery-grid-lg">
                      <img className="img-responsive" src="/images/sf.jpg" alt="" />
                      <div className="lightbox" />
                      <div className="grid-description">
                        <h5>
                          <span><i className="fa fa-map-marker" aria-hidden="true" /></span>
                          San Franciso 
                        </h5>
                        <p>Some nice travel story</p>
                      </div>  
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12 plr gallery-grid gallery-grid-center">
                          <img className="img-responsive" src="/images/img1.jpg" alt="" />
                          <div className="lightbox" />
                          <div className="grid-description">
                            <h5>
                              <span><i className="fa fa-map-marker" aria-hidden="true" /></span>
                              Kenya
                            </h5>
                            <p>Some nice travel story</p>
                          </div>
                        </div>
                        <div className="col-md-12 plr gallery-grid  gallery-grid-center">
                          <img className="img-responsive" src="/images/img4.jpg" alt="" />
                          <div className="lightbox" />
                          <div className="grid-description">
                            <h5>
                              <span><i className="fa fa-map-marker" aria-hidden="true" /></span>
                              Uganda
                            </h5>
                            <p>Some nice travel story</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="gallery-grid gallery-grid-lg">
                    <img className="img-responsive" src="/images/img3.jpg" alt="" />
                    <div className="lightbox" />
                    <div className="grid-description">
                      <h5>
                        <span><i className="fa fa-map-marker" aria-hidden="true" /></span>
                        Lagos
                      </h5>
                      <p>Some nice travel story</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
