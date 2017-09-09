import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message }) => {
  return(
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>An error occured</strong>{ message }
    </div>
  )
};

Alert.propTypes = {
  message: PropTypes.string.isRequired
}
export default Alert;