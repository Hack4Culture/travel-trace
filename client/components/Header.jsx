import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ username }) => {
  return(
    <div id="header">
      <nav className="navbar navbar-light bg-white">
        <Link to="/" className="navbar-brand brand-name">
          <img src="/images/logo.png" width="30" height="30" className="d-inline-block align-top" alt="" />
          Travel Trace
        </Link>

        <button className="navbar-toggler d-md-none" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse d-md-none" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <Link to="/stories" className="nav-link">Stories</Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className="btn btn-primary btn-sm snapIt">
                Trace <i className="fa fa-camera" aria-hidden="true" />
              </Link>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{username}</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">View Profile</a>
                <a className="dropdown-item" href="#">Signout</a>
                <div className="dropdown-divider" />
              </div>
            </li>
          </ul>
        </div>
        <Link to="/upload" className="btn btn-primary btn-sm snapIt">
          Trace <i className="fa fa-camera" aria-hidden="true" />
        </Link>
        <ul className="hide-sm nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <Link to="/stories" className="nav-link">Stories</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{username}</a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">View Profile</a>
              <a className="dropdown-item" href="#">Signout</a>
              <div className="dropdown-divider" />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string
}

Header.defaultProps = {
  username: "User"
}

export default Header;
