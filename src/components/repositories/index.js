/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchUserRepositories, fetchRepositoryLanguages } from '../../api/github';
import TopLanguages from './top-languages';
import ErrorMessage from '../error-message';
import { getFormattedDate } from '../../utils';

const Repositories = (props) => {
  const { match } = props;
  const { params } = match;
  const { user } = params;

  const [userRepositories, setUserRepositories] = useState([]);
  const [repositoryLanguages, setRepositoryLanguages] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    (async () => {
      try {
        const repoLanguages = {};
        const fetchedUserRepositoriesRespone = await fetchUserRepositories(user);
        const fetchedUserRepositories = fetchedUserRepositoriesRespone.data;
        await Promise.all(fetchedUserRepositories.map(async (userRepository) => {
          const { name } = userRepository;
          const fetchedRepoLanguagesResponse = await fetchRepositoryLanguages(user, name);
          const fetchedRepoLanguages = fetchedRepoLanguagesResponse.data;
          const languages = Object.keys(fetchedRepoLanguages);
          languages.sort((a, b) => fetchedRepoLanguages[b] - fetchedRepoLanguages[a]);
          repoLanguages[name] = languages;
        }));
        setUserRepositories(fetchedUserRepositories);
        setRepositoryLanguages(repoLanguages);
        setErrorMessage('');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message);
        setErrorMessage(err.message);
      }
    })();
  }, [user]);

  function handleClick(repository) {
    props.history.push({ pathname: `/commits/${user}/${repository}` });
  }

  function handleKeyDown(event, repository) {
    if (event.key === 'Enter') {
      handleClick(repository);
    }
  }

  return (
    <div className="repositories-container">
      <nav className="breadcrumb has-succeeds-separator repo-nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li className="is-active"><div>{user}</div></li>
        </ul>
      </nav>
      <h4 className="title repos-for is-4">Repos for {user}</h4>
      {errorMessage ? <ErrorMessage errorMessage={errorMessage} />
        : userRepositories && userRepositories.map((userRepository, index) => {
          const { name, updated_at: updatedAt, description } = userRepository;
          const formattedDate = getFormattedDate(updatedAt);
          const topLanguagesProps = {
            repositoryLanguages, repository: name,
          };
          const LanguageButtons = TopLanguages(topLanguagesProps);

          return (
            <div
              tabIndex={0}
              role="link"
              onKeyDown={(event) => { handleKeyDown(event, name); }}
              onClick={() => { handleClick(name); }}
              className="repository-info columns"
              key={index}
            >
              <div className="column is-two-thirds-desktop is-full-mobile">
                <div className="repo-name">{name}</div>
                <div className="last-updated">updated {formattedDate}</div>
                <div className="description">{description}</div>
              </div>
              <div className="top-languages column is-one-third-desktop is-full-mobile">
                {LanguageButtons}
              </div>
            </div>
          );
        })}
    </div>
  );
};

Repositories.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.string,
    }),
  }),
};

export default Repositories;
