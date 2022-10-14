/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../error-message';
import { fetchRepositoryCommits } from '../../api/github';
import { getFormattedDate } from '../../utils';

const Commits = (props) => {
  const { match } = props;
  const { params } = match;
  const { repository, user } = params;

  const [repositoryCommits, setRepositoryCommits] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    (async () => {
      try {
        const fetchedRepositoryCommitsResponse = await fetchRepositoryCommits(user, repository, 20);
        const fetchedRepositoryCommits = fetchedRepositoryCommitsResponse.data;
        setRepositoryCommits(fetchedRepositoryCommits);
        setErrorMessage('');
      } catch (err) {
        setErrorMessage(err.message);
      }
    })();
  }, [repository]);

  function handleClick(url) {
    window.location.href = url;
  }

  function handleKeyDown(event, url) {
    if (event.key === 'Enter') {
      handleClick(url);
    }
  }

  return (
    <div className="commits-container">
      <nav className="breadcrumb has-succeeds-separator repo-nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href={`/repositories/${user}`}>{user}</a></li>
          <li className="is-active"><div>{repository}</div></li>
        </ul>
      </nav>
      <h4 className="title commits-for is-4">Commits for {repository}</h4>
      {errorMessage ? <ErrorMessage errorMessage={errorMessage} />
        : repositoryCommits && repositoryCommits.map((commitData, index) => {
          const { commit, html_url: url } = commitData;
          const { author, message } = commit;
          const { name, date } = author;
          const formattedDate = getFormattedDate(date);

          return (
            <div className="columns" key={index}>
              <div
                tabIndex={0}
                role="link"
                onKeyDown={(event) => { handleKeyDown(event, url); }}
                onClick={() => { handleClick(url); }}
                className="commit-info column"
              >
                <div className="author">{name}</div>
                <div className="committed-date">{formattedDate}</div>
                <div className="commit-message">{message}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

Commits.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.string,
      repository: PropTypes.string,
    }),
  }),
};

export default Commits;
