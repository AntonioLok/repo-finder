import axiosInstance from './axios-instance';
import { API_BASE_URL } from '../constants';

const { github } = API_BASE_URL;

const githubClient = axiosInstance(github);

const fetchUserRepositories = user => githubClient.request(({ url: `users/${user}/repos`, method: 'GET' }));

const fetchRepositoryLanguages = (user, repository) => githubClient.request(({ url: `repos/${user}/${repository}/languages`, method: 'GET' }));

const fetchRepositoryCommits = (user, repository, maxCommitNumber = 20) => githubClient.request(({ url: `repos/${user}/${repository}/commits?per_page=${maxCommitNumber}`, method: 'GET' }));

export {
  fetchUserRepositories,
  fetchRepositoryCommits,
  fetchRepositoryLanguages,
};
