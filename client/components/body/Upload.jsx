import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import savePostAction from '../../actions/postActions.js';

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
      },
      previewUrl: "",
      imageFile: ""
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.postTrace = this.postTrace.bind(this);
    this.previewImage = this.previewImage.bind(this);
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
   * @param {any} event 
   * @memberof NewPost
   * @returns { void }
   */
  previewImage(event) {
    const file = event.target.files[0];  
    if(event.target.files && file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          previewUrl: e.target.result,
          imageFile: file
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * @memberof NewPost
   * @returns { void }
   */
  postTrace() {
    const newPost = this.state.newPost;
    const storageRef = firebase.storage().ref();
    storageRef.child('new').put(this.state.imageFile).then((snapshot) => {
      this.setState({
        newPost: {
          ...newPost,
          imageUrl: snapshot.metadata.downloadURLs[0]
        }
      });
    });
    this.props.savePostAction(this.state.newPost);
  }

  /**
   * @memberof NewPost
   * @returns { object } react-component
   */
  render() {
    const imgSrc = this.state.previewUrl === "" ? (
      <i className="fa fa-picture-o fa-5x no-preview" aria-hidden="true" />
    ) : (
      <img className="img-responsive" src={this.state.previewUrl} alt="preview" />
    )
    return(
      <div>
        <div id="upload" className="container shadow">
          <form className="container">
            <div className="form-row">
              <div className="col-sm-6">
                <div id="image-div">
                  { imgSrc }
                </div>
                <div>
                  <input
                    type="file"
                    className="file-upload"
                    id="imageUrl"
                    name="imageUrl"
                    accept=".jpg,.jpeg,.png,.bmp"
                    onChange={this.previewImage}
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
