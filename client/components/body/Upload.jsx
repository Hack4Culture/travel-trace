import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import savePostAction from '../../actions/postActions.js';

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
        title: "New Trace at SF",
        location: "SF",
        content: "",
        images: ""
      }
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.postTrace = this.postTrace.bind(this);
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
    const image = this.state.newPost.images === "" ? (
      <div className="container">
        <i className="fa fa-picture-o fa-5x" aria-hidden="true" />
      </div>
    ) : (
      <img src={this.state.newPost.images} alt="" />
    );
    return(
      <div>
        <div id="upload" className="container">
          <form className="container">
            <div className="form-row">
              <div className="col-sm-6">
                <div id="image-div">
                  {image}
                </div>
                <div>
                  <input
                    type="file"
                    className="file-upload"
                    id="images"
                    name="images"
                    accept="image/*"
                    onChange={this.onInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="col-sm-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
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
                    name="content"
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
