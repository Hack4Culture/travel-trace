import React from 'react';
import Header from './Header.jsx';

const Landing = () => {
  return(
    <div id="landing-page">
      <Header />
      <div id="intro">
        <h2 className="intro-text">Share Your Travel Experience.</h2>
        <h4 className="intro-text">Create. Trace. Memories.</h4>
        <h2 className="intro-text"> A Thousand Words.</h2>
      </div>
    </div>
  );
}

export default Landing;
