import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ errorMessage }) => <p className="error-message">An error has occured when making a request. {errorMessage}.</p>;

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorMessage;
