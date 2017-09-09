import React, { Component } from 'react';

class ReadStory extends Component {
  render() {
    return (
      <div className="stories-cont">
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

export default ReadStory;