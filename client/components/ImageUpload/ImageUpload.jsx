import React, { Component } from 'react';

export class ImageUpload extends Component {
  render() {
    return(
      <div className="row">
        <div className="col s4 offset-s4">
          <label href="#">
            <i className="material-icons camera-icon">camera_alt</i>
            <input
              onChange={this.handleUpload}
              type="file"
              className="image-upload-btn"
              accept=".jpg,.jpeg,.png,.bmp"
            />
          </label>
        </div>
      </div>
    );
  }
}
