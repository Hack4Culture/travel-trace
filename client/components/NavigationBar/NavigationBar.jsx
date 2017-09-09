import React from 'react';

export class NavigationBar extends React.Component {
  render() {
    return(
      <nav className="nav cyan darken-3">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo" id="navbar-title">Travel Trace</a>
        </div>
      </nav>
    );
  }
}
