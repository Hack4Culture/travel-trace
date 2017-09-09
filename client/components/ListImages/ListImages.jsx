import React, { Component } from 'react';

export class ListImages extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s3 thumbnail">
            <img
              className="image"
              src={require('../../assets/img/IMG-1.jpg')}
              alt=""
            />
            <div className="overlay cyan darken-3">
              <div className="text">Image description</div>
            </div>
          </div>

          <div className="col s6 offset-s3 thumbnail">
            <img
              className="image"
              src={require('../../assets/img/IMG-2.jpg')}
              alt=""
            />
            <span className="overlay cyan darken-3">
              <div className="text">Image description</div>
            </span>
          </div>

          <div className="col s6 offset-s3 thumbnail">
            <img
              className="image"
              src={require('../../assets/img/IMG-3.jpg')}
              alt=""
            />
            <div className="overlay cyan darken-3">
              <div className="text">Image description</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
