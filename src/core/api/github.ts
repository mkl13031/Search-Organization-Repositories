import { repoResponse } from '../model/RepoModel';

export enum repoType {
  ALL = 'all',
  PUBLIC = 'public',
  PRIVATE = 'private',
  FORK = 'forks',
  SOURCE = 'sources',
  MEMBER = 'member',
  INTERNAL = 'internal'
}
export enum repoSort {
  CREATED = 'created',
  UPDATED = 'updated',
  PUSHED = 'pushed',
  FULL_NAME = 'full_name'
}
export enum repoDirection {
  ASC = 'asc',
  DESC = 'desc'
}

const getRepoByOrg = async (
  org: string,
  per_page: number,
  page: number,
  type?: repoType,
  sort?: repoSort,
  direction?: repoDirection,
): Promise<{ status: number, data?: repoResponse[] }> => {
  const response = await fetch(
    `${process.env.REACT_APP_GITHUB_ENDPOINT}/orgs/${org}/repos?
    &perpage=${per_page}
    &page=${page}
    ${type ? `&type=${type}` : ''}
    ${sort ? `&sort=${sort}` : ''}
    ${direction ? `&direction=${direction}` : ''}
    `,
    { method: 'GET' });

  if (response.status === 200) {
    const json = await response.json();
    return { status: response.status, data: json };
  } else {
    return { status: response.status, data: undefined };
  }
};

const githubApi = {
  getRepoByOrg,
};

export default githubApi;