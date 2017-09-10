import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { savePostAction } from '../../actions/postActions';
import TinyMceComponent from './TinyMceComponent';
import Alert from './Alert';

class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      title: '',
      excerpt: '',
      location: '',
      images: '',
      previewUrl: '',
      isAuthenticated: this.props.auth.isAuthenticated,
      saving: false,
      messages: { open: false }
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Runs when the component ii fully mounted
   * @method componentDidMount
   * @return {void}
   * @memberOf CreateStory
   */
  componentDidMount() {
    if (!this.state.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  /**
   * Set new props to state
   * @method componentWillReceiveProps
   * @param {object} nextProps 
   * @return {void}
   * @memberOf CreateStory
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.auth.isAuthenticated,
    });
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const postData = this.state;
    this.setState({
      ...this.state,
      saving: true
    });
    const newPost = this.state.newPost;
    const storageRef = firebase.storage().ref();
    const child = `${this.state.imageFile.name}.${Math.random()}`;
    storageRef.child(child).put(this.state.imageFile).then((snapshot) => {
      this.setState({
        ...this.state,
        images: snapshot.metadata.downloadURLs[0],
        tempImg: '',
        previewUrl: ''
      }, () => {
        this.props.savePostAction(this.state).then((res) => {
          if (res) {
            this.setState({
              ...this.state,
              messages: {
                open: true,
                success: 'Your Story has been uploaded!'
              },
              saving: false,
              completeFields: false,
              title: '',
              content: '',
              excerpt: '',
              location: '',
              previewUrl: '',
              images: ''
            });
          } else {
            this.setState({
              ...this.state,
              messages: {
                open: true,
                error: 'There is an error saving your Story!'
              },
              saving: false,
              completeFields: false,
            });
          }
        });
      });
    });
  }

  /**
   * Set content of the editor to the state
   * @method handleEditorChange
   * @param {string} content -
   * @return {void} - set new state
   * @memberOf CreateStory
   */
  handleEditorChange(content) {
    this.setState({
      content,
    });
  }

  /**
   * @param {any} event
   * @memberof CreateStory
   * @returns { void }
   */
  previewImage(event) {
    const file = event.target.files[0];  
    if (event.target.files && file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          previewUrl: e.target.result,
          imageFile: file
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    const imgSrc = this.state.previewUrl === '' ? (
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
              <div className="col-sm-8">
                <div id="image-div">
                  <TinyMceComponent
                    id={'tinymce'}
                    handleEditorChange={this.handleEditorChange}
                    content={this.state.content}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="col-sm-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Story Title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    placeholder="Location"
                    value={this.state.location}
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <textarea
                    className="form-control"
                    id="content"
                    name="excerpt"
                    rows="4"
                    placeholder="Brief description of your story"
                    value={this.state.excerpt}
                    onChange={this.onChange}
                  />
                </div>

                <div className="col-sm-12 form-group">
                  <div id="image-div">
                    { imgSrc }
                  </div>
                  <input
                    type="file"
                    className="file-upload"
                    id="imageUrl"
                    name="imageUrl"
                    accept=".jpg,.jpeg,.png,.bmp"
                    onChange={this.previewImage}
                  />
                </div>
                <div className="col-sm-12 form-group">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={this.onSubmit}
                  >Create your Story</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.users
  }
);

export default connect(mapStateToProps, { savePostAction })(withRouter(CreateStory));
