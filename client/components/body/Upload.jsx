import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import firebase from 'firebase';
import savePostAction from '../../actions/postActions.js';

const CLOUDINARY_UPLOAD_PRESET = 'viytx31e';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

var config = {
  apiKey: "AIzaSyAfT6WFFEQuMDMq2oZGVUeK5LUh_KFWoNA",
  authDomain: "travelt-19b64.firebaseapp.com",
  databaseURL: "https://travelt-19b64.firebaseio.com",
  projectId: "travelt-19b64",
  storageBucket: "travelt-19b64.appspot.com",
  messagingSenderId: "84907762892"
};
firebase.initializeApp(config);


/** 
 * @class NewPost
 * @extends {Component}
 */
class NewPost extends Component{

  /**
   * Creates an instance of NewPost.
   * @memberof NewPost
   */
  constructor(){
    super();
    this.state = {
      newPost: {
        name: "",
        location: "",
        content: "",
        imageUrl: "",
      }
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.postTrace = this.postTrace.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  fileUpload(event) {
    const newPost = this.state.newPost;
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    storageRef.child('new').put(file).then((snapshot) => {
      this.setState({
        newPost: {
          ...newPost,
          imageUrl: snapshot.metadata.downloadURLs[0]
        }
      });
    });
  }

  /**
   * @memberof NewPost
   * @param {any} event 
   * @returns { void }
   */
  onInputChange(event){
    const newPost = this.state.newPost;
    this.setState({
      newPost: {
        ...newPost,
        [event.target.name]: event.target.value
      }
    });
  }

  /**
   * @memberof NewPost
   * @returns { void }
   */
  postTrace() {
    this.props.savePostAction(this.state.newPost);
  }

  /**
   * @memberof NewPost
   * @returns { object } react-component
   */
  render() {
    return(
      <div>
        <div id="upload" className="container">
          <form className="container">
            <div className="form-row">
              <div className="col-sm-6">
                <div id="image-div">
                  <div className="container form-image">
                    <img className="img-responsive" src={this.state.newPost.imageUrl} alt="uploaded" />
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    className="file-upload"
                    id="images"
                    name="images"
                    accept=".jpg,.jpeg,.png,.bmp"
                    onChange={this.fileUpload}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="col-sm-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="name"
                    placeholder="Name your trace"
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    placeholder="Location"
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <label htmlFor="content">Tell a story!</label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="description"
                    rows="7"
                    onChange={this.onInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="post-btn">
              <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.postTrace}>Post</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewPost.propTypes = {
  savePostAction: PropTypes.func.isRequired
}

export default connect(null, { savePostAction })(NewPost);
