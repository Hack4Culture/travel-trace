import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTracesAction } from '../../actions/postActions';
import Gallery from './Gallery';


class AllTraces extends Component {
  constructor(props){
    super(props);
    this.state={
      user: this.props.auth.user,
      isAuthenticated: this.props.auth.isAuthenticated,
      traces: []
    };
  }

  componentDidMount() {
    if (!this.state.isAuthenticated) {
      this.props.history.push('/');
    }
    this.props.getTracesAction();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.auth.user,
      isAuthenticated: nextProps.auth.isAuthenticated,
      traces: nextProps.traces
    });
  }


  render() {
    return(
      <div id="all-traces" className="slide-up">
        <h3 className="text-center">AllTraces</h3>
        <h5 className="text-center">Coming Soon</h5>
      </div>
    );
  }
}

// Map state to props
const mapStateToProps = (state) => (
  {
    auth: state.users,
    traces: state.traces
  }
);

export default connect(mapStateToProps, { getTracesAction })(withRouter(AllTraces));
