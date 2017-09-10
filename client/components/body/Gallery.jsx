import React, { Component } from 'react';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      traces: this.props.traces
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      traces: nextProps.traces
    })
  }
  render() {
    if (this.state.traces.length <= 0) {
      return (<p>No gallery to show!</p>);
    }
    const traces = this.state.traces;
    return (
      <div className="container">
        <h3 className="gallery-title text-center">Gallery</h3>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 gallery-grid gallery-grid-lg">
                <img className="img-responsive" src={traces[0].imageUrl} alt="" />
                <div className="lightbox" />
                <div className="grid-description">
                  <h5>{traces[0].location}</h5>
                </div>
                  
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 gallery-grid gallery-grid-center">
                    <img className="img-responsive" src={traces[1] ? traces[1].imageUrl : '/images/preview-icon.png'} alt="" />
                    <div className="lightbox" />
                    <div className="grid-description">
                      <h5>{traces[1] ? traces[1].location : 'Preview'}</h5>
                    </div>
                  </div>
                  <div className="col-md-12 gallery-grid  gallery-grid-center">
                    <img className="img-responsive" src={traces[2] ? traces[2].imageUrl : '/images/preview-icon.png'} alt="" />
                    <div className="lightbox" />
                    <div className="grid-description">
                      <h5>{traces[2] ? traces[2].location : 'Preview'}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="gallery-grid gallery-grid-lg">
              <img className="img-responsive" src={traces[3] ? traces[3].imageUrl : '/images/preview-icon.png'} alt="" />
              <div className="lightbox" />
              <div className="grid-description">
                <h5>{traces[3] ? traces[3].location : 'Preview'}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
