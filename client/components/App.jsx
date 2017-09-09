import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import Home from './body/Home';
import Stories from './body/Stories';
import Landing from './Landing';
import Header from './Header';
import Upload from './body/Upload';
import ReadStory from './body/ReadStory';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {}
    }
  }

  componentWillMount() {
    this.setState({
      isAuthenticated: this.props.auth.isAuthenticated,
      user: this.props.auth.user
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.auth.isAuthenticated,
      user: nextProps.auth.user
    })
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <Router history={history}>
        <div id="landing-page">
          { isAuthenticated && <Header username={this.state.user.name} />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/landing" component={Landing} />
            <Route exact path="/stories" component={Stories} />
            <Route exact path="/upload" component={Upload} /> 
            <Route exact path="/stories/read/:id" component={ReadStory} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.users
  }
)

export default connect(mapStateToProps)(App);
