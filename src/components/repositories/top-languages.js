import React from 'react';

const TopLanguages = (props) => {
  const { repositoryLanguages, repository } = props;
  const languageButtons = [];

  if (repositoryLanguages && repositoryLanguages[repository]) {
    const languages = repositoryLanguages[repository];
    const numberOfTopLanguages = languages.length > 3 ? 3 : languages.length;
    for (let i = 0; i < numberOfTopLanguages; i += 1) {
      languageButtons.push(<button type="button" className="button is-light is-small is-static">{languages[i]}</button>);
    }
  }

  return languageButtons;
};

export default TopLanguages;
