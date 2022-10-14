import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/github-logo.png';

const Header = (props) => {
  const [user, setUser] = useState('');

  function handleChange(event) {
    setUser(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.history.push({ pathname: `/repositories/${user}` });
  }

  return (
    <div className="header-container">
      <div className="top-section">
        <img alt="github-logo" className="is-rounded" src={logo} />
        <div className="title-container">
          <h2 className="title is-2 is-size-3-mobile">Repo Finder</h2>
          <h5 className="subtitle is-5 is-size-6-mobile">View Github repositories for any user or organization</h5>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field is-grouped">
          <div className="control is-expanded">
            <input value={user} onChange={handleChange} className="input" type="text" />
          </div>
          <div className="control">
            <button type="submit" className="button">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;
