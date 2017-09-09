import React from 'react';

const Singles = () => (
  <div className="single">
    <div className="single-top">
      <img src="/images/london.jpg" alt="tower" />
    </div>
    <div className="bottom">
      <h3>This is an awesome topic of something pretty interesting.</h3>
      <div className="user">
        <div className="user-cont">
          <div className="row">
            <div className="col-sm-3">
              <div className="img">
                <img src="/images/dbamidele.jpeg" alt="Daniel Bamidele" />
              </div>
            </div>

            <div className="p0 col-sm-6">
              <p>Bamidele Daniel</p>
              <p>Sept 8, 2017</p>
            </div>

            <div className="col-sm-3">
              <p className="views"><i className="fa fa-eye" aria-hidden="true" /> 50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Singles;