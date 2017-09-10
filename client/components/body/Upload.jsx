import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { savePostAction } from '../../actions/postActions';
import Alert from './Alert';

const config = {
  apiKey: 'AIzaSyAfT6WFFEQuMDMq2oZGVUeK5LUh_KFWoNA',
  authDomain: 'travelt-19b64.firebaseapp.com',
  databaseURL: 'https://travelt-19b64.firebaseio.com',
  projectId: 'travelt-19b64',
  storageBucket: 'travelt-19b64.appspot.com',
  messagingSenderId: '84907762892'
};
firebase.initializeApp(config);


/** 
 * @class NewPost
 * @extends {Component}
 */
class NewPost extends Component {

  /**
   * Creates an instance of NewPost.
   * @memberof NewPost
   */
  constructor(props) {
    super(props);
    this.state = {
      newPost: {
        name: "",
        location: "",
        description: "",
        imageUrl: "",
        tempImg: ""
      },
      previewUrl: "",
      imageFile: "",
      messages: { open: false },
      saving: false,
      completeFields: false
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
  onInputChange(event) {
    const newPost = this.state.newPost;
    this.setState({
      newPost: {
        ...newPost,
        [event.target.name]: event.target.value
      }
    }, () => {
      const { name, location, tempImg, description } = this.state.newPost;
      if (name && location && tempImg && description) {
        this.setState({
          completeFields: true
        });
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
          newPost:{
            ...this.state.newPost,
            tempImg: e.target.result
          },
          imageFile: file
        }, () => {
          const { name, location, tempImg, description } = this.state.newPost;
          if (name && location && tempImg && description) {
            this.setState({
              completeFields: true
            });
          }
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
    this.setState({
      ...this.state,
      saving: true
    });
    const newPost = this.state.newPost;
    const storageRef = firebase.storage().ref();
    const child = `${this.state.imageFile.name}.${Math.random()}`;
    storageRef.child(child).put(this.state.imageFile).then((snapshot) => {
      this.setState({
        newPost: {
          ...newPost,
          imageUrl: snapshot.metadata.downloadURLs[0],
          tempImg: ""
        }
      }, () => {
        this.props.savePostAction(this.state.newPost).then((res)=> {
          if (res) {
            this.setState({
              ...this.state,
              messages: {
                open: true,
                success: 'Your Trace has been uploaded!' 
              },
              saving: false,
              completeFields: false,
              newPost: {
                name: "",
                location: "",
                description: "",
                imageUrl: "",
              },
              previewUrl: ""
            })
          } else {
            this.setState({
              ...this.state,
              messages: {
                open: true,
                error: 'There is an error saving your Trace!' 
              },
              saving: false,
              completeFields: false,
            })
          }
        });
      });
    });
  }

  /**
   * @memberof NewPost
   * @returns { object } react-component
   */
  render() {
    const classN = `btn ${!this.state.completeFields ? 'btn-secondary' : 'btn-primary'} btn-lg btn-block`;
    const imgSrc = this.state.previewUrl === "" ? (
      <i className="fa fa-picture-o fa-5x no-preview" aria-hidden="true" />
    ) : (
      <img className="img-responsive" src={this.state.previewUrl} alt="preview" />
    );

    return (
      <div className="fade-in">
        <div id="upload" className="container shadow">
          {
            this.state.messages.open && (
              <Alert message={this.state.messages.success ? this.state.messages.success : this.state.messages.error} />
            )
          }
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
                    value={this.state.newPost.name}
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
                    value={this.state.newPost.location}
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
                    value={this.state.newPost.description}
                    rows="7"
                    onChange={this.onInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="post-btn">
              {
                this.state.saving === true ? (
                  <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={this.postTrace} disabled>Saving...</button>
                ) : (
                  <button type="button" className={classN} onClick={this.postTrace} disabled={!this.state.completeFields}>Post</button>
                )
              }
                
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewPost.propTypes = {
  savePostAction: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.users
  }
);

export default connect(mapStateToProps, { savePostAction })(NewPost);
