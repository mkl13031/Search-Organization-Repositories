import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { repoType, repoSort, repoDirection } from '../api/github';
import { repoResponseStatus } from '../enum/repoResponseStatus';
import { repoResponse } from '../model/RepoModel';

interface globalContextModel {
  repos: repoResponse[],
  setRepos: Dispatch<SetStateAction<repoResponse[]>>,
  repoPage: number,
  setRepoPage: Dispatch<SetStateAction<number>>,
  status: repoResponseStatus,
  setStatus: Dispatch<SetStateAction<repoResponseStatus>>,
  organization: string,
  setOrganization: Dispatch<SetStateAction<string>>,
  type?: repoType,
  setType: Dispatch<SetStateAction<repoType | undefined>>,
  sort?: repoSort,
  setSort: Dispatch<SetStateAction<repoSort | undefined>>,
  direction?: repoDirection,
  setDirection: Dispatch<SetStateAction<repoDirection | undefined>>,
}

const defaultGlobalContextModel: globalContextModel = {
  repos: [],
  setRepos: () => console.log(),
  repoPage: 1,
  setRepoPage: () => console.log(),
  status: repoResponseStatus.IDLE,
  setStatus: () => console.log(),
  organization: '',
  setOrganization: () => console.log(),
  setType: () => console.log(),
  setSort: () => console.log(),
  setDirection: () => console.log(),
};

export const GlobalContext = createContext(defaultGlobalContextModel);

const useGlobalContext = () => { return useContext(GlobalContext); };

export default useGlobalContext;