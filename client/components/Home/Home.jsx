import React, { Component } from 'react';

import { ImageUpload } from '../ImageUpload/ImageUpload.jsx';
import { ListImages } from '../ListImages/ListImages.jsx';

export class Home extends Component {
  render() {
    return(
      <div className="home">
        <ImageUpload />
        <ListImages />
      </div>
    );
  }
}
