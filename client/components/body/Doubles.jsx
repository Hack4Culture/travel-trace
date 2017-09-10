import React from 'react';

const Doubles = () => (
  <div className="double">
    <div className="top">
      <img src="/images/tower.jpg" alt="tower" />
    </div>
    <div className="bottom">
      <h3>This is an awesome topic of something pretty interesting.</h3>
      <p>"This is the interesting stuff "</p>
      <div className="user">
        <div className="user-cont">
          <div className="row">
            <div className="col-sm-3">
              <div className="img">
                <img src="/images/esther.jpeg" alt="Esther Falayi" />
              </div>
            </div>

            <div className="p0 col-sm-6">
              <p>Esther Falayi</p>
              <p>Sept 9, 2017</p>
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

export default Doubles;