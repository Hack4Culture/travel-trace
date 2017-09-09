import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Doubles from './Doubles';
import Singles from './Singles';

class Stories extends Component {
  render() {
    return (
      <div className="stories-cont">
        <div className="cont">
          <div className="content">
            <div className="grid">
              <Link to="/stories/read/1">
                <Doubles />
              </Link>

              <Link to="/stories/read/1">
                <Singles />
              </Link>

              <Link to="/stories/read/1">
                <Singles />
              </Link>
            </div>
            <div className="grid">
              <Link to="/stories/read/1">
                <Singles />
              </Link>

              <Link to="/stories/read/1">
                <Doubles />
              </Link>

              <Link to="/stories/read/1">
                <Singles />
              </Link>

            </div>
            <div className="grid">
              <Link to="/stories/read/1">
                <Singles />
              </Link>

              <Link to="/stories/read/1">
                <Singles />
              </Link>

              <Link to="/stories/read/1">
                <Doubles />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stories;
