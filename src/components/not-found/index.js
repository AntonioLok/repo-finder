import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    This page does not exist. <Link to="/">Go to Home</Link>
  </div>
);

export default NotFound;
